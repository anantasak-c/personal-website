import {
  Activity,
  CheckCircle2,
  Cpu,
  Database,
  Play,
  RotateCcw,
  Server,
  Sparkles,
  Terminal,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";

interface LogEntry {
  id: string;
  time: string;
  type: "info" | "success" | "routing" | "query" | "warning" | "error";
  message: string;
}

const samplePrompts = [
  { label: "Audit Neon DB latency", cmd: "ops:db query --latency --cluster neon-prod-ap-southeast" },
  { label: "Inspect Next.js worker threads", cmd: "ops:service inspect --app frontend-runner --workers" },
  { label: "Verify webhook endpoint health", cmd: "ops:health check --endpoint /api/webhooks/intake" },
  { label: "Simulate zero-downtime failover", cmd: "ops:cluster failover --dry-run --zone bkk-01" },
  { label: "Clear Redis Cache", cmd: "ops:cache flush --region ap-southeast-1 --confirm" },
  { label: "Check API Rate Limits", cmd: "ops:api limits --service user-auth --timeframe 1h" },
  { label: "Trigger Error Simulation", cmd: "ops:test inject-error --type connection_timeout --probability 0.5" },
  { label: "Analyze Memory Leak", cmd: "ops:mem dump --container api-gateway-03 --upload-s3" },
];

export function CloudAssistantDemo() {
  const { lang } = useLang();
  const [inputCommand, setInputCommand] = useState("ops:db query --latency --cluster neon-prod-ap-southeast");
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "1",
      time: "16:20:01",
      type: "info",
      message: "Autonomous Ops Agent initialized (Agent ID: anan-ops-v2). Connected to Neon Serverless DB & Next.js runtime.",
    },
  ]);
  const [telemetry, setTelemetry] = useState({
    latency: "18ms",
    dbConnections: 12,
    cpuUsage: "14%",
    agentStatus: "IDLE",
  });

  const runExecution = (cmdToRun?: string) => {
    const activeCmd = cmdToRun || inputCommand;
    if (!activeCmd || isRunning) return;

    setIsRunning(true);
    setTelemetry((prev) => ({ ...prev, agentStatus: "PROCESSING", cpuUsage: "35%" }));

    const now = () => new Date().toISOString().replace('T', ' ').substring(11, 23);
    const agentId = "[Agent:anan-ops-v2]";

    // Step 1: Log command intake
    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        time: now(),
        type: "routing",
        message: `${agentId} Command received via secure socket: "${activeCmd}"`,
      },
    ]);

    // Step 2: Simulate streaming response and telemetry changes
    setTimeout(() => {
      setTelemetry((prev) => ({ ...prev, dbConnections: Math.floor(15 + Math.random() * 10), cpuUsage: "68%" }));
      setLogs((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          time: now(),
          type: "query",
          message: `${agentId} Parsing intent via LLM pipeline -> Routing to Neon Postgres pooler at 127.0.0.1:5432...`,
        },
      ]);
    }, 300);

    // Step 2.5: Inject warning/error randomly or based on command
    setTimeout(() => {
      setTelemetry((prev) => ({ ...prev, latency: `${(25 + Math.random() * 15).toFixed(1)}ms`, cpuUsage: "82%" }));
      if (activeCmd.includes("inject-error") || activeCmd.includes("failover") || Math.random() > 0.7) {
        const isError = activeCmd.includes("inject-error") || Math.random() > 0.5;
        setLogs((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            time: now(),
            type: isError ? "error" : "warning",
            message: isError ? `${agentId} CRITICAL: Connection timeout detected on secondary node (bkk-02).` : `${agentId} WARN: High memory usage detected (88%) during operation. Scaling resources...`,
          },
        ]);
      }
    }, 700);

    // Step 3: Complete execution
    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          time: now(),
          type: "success",
          message: `${agentId} Execution verified (200 OK). Cluster health: optimal (P99 latency: ${(15 + Math.random() * 5).toFixed(1)}ms, 0 packet drops). Audit logged.`,
        },
      ]);
      setTelemetry({
        latency: `${(15 + Math.random() * 8).toFixed(1)}ms`,
        dbConnections: Math.floor(10 + Math.random() * 5),
        cpuUsage: `${Math.floor(12 + Math.random() * 8)}%`,
        agentStatus: "READY",
      });
      setIsRunning(false);
    }, 1200);
  };

  const resetLogs = () => {
    setLogs([
      {
        id: "1",
        time: new Date().toLocaleTimeString("en-GB", { hour12: false }),
        type: "info",
        message: "System reset to baseline. Autonomous agent standing by for commands.",
      },
    ]);
    setTelemetry({
      latency: "18ms",
      dbConnections: 12,
      cpuUsage: "14%",
      agentStatus: "IDLE",
    });
  };

  useEffect(() => {
    // Autoscroll to bottom of terminal if needed
  }, [logs]);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-black/[0.08] bg-[#0d1117] text-white shadow-2xl">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-white/[0.03] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="font-mono text-xs font-semibold text-white/70">
            Cloud Assistant · Interactive Live Demo Sandbox
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {telemetry.agentStatus}
          </span>
          <button
            type="button"
            onClick={resetLogs}
            className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-xs text-white/70 transition hover:bg-white/10 hover:text-white"
            title="Reset sandbox"
          >
            <RotateCcw className="h-3 w-3" />
            <span>{lang === "th" ? "รีเซ็ต" : "Reset"}</span>
          </button>
        </div>
      </div>

      {/* Telemetry Metrics Strip */}
      <div className="grid grid-cols-2 gap-2 border-b border-white/10 bg-black/40 p-4 sm:grid-cols-4 sm:gap-4">
        <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <Database className="h-4 w-4 text-[#2997ff]" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/50">Neon DB P99</p>
            <p className="font-mono text-sm font-semibold text-white">{telemetry.latency}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <Server className="h-4 w-4 text-emerald-400" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/50">Pool Conns</p>
            <p className="font-mono text-sm font-semibold text-white">{telemetry.dbConnections} active</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <Cpu className="h-4 w-4 text-purple-400" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/50">CPU Usage</p>
            <p className="font-mono text-sm font-semibold text-white">{telemetry.cpuUsage}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <Activity className="h-4 w-4 text-amber-400" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/50">Runtime</p>
            <p className="font-mono text-sm font-semibold text-white">Next.js Edge</p>
          </div>
        </div>
      </div>

      {/* Command prompt & Quick chips */}
      <div className="border-b border-white/10 bg-black/20 p-5">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-white/50">
          {lang === "th" ? "คำสั่งทดสอบด่วน (Quick Prompts):" : "Sample Operational Commands:"}
        </p>
        <div className="flex flex-wrap gap-2">
          {samplePrompts.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setInputCommand(p.cmd);
                runExecution(p.cmd);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 transition hover:border-[#2997ff] hover:bg-[#2997ff]/20 hover:text-white"
            >
              <Sparkles className="h-3 w-3 text-[#2997ff]" />
              <span>{p.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <div className="relative flex-1">
            <Terminal className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={inputCommand}
              onChange={(e) => setInputCommand(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") runExecution();
              }}
              placeholder="Enter natural language command or ops query..."
              className="w-full rounded-xl border border-white/15 bg-black/60 py-2.5 pl-10 pr-4 font-mono text-xs text-white placeholder-white/40 focus:border-[#2997ff] focus:outline-none focus:ring-1 focus:ring-[#2997ff]"
            />
          </div>
          <button
            type="button"
            disabled={isRunning}
            onClick={() => runExecution()}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0071e3] px-5 py-2.5 font-mono text-xs font-semibold text-white shadow-md transition hover:bg-[#0055b3] disabled:opacity-50"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>{isRunning ? (lang === "th" ? "กำลังรัน..." : "Running...") : (lang === "th" ? "รันคำสั่ง" : "Run")}</span>
          </button>
        </div>
      </div>

      {/* Streaming Terminal Log Area */}
      <div className="max-h-[300px] min-h-[220px] overflow-y-auto p-5 font-mono text-xs leading-relaxed text-white/90">
        <div className="space-y-3">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-3">
              <span className="text-white/40">[{log.time}]</span>
              {log.type === "info" && <span className="text-cyan-400">INFO</span>}
              {log.type === "routing" && <span className="text-purple-400">INTAKE</span>}
              {log.type === "query" && <span className="text-blue-400">EXEC</span>}
              {log.type === "warning" && <span className="text-amber-400">WARN</span>}
              {log.type === "error" && <span className="text-red-400 font-bold">ERROR</span>}
              {log.type === "success" && (
                <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5" /> OK
                </span>
              )}
              <span className={`text-white/80 ${log.type === "error" ? "text-red-300" : log.type === "warning" ? "text-amber-200" : ""}`}>{log.message}</span>
            </div>
          ))}
          {isRunning && (
            <div className="flex items-center gap-2 text-white/50">
              <span className="inline-block h-2 w-2 animate-ping rounded-full bg-[#2997ff]" />
              <span>Streaming agent telemetry...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
