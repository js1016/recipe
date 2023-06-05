import { describe, expect, test } from '@jest/globals'
import { Md, MdLine, MdUtil } from '../src/MdUtil';
import fs from 'fs';
import path from 'path';
import getMdLineTest from './getMdLine.test.json';
import samples from './getMd-samples/samples.json';
describe('MdUtil.getMdLine test', () => {
    for (const item of getMdLineTest) {
        test(item.line, () => {
            const result = MdUtil.getMdLine(item.line);
            for (const key in item.expect) {
                expect(result[key as keyof MdLine]).toBe(item.expect[key as 'type']);
                expect(result.raw).toBe(item.line);
            }
        })
    }
});

describe('MdUtil.trim test', () => {
    test('trim-test.txt', () => {
        const lines = fs.readFileSync(path.resolve(__dirname, 'trim-test.txt'), { encoding: 'utf-8' }).split('\n');
        const trimedLines = MdUtil.trim(lines);
        expect(trimedLines.length).toBe(3);
        expect(trimedLines[0].startsWith('        hello')).toBe(true);
        expect(trimedLines[2].startsWith('\t        hello2')).toBe(true);
    });
});

describe('MdUtil.getMd test', () => {
    for (const sample of samples) {
        test(sample.file, () => {
            const content = fs.readFileSync(path.resolve(__dirname, 'getMd-samples', sample.file), { encoding: 'utf-8' });
            const md = MdUtil.getMd(MdUtil.trim(content.split('\n')));
            for (const key in sample.expect) {
                let value = md[key as keyof Md];
                if (key === 'listIndexList') {
                    expect(sample.expect[key as 'listIndexList']).toEqual(expect.arrayContaining(value as number[]));
                } else {
                    expect(md[key as keyof Md]).toBe(sample.expect[key as 'type']);
                }
            }
        });
    }
});

describe('Merge test', () => {
    const dir = fs.readdirSync(path.resolve(__dirname, 'merge-samples'), {
        withFileTypes: true
    });
    for (const ent of dir) {
        if (ent.isFile() && ent.name.endsWith('.txt')) {
            test(ent.name, () => {
                const fileContent = fs.readFileSync(path.resolve(__dirname, 'merge-samples', ent.name), { encoding: 'utf-8' });
                const fileLines = fileContent.split('\n');
                let refLines: string[] = [];
                let contentLines: string[] = [];
                let expectLines: string[] = [];
                let readingPart = '';
                for (const fileLine of fileLines) {
                    if (fileLine.startsWith('==========')) {
                        let action = fileLine.split('==========').join('').trim();
                        if (action === 'end') {
                            readingPart = '';
                        } else {
                            readingPart = action;
                        }
                    } else {
                        if (readingPart === 'ref') {
                            refLines.push(fileLine);
                        } else if (readingPart === 'content') {
                            contentLines.push(fileLine);
                        } else if (readingPart === 'expect') {
                            expectLines.push(fileLine);
                        }
                    }
                }
                const contentRef = MdUtil.getRefListFromLines(contentLines, ent.name, 'foot');
                if (contentRef && contentRef.refs.length) {
                    const mergedLines = MdUtil.merge(contentLines, refLines, contentRef.refs[0]);
                    expect(mergedLines.join('\n').replace(/\r/g, '')).toBe(expectLines.join('\n').replace(/\r/g, ''));
                }
            })
        }
    }
})