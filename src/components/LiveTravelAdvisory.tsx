import React, { useState } from "react";
import { Search, Globe, ExternalLink, Compass, AlertCircle, Loader2 } from "lucide-react";

interface GroundingSource {
  title: string;
  uri: string;
}

interface AdvisoryResult {
  answer: string;
  sources: GroundingSource[];
  updatedAt: string;
}

const PRESET_QUERIES = [
  {
    label: "Sikkim & Nathula Permits",
    query: "Current Nathula Pass and North Sikkim tourist permit rules and open days 2026",
  },
  {
    label: "Darjeeling Toy Train & Weather",
    query: "Darjeeling Himalayan Railway Toy Train status and current weather outlook",
  },
  {
    label: "Bhutan Border & SDF Fees",
    query: "Current Bhutan entry permit and Sustainable Development Fee rules for Indian tourists via Phuentsholing",
  },
  {
    label: "Bagdogra to Gangtok Route",
    query: "Current Bagdogra Airport to Gangtok NH10 road traffic and travel advisory",
  },
];

export const LiveTravelAdvisory: React.FC = () => {
  const [query, setQuery] = useState(PRESET_QUERIES[0].query);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AdvisoryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAdvisory = async (searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/travel-advisory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to fetch live travel advisory.");
      }

      setResult(data as AdvisoryResult);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Network error while checking live Himalayan travel updates.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAdvisory(query);
  };

  return (
    <section className="py-14 bg-white border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F6F9FC] border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#E2A829] uppercase tracking-wider">
                <Globe className="w-4 h-4 text-[#E2A829]" />
                <span>Live Google Search Grounded Updates</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0A2D6E] mt-1">
                Himalayan Route, Weather & Permit Advisory
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Check real-time permit requirements, border regulations, and highway updates powered by Google Search before your departure.
              </p>
            </div>
          </div>

          {/* Preset Quick Checks */}
          <div className="flex flex-wrap gap-2 mb-4">
            {PRESET_QUERIES.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => {
                  setQuery(preset.query);
                  fetchAdvisory(preset.query);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  query === preset.query
                    ? "bg-[#0A2D6E] text-white border-[#0A2D6E]"
                    : "bg-white text-[#0A2D6E] border-slate-200 hover:border-[#E2A829]"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about Sikkim permits, Yumthang snow, Darjeeling weather, or Bhutan SDF..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0A2D6E] focus:border-[#0A2D6E]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="px-5 py-2.5 bg-[#0A2D6E] hover:bg-[#13469E] disabled:opacity-60 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#F3C853]" />
                  <span>Checking Live Info...</span>
                </>
              ) : (
                <>
                  <Compass className="w-4 h-4 text-[#F3C853]" />
                  <span>Check Live Status</span>
                </>
              )}
            </button>
          </form>

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Unable to load live advisory</p>
                <p className="mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {/* Grounded Advisory Response */}
          {result && !error && (
            <div className="mt-5 bg-white border border-slate-200 rounded-xl p-5 space-y-4 animate-in fade-in duration-200">
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {result.answer}
              </div>

              {result.sources.length > 0 && (
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Verified Web Sources:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {result.sources.map((src, idx) => (
                      <a
                        key={idx}
                        href={src.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F6F9FC] hover:bg-[#0A2D6E] hover:text-white border border-slate-200 text-[11px] text-[#0A2D6E] font-medium transition-colors"
                      >
                        <span className="truncate max-w-[200px]">{src.title}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
