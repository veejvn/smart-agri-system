"use client";

import { LineChart, MoreVertical, Map, Share2, TrendingUp, AlertTriangle } from "lucide-react";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { Commodity, CommodityData } from "@/types";


export default function MarketTrends() {
  const [activeTab, setActiveTab] = useState<Commodity>("rice");


  const commodityDetails: Record<Commodity, CommodityData> = {
    rice: {
      title: "Rice Market Intelligence",
      description: "Real-time paddy and milled rice market data and predictive analysis.",
      history: [40, 45, 42, 50, 55, 60, 58, 65, 72, 68, 65, 70, 75, 80, 85],
      trends: [
        {
          title: "Coffee Price Spike",
          desc: "Coffee prices up 5% this week due to climate factors in key regions.",
          type: "up",
          tag: "STABLE VIEW",
          action: "Exp. +2% growth",
        },
        {
          title: "Rice Export Limits",
          desc: "New regulation might restrict supply flow, affecting global arbitrage margins.",
          type: "down",
          tag: "URGENT",
          action: "Check Logistics",
        },
      ],
    },
    coffee: {
      title: "Coffee Market Intelligence",
      description: "Arabica & Robusta price indicators, regional weather reports, and crop updates.",
      history: [60, 65, 70, 68, 75, 80, 82, 85, 95, 90, 88, 92, 96, 100, 105],
      trends: [
        {
          title: "Robusta Demand Surge",
          desc: "Instant coffee manufacturers increasing Robusta blend ratios.",
          type: "up",
          tag: "HIGH DEMAND",
          action: "Check Inventory",
        },
        {
          title: "Fertilizer Inflation",
          desc: "Nitrogen fertilizer price increase impacts coffee farm margins.",
          type: "down",
          tag: "WARNING",
          action: "Cost Control",
        },
      ],
    },
    pepper: {
      title: "Black & White Pepper Intelligence",
      description: "Domestic dry pepper prices and export demand projections.",
      history: [30, 32, 35, 33, 38, 40, 39, 42, 45, 44, 43, 46, 48, 50, 52],
      trends: [
        {
          title: "Pepper Supply Tightness",
          desc: "Harvest yields in major provinces lower than 5-year average.",
          type: "up",
          tag: "SELLER MARKET",
          action: "Hold Stock",
        },
        {
          title: "Pest Outbreak Alert",
          desc: "Root rot reports rising in central highlands cultivation fields.",
          type: "down",
          tag: "CRITICAL",
          action: "Get AI Diagnosis",
        },
      ],
    },
    durian: {
      title: "Durian Market Intelligence",
      description: "Export dynamics to major Asian markets and grade A/B pricing.",
      history: [70, 75, 80, 85, 90, 95, 100, 105, 120, 115, 110, 118, 125, 130, 140],
      trends: [
        {
          title: "China Export Approval",
          desc: "New custom clearance channels speed up fresh Durian delivery.",
          type: "up",
          tag: "OPPORTUNITY",
          action: "Prepare Shipment",
        },
        {
          title: "Cold Chain Costs",
          desc: "Refrigerated freight rates rising ahead of peak harvest season.",
          type: "down",
          tag: "LOGISTICS",
          action: "Book Early",
        },
      ],
    },
  };

  const activeData = commodityDetails[activeTab];

  return (
    <div className="min-h-screen bg-background text-on-background">
      <Sidebar />

      {/* Main Content Area */}
      <main className="md:ml-64 min-h-screen flex flex-col">
        {/* TopNavBar */}
        <Header
          showSearch
          searchPlaceholder="Search commodities, news, or trends..."
          showStats
          showRoleSwitcher
          showUser
          user={{
            avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDQV_SB6Mp1Lhe9WEaaS53DCT8caO6eWGVcp3f5-0INeVR2cVklALUUM5WZ7ibVBRciG-vZVN4SrtX-YaR-AoKHi8mwh27ceCdK85R9lNkVI7bk-kMfYXB2WZjxb5hDhwdxV9MH713vamzibwwmTK0_VjWbnLO6VnLMJOiNYhq8UN7YNAGKIct8BxjXoi_mS0DQIp9HUuP7t6KrQpaLwGaiP7peJZqJ05A1WEZV8RRTmYZyuIhnEA50XRXevW3iO02n6Xc9uZ8sQ"
          }}
        />


        {/* Dashboard Content */}
        <div className="p-lg md:p-xl max-w-6xl mx-auto w-full space-y-lg grow">
          {/* Commodity Selector & Hero Section */}
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-md">
            <div>
              <h2 className="text-headline-lg font-headline-lg text-on-surface font-bold">Market Intelligence</h2>
              <p className="text-body-md text-on-surface-variant">{activeData.description}</p>
            </div>
            <div className="flex bg-surface-container-high p-1 rounded-xl shadow-inner border border-outline-variant">
              {(["rice", "coffee", "pepper", "durian"] as Commodity[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-lg py-sm rounded-lg text-label-sm transition-all font-semibold ${
                    activeTab === tab
                      ? "bg-surface shadow-sm text-primary font-bold"
                      : "text-on-surface-variant hover:bg-surface-container-highest"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </section>

          {/* Bento Grid Main Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
            {/* Historical Price Trends (8 columns) */}
            <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col justify-between min-h-[400px]">
              <div className="flex justify-between items-center mb-lg">
                <div className="flex items-center gap-sm">
                  <LineChart className="text-primary shrink-0"  />
                  <h3 className="text-title-md font-title-md font-bold">Historical Price Trends</h3>
                </div>
                <div className="flex gap-sm">
                  <span className="px-sm py-xs bg-secondary-container text-on-secondary-container rounded text-label-sm font-bold">
                    Last 15 Days
                  </span>
                  <button className="text-on-surface-variant text-[18px] shrink-0"><MoreVertical className="w-5 h-5"  /></button>
                </div>
              </div>
              <div className="flex items-end justify-between gap-xs px-sm h-64">
                {activeData.history.map((val, idx) => {
                  // Find max value to calibrate heights
                  const maxVal = Math.max(...activeData.history);
                  const heightPercentage = `${(val / maxVal) * 90}%`;
                  const isLast = idx === activeData.history.length - 1;

                  return (
                    <div
                      key={idx}
                      style={{ height: heightPercentage }}
                      className={`w-full rounded-t-sm transition-all cursor-pointer ${
                        isLast ? "bg-primary" : "bg-primary-fixed-dim/30 hover:bg-primary"
                      }`}
                      title={`Day ${idx + 1}: $${val}`}
                    ></div>
                  );
                })}
              </div>
              <div className="mt-md flex justify-between text-label-sm text-on-surface-variant opacity-60">
                <span>15 Days Ago</span>
                <span>Today</span>
              </div>
            </div>

            {/* Trend Cards (4 columns) */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-md">
              {activeData.trends.map((t, idx) => (
                <div
                  key={idx}
                  className={`bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all border-l-4 ${
                    t.type === "up" ? "border-l-primary" : "border-l-error"
                  }`}
                >
                  <div className="flex justify-between items-start mb-sm">
                    <span className="text-label-sm font-label-sm text-on-surface-variant">
                      {t.type === "up" ? "Top Commodity Trend" : "Market Alert"}
                    </span>
                    {t.type === "up" ? (
                      <TrendingUp className="text-primary w-5 h-5 shrink-0" />
                    ) : (
                      <AlertTriangle className="text-error w-5 h-5 shrink-0" />
                    )}
                  </div>
                  <h4 className="text-body-lg font-bold mb-xs">{t.title}</h4>
                  <p className="text-body-md text-on-surface-variant leading-relaxed">{t.desc}</p>
                  <div className="mt-md flex items-center gap-sm">
                    <span
                      className={`px-sm py-1 rounded-full text-[10px] font-bold ${
                        t.type === "up" ? "bg-primary-fixed text-on-primary-fixed" : "bg-error-container text-on-error-container"
                      }`}
                    >
                      {t.tag}
                    </span>
                    <span className="text-label-sm text-on-surface-variant font-medium">{t.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
            {/* Heat Map (7 columns) */}
            <div className="col-span-12 lg:col-span-7 bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm h-[450px] relative overflow-hidden">
              <div className="flex justify-between items-center mb-lg relative z-10">
                <div className="flex items-center gap-sm">
                  <Map className="text-primary shrink-0"  />
                  <h3 className="text-title-md font-title-md font-bold">Regional Price Heat Map</h3>
                </div>
                <div className="flex items-center gap-md">
                  <div className="flex items-center gap-xs">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-label-sm font-medium">High Price</span>
                  </div>
                  <div className="flex items-center gap-xs">
                    <div className="w-3 h-3 bg-secondary-container rounded-full"></div>
                    <span className="text-label-sm font-medium">Low Price</span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 opacity-20 grayscale brightness-125 select-none pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover"
                  alt="Topographic map of Vietnam's central highlands"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkYhe9yLGS9MViZqvw5p0M7mvuVRNi6fmZxGRVcD0y_dOVMwIwS7qA7I2jb1ukvM7n5qkhnYSJUobJvWjRn4Ol0naJIVf4Yxbi12HdOvkLeYNKddUmeSR1PNVS2lbssASBC5fhet1XvbwHoVSF7UJpndZ66PBSY476wVusTaMx_wynHSudkDEB1ehfkAAgRpQaxwyVk--nr_432WsoOZyp4TDjPJWjfZ4FCqfHVZszMSvYvpWhnk55hnbQFiFG7qzDBwn3PT5DyA"
                />
              </div>
              {/* Overlaying Heatmap Blobs */}
              <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-primary/40 rounded-full blur-3xl animate-pulse"></div>
              <div
                className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-primary-fixed/50 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute top-1/2 right-1/4 w-24 h-24 bg-secondary-container/60 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "2s" }}
              ></div>
              {/* Market Dots */}
              <div className="absolute top-1/4 left-1/2 p-md bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-outline-variant flex flex-col gap-xs z-10 cursor-pointer hover:scale-105 transition-transform">
                <p className="text-label-sm font-bold text-primary">Central Highlands</p>
                <p className="text-title-md font-bold">
                  $1,450 <span className="text-label-sm text-primary font-bold">+1.2%</span>
                </p>
                <p className="text-[10px] text-on-surface-variant">Top Yield Zone</p>
              </div>
              <div className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-primary border-2 border-white rounded-full shadow-lg cursor-pointer"></div>
              <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-secondary rounded-full shadow-lg border-2 border-white cursor-pointer"></div>
            </div>

            {/* Market News & Insights (5 columns) */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-md">
              <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-md">
                    <h3 className="text-title-md font-title-md font-bold">Market News Feed</h3>
                    <button className="text-primary text-label-sm font-bold hover:underline">View All</button>
                  </div>
                  <div className="space-y-md pr-sm max-h-[200px] overflow-y-auto custom-scrollbar">
                    <div className="flex gap-md group cursor-pointer border-b border-outline-variant pb-md last:border-0 last:pb-0">
                      <div className="w-16 h-16 rounded-lg bg-surface-container overflow-hidden shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className="w-full h-full object-cover"
                          alt="Sorting coffee beans"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFNohO2YU6qm9Puxi1hpDjruhe8xCtC-F6as0RHGOfdJxOXh7XWDeE4GYkXMC5xNmZ39ZrKH8vX2N_Pd7VpCt551rfhe_vWnCok45FQaou8JMP8MvAoebwTKUd8VBUQWasoab6NnaFPgBEIQ3s0CHoN5XVyr-gZ5CRb7zXap70lgITKXf_RycKWizQ8S2OgYeORX44XJdPV4qFvP4_nTwVzYTL6dmSTM1YxE2cfpciu5IsCvOJ7S64VqB3EAMAhQtTNVay-AkHiw"
                        />
                      </div>
                      <div className="grow">
                        <span className="text-[10px] uppercase font-bold text-primary opacity-70">Supply Chain</span>
                        <h5 className="text-body-md font-bold group-hover:text-primary transition-colors">
                          Port congestion eases in Southeast terminals
                        </h5>
                        <p className="text-label-sm text-on-surface-variant line-clamp-1">
                          Vessel wait times reduced by 48 hours this week...
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-md group cursor-pointer border-b border-outline-variant pb-md last:border-0 last:pb-0">
                      <div className="w-16 h-16 rounded-lg bg-surface-container overflow-hidden shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className="w-full h-full object-cover"
                          alt="Sunset golden rice field"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAeQJ7u2GlEQh1RRM2IYfXW1QHI_vGoOMRPbnCxCPf9uLGcNFjBgLLkewVeKLs8dIxAILU1zWe9aw7JM9Lciqx5j3PW7uWhcUIi3NsuljfZn9wtuVbhCg9jj1XSaV9Wk3HhDtoZ47nMeO_6uotefYM8mR-VHhshqxq6lD6Ehp7VHcHsrxiR3Xr_SH37EEigcCuM8-QtMXqzWJiI_-hQaoOV-2MHQbp8akL1vDP_cFD0Y3w26DFOrGzr6AHTHKRY8I0iVHUE_B3PA"
                        />
                      </div>
                      <div className="grow">
                        <span className="text-[10px] uppercase font-bold text-primary opacity-70">Expert Insight</span>
                        <h5 className="text-body-md font-bold group-hover:text-primary transition-colors">
                          Yield forecasts for late harvest rice
                        </h5>
                        <p className="text-label-sm text-on-surface-variant line-clamp-1">
                          Dr. Aris suggests a 15% increase in premium grains...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Supply-Demand Indicators */}
                <div className="mt-md pt-md border-t border-outline-variant">
                  <h3 className="text-title-sm font-title-md font-bold mb-md">Supply-Demand Matrix</h3>
                  <div className="space-y-sm">
                    <div>
                      <div className="flex justify-between text-label-sm mb-xs font-semibold">
                        <span>Global Demand</span>
                        <span className="font-bold text-primary">High (88%)</span>
                      </div>
                      <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "88%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-label-sm mb-xs font-semibold">
                        <span>Local Inventory</span>
                        <span className="font-bold text-error">Low (12%)</span>
                      </div>
                      <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-error rounded-full" style={{ width: "12%" }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-md p-sm bg-primary-container/10 border border-primary/20 rounded-lg">
                    <p className="text-[11px] text-primary italic font-medium">
                      &quot;Market condition suggests a Seller&apos;s advantage for the next 14 days.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer className="mt-auto" />
      </main>
    </div>
  );
}
