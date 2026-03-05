// Personal Information
export const personalInfo = {
  name: "Anantasak Charoensuk",
  nickname: "Anantasak",
  title: "Project Management & Tech Entrepreneur",
  subtitle: "Personal website of Anantasak Charoensuk",
  tagline: "My Journey, Sharing Knowledge Along the Way",
  passion: "A lifelong learner navigating the intersection of finance, technology, and building impactful products.",
  location: "Bangkok, Thailand",
  email: "anantasuk000@gmail.com",
  avatar: "https://res.cloudinary.com/duei21aup/image/upload/v1770006598/Untitled_design_3_urwks7.jpg",
};

// Social Links
export const socialLinks = [
  { name: "LinkedIn", icon: "Linkedin", url: "https://linkedin.com" },
  { name: "GitHub", icon: "Github", url: "https://github.com" },
  { name: "Facebook", icon: "Facebook", url: "https://facebook.com" },
  { name: "Instagram", icon: "Instagram", url: "https://instagram.com" },
  { name: "Email", icon: "Mail", url: "mailto:anantasuk000@gmail.com" },
];

// Role Badges
export const roleBadges = [
  { label: "Tech Entrepreneur", icon: "💡", color: "bg-yellow-100 text-yellow-700" },
  { label: "Content creator", icon: "🎨", color: "bg-blue-100 text-blue-700" },
  { label: "Generalist", icon: "🧘‍♂️", color: "bg-purple-100 text-purple-700" },
  { label: "AI Engineer", icon: "🤖", color: "bg-emerald-100 text-emerald-700" },
];

// Skills
export const skills = [
  { label: "Management", icon: "👔", color: "bg-gray-100 text-gray-700" },
  { label: "3 Years in Tech", icon: "💼", color: "bg-orange-100 text-orange-700" },
  { label: "Entrepreneurship", icon: "🏢", color: "bg-blue-100 text-blue-700" },
  { label: "Low-Code Lover", icon: "💻", color: "bg-purple-100 text-purple-700" },
  { label: "Product Design", icon: "🎨", color: "bg-pink-100 text-pink-700" },
  { label: "Data Analysis", icon: "📊", color: "bg-green-100 text-green-700" },
  { label: "Blockchain", icon: "⛓️", color: "bg-indigo-100 text-indigo-700" },
  { label: "AI & Automation", icon: "🤖", color: "bg-cyan-100 text-cyan-700" },
  { label: "Community Management", icon: "📱", color: "bg-teal-100 text-teal-700" },
  { label: "Project Management", icon: "🎯", color: "bg-red-100 text-red-700" },
];

