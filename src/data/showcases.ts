export interface ShowcaseItem {
  slug: string;
  title: string;
  category: string;
  summary: string;
  summaryEn: string;
  overview: string;
  overviewEn: string;
  focus: string;
  focusEn: string;
  stack: string[];
  highlights: string[];
  highlightsEn: string[];
  coverImage: string;
  gallery: string[];
  liveDemoPath: string;
  sourceFolder: string;
}

const baanRuamTalayCover = new URL("../../บ้านรวมทะเล/Visual feed Photo/3.jpg", import.meta.url).href;
const baanRuamTalayGalleryOne = new URL("../../บ้านรวมทะเล/Visual feed Photo/1.jpg", import.meta.url).href;
const baanRuamTalayGalleryTwo = new URL("../../บ้านรวมทะเล/Visual feed Photo/2.jpg", import.meta.url).href;
const baanRuamTalayGalleryThree = new URL("../../บ้านรวมทะเล/Visual feed Photo/GIF.gif", import.meta.url).href;
const demoAppCover = new URL("../../demo-app/Visual feed Photo/1.jpg", import.meta.url).href;
const demoAppGalleryOne = new URL("../../demo-app/Visual feed Photo/GIF.gif", import.meta.url).href;
const demoAppGalleryTwo = new URL("../../demo-app/Visual feed Photo/2.jpg", import.meta.url).href;
const demoAppGalleryThree = new URL("../../demo-app/Visual feed Photo/3.jpg", import.meta.url).href;

export const showcases: ShowcaseItem[] = [
  {
    slug: "chatbot-showcase",
    title: "ChatBot ShowCase",
    category: "Show Case 01",
    summary:
      "Interactive AI commerce app ที่ลองเล่นได้จริง พร้อม mock chat, catalog carousel, Google Sheets sync และ automation flow ในประสบการณ์เดียว",
    summaryEn:
      "An interactive AI commerce app with a hands-on demo experience, including mock chat, a catalog carousel, Google Sheets sync, and automation flows in one place.",
    overview:
      "Show case นี้เป็น interactive app สำหรับสาธิตการทำงานของ AI commerce chatbot ด้วยข้อมูล demo ที่ sanitize แล้ว ผู้ชมสามารถกดทดลอง scenario จริงเพื่อเข้าใจ flow ตั้งแต่การคุยกับลูกค้า การแนะนำสินค้า การ sync ข้อมูล ไปจนถึง automation ข้ามหลายแพลตฟอร์ม",
    overviewEn:
      "This showcase is an interactive app that demonstrates an AI commerce chatbot using sanitized demo data. Viewers can try realistic scenarios to understand the full flow, from customer conversations and product recommendations to data syncing and cross-platform automation.",
    focus: "AI Commerce Automation",
    focusEn: "AI Commerce Automation",
    stack: ["React", "Tailwind CSS", "n8n", "Google Sheets", "Messenger", "LINE", "Telegram"],
    highlights: [
      "Interactive app ที่เปิดให้กดทดลอง scenario จริงได้ทันที",
      "Interactive mock chat simulation เพื่อเล่าประสบการณ์คุยกับลูกค้าแบบเห็นภาพ",
      "Google Sheets style data sync demo สำหรับอธิบายการเชื่อมข้อมูลหลังบ้าน",
      "Catalog carousel showcase สำหรับนำเสนอสินค้าแบบเลื่อนดูง่าย",
      "Multi-platform automation overview ครอบคลุม Facebook, Instagram, Telegram และ LINE",
    ],
    highlightsEn: [
      "An interactive app that lets viewers try realistic scenarios immediately.",
      "A mock chat simulation that clearly demonstrates customer conversation flows.",
      "A Google Sheets-style sync demo that explains back-office data integration.",
      "A catalog carousel showcase for browsing and presenting products more clearly.",
      "A multi-platform automation overview covering Facebook, Instagram, Telegram, and LINE.",
    ],
    coverImage: baanRuamTalayCover,
    gallery: [
      baanRuamTalayCover,
      baanRuamTalayGalleryOne,
      baanRuamTalayGalleryTwo,
      baanRuamTalayGalleryThree,
    ],
    liveDemoPath: "/showcase/chatbot-showcase/live",
    sourceFolder: "Interactive Commerce Demo",
  },
  {
    slug: "syncsocial-demo",
    title: "SyncSocial Demo App",
    category: "Show Case 02",
    summary:
      "Demo social posting dashboard สำหรับจำลองการเชื่อมหลายแพลตฟอร์ม สร้างโพสต์ พรีวิวคอนเทนต์ และดู analytics ในหน้าเดียว",
    summaryEn:
      "A demo social publishing dashboard that simulates multi-platform account connections, post creation, content previews, and analytics in a single workflow.",
    overview:
      "Show case นี้ต่อยอดจาก demo-app ซึ่งเป็น social media dashboard แบบ mock flow ใช้สำหรับอธิบายประสบการณ์เชื่อมบัญชี สร้างโพสต์หลายช่องทาง สลับ preview ตามแพลตฟอร์ม และดู analytics โดยไม่ต้องล็อกอินหรือเชื่อม OAuth จริง",
    overviewEn:
      "This showcase extends the demo-app into a mock social media dashboard for presenting account connection flows, multi-channel post creation, platform-specific previews, and analytics without requiring login or real OAuth connections.",
    focus: "Social Media Publishing Dashboard",
    focusEn: "Social Media Publishing Dashboard",
    stack: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Analytics UI", "Multi-platform Preview"],
    highlights: [
      "เชื่อมต่อ social accounts แบบ demo ได้หลายแพลตฟอร์มใน flow เดียว",
      "สร้างโพสต์พร้อม AI-assisted caption presets และ media mock-up",
      "สลับ preview ระหว่าง Facebook, Instagram, X, TikTok และ LINE ได้ทันที",
      "มี analytics dashboard และ posting history สำหรับเล่า product flow ได้ครบ",
      "ออกแบบเป็น standalone demo ที่พร้อมใช้คุยงานหรือ present product concept",
    ],
    highlightsEn: [
      "Connect multiple social accounts in a single demo flow.",
      "Create posts with AI-assisted caption presets and media mock-ups.",
      "Switch previews instantly across Facebook, Instagram, X, TikTok, and LINE.",
      "Show a complete product story with analytics and posting history.",
      "Designed as a standalone demo for sales conversations and product presentations.",
    ],
    coverImage: demoAppCover,
    gallery: [
      demoAppCover,
      demoAppGalleryOne,
      demoAppGalleryTwo,
      demoAppGalleryThree,
    ],
    liveDemoPath: "/showcase/syncsocial-demo/live",
    sourceFolder: "demo-app",
  },
];
