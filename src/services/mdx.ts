import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import readingTime from 'reading-time' ;
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeCodeTitle from 'rehype-code-titles';

type ContentType = 'pages' | 'posts';

const root = process.cwd();
const dataFolder = './src/data';

export const getFiles = (type: ContentType): any[] => { 
    return fs.readdirSync(path.join(root, dataFolder, type));
}

export const getContentFromFileBySlug = async (type: ContentType, slug: string) => {
    const mdxSource = fs.readFileSync(path.join(root, dataFolder, type, `${slug}.mdx`), 'utf8');

    const {data, content} = await matter(mdxSource);

    const text = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [rehypeCodeTitle],
            rehypePlugins: [rehypePrismPlus],
        }
    });

    return {
        text,
        metadata: {
            readingTime: readingTime(content),
            slug,
            ...data,
        }
    }
};

export const getMetadataFromAllFiles = async (type: ContentType) => {
    const files = getFiles(type);

    return files.reduce((allPosts, postSlug) => {
        const mdxSource = fs.readFileSync(path.join(root, dataFolder, type, postSlug), 'utf8');
        const { data } = matter(mdxSource);

        return [
            { ...data, slug: postSlug.replace('.mdx', '') }, ...allPosts
        ];
    }, []);
};