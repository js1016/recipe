import { Section } from "./common";

export type Md = {
    type: 'list' | 'mix';
    lines: string[];
    listIndexList: number[];
    listIndent: string;
}

type MdListType = 'ordered' | '*' | '-' | '+';
type MdLineType = 'empty' | 'text' | 'head' | 'code' | MdListType;
export type MdLine = {
    type: MdLineType;
    raw: string;
    indent: string;
    text: string;
    order: number;
};

export type ContentRef = {
    id: string;
    section: Section;
    refs: RefInfo[];
};

export type RefInfo = {
    lineIndex: number;
    mdLine: MdLine;
    id: string;
    section: Section | null;
};

type WalkListResult = {
    brokenIndex: number | null;
    listIndexList: number[];
    listIndent: string;
}

const isList = (mdLine: MdLine): boolean => {
    return ['*', '-', '+', 'ordered'].indexOf(mdLine.type) > -1
};

const walkList = (lines: string[], startIndex: number = 0): WalkListResult => {
    const walkListResult: WalkListResult = {
        brokenIndex: null,
        listIndexList: [],
        listIndent: ''
    };
    const firstMdLine = getMdLine(lines[startIndex]);
    if (isList(firstMdLine)) {
        let lastLineIsEmpty: boolean = false;
        let listIndent = firstMdLine.indent;
        let lastListLine = firstMdLine;
        walkListResult.listIndexList.push(startIndex);
        walkListResult.listIndent = listIndent;
        for (let i = startIndex + 1; i < lines.length; i++) {
            const mdLine = getMdLine(lines[i]);
            let requiredIndentLength = listIndent.length;
            if (lastListLine && lastListLine.type === 'ordered') {
                requiredIndentLength += lastListLine.order.toString().length + 2;
            } else {
                requiredIndentLength += 2;
            }
            if (isList(mdLine)) {
                if (mdLine.indent === listIndent) {
                    lastLineIsEmpty = false;
                    lastListLine = mdLine;
                    walkListResult.listIndexList.push(i);
                }
                lastLineIsEmpty = false;
            } else if (mdLine.type === 'empty') {
                lastLineIsEmpty = true;
            } else if (mdLine.type === 'code' || mdLine.type === 'head') {
                if (mdLine.indent.length < requiredIndentLength) {
                    walkListResult.brokenIndex = i;
                    break;
                }
                lastLineIsEmpty = false;
            }
            else {
                if (lastLineIsEmpty) {
                    if (mdLine.indent.length < requiredIndentLength) {
                        walkListResult.brokenIndex = i;
                        break;
                    }
                }
                lastLineIsEmpty = false;
            }
        }
        return walkListResult;
    } else {
        walkListResult.brokenIndex = startIndex;
        return walkListResult;
    }
}

const getMd = (lines: string[]): Md => {
    const mixResult: Md = {
        type: 'mix',
        lines: lines,
        listIndexList: [],
        listIndent: ''
    };
    const walkListResult = walkList(lines);
    if (walkListResult.brokenIndex !== null) {
        return mixResult;
    } else {
        return {
            type: 'list',
            lines: lines,
            listIndexList: walkListResult.listIndexList,
            listIndent: walkListResult.listIndent
        }
    }
}

const trim = (lines: string[]): string[] => {
    for (let i = 0; i < lines.length; i++) {
        if (!lines[i].trim().length) {
            lines.splice(i--, 1);
        } else {
            break;
        }
    }
    for (let i = lines.length - 1; i >= 0; i--) {
        if (!lines[i].trim().length) {
            lines.pop();
        } else {
            break;
        }
    }
    return lines
}

