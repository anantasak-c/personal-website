export type Lang = "th" | "en";

export const translations: Record<Lang, Record<string, string>> = {
  th: {
    // Hero
    "hero.greeting": "สวัสดี ผม",
    "hero.iam": "ผมเป็น",
    // Skills
    "skills.label": "ทักษะ",
    "skills.title": "ความสามารถ",
    // About / Life Goal
    "about.label": "เกี่ยวกับ",
    "about.lifeGoal": "เป้าหมายชีวิต",
    "about.education": "การศึกษา",
    // Work History
    "work.label": "ประสบการณ์",
    "work.title": "ประวัติการทำงาน",
    "work.viewAll": "ดูทั้งหมด",
    "work.showLess": "แสดงน้อยลง",
    // Blog
    "blog.label": "บล็อก",
    "blog.title": "บทความของฉัน",
    "blog.all": "บทความทั้งหมด",
    "blog.loading": "กำลังโหลด...",
    "blog.empty": "ยังไม่มีบทความ — เร็วๆ นี้!",
    "blog.new": "บทความใหม่",
    "blog.readMore": "อ่านต่อ",
    "blog.article": "บทความ",
    "blog.back": "กลับ Blog",
    "blog.backAll": "ดูบทความทั้งหมด",
    "blog.notFound": "ไม่พบบทความ",
    "blog.backHome": "กลับหน้า Blog",
    "blog.noContent": "บทความนี้ยังไม่มีเนื้อหา",
    // Tech Stack
    "tech.label": "เทคโนโลยี",
    "tech.title": "เครื่องมือที่ใช้",
    "tech.languages": "ภาษาโปรแกรม",
    "tech.business": "เครื่องมือธุรกิจ",
    "tech.analytics": "วิเคราะห์ข้อมูล",
    // Footer
    "footer.rights": "สงวนลิขสิทธิ์",
    "footer.built": "สร้างด้วย React + Tailwind CSS",
    // Language
    "lang.switch": "EN",
  },
  en: {
    // Hero
    "hero.greeting": "Hi, I'm",
    "hero.iam": "I am",
    // Skills
    "skills.label": "SKILLS",
    "skills.title": "Capabilities",
    // About / Life Goal
    "about.label": "ABOUT",
    "about.lifeGoal": "Life Goal",
    "about.education": "Education",
    // Work History
    "work.label": "EXPERIENCE",
    "work.title": "Work History",
    "work.viewAll": "View All",
    "work.showLess": "Show Less",
    // Blog
    "blog.label": "BLOG",
    "blog.title": "My Blog",
    "blog.all": "All Posts",
    "blog.loading": "Loading...",
    "blog.empty": "No posts yet — coming soon!",
    "blog.new": "New Post",
    "blog.readMore": "Read More",
    "blog.article": "Article",
    "blog.back": "Back to Blog",
    "blog.backAll": "View all posts",
    "blog.notFound": "Post not found",
    "blog.backHome": "Back to Blog",
    "blog.noContent": "This post has no content yet",
    // Tech Stack
    "tech.label": "TECHNOLOGY",
    "tech.title": "Tech Stack",
    "tech.languages": "Languages",
    "tech.business": "Business Tools",
    "tech.analytics": "Analytics",
    // Footer
    "footer.rights": "All rights reserved",
    "footer.built": "Built with React + Tailwind CSS",
    // Language
    "lang.switch": "TH",
  },
};
