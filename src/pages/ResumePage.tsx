import { useRef, useState } from "react";
import { personalInfo, workHistory, skills, education, techStack } from "@/data/content";
import { Mail, MapPin, Globe, Download, Printer, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function ResumePage() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    setExporting(true);
    try {
      // Force a fixed width so responsive breakpoints render consistently
      const fixedWidth = 896; // max-w-4xl = 896px

      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        windowWidth: fixedWidth + 64, // add padding for margin
        width: fixedWidth,
        onclone: (clonedDoc: Document) => {
          const resumeEl = clonedDoc.querySelector("[data-resume]") as HTMLElement;
          if (resumeEl) {
            resumeEl.style.width = `${fixedWidth}px`;
            resumeEl.style.maxWidth = `${fixedWidth}px`;
            resumeEl.style.margin = "0";
            resumeEl.style.boxShadow = "none";
          }
          // Force all grid containers to use 3 columns
          clonedDoc.querySelectorAll(".md\\:grid-cols-3, [class*='md:grid-cols-3']").forEach((el) => {
            (el as HTMLElement).style.gridTemplateColumns = "repeat(3, minmax(0, 1fr))";
          });
          // Force skills grid to 3 columns
          clonedDoc.querySelectorAll(".md\\:grid-cols-3, [class*='grid-cols-2']").forEach((el) => {
            const htmlEl = el as HTMLElement;
            if (htmlEl.style.gridTemplateColumns === "") {
              htmlEl.style.gridTemplateColumns = "repeat(3, minmax(0, 1fr))";
            }
          });
          // Fix profile image
          clonedDoc.querySelectorAll("img.rounded-full").forEach((img) => {
            const imgEl = img as HTMLElement;
            imgEl.style.width = "128px";
            imgEl.style.height = "128px";
            imgEl.style.borderRadius = "9999px";
            imgEl.style.objectFit = "cover";
          });
        },
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [imgWidth, imgHeight],
      });

      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`Resume_${personalInfo.name.replace(/ /g, "_")}.pdf`);
    } finally {
      setExporting(false);
    }
  };

  // Portfolio URL
  const portfolioUrl = "https://personal-website-orcin-xi.vercel.app";

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 print:bg-white print:py-0">
      {/* Print/Download Buttons - Hidden when printing */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-end gap-3 print:hidden">
        <Button
          onClick={handlePrint}
          variant="outline"
          className="gap-2"
        >
          <Printer className="w-4 h-4" />
          Print A4
        </Button>
        <Button
          onClick={handleDownloadPDF}
          disabled={exporting}
          className="gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70"
        >
          {exporting ? (
            <><Loader2 className="w-4 h-4 animate-spin" />Generating...</>
          ) : (
            <><Download className="w-4 h-4" />Download PDF (1 Page)</>
          )}
        </Button>
      </div>

      {/* Resume Container */}
      <div ref={resumeRef} data-resume className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 print:bg-gradient-to-r print:from-gray-800 print:to-gray-900">
          <div className="flex items-center justify-between gap-8">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{personalInfo.name}</h1>
              <p className="text-xl text-indigo-100 mb-4">{personalInfo.title}</p>
              
              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <a href={`mailto:${personalInfo.email}`} className="hover:underline">
                    {personalInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>{personalInfo.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 flex-shrink-0" />
                  <a
                    href={portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {portfolioUrl.replace('https://', '')}
                  </a>
                </div>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="flex-shrink-0">
              <img
                src={personalInfo.avatar}
                alt={personalInfo.name}
                style={{ width: 128, height: 128 }}
                className="rounded-full border-4 border-white shadow-lg object-cover aspect-square"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8 space-y-8">
          {/* Professional Summary */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-indigo-600">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {personalInfo.passion}
            </p>
          </section>

          {/* Work Experience */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-indigo-600">
              Work Experience
            </h2>
            <div className="space-y-6">
              {workHistory.map((work, index) => {
                const descriptionLines = work.description
                  .split('\n')
                  .filter(line => line.trim() && !line.includes('present') && !line.includes('Currently') && !line.includes('Previously') && !line.includes(work.company) && !line.includes(work.role) && !line.includes(work.duration))
                  .slice(0, 4);

                return (
                  <div key={index} className="relative pl-8 border-l-2 border-gray-200">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-indigo-600 border-2 border-white"></div>
                    <div className="mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{work.role}</h3>
                      <p className="text-indigo-600 font-medium">{work.company}</p>
                      <p className="text-sm text-gray-500">{work.duration}</p>
                    </div>
                    <ul className="text-sm text-gray-700 space-y-1 mt-2">
                      {descriptionLines.map((line, i) => (
                        <li key={i} className="leading-relaxed">• {line.trim()}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Skills & Expertise */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-indigo-600">
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <span className="text-lg leading-none">{skill.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{skill.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Stack */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-indigo-600">
              Technical Stack
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Programming Languages */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Programming</h3>
                <div className="space-y-2">
                  {techStack.languages.map((tech, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-lg leading-none">{tech.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{tech.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Tools */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Business Tools</h3>
                <div className="space-y-2">
                  {techStack.business.map((tech, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-lg leading-none">{tech.icon}</span>
                      <p className="text-sm font-medium text-gray-900">{tech.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analytics */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Analytics</h3>
                <div className="space-y-2">
                  {techStack.analytics.map((tech, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-lg leading-none">{tech.icon}</span>
                      <p className="text-sm font-medium text-gray-900">{tech.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-indigo-600">
              Education
            </h2>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xl leading-none">🎓</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{education.degree}</h3>
                <p className="text-indigo-600 font-medium">{education.school}</p>
                <p className="text-sm text-gray-600">Major: {education.major}</p>
                <p className="text-sm text-gray-700 mt-2 italic">{education.highlight}</p>
              </div>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 text-center text-sm text-gray-500 print:bg-white print:border-t">
          <p>© 2025 {personalInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
