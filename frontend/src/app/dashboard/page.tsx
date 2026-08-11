"use client";

import { Leaf, TrendingUp, ShoppingCart, Brain, LineChart, Reply, Filter, Bot, CloudLightning, UserCheck, Download } from "lucide-react";

import Link from "next/link";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useChartAnimation } from "@/hooks/useChartAnimation";

export default function Dashboard() {
  useChartAnimation("chart-bar-dashboard");

  return (
    <DashboardLayout searchPlaceholder="Search farm data...">
          {/* Welcome Header */}
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-md">
            <div>
              <h1 className="text-headline-lg font-headline-lg text-on-surface">Welcome back, Marcus</h1>
              <p className="text-body-lg font-body-lg text-on-surface-variant">Harvest outlook is optimal for your South Quadrant crops.</p>
            </div>
            <div className="flex gap-sm">
              <span className="bg-secondary-container text-on-secondary-container px-md py-sm rounded-xl text-label-sm flex items-center gap-xs">
                <Leaf className="text-md shrink-0"  /> Healthy Soil
              </span>
              <span className="bg-primary-container text-on-primary-container px-md py-sm rounded-xl text-label-sm flex items-center gap-xs">
                <TrendingUp className="text-md shrink-0"  /> +12% Growth
              </span>
            </div>
          </section>

          {/* Quick Stats Bento Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
            {/* Revenue Chart Widget */}
            <div className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between min-h-[160px]">
              <div className="flex justify-between items-start">
                <span className="text-label-sm font-label-sm text-on-surface-variant">Weekly Revenue</span>
                <span className="text-primary font-bold">+8.4%</span>
              </div>
              <div className="flex items-end gap-1 h-12 mb-sm">
                <div className="bg-primary w-full h-[0%] rounded-t-sm chart-bar-dashboard transition-all duration-700" data-height="40%"></div>
                <div className="bg-primary w-full h-[0%] rounded-t-sm chart-bar-dashboard transition-all duration-700" data-height="60%"></div>
                <div className="bg-primary w-full h-[0%] rounded-t-sm chart-bar-dashboard transition-all duration-700" data-height="45%"></div>
                <div className="bg-primary w-full h-[0%] rounded-t-sm chart-bar-dashboard transition-all duration-700" data-height="75%"></div>
                <div className="bg-primary w-full h-[0%] rounded-t-sm chart-bar-dashboard transition-all duration-700" data-height="55%"></div>
                <div className="bg-primary w-full h-[0%] rounded-t-sm chart-bar-dashboard transition-all duration-700" data-height="90%"></div>
                <div className="bg-primary-container w-full h-[0%] rounded-t-sm chart-bar-dashboard transition-all duration-700" data-height="30%"></div>
              </div>
              <div className="text-title-md font-title-md">$42,890.00</div>
            </div>

            {/* Active Orders */}
            <div className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between min-h-[160px]">
              <div className="flex items-center gap-sm">
                <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center">
                  <ShoppingCart className="text-on-secondary-fixed text-md shrink-0"  />
                </div>
                <span className="text-label-sm font-label-sm text-on-surface-variant">Active Orders</span>
              </div>
              <div className="py-md">
                <span className="text-display-lg font-display-lg leading-none">24</span>
              </div>
              <div className="text-label-sm text-on-surface-variant">8 items pending shipment</div>
            </div>

            {/* Weather Alert */}
            <div className="bg-error-container text-on-error-container p-md rounded-xl shadow-sm border border-error/20 flex flex-col justify-between min-h-[160px]">
              <div className="flex items-center justify-between">
                <span className="text-label-sm font-label-sm font-bold uppercase tracking-wider">Alert</span>
                <CloudLightning className=" shrink-0"  />
              </div>
              <div className="py-sm">
                <p className="text-title-md font-title-md font-bold">Rain in 2h</p>
                <p className="text-body-md">Prepare grain coverage</p>
              </div>
              <button className="w-full py-xs bg-on-error-container text-on-error rounded-lg text-label-sm hover:opacity-90">View Radar</button>
            </div>

            {/* AI Recommendation */}
            <div className="bg-tertiary-container text-on-tertiary-container p-md rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between min-h-[160px]">
              <div className="flex items-center gap-sm">
                <Brain className=" shrink-0"  />
                <span className="text-label-sm font-label-sm">AI Advice</span>
              </div>
              <div className="py-sm">
                <p className="text-body-md font-bold">Apply Fertilizer X</p>
                <p className="text-label-sm opacity-90">Soil nitrate levels are at 12%, below the seasonal threshold.</p>
              </div>
              <Link className="text-label-sm underline font-bold" href="/agroai">Details</Link>
            </div>
          </section>

          {/* Main Analytics & Notification Split */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
            {/* Main Analytics Chart (Stripe-style) */}
            <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
              <div className="p-lg flex justify-between items-center border-b border-outline-variant">
                <div>
                  <h3 className="text-title-md font-title-md text-on-surface">Yield Performance</h3>
                  <p className="text-label-sm text-on-surface-variant">Production vs. Market Forecast</p>
                </div>
                <div className="flex bg-surface-container rounded-lg p-1">
                  <button className="px-md py-1 text-label-sm bg-white rounded-md shadow-sm">Sales</button>
                  <button className="px-md py-1 text-label-sm hover:bg-surface-container-high transition-colors">Volume</button>
                </div>
              </div>
              <div className="p-lg grow relative h-64 bg-slate-50/30 flex items-end justify-between px-xxl">
                {/* Simulated Chart Path */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <LineChart className="text-[200px] shrink-0"  />
                </div>
                {/* Grid lines */}
                <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-between py-md px-lg pointer-events-none">
                  <div className="w-full border-t border-outline-variant/30"></div>
                  <div className="w-full border-t border-outline-variant/30"></div>
                  <div className="w-full border-t border-outline-variant/30"></div>
                  <div className="w-full border-t border-outline-variant/30"></div>
                </div>
                {/* Bars with CSS transition properties */}
                <div className="relative z-10 w-12 bg-primary-fixed-dim rounded-t-lg transition-all duration-1000 chart-bar-dashboard" data-height="50%" style={{ height: "0%" }}></div>
                <div className="relative z-10 w-12 bg-primary-fixed-dim rounded-t-lg transition-all duration-1000 chart-bar-dashboard" data-height="75%" style={{ height: "0%" }}></div>
                <div className="relative z-10 w-12 bg-primary-container rounded-t-lg transition-all duration-1000 chart-bar-dashboard" data-height="85%" style={{ height: "0%" }}></div>
                <div className="relative z-10 w-12 bg-primary-fixed-dim rounded-t-lg transition-all duration-1000 chart-bar-dashboard" data-height="60%" style={{ height: "0%" }}></div>
                <div className="relative z-10 w-12 bg-primary-fixed-dim rounded-t-lg transition-all duration-1000 chart-bar-dashboard" data-height="55%" style={{ height: "0%" }}></div>
                <div className="relative z-10 w-12 bg-primary-fixed-dim rounded-t-lg transition-all duration-1000 chart-bar-dashboard" data-height="80%" style={{ height: "0%" }}></div>
              </div>
            </div>

            {/* Notifications Center */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex flex-col">
              <div className="p-lg border-b border-outline-variant flex justify-between items-center">
                <h3 className="text-title-md font-title-md text-on-surface">Updates</h3>
                <span className="w-6 h-6 bg-error text-on-error rounded-full flex items-center justify-center text-[10px] font-bold">3</span>
              </div>
              <div className="grow overflow-y-auto max-h-[350px]">
                {/* Notification Item */}
                <div className="p-md border-b border-outline-variant hover:bg-surface-container-low transition-colors cursor-pointer group">
                  <div className="flex gap-md">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center">
                      <Reply className="text-on-secondary-container text-sm shrink-0"  />
                    </div>
                    <div className="space-y-1">
                      <p className="text-body-md font-bold">Community Reply</p>
                      <p className="text-label-sm text-on-surface-variant">Sara M. replied to your post on &quot;Pest Control Strategies&quot;.</p>
                      <p className="text-[10px] text-outline">12 min ago</p>
                    </div>
                  </div>
                </div>
                {/* Notification Item */}
                <div className="p-md border-b border-outline-variant hover:bg-surface-container-low transition-colors cursor-pointer group">
                  <div className="flex gap-md">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center">
                      <TrendingUp className="text-on-tertiary-fixed text-sm shrink-0"  />
                    </div>
                    <div className="space-y-1">
                      <p className="text-body-md font-bold">Market Update</p>
                      <p className="text-label-sm text-on-surface-variant">Corn futures up by 3.2% today. Optimal selling window opening.</p>
                      <p className="text-[10px] text-outline">2 hours ago</p>
                    </div>
                  </div>
                </div>
                {/* Notification Item */}
                <div className="p-md border-b border-outline-variant hover:bg-surface-container-low transition-colors cursor-pointer group">
                  <div className="flex gap-md">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center">
                      <UserCheck className="text-on-primary-fixed text-sm shrink-0"  />
                    </div>
                    <div className="space-y-1">
                      <p className="text-body-md font-bold">System Status</p>
                      <p className="text-label-sm text-on-surface-variant">Drone fleet #4 diagnostics completed. All systems nominal.</p>
                      <p className="text-[10px] text-outline">Yesterday</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-md text-center">
                <button className="text-label-sm font-bold text-primary hover:underline">View All Notifications</button>
              </div>
            </div>
          </section>

          {/* Recent Orders Table */}
          <section className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
            <div className="p-lg border-b border-outline-variant flex flex-col md:flex-row justify-between items-center gap-md">
              <h3 className="text-title-md font-title-md text-on-surface">Recent Orders</h3>
              <div className="flex gap-sm w-full md:w-auto">
                <button className="flex-1 md:flex-none flex items-center justify-center gap-xs px-md py-sm border border-outline-variant rounded-lg text-label-sm hover:bg-surface-container transition-colors">
                  <Filter className="text-sm shrink-0"  /> Filter
                </button>
                <button className="flex-1 md:flex-none flex items-center justify-center gap-xs px-md py-sm bg-primary text-on-primary rounded-lg text-label-sm hover:opacity-90">
                  <Download className="text-sm shrink-0"  /> Export
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant">
                    <th className="px-lg py-md text-label-sm font-bold uppercase tracking-wider">Product</th>
                    <th className="px-lg py-md text-label-sm font-bold uppercase tracking-wider">Order ID</th>
                    <th className="px-lg py-md text-label-sm font-bold uppercase tracking-wider">Date</th>
                    <th className="px-lg py-md text-label-sm font-bold uppercase tracking-wider">Quantity</th>
                    <th className="px-lg py-md text-label-sm font-bold uppercase tracking-wider">Amount</th>
                    <th className="px-lg py-md text-label-sm font-bold uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  <tr className="hover:bg-surface-container transition-colors group">
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-sm">
                        <div className="w-8 h-8 bg-surface-dim rounded-md overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt="Organic Wheat"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeEnC6gMpOVDzOsl-Xy7Zr8O5nq-ohbn8j43JVjsaCHdoQxFsM54nf7YSfnb_cJ0BD1BAMMNjY2dVypciiT8spewOS_g1smbtWqA_oMan8dU7d7eX-zHLT4P4e5T58TMAcH3DstJYgA42V_38WkVOPPVNrgJArexHPrl1I45NA7jCYCWNN7rPSSnZCTUISQPXZAYsuKDWO8dBfyBNAa-bQOzp2P7LITo3KsXf9Qk5frBmgr_iQRHbyFIvMobEj9plA4iIUA8WAIg"
                          />
                        </div>
                        <span className="text-body-md font-medium">Organic Wheat</span>
                      </div>
                    </td>
                    <td className="px-lg py-md text-body-md font-mono text-on-surface-variant">#ORD-7721</td>
                    <td className="px-lg py-md text-body-md text-on-surface-variant">Oct 24, 2024</td>
                    <td className="px-lg py-md text-body-md text-on-surface-variant">1,200 kg</td>
                    <td className="px-lg py-md text-body-md font-bold">$3,450.00</td>
                    <td className="px-lg py-md">
                      <span className="px-sm py-1 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-bold uppercase">
                        Shipped
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors group">
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-sm">
                        <div className="w-8 h-8 bg-surface-dim rounded-md overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt="Soybeans"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9Xu3JxdJiVoM7TazGDXqglZb1tmThhy-YhYUfdipgpItyDUU-jFY09UbnHVpJeasAjmNRkbhqn9tCne1P9EfmdUeOTrTDyUtvpTkZ5pHlhqN0J64rUZnPX-e9a09YkXKXTSZWBsHL_MNvi-cAQ8WSD4y4wem6XAX9I3dv9rH1k7Adl7_T7MCLQnUfvpncwWuBk2r6qxKERkK-xP2q9-ZEZuZ7eliB-StnqUbFuIMGLibAKPv2Kq2AQ5CDSTbWmeOa13syGEfJ2w"
                          />
                        </div>
                        <span className="text-body-md font-medium">Soybeans (A Grade)</span>
                      </div>
                    </td>
                    <td className="px-lg py-md text-body-md font-mono text-on-surface-variant">#ORD-7719</td>
                    <td className="px-lg py-md text-body-md text-on-surface-variant">Oct 23, 2024</td>
                    <td className="px-lg py-md text-body-md text-on-surface-variant">850 kg</td>
                    <td className="px-lg py-md text-body-md font-bold">$2,100.00</td>
                    <td className="px-lg py-md">
                      <span className="px-sm py-1 bg-surface-container-highest text-on-surface-variant rounded-full text-[10px] font-bold uppercase">
                        Processing
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container transition-colors group">
                    <td className="px-lg py-md">
                      <div className="flex items-center gap-sm">
                        <div className="w-8 h-8 bg-surface-dim rounded-md overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt="Barley"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJZWdm792YkS2KDmDh-s4wQoUaz1PEzKLsPepJPkiLQBGp14aC83sMB7_q8I6g-qbDYzSQ176HICa_vz9x5dJTVu6Osgeo791UtW4HJoh1w9bGvdQU4fVSniRw4_gQ5yZXTBlkD6X8ZbYsUz4Dbzy6f0E0BZ1fCRoKeVNUODkZ0qDUYRwO7sNAEdFAggZr4rASKfoX0YK3JQjr2ti21T8_QVYAYG_PvCw2App7MUwqBI2NVBQRyhv7oY85h4jvZjDTstJ1XsVHyQ"
                          />
                        </div>
                        <span className="text-body-md font-medium">Premium Barley</span>
                      </div>
                    </td>
                    <td className="px-lg py-md text-body-md font-mono text-on-surface-variant">#ORD-7715</td>
                    <td className="px-lg py-md text-body-md text-on-surface-variant">Oct 22, 2024</td>
                    <td className="px-lg py-md text-body-md text-on-surface-variant">2,000 kg</td>
                    <td className="px-lg py-md text-body-md font-bold">$5,820.00</td>
                    <td className="px-lg py-md">
                      <span className="px-sm py-1 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-bold uppercase">
                        Delivered
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
      {/* FAB for AI Assistant (Contextual for Dashboard on Mobile) */}
      <Link href="/agroai" className="fixed bottom-lg right-lg w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-50 md:hidden">
        <Bot className=" shrink-0"  />
      </Link>
    </DashboardLayout>
  );
}
