import { useEffect, useState } from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { EditorialLayout } from "@/components/editorial/EditorialLayout";
import { ReadingProgress } from "@/components/editorial/ReadingProgress";
import { fallbackNotes } from "@/data/notes";
import { POST_BY_SLUG_QUERY, sanityClient, urlFor } from "@/lib/sanity";
import type { SanityPost } from "@/types/blog";
import { useSEO } from "@/hooks/useSEO";
import "highlight.js/styles/github.css";

const portableTextComponents: Partial<PortableTextComponents> = {
  types: {
    image: ({ value }: { value: { asset: unknown; alt?: string; caption?: string } }) => (
      <figure className="my-10">
        <img
          src={urlFor(value.asset).width(1200).url()}
          alt={value.alt ?? ""}
          className="w-full rounded-[1.5rem] border border-black/[0.08] object-cover shadow-sm"
        />
        {value.caption ? (
          <figcaption className="mt-3 text-center text-sm text-[#86868b]">{value.caption}</figcaption>
        ) : null}
      </figure>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value?.href ?? "#"}
        target="_blank"
        rel="noreferrer"
        className="text-[#0071e3] underline underline-offset-4 hover:text-[#0055b3]"
      >
        {children}
      </a>
    ),
  },
};

export function BlogPostPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const fallback = fallbackNotes.find((note) => note.slug === slug);
  const hasSanityConfig = Boolean(import.meta.env.VITE_SANITY_PROJECT_ID);
  const [post, setPost] = useState<SanityPost | null>(fallback ?? null);
  const [loading, setLoading] = useState(hasSanityConfig);

  useSEO({
    title: post?.title ?? "Note",
    description: post?.description ?? "A note from ANAN.",
    url: `https://anantasak.com/notes/${slug}`,
  });

  useEffect(() => {
    if (!hasSanityConfig || !slug) return;
    let active = true;
    sanityClient
      .fetch<SanityPost>(POST_BY_SLUG_QUERY, { slug })
      .then((data) => {
        if (active && data) setPost(data);
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [hasSanityConfig, slug]);

  if (loading && !post)
    return (
      <EditorialLayout>
        <div className="mx-auto max-w-3xl px-5 py-24">
          <div className="h-4 w-32 animate-pulse rounded bg-black/[0.06]" />
          <div className="mt-8 h-16 animate-pulse rounded bg-black/[0.06]" />
        </div>
      </EditorialLayout>
    );

  if (!post)
    return (
      <EditorialLayout>
        <div className="mx-auto max-w-3xl px-5 py-28 text-center">
          <h1 className="text-4xl font-semibold text-[#1d1d1f]">Note not found.</h1>
          <Link to="/notes" className="mt-6 inline-flex items-center gap-2 text-[#0071e3]">
            <ArrowLeft className="h-4 w-4" /> Back to Notes
          </Link>
        </div>
      </EditorialLayout>
    );

  return (
    <EditorialLayout>
      <ReadingProgress />
      <article
        lang={post.language === "TH" ? "th" : "en"}
        className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24"
      >
        <Link
          to="/notes"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#86868b] transition hover:text-[#0071e3]"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Notes
        </Link>
        {post.coverImage ? (
          <img
            src={urlFor(post.coverImage).width(1400).height(800).fit("crop").url()}
            alt={post.title}
            className="mt-10 aspect-[16/9] w-full rounded-[2rem] border border-black/[0.08] object-cover shadow-lg"
          />
        ) : null}
        <header className="mt-10 border-b border-black/[0.08] pb-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#0071e3]">
            {post.contentType ?? "Article"} · {post.language ?? "TH"}
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] text-[#1d1d1f] sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#6e6e73] sm:text-xl">{post.description}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#86868b]">
            <span>
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Archive"}
            </span>
            {post.readTime ? <span>· {post.readTime}</span> : null}
          </div>
        </header>
        {post.body ? (
          <div className="prose prose-lg mt-12 max-w-none prose-headings:tracking-[-0.03em] prose-headings:text-[#1d1d1f] prose-p:leading-relaxed prose-p:text-[#434346] prose-a:text-[#0071e3] prose-pre:border prose-pre:border-black/[0.08] prose-pre:bg-[#1d1d1f] prose-pre:text-white">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-black/[0.08] bg-[#f5f5f7] p-6 text-sm leading-7 text-[#6e6e73]">
            <p>
              This archive entry is available from the local fallback while the full Sanity document
              is unavailable. The original summary remains visible so the article is not lost from
              Notes.
            </p>
          </div>
        )}
        <div className="mt-16 border-t border-black/[0.08] pt-8">
          <a
            href="https://www.facebook.com/m.anan.tasuk/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0071e3] hover:underline"
          >
            Follow build updates on Facebook <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </article>
    </EditorialLayout>
  );
}
