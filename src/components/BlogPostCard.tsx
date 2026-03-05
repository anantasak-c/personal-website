import { Link } from "react-router-dom";
import type { SanityPost } from "@/types/blog";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

interface BlogPostCardProps {
  post: SanityPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const { t } = useLang();

  return (
    <article className="bg-white border border-gray-100 rounded-2xl p-5 h-full flex flex-col hover:border-gray-200 hover:shadow-md transition-all duration-300">
      <div className="flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400 mb-2">{t("blog.new")}</p>
        <h3 className="text-lg font-semibold text-gray-900 leading-snug mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-4">{post.description}</p>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
        <span>{post.readTime || t("blog.article")}</span>
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700"
        >
          {t("blog.readMore")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
