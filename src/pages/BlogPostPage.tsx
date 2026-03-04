import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { posts } from "@/blog/posts-registry";
import { useSEO } from "@/hooks/useSEO";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { personalInfo } from "@/data/content";
import 'highlight.js/styles/github.css';

// Lazy-load all MDX files
const mdxModules = import.meta.glob("../blog/*.mdx");

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

  const [PostContent, setPostContent] = useState<React.ComponentType | null>(null);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: post?.title || "Blog Post",
    description: post?.description || "",
    url: `https://anantasak.dev/blog/${slug}`,
  });

  useEffect(() => {
    if (!slug) return;
    const key = `../blog/${slug}.mdx`;
    if (mdxModules[key]) {
      mdxModules[key]().then((mod: any) => {
        setPostContent(() => mod.default);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [slug]);

  if (!post) return <Navigate to="/blog" replace />;

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
            กลับ Blog
          </Link>
          <Link to="/" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
            {personalInfo.name}
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Tags */}
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

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-snug">{post.title}</h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-10 pb-10 border-b border-gray-100">
          <span>
            {new Date(post.date).toLocaleDateString("th-TH", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </span>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400">กำลังโหลด...</div>
        ) : PostContent ? (
          <div className="prose prose-gray prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-p:text-gray-600 prose-p:leading-relaxed
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-pre:bg-gray-900 prose-pre:text-gray-100
            prose-blockquote:border-l-blue-400 prose-blockquote:text-gray-500
            prose-strong:text-gray-900
            prose-ul:text-gray-600 prose-ol:text-gray-600">
            <PostContent />
          </div>
        ) : (
          <p className="text-gray-400 text-center py-20">ไม่พบบทความ</p>
        )}

        {/* Back link */}
        <div className="mt-16 pt-10 border-t border-gray-100">
          <Link
            to="/blog"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            ดูบทความทั้งหมด
          </Link>
        </div>
      </article>
    </div>
  );
}
