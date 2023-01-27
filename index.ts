import fs from 'fs';
import path from 'path';
import { BlobServiceClient } from '@azure/storage-blob';
let ContentList: RecipeContent[] = [];
let RecipeList: Recipe[] = [];

type RecipeContentConfig = {
    name: string;
}
type RecipeConfig = {
    title: string;
    description: string;
    head: string[];
    main: string[];
    foot: string[];
}

type RecipeContent = {
    name: string;
    id: string;
    mainMd: string | null;
    headMd: string | null;
    footMd: string | null;
};

type Recipe = {
    id: string;
    title: string;
    description: string;
    head: string[];
    main: string[];
    foot: string[];
}

type Section = 'head' | 'foot' | 'main';

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

const contentsPath = path.resolve(__dirname, 'contents');
const recipesPath = path.resolve(__dirname, 'recipes');

const contentDirEntries = fs.readdirSync(contentsPath, {
    withFileTypes: true
});

for (const dirEnt of contentDirEntries) {
    if (dirEnt.isDirectory()) {
        const dirPath = path.resolve(contentsPath, dirEnt.name);
        const fileList = fs.readdirSync(dirPath);
        if (fileList.includes('config.json')) {
            const config = JSON.parse(fs.readFileSync(path.resolve(dirPath, 'config.json'), { encoding: 'utf-8' })) as RecipeContentConfig;
            ContentList.push({
                name: config.name,
                id: dirEnt.name,
                headMd: fileList.includes('head.md') ? fs.readFileSync(path.resolve(dirPath, 'head.md'), { encoding: 'utf-8' }) : null,
                mainMd: fileList.includes('main.md') ? fs.readFileSync(path.resolve(dirPath, 'main.md'), { encoding: 'utf-8' }) : null,
                footMd: fileList.includes('foot.md') ? fs.readFileSync(path.resolve(dirPath, 'foot.md'), { encoding: 'utf-8' }) : null
            });
        } else {
            console.log(`${dirPath} does not have config.json`)
        }
    } else {
        console.log(`${dirEnt.name} is not a directory`)
    }
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