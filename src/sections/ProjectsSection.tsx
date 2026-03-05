import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BlogPostCard } from "@/components/BlogPostCard";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2 } from "lucide-react";
import { sanityClient, LATEST_POSTS_QUERY } from "@/lib/sanity";
import type { SanityPost } from "@/types/blog";

export function ProjectsSection() {
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
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
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
              BLOG
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
              My Blog
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="default"
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4"
              asChild
            >
              <a href="/blog" className="flex items-center gap-2">
                Blog ทั้งหมด
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Blog Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            กำลังโหลด...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {posts.length === 0 ? (
              <p className="text-sm text-gray-400 col-span-2 text-center py-8">ยังไม่มีบทความ — เร็วๆ นี้!</p>
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
