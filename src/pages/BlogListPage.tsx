import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { ArrowLeft, Clock, Tag, Loader2 } from "lucide-react";
import { personalInfo } from "@/data/content";
import { sanityClient, ALL_POSTS_QUERY, urlFor } from "@/lib/sanity";
import type { SanityPost } from "@/types/blog";

export function BlogListPage() {
  const [posts, setPosts] = useState<SanityPost[]>([]);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: "Blog",
    description:
      "บทความเกี่ยวกับ Tech, Blockchain, Data Science และประสบการณ์ส่วนตัวของ Anantasak Charoensuk",
    url: "https://anantasak.dev/blog",
  });

  useEffect(() => {
    sanityClient
      .fetch<SanityPost[]>(ALL_POSTS_QUERY)
      .then((data) => setPosts(data ?? []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            กลับหน้าหลัก
          </Link>
          <span className="text-sm font-medium text-gray-900">{personalInfo.name}</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog</h1>
        <p className="text-gray-500 mb-12">
          แชร์ความคิด ประสบการณ์ และสิ่งที่เรียนรู้ระหว่างทาง
        </p>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            กำลังโหลด...
          </div>
        )}

        {/* Post List */}
        {!loading && (
          <div className="space-y-8">
            {posts.map((post) => (
              <Link
                key={post._id}
                to={`/blog/${post.slug}`}
                className="group block overflow-hidden border border-gray-100 rounded-2xl bg-white hover:border-gray-300 hover:shadow-md transition-all"
              >
                {post.coverImage && (
                  <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                    <img
                      src={urlFor(post.coverImage).width(1200).height(675).fit("crop").url()}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                )}

                <div className="p-6">
                {/* Tags */}
                {post.tags?.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mb-3">
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
                <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{post.description}</p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  {post.publishedAt && (
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  )}
                  {post.readTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  )}
                </div>
                </div>
              </Link>
            ))}

            {posts.length === 0 && (
              <p className="text-gray-400 text-center py-20">ยังไม่มีบทความ — เร็วๆ นี้!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
