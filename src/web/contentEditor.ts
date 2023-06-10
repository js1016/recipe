import ace, { Ace } from 'ace-builds';
import { marked } from 'marked';
import "./contentEditor.less";
import "../../node_modules/github-markdown-css/github-markdown.css";
import 'highlight.js/styles/github.css';
import { ContentRef, MdUtil, RefInfo } from '../MdUtil';
import { Content, Section, getSectionKey } from '../common';
import ContentList from '../../ContentList.json';
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

marked.use(markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
    }
}));

ace.config.set('basePath', '/js/ace/');

const editor = ace.edit('editor', {
    mode: 'ace/mode/markdown',
    theme: 'ace/theme/monokai',
    showPrintMargin: false,
    fontSize: 16,
    wrap: true
});

const contentDiv = document.querySelector('#content') as HTMLDivElement;
const targetSelect = document.querySelector('#target-selection') as HTMLSelectElement;
let selectedSection: Section = targetSelect.value as Section;

targetSelect.addEventListener('change', (e) => {
    selectedSection = targetSelect.value as Section;
    doPreview();
});

const getContentById = (id: string): Content | null => {
    const content = ContentList.find(c => c.id === id);
    if (content) {
        return content;
    } else {
        return null;
    }
}

const getRefSection = (ref: RefInfo, dependentContentRef: ContentRef): Section | null => {
    if (ref.section) {
        return ref.section;
    }
    const refContent = getContentById(ref.id);
    if (refContent && refContent.headMd && !refContent.mainMd && !refContent.footMd) {
        return 'head';
    } else if (refContent && !refContent.headMd && refContent.mainMd && !refContent.footMd) {
        return 'main';
    } else if (refContent && !refContent.headMd && !refContent.mainMd && refContent.footMd) {
        return 'foot';
    } else {
        if (refContent && refContent[getSectionKey(dependentContentRef.section)]) {
            return dependentContentRef.section;
        } else {
            return null;
        }
    }
};

const doPreview = () => {
    let md = editor.getValue();
    let lines = md.split('\n');
    const contentRef = MdUtil.getRefListFromLines(lines, 'preview', selectedSection);
    if (contentRef) {
        let refLineOffset = 0;
        for (const ref of contentRef.refs) {
            const section = getRefSection(ref, contentRef);
            if (section) {
                ref.section = section;
                ref.lineIndex += refLineOffset;
                let oriLineCount = lines.length;
                let refContent = getContentById(ref.id);
                if (refContent) {
                    let refLines = refContent[getSectionKey(ref.section as Section)];
                    if (refLines) {
                        lines = MdUtil.merge(lines, refLines.split('\n'), ref);
                        refLineOffset += lines.length - oriLineCount
                    }
                }
            }
        }
        md = lines.join('\n');
    }
    const html = marked.parse(md);
    contentDiv.innerHTML = html;
}

editor.on('change', (e: Ace.Delta) => {
    doPreview();
})