const getMdLine = (line: string): MdLine => {
    const trim = line.trim();
    if (trim === '') {
        const indentMatch = line.match(/^( +)/);
        return {
            type: 'empty',
            raw: line,
            indent: indentMatch ? indentMatch[1] : '',
            text: '',
            order: 0
        }
    }
    const listMatchResult = line.match(/^( *)(\* +|\- +|\+ +|\d+\. +)(.*)/);
    if (listMatchResult) {
        let listType: MdListType = 'ordered';
        let order = 0;
        if (listMatchResult[2].startsWith('-')) {
            listType = '-';
        } else if (listMatchResult[2].startsWith('*')) {
            listType = '*';
        } else if (listMatchResult[2].startsWith('+')) {
            listType = '+';
        } else {
            order = parseInt(listMatchResult[2]);
        }
        return {
            type: listType,
            raw: line,
            indent: listMatchResult[1],
            text: listMatchResult[3],
            order: order
        }
    }
    const headMatchResult = line.match(/^( *)(#{1,6})(( +(.+))|( *|\r)$)/);
    if (headMatchResult) {
        return {
            type: 'head',
            raw: line,
            indent: headMatchResult[1],
            text: headMatchResult[5] || '',
            order: 0
        }
    }
    const codeMatchResult = line.match(/^( *)`{3}(.*)/);
    if (codeMatchResult) {
        let hasContent = false;
        let closedCode = false;
        if (codeMatchResult[2]) {
            for (let i = 0; i < codeMatchResult[2].length; i++) {
                if (!hasContent && codeMatchResult[2].charAt(i) !== '`') {
                    hasContent = true;
                } else if (hasContent && codeMatchResult[2].charAt(i) === '`') {
                    closedCode = true;
                    break;
                }
            }
        }
        if (!closedCode) {
            return {
                type: 'code',
                raw: line,
                indent: codeMatchResult[1],
                text: codeMatchResult[2],
                order: 0
            }
        }
    }
    const textMatchResult = line.match(/^( *)(.+)/);
    return {
        type: 'text',
        raw: line,
        indent: textMatchResult ? textMatchResult[1] : '',
        text: textMatchResult ? textMatchResult[2] : line,
        order: 0
    }
}

const getRefListFromLines = (lines: string[], id: string, section: Section): ContentRef | null => {
    let contentRef: ContentRef = {
        id: id,
        section: section,
        refs: []
    };
    for (let i = 0; i < lines.length; i++) {
        const mdLine = MdUtil.getMdLine(lines[i]);
        if (['text', '*', '+', '-', 'ordered'].indexOf(mdLine.type) > -1) {
            const refMatch = mdLine.text.match(/^ref:([^:\s]+)(:(head|main|foot))?$/);
            if (refMatch) {
                contentRef.refs.push({
                    lineIndex: i,
                    mdLine: mdLine,
                    id: refMatch[1],
                    section: refMatch[3] as Section || null
                });
            }
        }
    }
    return contentRef.refs.length ? contentRef : null;
}

const merge = (contentLines: string[], refLines: string[], ref: RefInfo): string[] => {
    const refMd = getMd(trim(refLines));
    const refInList = isList(ref.mdLine);
    let order = ref.mdLine.order;
    if (refMd.type === 'list' && refInList) {
        for (const listLineIndex of refMd.listIndexList) {
            const mdLine = getMdLine(refLines[listLineIndex]);
            if (ref.mdLine.type === 'ordered') {
                refLines[listLineIndex] = `${mdLine.indent}${order++}. ${mdLine.text}`;
            } else {
                refLines[listLineIndex] = `${mdLine.indent}${ref.mdLine.type} ${mdLine.text}`;
            }
        }
    }
    let targetIndent = ref.mdLine.indent;
    if (refMd.type === 'mix' && refInList) {
        if (ref.mdLine.type === 'ordered') {
            targetIndent += new Array(ref.mdLine.order.toString().length + 3).join(' ');
        } else {
            targetIndent += new Array(3).join(' ');
        }
    }
    let deltaIndent = refMd.type === 'list' ? targetIndent.length - refMd.listIndent.length : targetIndent.length;
    for (let i = 0; i < refLines.length; i++) {
        if (deltaIndent > 0) {
            refLines[i] = `${new Array(deltaIndent + 1).join(' ')}${refLines[i]}`;
        } else {
            refLines[i] = refLines[i].substring(deltaIndent * -1);
        }
    }
    if (refMd.type === 'mix' && refInList) {
        contentLines[ref.lineIndex] = ref.mdLine.raw.substring(0, ref.mdLine.raw.length - ref.mdLine.text.length - 1);
        contentLines.splice(ref.lineIndex + 1, 0, ...refLines);
    } else {
        contentLines.splice(ref.lineIndex, 1, ...refLines);
    }
    if (refInList && ref.mdLine.type === 'ordered' && refMd.type === 'list') {
        const walkListResult = walkList(contentLines, ref.lineIndex);
        const checkStartIndex = ref.lineIndex + refLines.length;
        for (const lineIndex of walkListResult.listIndexList) {
            if (lineIndex >= checkStartIndex) {
                const mdLine = getMdLine(contentLines[lineIndex]);
                if (mdLine.type === 'ordered') {
                    contentLines[lineIndex] = `${mdLine.indent}${order++}. ${mdLine.text}`;
                } else {
                    break;
                }
            }
        }
    }
    return contentLines;
}

export const MdUtil = {
    getMd: getMd,
    getMdLine: getMdLine,
    isList: isList,
    trim: trim,
    getRefListFromLines: getRefListFromLines,
    merge: merge
};