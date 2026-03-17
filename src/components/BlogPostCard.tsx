import { Link } from "react-router-dom";
import type { SanityPost } from "@/types/blog";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { urlFor } from "@/lib/sanity";

interface BlogPostCardProps {
  post: SanityPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const { t } = useLang();

  return (
    <article className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-5 h-full flex flex-col gradient-border hover:shadow-lg hover:shadow-indigo-100/30 transition-all duration-300">
      {post.coverImage && (
        <div className="mb-4 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 aspect-[16/9]">
          <img
            src={urlFor(post.coverImage).width(800).height(450).fit("crop").url()}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}

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
