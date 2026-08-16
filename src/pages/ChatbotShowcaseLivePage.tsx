import { useSEO } from "@/hooks/useSEO";
import ChatbotShowcaseApp from "../../บ้านรวมทะเล/src/App.jsx";
import "@/styles/showcase-white.css";
import { DemoShell } from "@/components/editorial/DemoShell";

export function ChatbotShowcaseLivePage() {
  useSEO({
    title: "ChatBot ShowCase Live App",
    description: "Interactive AI commerce chatbot showcase with live scenarios, Google Sheets sync demo, and multi-platform automation views.",
  });

  return (
    <DemoShell slug="ai-commerce-chatbot" title="AI Commerce Chatbot">
      <div className="showcase-white">
        <ChatbotShowcaseApp />
      </div>
    </DemoShell>
  );
}
