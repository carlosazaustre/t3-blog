import Link from 'next/link';

export type PostListItemProps = {
    title: string;
    date: string;
    summary: string;
    slug: string;
}

const PostListItem = ({ title, date, summary, slug} : PostListItemProps) => {
    return (
        <Link href={`/posts/${slug}`}>
            <div className="block p-6 w-200 w-full bg-white hover:bg-gray-100 my-2">
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-800">{title}</h3>
                <span className="text-sm text-gray-500">{date}</span>
                <p className="font-normal text-gray-700">{summary}</p>
            </div>
        </Link>
    );
}

export {PostListItem};