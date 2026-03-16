"use client";

import { useState } from "react";
import { THREATS, getDefconLevel, type Threat } from "@/lib/threats";
import ThreatGlobe from "@/components/ThreatGlobe";
import ThreatCard from "@/components/ThreatCard";
import ThreatDetail from "@/components/ThreatDetail";
import StatusBar from "@/components/StatusBar";
import NewsTicker from "@/components/NewsTicker";

export default function Home() {
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const defcon = getDefconLevel(THREATS);

  return (
    <div className="min-h-screen font-[family-name:var(--font-space-grotesk)]" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b" style={{ borderColor: "var(--border)", background: "var(--bg-primary)" }}>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full animate-pulse" style={{ background: "var(--threat-critical)" }} />
            <h1 className="text-sm font-bold tracking-[0.2em] uppercase" style={{ color: "var(--accent)" }}>
              Threat Radar
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
              DEFCON {defcon}
            </span>
            <span className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
              {new Date().toISOString().slice(0, 16).replace("T", " ")} UTC
            </span>
          </div>
        </div>
        <NewsTicker />
      </header>

      {/* Main Content */}
      <main className="relative">
        {/* Globe Section */}
        <section className="border-b" style={{ borderColor: "var(--border)" }}>
          <ThreatGlobe onSelectThreat={setSelectedThreat} />
        </section>

        {/* Status Bar */}
        <StatusBar />

        {/* Threat Cards Grid */}
        <section className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: "var(--text-secondary)" }}>
              Active Threats
            </h2>
            <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: "var(--bg-elevated)", color: "var(--accent)" }}>
              {THREATS.length} TRACKED
            </span>
          </div>
          <div className="grid gap-3">
            {THREATS.map((threat, i) => (
              <ThreatCard
                key={threat.id}
                threat={threat}
                index={i}
                onSelect={setSelectedThreat}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Threat Detail Modal */}
      {selectedThreat && (
        <ThreatDetail
          threat={selectedThreat}
          onClose={() => setSelectedThreat(null)}
        />
      )}
    </div>
  );
}
