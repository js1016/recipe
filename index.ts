import fs from 'fs';
import path from 'path';
import { BlobServiceClient } from '@azure/storage-blob';
import { ContentRef, MdUtil, RefInfo } from './src/MdUtil';
import { Section, Content, getSectionKey } from './src/common';

let ContentList: Content[] = [];
let RecipeList: Recipe[] = [];

type ContentConfig = {
    name: string;
}
type RecipeConfig = {
    title: string;
    description: string;
    head: string[];
    main: string[];
    foot: string[];
}



type Recipe = {
    id: string;
    title: string;
    description: string;
    head: string[];
    main: string[];
    foot: string[];
}


const getRefSection = (ref: RefInfo, dependentContentRef: ContentRef): Section => {
    if (ref.section) {
        return ref.section;
    }
    const refContent = getContentById(ref.id);
    if (refContent.headMd && !refContent.mainMd && !refContent.footMd) {
        return 'head';
    } else if (!refContent.headMd && refContent.mainMd && !refContent.footMd) {
        return 'main';
    } else if (!refContent.headMd && !refContent.mainMd && refContent.footMd) {
        return 'foot';
    } else {
        if (refContent[getSectionKey(dependentContentRef.section)]) {
            return dependentContentRef.section;
        } else {
            throw `${ref.id} does not have ${dependentContentRef.section}Md, but it is referenced by ${dependentContentRef.id}:${dependentContentRef.section}`;
        }
    }
};

const hasCircularReferences = (contentRefList: ContentRef[]): boolean => {
    const visitedNodes = new Set();
    const loops = [];

    function traverse(node: ContentRef, path: string[]) {
        if (visitedNodes.has(node.id)) {
            const circularPath = path.join(' -> ') + ' -> ' + node.id + ':' + node.section;
            console.log('Circle reference loop detected: ' + circularPath);
            loops.push(circularPath);
            return;
        }

        visitedNodes.add(node.id);

        for (const ref of node.refs) {
            const refNode = contentRefList.find(item => item.id === ref.id && item.section === ref.section);
            if (refNode) {
                traverse(refNode, [...path, node.id + ':' + node.section]);
            }
        }

        visitedNodes.delete(node.id);
    }

    for (const node of contentRefList) {
        traverse(node, []);
    }
    return loops.length > 0;
}

const getContentById = (id: string): Content => {
    const content = ContentList.find(c => c.id === id);
    if (content) {
        return content;
    } else {
        throw `Content id: ${id} not found`;
    }
}



const checkSteps = (steps: string[], section: Section, recipeId: string): boolean => {
    for (const step of steps) {
        const content = ContentList.find(i => i.id === step);
        if (content && content[`${section}Md`] === null) {
            console.log(`${step} does not have ${section}Md, but it is referenced by ${recipeId}`);
            return false;
        }
    }
    return true;
};

const getRefList = (content: Content): ContentRef[] => {
    return [content.headMd ? MdUtil.getRefListFromLines(content.headMd.split('\n'), content.id, 'head') || [] : [],
    content.mainMd ? MdUtil.getRefListFromLines(content.mainMd.split('\n'), content.id, 'main') || [] : [],
    content.footMd ? MdUtil.getRefListFromLines(content.footMd.split('\n'), content.id, 'foot') || [] : []].flat();
}

const processRefs = (contentRef: ContentRef) => {
    const content = getContentById(contentRef.id);
    let contentLines = (content[getSectionKey(contentRef.section)] as string).split('\n');
    let refLineOffset = 0;
    for (const ref of contentRef.refs) {
        ref.lineIndex += refLineOffset;
        let oriLineCount = contentLines.length;
        let refLines = getContentById(ref.id)[getSectionKey(ref.section as Section)];
        if (refLines) {
            contentLines = MdUtil.merge(contentLines, refLines.split('\n'), ref);
            refLineOffset += contentLines.length - oriLineCount
        } else {
            throw "Error in processRefs: refLines is null";
        }
    }
    content[getSectionKey(contentRef.section)] = contentLines.join('\n');
};

const contentsPath = path.resolve(__dirname, 'contents');
const recipesPath = path.resolve(__dirname, 'recipes');

const contentDirEntries = fs.readdirSync(contentsPath, {
    withFileTypes: true
});

let hasRefContentList: ContentRef[] = [];

