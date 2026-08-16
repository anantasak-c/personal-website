import type { ReactNode } from "react";
import { AppleHeader } from "@/components/apple/AppleHeader";
import { BackgroundVideo } from "@/components/apple/BackgroundVideo";
import { SiteFooter } from "@/components/editorial/SiteFooter";

interface EditorialLayoutProps {
  children: ReactNode;
  showAmbientControls?: boolean;
  videoOpacity?: number;
}

export function EditorialLayout({
  children,
  showAmbientControls = true,
  videoOpacity = 0.35,
}: EditorialLayoutProps) {
  return (
    <div className="relative min-h-screen bg-[#fbfbfd] text-[#1d1d1f] antialiased selection:bg-[#0071e3]/20 selection:text-[#0071e3]">
      {/* Background Video Layer with subtle ambient light for white theme */}
      <BackgroundVideo opacity={videoOpacity} showControls={showAmbientControls} />

      {/* Floating Apple Navigation Header with TH/EN Switcher */}
      <AppleHeader />

      {/* Main Page Content */}
      <main className="page-enter relative z-10">{children}</main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
