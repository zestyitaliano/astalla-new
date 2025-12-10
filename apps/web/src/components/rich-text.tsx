import ReactMarkdown from 'react-markdown';

interface RichTextProps {
    content: string;
    className?: string;
}

export function RichText({ content, className = "" }: RichTextProps) {
    if (!content) return null;

    return (
        <div className={`prose prose-zinc dark:prose-invert max-w-none ${className}`}>
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
}