// Work History
export const workHistory = [
  {
    company: "NOVARISE ASIA",
    role: "Project Management & Business Development",
    duration: "2025 - Present",
    status: "present",
    description: `NOVARISE ASIA
Project Management & Business Development · 2025 - Present

present
Currently
Who We Are — Novarise was founded by seasoned entrepreneurs from Korea and Thailand with executive experience across ecommerce, trade, finance, communications, and fast-moving consumer goods.

In partnership with our global network, we help companies grow through strategy, localization, and capital.

We are a diverse team with satellite offices in Wisconsin, Seoul, and Bangkok.

Website: https://www.novariseinvestment.com/`,
    logo: "/images/NOVARISE ASIA.jpg",
    logoColor: "bg-transparent",
  },
  {
    company: "AI Automation Service",
    role: "Fractional Builder",
    duration: "2025 - Present",
    status: "present",
    description: `AI Automation Service
Fractional Builder · 2025 - Present

present
Currently
Providing cutting-edge AI and automation solutions tailored for SMEs and enterprises.

Focus on interactive chatbots, full training courses, responsive landing pages, and DApps that streamline workflows.

💼 Hire me on Fastwork: https://fastwork.co/user/an8ntasak?source=web_marketplace_profile-menu_profile
🌐 Connect on Facebook: https://www.facebook.com/m.anan.tasuk/`,
    logo: "/images/AI Automation Service.jpg",
    logoColor: "bg-transparent",
  },
  {
    company: "Working & Holiday",
    role: "Melbourne, Australia",
    duration: "Apr 2023 - Sep 2024",
    status: "past",
    description: `International working and cultural exchange experience in Melbourne, Australia.

Apr 2023 - Sep 2024`,
    logo: "/images/Working & Holiday.jpg",
    logoColor: "bg-transparent",
  },
  {
    company: "Faculty of Social Sciences Student Club",
    role: "President",
    duration: "Apr 2022 - Mar 2023",
    status: "past",
    description: `Faculty of Social Sciences Student Club
President · Apr 2022 - Mar 2023

past
Previously
Led a student club managing a substantial budget and developing a comprehensive marketing plan to increase student engagement.

FB: https://www.facebook.com/SmoSoc.KU/photos/a.397991003637658/4219900268113360/?type=3`,
    logo: "/images/Faculty of Social Sciences Student Club.jpg",
    logoColor: "bg-transparent",
  },
  {
    company: "KU Blockchain Society",
    role: "Activities Leader",
    duration: "May 2022",
    status: "past",
    description: `KU Blockchain Society
Activities Leader · May 2022

past
Previously
Activities leader for the first generation, responsible for planning club programming and marketing at Kasetsart University.

IG: https://www.instagram.com/ku_blockchain/?hl=en`,
    logo: "/images/KU Blockchain Society.jpg",
    logoColor: "bg-transparent",
  },
  {
    company: "HackerTown (GameFi)",
    role: "Content Marketing",
    duration: "Oct 2021 - Feb 2022",
    status: "past",
    description: `Led community engagement on Facebook, Telegram, and Discord, including bot management and SEO for web pages, campaign planning, and marketing initiatives.`,
    logo: "/images/HackerTown (GameFi).jpg",
    logoColor: "bg-transparent",
  },
  {
    company: "KU Startup Club 2021",
    role: "Vice President",
    duration: "Jan 2021 - Apr 2022",
    status: "past",
    description: `KU Startup Club 2021
Vice President · Jan 2021 - Apr 2022

past
Previously
Project manager of Kasetsart University Startup League 2021, overseeing competition management including budget allocation, speaker coordination, and mentorship.

IG: https://www.instagram.com/ku_startup/?hl=en`,
    logo: "/images/KU Startup Club 2021.jpg",
    logoColor: "bg-transparent",
  },
];

// Blog posts (homepage featured)
export interface BlogPostMeta {
  title: string;
  slug: string;
  excerpt: string;
  wordCount: number;
}

