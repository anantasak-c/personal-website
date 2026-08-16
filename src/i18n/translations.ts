export type Lang = "th" | "en";

export const translations: Record<Lang, Record<string, string>> = {
  th: {
    // Navigation
    "nav.work": "ผลงาน",
    "nav.notes": "บันทึก & บทความ",
    "nav.about": "เกี่ยวกับ",
    "nav.resume": "ประวัติการทำงาน",
    "nav.talk": "ติดต่อ / พูดคุย",

    // Hero
    "hero.status": "เปิดรับโอกาสร่วมงานด้าน AI Product & Engineering",
    "hero.signature": "ANAN · Practical AI Product Builder",
    "hero.tagline": "มุ่งเน้นการเปลี่ยนระบบที่ซับซ้อน, Multi-Agent Orchestration และ LLM Workflow ให้กลายเป็นผลิตภัณฑ์ที่เข้าใจง่าย ปลอดภัย และใช้งานได้จริง",
    "hero.explore": "ดูผลงานทั้งหมด",
    "hero.copyEmail": "คัดลอกอีเมล",
    "hero.copied": "คัดลอกอีเมลแล้ว!",

    // Specs Pillars
    "spec.flagships.title": "5 โปรเจกต์หลักที่พัฒนาขึ้น",
    "spec.flagships.sub": "Production & Prototype",
    "spec.orchestration.title": "Agent Orchestration",
    "spec.orchestration.sub": "Codex, Neon & Next.js",
    "spec.pipelines.title": "Deterministic Pipelines",
    "spec.pipelines.sub": "n8n & Multi-Channel",
    "spec.human.title": "Human-in-the-Loop",
    "spec.human.sub": "ความปลอดภัย & Audit Trail",

    // Skills Marquee
    "skills.label": "ทักษะและความเชี่ยวชาญ",
    "skills.title": "Tons of skill that I have",
    "skills.subtitle": "การผสานทักษะระหว่าง Business Analysis, AI System Design, Automation และ Hands-on Development",

    // Featured Work
    "work.featuredBadge": "โปรเจกต์ไฮไลต์ · 01",
    "work.featuredTitle": "โปรเจกต์ที่กำลังพัฒนา",
    "work.fullStory": "อ่านรายละเอียดโปรเจกต์",
    "work.flowTitle": "ลำดับการทำงานหลัก (Product Flow)",
    "work.readStory": "ดูรายละเอียด",
    "work.interactiveNotice": "จำลองการแสดงผลบน MacBook Pro",
    "work.exploreNotice": "ขยับเมาส์เพื่อเปลี่ยนมุมมองแบบ 3D",
    "work.nudge": "สะกิด (Nudge 3D)",
    "work.selectedTitle": "ผลงานและโปรเจกต์คัดสรร",
    "work.selectedSubtitle": "Selected Work · 4 โปรเจกต์เพิ่มเติม",
    "work.viewAll": "ดูทั้ง 5 โปรเจกต์",

    // Notes Section
    "notes.tag": "บันทึกเชิงเทคนิค & บทเรียน",
    "notes.title": "บันทึกการพัฒนาและองค์ความรู้",
    "notes.viewAll": "ดูบันทึกทั้งหมด",
    "notes.allEntries": "รายการทั้งหมด",
    "notes.refreshing": "กำลังโหลดข้อมูล…",
    "notes.readNote": "อ่านบันทึก",
    "notes.pageTitle": "บันทึกการสร้าง การตัดสินใจเชิงระบบ และบทเรียนระหว่างทาง",
    "notes.pageSubtitle": "รวมบันทึกการทำงาน คู่มือทางเทคนิค และแนวคิดในการพัฒนา AI Product",

    // Contact Deck
    "contact.tag": "ติดต่อ & พูดคุย",
    "contact.title": "สนใจแลกเปลี่ยนมุมมอง หรือร่วมพัฒนาโปรเจกต์ AI ไปด้วยกัน",
    "contact.desc": "ยินดีพูดคุยและแลกเปลี่ยนความรู้ ทั้งโอกาสร่วมงานด้าน AI Product, การออกแบบสถาปัตยกรรมระบบ หรือการให้คำปรึกษาเชิงเทคนิคครับ",
    "contact.sendEmail": "ส่งอีเมลพูดคุย",
    "contact.copyLabel": "คัดลอกอีเมล: anantasak.business@gmail.com",

    // Footer
    "footer.title": "ANANTASAK CHAROENSUK · กรุงเทพฯ",
    "footer.desc": "เน้นการสร้าง AI Product ที่จับต้องได้, ระบบ Autonomous Agent และการตัดสินใจเชิงวิศวกรรมที่ตรวจสอบได้จริง",
    "footer.facebook": "ติดตามบน Facebook",

    // Detail Pages
    "workDetail.back": "กลับไปหน้ารวมผลงาน",
    "workDetail.role": "บทบาทหน้าที่:",
    "workDetail.problem": "โจทย์และความท้าทาย (The Problem)",
    "workDetail.built": "แนวทางการพัฒนาระบบ (What I Built)",
    "workDetail.outcome": "ผลลัพธ์และการทำงานจริง (Verified Outcome)",
    "workDetail.howItWorks": "การทำงานหลัก",
    "workDetail.stages": "ภาพรวมการทำงาน 3 ขั้นตอนหลัก",
    "workDetail.decisions": "การตัดสินใจเชิงสถาปัตยกรรม (Key Decisions)",
    "workDetail.decisionsSubtitle": "การเลือกโครงสร้างและเทคโนโลยีที่เหมาะสมกับระบบ",
    "workDetail.evidence": "หลักฐานและผลลัพธ์",
    "workDetail.whatChanged": "แผนการพัฒนาต่อ",
    "workDetail.nextStep": "สิ่งที่จะต่อยอดถัดไป",
    "workDetail.relatedNotes": "บันทึกทางเทคนิคที่เกี่ยวข้อง",
    "workDetail.decisionsOverTime": "ไทม์ไลน์การตัดสินใจเชิงระบบ",
    "workDetail.noRelatedNotes": "ยังไม่มีบันทึกที่เกี่ยวข้องกับโปรเจกต์นี้",
    "workDetail.discuss": "สนใจแลกเปลี่ยนความคิดเห็นเกี่ยวกับโปรเจกต์นี้?",

    // About Page
    "about.title": "ผมให้ความสำคัญกับการเปลี่ยนระบบที่ซับซ้อน ให้กลายเป็นสิ่งที่เข้าใจง่ายและใช้งานได้จริง",
    "about.location": "กรุงเทพฯ, ประเทศไทย · กำลังพัฒนาโปรเจกต์อย่างต่อเนื่อง",
    "about.p1": "ผมชื่อ อนันตศักดิ์ (อนันต์) ถนัดการทำงานที่เชื่อมโยงระหว่าง Product Thinking, Systems Orchestration, Automation Pipelines และการลงมือเขียนโค้ดจริง (Hands-on Engineering)",
    "about.p2": "ความตั้งใจหลักของผม คือการต่อยอดจาก 'คำสั่ง Prompt ทั่วไป' ให้กลายเป็น 'ผลิตภัณฑ์ซอฟต์แวร์ที่สมบูรณ์' มีโครงสร้าง Input ชัดเจน, จัดการ State ได้แม่นยำ และทำงานได้อย่างปลอดภัย",
    "about.p3": "พอร์ตโฟลิโอนี้รวบรวมผลงานที่ลงมือพัฒนาจริง โดยส่วน Selected Work แสดงภาพรวมและผลลัพธ์ของแต่ละโปรเจกต์ ส่วน Notes บันทึกการตัดสินใจเชิงเทคนิคและบทเรียนจากการสร้างระบบ",
    "about.pillar1": "พัฒนา AI Product ที่ใช้งานได้จริง",
    "about.pillar2": "ออกแบบ Flow ให้ชัดเจนก่อนลงฟีเจอร์",
    "about.pillar3": "บันทึกแนวคิดและแบ่งปันบทเรียน",
    "about.sayHello": "ทักทายพูดคุย",
    "about.viewResume": "ดูเรซูเม",

    // Resume Page
    "resume.title": "เรซูเม · สำหรับอ่านเท่านั้น",
    "resume.subtitle": "Practical AI Product Builder · Project Coordinator",
    "resume.profile": "ภาพรวม",
    "resume.profileDesc": "ทำงานร่วมระหว่าง Product Coordination, Automation Architecture และ Software Delivery โดยมุ่งเน้นการเปลี่ยนโจทย์ AI ที่ซับซ้อนให้กลายเป็นผลิตภัณฑ์ที่มีขั้นตอนชัดเจน ปลอดภัย และใช้งานได้จริงในชีวิตประจำวัน",
    "resume.experience": "ประสบการณ์ทำงาน",
    "resume.capabilities": "ทักษะและความสามารถ",
    "resume.education": "การศึกษา",
  },
  en: {
    // Navigation
    "nav.work": "Work",
    "nav.notes": "Notes",
    "nav.about": "About",
    "nav.resume": "Resume",
    "nav.talk": "Let's Talk",

    // Hero
    "hero.status": "Available for AI Product & Systems Engagements",
    "hero.signature": "ANAN · Practical AI Product Builder",
    "hero.tagline": "I transform complex business problems, autonomous agent workflows, and LLMs into reliable, deterministic products people can understand, use, and scale.",
    "hero.explore": "Explore Selected Work",
    "hero.copyEmail": "Copy Email",
    "hero.copied": "Email Copied!",

    // Specs Pillars
    "spec.flagships.title": "5 Flagship Builds",
    "spec.flagships.sub": "Production & Prototypes",
    "spec.orchestration.title": "Agent Orchestration",
    "spec.orchestration.sub": "Codex, Neon & Next.js",
    "spec.pipelines.title": "Deterministic Pipelines",
    "spec.pipelines.sub": "n8n & Multi-Channel",
    "spec.human.title": "Human-in-the-Loop",
    "spec.human.sub": "Safety & Audit Trails",

    // Skills Marquee
    "skills.label": "Skills & Fluencies",
    "skills.title": "Tons of skill that I have",
    "skills.subtitle": "A versatile blend of business analysis, AI solution design, automation, and tech execution.",

    // Featured Work
    "work.featuredBadge": "Featured Architecture · 01",
    "work.featuredTitle": "Currently Building",
    "work.fullStory": "Full Project Story",
    "work.flowTitle": "Key Product Flow",
    "work.readStory": "Read Story",
    "work.interactiveNotice": "Interactive 3D product object",
    "work.exploreNotice": "Move cursor to explore 3D tilt",
    "work.nudge": "Nudge",
    "work.selectedTitle": "Systems built for the real world.",
    "work.selectedSubtitle": "Selected Work · 04 More Stories",
    "work.viewAll": "View All 5 Projects",

    // Notes Section
    "notes.tag": "Knowledge & Process",
    "notes.title": "Build Notes & Guides",
    "notes.viewAll": "All Notes",
    "notes.allEntries": "entries",
    "notes.refreshing": "Refreshing…",
    "notes.readNote": "Read Note",
    "notes.pageTitle": "What I build, decide, and learn along the way.",
    "notes.pageSubtitle": "Build Notes, Guides, and Articles in Thai or English. The language belongs to each story—not to a site-wide mode.",

    // Contact Deck
    "contact.tag": "Start a Conversation",
    "contact.title": "Have a complex workflow worth making obvious?",
    "contact.desc": "I am open to full-time product roles, technical leadership, and strategic AI builds. Let's build something practical.",
    "contact.sendEmail": "Send Email",
    "contact.copyLabel": "Copy: anantasak.business@gmail.com",

    // Footer
    "footer.title": "ANANTASAK CHAROENSUK · Bangkok",
    "footer.desc": "Practical AI products, autonomous agent dispatchers, and deterministic build decisions.",
    "footer.facebook": "Facebook Updates",

    // Detail Pages
    "workDetail.back": "Back to Selected Work",
    "workDetail.role": "Role:",
    "workDetail.problem": "The Problem",
    "workDetail.built": "What I Built",
    "workDetail.outcome": "Verified Outcome",
    "workDetail.howItWorks": "How it works",
    "workDetail.stages": "One deterministic flow, three clear stages.",
    "workDetail.decisions": "Key Decisions",
    "workDetail.decisionsSubtitle": "Choices that shaped the product.",
    "workDetail.evidence": "Evidence",
    "workDetail.whatChanged": "What changed",
    "workDetail.nextStep": "Next improvement",
    "workDetail.relatedNotes": "Related Notes",
    "workDetail.decisionsOverTime": "Decisions over time.",
    "workDetail.noRelatedNotes": "No related Note has been published for this story yet.",
    "workDetail.discuss": "Want to discuss this workflow or a similar one?",

    // About Page
    "about.title": "I learn by turning a messy flow into something usable.",
    "about.location": "Bangkok, Thailand · Building Now",
    "about.p1": "I'm Anantasak — ANAN. My work sits at the intersection of product thinking, systems orchestration, automation pipelines, and hands-on software building.",
    "about.p2": "I am most interested in the critical point where an AI idea stops being a chat prompt and becomes a tangible product: a clear input, an understandable state, a safety-bounded action, and an outcome someone can actually rely on.",
    "about.p3": "This site is a living record of those builds. Selected Work shows the strongest evidence. Notes shows the decisions, mistakes, and architectural lessons that happen before the polished result.",
    "about.pillar1": "Practical AI products",
    "about.pillar2": "Flows before features",
    "about.pillar3": "Decisions in public",
    "about.sayHello": "Say Hello",
    "about.viewResume": "View Resume",

    // Resume Page
    "resume.title": "Resume · View only",
    "resume.subtitle": "Practical AI Product Builder · Project Coordinator",
    "resume.profile": "Profile",
    "resume.profileDesc": "I work across product coordination, automation architecture, and hands-on software delivery. My focus is turning complex AI workflows into practical products with clear states, safe actions, and outcomes people can rely on every day.",
    "resume.experience": "Experience",
    "resume.capabilities": "Capabilities",
    "resume.education": "Education",
  },
};
