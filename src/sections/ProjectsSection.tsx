import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BlogPostCard } from "@/components/BlogPostCard";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2 } from "lucide-react";
import { sanityClient, LATEST_POSTS_QUERY } from "@/lib/sanity";
import type { SanityPost } from "@/types/blog";
import { useLang } from "@/i18n/LanguageContext";

export function ProjectsSection() {
  const { t } = useLang();
  const [posts, setPosts] = useState<SanityPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch<SanityPost[]>(LATEST_POSTS_QUERY, { limit: 4 })
      .then((data) => setPosts(data ?? []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative SVG */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute -top-6 left-1/3 w-28 h-28 animate-float-slow opacity-10" viewBox="0 0 100 100">
          <path d="M50 5 L95 27.5 L95 72.5 L50 95 L5 72.5 L5 27.5 Z" fill="none" stroke="#818cf8" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              {t("blog.label")}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold shimmer-text mt-1">
              {t("blog.title")}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="default"
              size="sm"
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg px-4 shadow-md shadow-indigo-200/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-300/50"
              asChild
            >
              <a href="/blog" className="flex items-center gap-2">
                {t("blog.all")}
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Blog Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            {t("blog.loading")}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {posts.length === 0 ? (
              <p className="text-sm text-gray-400 col-span-2 text-center py-8">{t("blog.empty")}</p>
            ) : (
              posts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <BlogPostCard post={post} />
                </motion.div>
              ))
            )}
          </div>
        )}

      </div>
    </section>
  );
}
