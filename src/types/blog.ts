export interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  publishedAt: string;
  readTime: string;
  coverImage?: {
    _type: "image";
    asset: { _ref: string; _type: "reference" };
    hotspot?: { x: number; y: number };
  };
  body?: PortableTextBlock[];
}

export interface PortableTextBlock {
  _key: string;
  _type: string;
  children?: Array<{
    _key: string;
    _type: string;
    marks?: string[];
    text?: string;
  }>;
  markDefs?: Array<{
    _key: string;
    _type: string;
    href?: string;
  }>;
  style?: string;
  level?: number;
  listItem?: string;
  asset?: { _ref: string; _type: "reference" };
  alt?: string;
  caption?: string;
}
