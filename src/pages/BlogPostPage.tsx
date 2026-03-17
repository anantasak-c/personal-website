import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { ArrowLeft, Clock, Tag, Loader2 } from "lucide-react";
import { personalInfo } from "@/data/content";
import { sanityClient, POST_BY_SLUG_QUERY, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import type { SanityPost } from "@/types/blog";
import { useLang } from "@/i18n/LanguageContext";
import 'highlight.js/styles/github.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const portableTextComponents: any = {
  types: {
    image: ({ value }: { value: { asset: unknown; alt?: string; caption?: string } }) => (
      <figure className="my-8">
        <img
          src={urlFor(value.asset).width(800).url()}
          alt={value.alt || ""}
          className="w-full rounded-xl object-cover"
        />
        {value.caption && (
          <figcaption className="text-center text-sm text-gray-400 mt-2">{value.caption}</figcaption>
        )}
      </figure>
    ),
  },
  marks: {
    link: ({ value, children }: { value: { href: string }; children: React.ReactNode }) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
        {children}
      </a>
    ),
  },
};

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useLang();
  const [post, setPost] = useState<SanityPost | null>(null);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: post?.title || "Blog Post",
    description: post?.description || "",
    url: `https://anantasak.dev/blog/${slug}`,
  });

  useEffect(() => {
    if (!slug) return;
    sanityClient
      .fetch<SanityPost>(POST_BY_SLUG_QUERY, { slug })
      .then((data) => setPost(data ?? null))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">{t("blog.notFound")}</p>
        <Link to="/blog" className="text-blue-600 hover:underline text-sm">{t("blog.backHome")}</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            to="/blog"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("blog.back")}
          </Link>
          <Link to="/" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
            {personalInfo.name}
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        {post.coverImage && (
          <div className="mb-8 overflow-hidden rounded-3xl border border-gray-100 bg-gray-100 shadow-sm">
            <img
              src={urlFor(post.coverImage).width(1600).height(900).fit("crop").url()}
              alt={post.title}
              className="h-full w-full max-h-[520px] object-cover"
            />
          </div>
        )}

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-snug">{post.title}</h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-10 pb-10 border-b border-gray-100">
          {post.publishedAt && (
            <span>
              {new Date(post.publishedAt).toLocaleDateString(lang === "th" ? "th-TH" : "en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
          {post.readTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          )}
        </div>

        {/* Body */}
        {post.body ? (
          <div className="prose prose-gray prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-p:text-gray-600 prose-p:leading-relaxed
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-pre:bg-gray-900 prose-pre:text-gray-100
            prose-blockquote:border-l-blue-400 prose-blockquote:text-gray-500
            prose-strong:text-gray-900
            prose-ul:text-gray-600 prose-ol:text-gray-600">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        ) : (
          <p className="text-gray-400 text-center py-20">{t("blog.noContent")}</p>
        )}

        {/* Back link */}
        <div className="mt-16 pt-10 border-t border-gray-100">
          <Link
            to="/blog"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("blog.backAll")}
          </Link>
        </div>
      </article>
    </div>
  );
}
