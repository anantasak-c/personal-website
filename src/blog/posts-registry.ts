export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readTime: string;
}

// เพิ่มบทความใหม่ที่นี่ — แล้วสร้างไฟล์ src/blog/{slug}.mdx ควบคู่กัน
export const posts: PostMeta[] = [
  {
    slug: "turning-knowledge-into-action",
    title: "Turning Knowledge into Action: บทเรียนจาก 3 ปีในวงการ Tech",
    date: "2026-03-04",
    description: "สิ่งที่เรียนรู้จากการเปลี่ยนสายจากรัฐศาสตร์มาสู่ Tech, Data Science และ Blockchain — และวิธีที่ผมลงมือทำจริงทุกครั้งที่เรียนรู้สิ่งใหม่",
    tags: ["Personal", "Tech", "Career"],
    readTime: "5 min read",
  },
  {
    slug: "blockchain-beginner-guide",
    title: "Blockchain สำหรับคนทั่วไป: เข้าใจในแบบที่ไม่ต้องเป็น Developer",
    date: "2026-02-15",
    description: "อธิบาย Blockchain, Smart Contract และ Web3 ให้เข้าใจง่ายแบบที่ไม่ต้องรู้โค้ดเลยสักบรรทัด",
    tags: ["Blockchain", "Web3", "Education"],
    readTime: "7 min read",
  },
];

// เรียงตาม date ล่าสุดก่อน
export const sortedPosts = [...posts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);
