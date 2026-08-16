import { useSEO } from "@/hooks/useSEO";
import { SyncSocialDemoDashboard } from "@/components/showcase2/SyncSocialDemoDashboard";
import "@/styles/syncsocial-showcase.css";
import { DemoShell } from "@/components/editorial/DemoShell";

export function SyncSocialShowcaseLivePage() {
  useSEO({
    title: "SyncSocial Demo App",
    description: "Standalone social media publishing demo with multi-platform connection flow, live preview, and analytics dashboard.",
  });

  return (
    <DemoShell slug="syncsocial" title="SyncSocial">
      <SyncSocialDemoDashboard />
    </DemoShell>
  );
}
