import { RefInfo } from "./MdUtil";

export type Section = 'head' | 'foot' | 'main';
export type Content = {
    name: string;
    id: string;
    mainMd: string | null;
    headMd: string | null;
    footMd: string | null;
};
export const getSectionKey = (section: Section): 'headMd' | 'mainMd' | 'footMd' => {
    return `${section}Md` as 'headMd' | 'mainMd' | 'footMd';
};