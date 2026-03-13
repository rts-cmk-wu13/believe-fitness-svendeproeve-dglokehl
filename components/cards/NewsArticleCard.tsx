import type { NewsArticle } from "@/app/api/types"

type NewsArticleCardProps = {
    article: NewsArticle;
    className?: string;
}

export default function NewsArticleCard({ article, className }: NewsArticleCardProps) {
    return (
        <article className={`space-y-4 ${className ? className : ""}`}>
            <h3 className="text-2xl font-bold">{article.title}</h3>
            <img src={article.asset.url} alt={article.title} className="w-full h-50 object-cover" />
            <p>{article.text}</p>
        </article>
    )
}