export const blogPosts: BlogPostMeta[] = [
  {
    title: "Clone Experts with NotebookLM",
    slug: "clone-experts-with-notebooklm",
    excerpt:
      "Clone Experts with NotebookLM ถอดวิชา YouTuber 300 คลิป: สร้าง AI ผู้ช่วยส่วนตัวด้วย NotebookLM (Step-by-Step) ช่วงนี้ใครๆ ก็เริ่มหันมาสร้าง Personal Bot ของตัวเองกันเยอะมาก ไม่ว่าจะเอาไว้ช่วยเทรด ช่วยวิเคราะห์งาน หรือเป็นที่ปรึกษาเฉพาะด้าน แต่ปัญหาโลกแตกที่นักพัฒนาหรือคนทำ AI ต้องเจอคือ… “เราจะเอา Data เฉพาะทางเจ๋งๆ จากไหนมาป้อนให้บอท?” ก็เลยลองวางระบบรวบรวมข้อมูลแบบจัดเต็ม…",
    wordCount: 460,
  },
  {
    title: "การใช้ Chat Bot แอดมินใน SME",
    slug: "การใช-chat-bot-แอดมนใน-sme",
    excerpt:
      "การใช้ Chat Bot แอดมินใน SME ขนาดเล็ก ค่าใช้จ่ายในการใช้ AI แทนมนุษย์ยังแพงอยู่ไหม? เป็นคำถามที่ผมสงสัยขึ้น เมื่อรุ่นพี่ที่รู้จักกันบ่นว่ากำลังปวดหัวกับการหาคนมาตอบแชทลูกค้า เลยยุไปว่า “ทำไมไม่ลองใช้ AI ดู” และทดลองออกแบบ workflow ที่ผสาน Chatbot + CRM + ระบบแจ้งเตือน เพื่อให้ธุรกิจเล็กๆ ไม่ต้องจ้างแอดมินหลายคนแต่ยังดูแลลูกค้าได้ครบ…",
    wordCount: 336,
  },
  {
    title: "ผมทำแอพ รายรับ-รายจ่าย ที่ทำมาแค่เพื่อผม",
    slug: "ผมทำแอพ-รายรบ-รายจาย-ททำมาแคเพอผม",
    excerpt:
      "ผมทำแอพ รายรับ-รายจ่าย ที่ทำมาแค่เพื่อผม สร้าง n8n ให้เป็นผู้ช่วยส่วนตัวของคุณ ทำแอปรายรับ-รายจ่ายเองดีกว่าใช้ของคนอื่น ไม่ใช่เพราะฟีเจอร์อลังการ แต่เพราะมันจะมีแค่สิ่งที่เราใช้จริงๆ ผมอินเรื่องการเงินมากและลองใช้แอพสารพัดแบรนด์ สุดท้ายเลยลงมือสร้าง workflow บน n8n ให้คอยบันทึกรายรับรายจ่าย แจ้งเตือนยอดคงเหลือ ใส่กฎระบบซ้อนกันได้ตามสไตล์…",
    wordCount: 249,
  },
  {
    title: "สร้าง The Strategic Navigator ผู้ช่วย AI วิเคราะห์คริปโตส่วนตัวด้วย n8n",
    slug: "สราง-the-strategic-navigator-ผชวย-ai-วเคราะหครปโตสวนตวดวย-n8n",
    excerpt:
      "สร้าง The Strategic Navigator : ผู้ช่วย AI วิเคราะห์คริปโตส่วนตัวด้วย n8n โปรเจกต์ที่เริ่มจากการสนใจ Openclaw แต่พบว่าแค่ n8n ก็เพียงพอแล้ว เป้าหมายคือทำระบบช่วยวิเคราะห์ราคาและวางแผนเทรดส่วนตัว มี workflow จัดการข้อมูล on-chain, วิเคราะห์สัญญาณเทคนิค, ส่งสรุปเข้า Telegram พร้อม action plan ให้ผมตัดสินใจเทรดได้ไวขึ้น…",
    wordCount: 673,
  },
];

// Tech Stack
export const techStack = {
  languages: [
    { name: "Python", description: "Main language for data analysis and automation", icon: "🐍", main: true },
    { name: "JavaScript", description: "Web development and scripting", icon: "📜" },
    { name: "SQL", description: "Database queries and management", icon: "🗄️" },
    { name: "R", description: "Statistical analysis", icon: "📊" },
    { name: "Solidity", description: "Smart contract development", icon: "⛓️" },
  ],
  business: [
    { name: "n8n", description: "Workflow automation platform", icon: "⚡" },
    { name: "Figma", description: "UI/UX design and prototyping", icon: "🎨" },
    { name: "Looker", description: "Data visualization", icon: "📈" },
    { name: "Google Sheets", description: "Spreadsheet automation", icon: "📑" },
  ],
  analytics: [
    { name: "Tableau", description: "Business intelligence and analytics", icon: "📊" },
    { name: "Google Analytics", description: "Web analytics", icon: "📈" },
    { name: "Pandas", description: "Data manipulation library", icon: "🐼" },
  ],
};

// Life Goal
export const lifeGoal = {
  title: "Life Goal",
  quote: "Turning knowledge into action. เปลี่ยนความรู้ใหม่ๆ ให้เป็นการลงมือทำจริง พร้อมเปิดรับความท้าทายเพื่อขยายขอบเขตความสามารถของตนเองในทุกวัน",
};

// Education
export const education = {
  school: "Kasetsart University",
  degree: "Bachelor of Political Science",
  major: "Public Administration",
  highlight: "เปลี่ยนสายจากรัฐศาสตร์มาสู่ Tech & Data Science ผ่าน Passionate Learner",
};

// External integrations
export const mediumConfig = {
  username: "anantasuk000",
  feedUrl: "https://medium.com/feed/@anantasuk000",
  profileUrl: "https://medium.com/@anantasuk000",
};