for (const dirEnt of contentDirEntries) {
    if (dirEnt.isDirectory()) {
        const dirPath = path.resolve(contentsPath, dirEnt.name);
        const fileList = fs.readdirSync(dirPath);
        if (fileList.includes('config.json')) {
            const config = JSON.parse(fs.readFileSync(path.resolve(dirPath, 'config.json'), { encoding: 'utf-8' })) as ContentConfig;
            const content = {
                name: config.name,
                id: dirEnt.name,
                headMd: fileList.includes('head.md') ? fs.readFileSync(path.resolve(dirPath, 'head.md'), { encoding: 'utf-8' }) : null,
                mainMd: fileList.includes('main.md') ? fs.readFileSync(path.resolve(dirPath, 'main.md'), { encoding: 'utf-8' }) : null,
                footMd: fileList.includes('foot.md') ? fs.readFileSync(path.resolve(dirPath, 'foot.md'), { encoding: 'utf-8' }) : null
            };
            hasRefContentList = hasRefContentList.concat(getRefList(content));
            ContentList.push(content);
        } else {
            console.log(`${dirPath} does not have config.json`)
        }
    } else {
        console.log(`${dirEnt.name} is not a directory`)
    }
}

if (!hasCircularReferences(hasRefContentList)) {
    while (hasRefContentList.length) {
        for (let i = 0; i < hasRefContentList.length; i++) {
            const contentRef = hasRefContentList[i];
            let canProcess = true;
            for (const ref of contentRef.refs) {
                ref.section = getRefSection(ref, contentRef)
                if (hasRefContentList.some(r => r.id === ref.id && r.section === ref.section)) {
                    canProcess = false;
                    break;
                }
            }
            if (canProcess) {
                processRefs(contentRef);
                hasRefContentList.splice(i, 1);
                i--;
            }
        }
    }
} else {
    throw 'Please resolve circular references first.'
}

const recipeDirEntries = fs.readdirSync(recipesPath, {
    withFileTypes: true
});

for (const dirEnt of recipeDirEntries) {
    if (dirEnt.isDirectory()) {
        const dirPath = path.resolve(recipesPath, dirEnt.name);
        const fileList = fs.readdirSync(dirPath);
        if (fileList.includes('config.json')) {
            const config = JSON.parse(fs.readFileSync(path.resolve(dirPath, 'config.json'), { encoding: 'utf-8' })) as RecipeConfig;
            let description = config.description;
            if (description.endsWith('.md') && fileList.includes(description)) {
                description = fs.readFileSync(path.resolve(dirPath, description), { encoding: 'utf-8' });
            }
            RecipeList.push({
                id: dirEnt.name,
                title: config.title,
                description: description,
                head: config.head,
                main: config.main,
                foot: config.foot
            });
            checkSteps(config.head, 'head', dirEnt.name);
            checkSteps(config.main, 'main', dirEnt.name);
            checkSteps(config.foot, 'foot', dirEnt.name);
        } else {
            console.log(`${dirEnt.name} does not have config.json`);
        }
    } else {
        console.log(`${dirEnt.name} is not a directory`);
    }
}

console.log(`Found ${ContentList.length} contents`);
console.log(`Found ${RecipeList.length} recipes`);

fs.writeFileSync(path.resolve(__dirname, `ContentList.json`), JSON.stringify(ContentList, null, 4), { encoding: 'utf-8' });
fs.writeFileSync(path.resolve(__dirname, `RecipeList.json`), JSON.stringify(RecipeList, null, 4), { encoding: 'utf-8' });

if (process.argv.some(i => i === 'publish')) {
    uploadToStorage();
} else {
    console.log('Done');
}


async function uploadToStorage() {
    const blobServiceClient = new BlobServiceClient(process.env.RecipeBlobSASUrl as string);
    const recipePrivateContainer = blobServiceClient.getContainerClient('recipe-private');
    const contentListBlockBlob = recipePrivateContainer.getBlockBlobClient('ContentList.json');
    console.log(`Uploading ContentList.json...`);
    await contentListBlockBlob.uploadFile(path.resolve(__dirname, `ContentList.json`), {
        blobHTTPHeaders: {
            blobContentType: 'application/json'
        }
    });
    const recipeListBlockBlob = recipePrivateContainer.getBlockBlobClient('RecipeList.json');
    console.log(`Uploading RecipeList.json...`);
    await recipeListBlockBlob.uploadFile(path.resolve(__dirname, 'RecipeList.json'), {
        blobHTTPHeaders: {
            blobContentType: 'application/json'
        }
    });
    console.log(`Done`);
}