import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
}

export function useSEO({ title, description, url, image }: SEOProps) {
  useEffect(() => {
    const siteTitle = `${title} | Anantasak Charoensuk`;
    const pageUrl = url || window.location.href;
    const pageImage =
      image ||
      "https://res.cloudinary.com/duei21aup/image/upload/v1770006598/Untitled_design_3_urwks7.jpg";

    // Title
    document.title = siteTitle;

    // Helper to set meta tag
    const setMeta = (selector: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        const attr = selector.includes("property=") ? "property" : "name";
        const val = selector.match(/["']([^"']+)["']/)?.[1] || "";
        el.setAttribute(attr, val);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', siteTitle);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', pageUrl);
    setMeta('meta[property="og:image"]', pageImage);
    setMeta('meta[name="twitter:title"]', siteTitle);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="twitter:image"]', pageImage);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", pageUrl);

    // Reset on unmount
    return () => {
      document.title = "Anantasak Charoensuk | Project Management & Tech Entrepreneur";
    };
  }, [title, description, url, image]);
}
