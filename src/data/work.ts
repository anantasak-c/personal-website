import type { Lang } from "@/i18n/translations";

export type ProjectMaturity =
  | "Production System"
  | "Working Prototype"
  | "UI Concept";

export interface WorkItem {
  slug: string;
  title: string;
  titleTh?: string;
  shortTitle: string;
  shortTitleTh?: string;
  maturity: ProjectMaturity;
  maturityTh?: string;
  year: string;
  role: string;
  roleTh?: string;
  summary: string;
  summaryTh?: string;
  problem: string;
  problemTh?: string;
  approach: string;
  approachTh?: string;
  outcome: string;
  outcomeTh?: string;
  next: string;
  nextTh?: string;
  stack: string[];
  decisions: string[];
  decisionsTh?: string[];
  flow: string[];
  flowTh?: string[];
  coverImage: string;
  objectImage: string;
  objectAlt: string;
  featured?: boolean;
}

export const workItems: WorkItem[] = [
  {
    slug: "cloud-assistant",
    title: "Cloud Assistant",
    titleTh: "Cloud Assistant",
    shortTitle: "Cloud",
    shortTitleTh: "Cloud",
    maturity: "Production System",
    maturityTh: "ระบบ Production ใช้งานจริง",
    year: "2026",
    role: "Product design · Agent orchestration · Full-stack build",
    roleTh: "ออกแบบผลิตภัณฑ์ · สถาปัตยกรรม Agent · พัฒนา Full-stack",
    summary: "A personal AI operations dashboard that turns loose requests into structured, routed, and auditable agent work.",
    summaryTh: "แดชบอร์ดจัดการงาน AI อัจฉริยะส่วนตัว ที่แปลงคำสั่งที่ไม่เป็นทางการให้กลายเป็นงานที่มีโครงสร้าง ถูกส่งต่อให้ Agent ผู้เชี่ยวชาญ และตรวจสอบย้อนหลังได้ทุกขั้นตอน",
    problem: "Personal AI tasks were scattered across chats with no consistent routing, durable state, or readable record of what happened.",
    problemTh: "งาน AI ส่วนตัวกระจัดกระจายอยู่ในหลายห้องแชท ไม่มีระบบส่งต่องานที่เป็นมาตรฐาน ไม่มี State ถาวร และไม่สามารถตรวจสอบบันทึกย้อนหลังได้",
    approach: "I designed a task model, specialist-agent routing, a hosted queue, and a local Codex runner that writes formatted outcomes back to the dashboard.",
    approachTh: "ผมออกแบบ Task Data Model, ระบบกระจายงานไปยัง Agent ผู้เชี่ยวชาญเฉพาะทาง, คิวงานบน Cloud และสร้างสะพานเชื่อมรันคำสั่งผ่าน Codex CLI ภายในเครื่องที่ปลอดภัย",
    outcome: "A working task-to-outcome loop across Vercel, Neon Postgres, and a safety-bounded local execution bridge.",
    outcomeTh: "ระบบ Loop ทำงานสมบูรณ์ตั้งแต่รับคำสั่งจนถึงสรุปผลลัพธ์ ทำงานเชื่อมโยงระหว่าง Vercel, Neon Postgres และ Local Execution Bridge ที่มีขอบเขตความปลอดภัยรัดกุม",
    next: "Add authentication and stale-run recovery before the production dashboard is used for sensitive work.",
    nextTh: "เพิ่มระบบ Authentication และการกู้คืนงานที่ค้าง (Stale-run recovery) ก่อนนำไปใช้กับงานที่มีความลับสูง",
    stack: ["Next.js", "React", "Neon", "Codex CLI", "Python", "Vercel"],
    decisions: [
      "Keep execution local so hosted infrastructure never stores an OpenAI credential.",
      "Route work to explicit specialists and preserve the assignment reason.",
      "Use a playful interactive 3D object instead of exposing production controls.",
    ],
    decisionsTh: [
      "รันโค้ดและคำสั่งเฉพาะใน Local Machine เพื่อไม่ให้ Cloud Infrastructure ต้องเก็บ Credentials สำคัญ",
      "ส่งต่องานไปยัง Agent เฉพาะทางพร้อมบันทึกเหตุผลในการเลือก Agent นั้นๆ",
      "ใช้วัตถุ 3D จำลองเชิง Interactive นำเสนอแทนการเปิดเผยปุ่มควบคุมของระบบ Production",
    ],
    flow: ["Capture a request", "Route it to the right specialist", "Return a readable outcome"],
    flowTh: ["รับและจัดโครงสร้างคำสั่ง", "ส่งต่อให้ Agent ผู้เชี่ยวชาญที่ถูกต้อง", "ส่งกลับผลลัพธ์ที่อ่านง่ายและตรวจสอบได้"],
    coverImage: "/media/work/cloud-assistant-cover.webp",
    objectImage: "/media/objects/cloud-assistant-object.jpg",
    objectAlt: "MacBook Pro showing Cloud Assistant AI Operations Dashboard",
    featured: true,
  },
  {
    slug: "tracking-sender",
    title: "Tracking Sender Dashboard",
    titleTh: "Tracking Sender Dashboard",
    shortTitle: "Tracking Sender",
    shortTitleTh: "Tracking Sender",
    maturity: "Working Prototype",
    maturityTh: "ระบบต้นแบบที่ใช้งานได้จริง",
    year: "2026",
    role: "Workflow design · Integration architecture · Product UI",
    roleTh: "ออกแบบ Workflow · วางสถาปัตยกรรมเชื่อมต่อ · ออกแบบ UI",
    summary: "An operations dashboard that matches orders to customer conversations, previews tracking messages, and makes bulk sending safer.",
    summaryTh: "แดชบอร์ดช่วยจับคู่ออเดอร์กับแชทลูกค้า ตรวจสอบข้อความแจ้งเลขพัสดุล่วงหน้า และเพิ่มความปลอดภัยในการส่งข้อความจำนวนมาก",
    problem: "Operators had to reconcile order rows, customer conversations, and delivery messages manually before every send.",
    problemTh: "ทีมแอดมินต้องคอยเทียบแถวข้อมูลออเดอร์ในสเปรดชีตกับห้องแชทลูกค้าและข้อความจัดส่งทีละรายการด้วยมือทุกครั้ง",
    approach: "I separated matching, validation, preview, and send confirmation into an auditable flow with server-side adapters.",
    approachTh: "ผมแยกขั้นตอนการจับคู่ การตรวจสอบความถูกต้อง การพรีวิว และการกดยืนยันส่ง ออกจากกันอย่างชัดเจน พร้อมทำ Server Adapter เชื่อมต่อ Google Sheets และ Messaging API",
    outcome: "A handoff-ready prototype with tested order logic, Google Sheets and messaging adapters, and a safer review-before-send flow.",
    outcomeTh: "ระบบต้นแบบพร้อมส่งมอบที่มี Order Logic ผ่านการทดสอบ, Adapter รองรับ Google Sheets และ Messaging API พร้อม Flow ตรวจทานก่อนส่งที่ปลอดภัย",
    next: "Validate the final branded deployment with a dedicated customer environment and credentials.",
    nextTh: "ทดสอบการติดตั้งในสภาพแวดล้อมจริงของลูกค้าที่มีการแยก Credentials ชัดเจน",
    stack: ["Next.js", "TypeScript", "Google Sheets", "Vitest", "Messaging API"],
    decisions: [
      "Require a preview before any send action.",
      "Keep customer credentials and identifiers outside source control.",
      "Use sanitized visuals and recorded steps in the public story.",
    ],
    decisionsTh: [
      "บังคับให้มีขั้นตอนการพรีวิวข้อความก่อนอนุญาตให้ส่งเสมอ เพื่อลดข้อผิดพลาด",
      "แยกข้อมูลส่วนตัวและรหัสผ่านของลูกค้าไว้นอก Source Control ทั้งหมด",
      "ใช้ข้อมูลตัวอย่างที่ลบข้อมูลส่วนบุคคลแล้วในการจัดแสดงเรื่องราวสู่สาธารณะ",
    ],
    flow: ["Select a validated order", "Match the customer conversation", "Review and record delivery"],
    flowTh: ["เลือกออเดอร์ที่ผ่านการตรวจสอบ", "จับคู่กับห้องแชทของลูกค้าโดยอัตโนมัติ", "ตรวจสอบความถูกต้องและบันทึกประวัติการส่ง"],
    coverImage: "/media/work/tracking-sender-cover.webp",
    objectImage: "/media/objects/tracking-sender-object.jpg",
    objectAlt: "MacBook Pro showing Tracking Sender Parcel Management Dashboard",
  },
  {
    slug: "ai-commerce-chatbot",
    title: "AI Commerce Chatbot",
    titleTh: "AI Commerce Chatbot",
    shortTitle: "Commerce Chatbot",
    shortTitleTh: "Commerce Chatbot",
    maturity: "Working Prototype",
    maturityTh: "ระบบต้นแบบที่ใช้งานได้จริง",
    year: "2026",
    role: "Conversation design · Automation flow · Prototype build",
    roleTh: "ออกแบบบทสนทนา · วางระบบอัตโนมัติ · พัฒนา Prototype",
    summary: "A commerce conversation that recommends products and makes the downstream data flow visible.",
    summaryTh: "ระบบแชทบอทตอบลูกค้าเชิงพาณิชย์ที่แนะนำสินค้าตรงใจ พร้อมเชื่อมโยงข้อมูลคำสั่งซื้อส่งต่อไปยังระบบหลังบ้านแบบอัตโนมัติ",
    problem: "A static chatbot screenshot could not explain how conversation, catalog, customer intent, and back-office automation fit together.",
    problemTh: "ภาพหน้าจอแชทบอททั่วไปไม่สามารถสื่อสารได้ว่าบทสนทนา, แคตตาล็อกสินค้า, ความต้องการลูกค้า และระบบอัตโนมัติหลังบ้านทำงานประสานกันอย่างไร",
    approach: "I built a safe interactive scenario with mock chat, product carousel, data capture, and a visual automation handoff.",
    approachTh: "ผมสร้าง Scenario จำลองที่มีการโต้ตอบจริง มีแคตตาล็อกสินค้า การบันทึกความตั้งใจซื้อ และการแสดงภาพการส่งต่องานไปยังระบบ n8n อัตโนมัติ",
    outcome: "A working prototype that connects the customer conversation to a visible back-office handoff.",
    outcomeTh: "ระบบต้นแบบที่เชื่อมต่อการสนทนาของลูกค้าเข้ากับกระบวนการ Automation หลังบ้านอย่างเห็นภาพชัดเจน",
    next: "Expand the scenario library while keeping every path deterministic and privacy-safe.",
    nextTh: "เพิ่ม Scenario จำลองรูปแบบอื่นๆ โดยยังคงความแน่นอนของผลลัพธ์และความปลอดภัยของข้อมูล",
    stack: ["React", "Tailwind CSS", "n8n", "Google Sheets", "Messenger", "LINE"],
    decisions: [
      "Use sanitized scenarios rather than a real inbox.",
      "End the story at the back-office handoff, not at a chatbot response.",
      "Keep customer data sanitized in every public visual.",
    ],
    decisionsTh: [
      "ใช้สถานการณ์จำลองที่ควบคุมได้แทนการต่อกับกล่องข้อความจริง เพื่อความปลอดภัย",
      "จบเรื่องราวที่การส่งต่องานสู่ระบบหลังบ้าน ไม่ใช่หยุดแค่ข้อความตอบกลับของบอท",
      "ปกป้องข้อมูลลูกค้าด้วยการใช้ Mock Data ในทุกส่วนที่แสดงผล",
    ],
    flow: ["Understand customer intent", "Recommend a focused product set", "Hand structured intent to automation"],
    flowTh: ["วิเคราะห์ความต้องการของลูกค้า", "แนะนำชุดสินค้าที่ตรงจุด", "ส่งต่อข้อมูลคำสั่งซื้อเข้าสู่ระบบหลังบ้านอัตโนมัติ"],
    coverImage: "/media/work/ai-commerce-chatbot-cover.webp",
    objectImage: "/media/objects/ai-commerce-chatbot-object.jpg",
    objectAlt: "MacBook Pro showing AI Commerce Chatbot Dashboard",
  },
  {
    slug: "ai-news-curation",
    title: "AI News Curation",
    titleTh: "AI News Curation",
    shortTitle: "AI News",
    shortTitleTh: "AI News",
    maturity: "Working Prototype",
    maturityTh: "ระบบต้นแบบที่ใช้งานได้จริง",
    year: "2026",
    role: "Editorial workflow · State design · Product UI",
    roleTh: "ออกแบบ Editorial Workflow · ออกแบบ State · พัฒนา Product UI",
    summary: "A Thai editorial board that filters AI news into a small set of useful stories with explicit processing and rejection states.",
    summaryTh: "บอร์ดคัดกรองข่าวสาร AI ภาษาไทย ที่กลั่นกรองข่าวจำนวนมากให้เหลือเฉพาะเรื่องที่มีคุณค่า พร้อมแสดงสถานะการประมวลผลและการคัดออกอย่างโปร่งใส",
    problem: "A daily news pipeline needs to show what is new, why it matters, and what failed without trapping an editor behind an endless spinner.",
    problemTh: "ระบบคัดกรองข่าวประจำวันต้องแสดงให้เห็นว่ามีอะไรใหม่ สำคัญอย่างไร และแหล่งข่าวใดล้มเหลว โดยไม่ปล่อยให้กองบรรณาธิการต้องรอโหลดแบบไร้จุดหมาย",
    approach: "I designed a deterministic daily board, run history, confidence signals, partial failures, and a recoverable rejected-items flow.",
    approachTh: "ผมออกแบบ Daily Editorial Board, ประวัติการประมวลผล, ค่าความเชื่อมั่น (Confidence Score), การรองรับ Partial Failure และ Flow ดึงข่าวที่ถูกคัดออกกลับมาทบทวนได้",
    outcome: "A practical UI model for repeated editorial decisions that stays useful when only part of the source pipeline succeeds.",
    outcomeTh: "โมเดล UI ที่ใช้งานได้จริงสำหรับการตัดสินใจของทีมบรรณาธิการ ซึ่งยังคงทำงานต่อได้แม้มีแหล่งข่าวบางส่วนเกิดข้อผิดพลาด",
    next: "Connect approved sources only after the mocked workflow has been validated with an editor.",
    nextTh: "เชื่อมต่อกับแหล่งข่าวจริงหลังจากผ่านการทดสอบ Workflow ร่วมกับทีมบรรณาธิการเรียบร้อยแล้ว",
    stack: ["Next.js", "React", "TypeScript", "Editorial UX", "Mock data"],
    decisions: [
      "Show partial results when one source fails.",
      "Never pad the daily board with low-confidence stories.",
      "Make stale processing visible and recoverable.",
    ],
    decisionsTh: [
      "แสดงผลลัพธ์ส่วนที่สำเร็จได้ทันทีแม้บางแหล่งข้อมูลจะล้มเหลว",
      "ไม่ใส่ข่าวที่มีค่าความเชื่อมั่นต่ำลงในบอร์ดประจำวันเพื่อรักษาคุณภาพ",
      "ทำให้กระบวนการที่ค้างแสดงผลชัดเจนและสามารถกดสั่งประมวลผลใหม่ได้",
    ],
    flow: ["Collect approved sources", "Filter by editorial value", "Publish a focused shortlist"],
    flowTh: ["รวบรวมข้อมูลจากแหล่งข่าวที่อนุมัติ", "กลั่นกรองตามคุณค่าของเนื้อหา", "เผยแพร่ชุดข่าวคัดสรรประจำวัน"],
    coverImage: "/media/work/ai-news-curation-cover.webp",
    objectImage: "/media/objects/ai-news-curation-object.jpg",
    objectAlt: "MacBook Pro showing AI News Curation Platform Dashboard",
  },
  {
    slug: "syncsocial",
    title: "SyncSocial",
    titleTh: "SyncSocial",
    shortTitle: "SyncSocial",
    shortTitleTh: "SyncSocial",
    maturity: "UI Concept",
    maturityTh: "แนวคิดการออกแบบ UI",
    year: "2026",
    role: "Product UI · Cross-platform preview · Prototype build",
    roleTh: "ออกแบบ UI ผลิตภัณฑ์ · จำลองพรีวิวข้ามแพลตฟอร์ม · พัฒนา Prototype",
    summary: "A multi-platform publishing concept for composing once, previewing per channel, and understanding the simulated result.",
    summaryTh: "แนวคิดระบบโพสต์คอนเทนต์หลายแพลตฟอร์มที่เขียนเพียงครั้งเดียว พรีวิวรูปแบบตามแต่ละโซเชียล และเห็นผลลัพธ์จำลองได้อย่างแม่นยำ",
    problem: "Social teams need to see how one post changes across channels before scheduling it, without connecting live accounts for a sales demo.",
    problemTh: "ทีม Social Media จำเป็นต้องเห็นว่าโพสต์เดียวจะปรากฏบนแต่ละแพลตฟอร์มอย่างไรก่อนตั้งเวลา โดยไม่ต้องเสี่ยงเชื่อมต่อบัญชีจริงในการสาธิต",
    approach: "I created a standalone mock flow for channel selection, caption presets, previews, scheduling, history, and analytics.",
    approachTh: "ผมสร้าง Flow จำลองสำหรับการเลือกช่องทาง, แคปชันเฉพาะแพลตฟอร์ม, พรีวิวเสมือนจริง, การตั้งเวลา, ประวัติการเผยแพร่ และสถิติตัวเลข",
    outcome: "A presentation-ready concept that communicates the complete publishing journey without OAuth or live publishing risk.",
    outcomeTh: "ชิ้นงานแนวคิดที่พร้อมนำเสนอและสื่อสารขั้นตอนการเผยแพร่ครบวงจร โดยปราศจากความเสี่ยงด้าน OAuth หรือการโพสต์หลุดไปยังบัญชีจริง",
    next: "Refine channel-specific constraints and accessibility before validating a production integration.",
    nextTh: "ปรับปรุงข้อกำหนดเฉพาะของแต่ละช่องทางและการเข้าถึง (Accessibility) ก่อนพัฒนาเวอร์ชันเชื่อมต่อ Production",
    stack: ["React", "TypeScript", "Tailwind CSS", "Analytics UI", "Platform previews"],
    decisions: [
      "Use a single composition flow with channel-specific previews.",
      "Label every publish result as simulated.",
      "Avoid OAuth in a public product concept.",
    ],
    decisionsTh: [
      "ใช้ขั้นตอนการเขียนเดียวพร้อมหน้าต่างพรีวิวแยกตามแต่ละแพลตฟอร์ม",
      "ติดป้ายกำกับชัดเจนว่าผลการเผยแพร่เป็นการจำลอง (Simulated)",
      "หลีกเลี่ยงการใช้ OAuth ในงาน Concept สาธารณะเพื่อความปลอดภัยสูงสุด",
    ],
    flow: ["Compose once", "Review channel-specific previews", "Schedule a visible result"],
    flowTh: ["เขียนเนื้อหาครั้งเดียว", "ตรวจสอบพรีวิวตามแต่ละแพลตฟอร์ม", "ตั้งเวลาและดูผลลัพธ์จำลอง"],
    coverImage: "/media/work/syncsocial-cover.webp",
    objectImage: "/media/objects/syncsocial-object.jpg",
    objectAlt: "MacBook Pro showing SyncSocial Multi-platform Publishing Dashboard",
  },
];

export function getWorkItem(slug?: string) {
  return workItems.find((item) => item.slug === slug);
}

export function getLocalizedWorkItem(item: WorkItem, lang: Lang) {
  if (lang === "th") {
    return {
      ...item,
      title: item.titleTh ?? item.title,
      shortTitle: item.shortTitleTh ?? item.shortTitle,
      maturity: item.maturityTh ?? item.maturity,
      role: item.roleTh ?? item.role,
      summary: item.summaryTh ?? item.summary,
      problem: item.problemTh ?? item.problem,
      approach: item.approachTh ?? item.approach,
      outcome: item.outcomeTh ?? item.outcome,
      next: item.nextTh ?? item.next,
      flow: item.flowTh ?? item.flow,
      decisions: item.decisionsTh ?? item.decisions,
    };
  }
  return item;
}
