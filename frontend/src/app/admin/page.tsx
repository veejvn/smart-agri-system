"use client";

import { Bell, Thermometer, Globe, CreditCard, TrendingUp, Sprout, TrendingDown, Brain, MoreVertical, Info, Plus, UserCheck, FileWarning } from "lucide-react";

import { useEffect } from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function AdminDashboard() {


  useEffect(() => {
    // Micro-interactions: Animate chart bars on load
    const timer = setTimeout(() => {
      const bars = document.querySelectorAll(".chart-bar-admin");
      bars.forEach((bar) => {
        const h = bar.getAttribute("data-height") || "10%";
        (bar as HTMLElement).style.height = h;
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar />

      {/* Main Content Canvas */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* TopNavBar Component */}
        <Header
          showSearch
          searchPlaceholder="Tìm kiếm hệ thống..."
          showStats
          showRoleSwitcher
          showUser
          user={{
            avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCg-2Hhz5jWxLU8DqVXjHHj0JxnztlLFIS7vp3duIMeVklZ8XkxitFpb5_ehMxd-5xZuV-r6tAmyA7HloTXprHHkG8EeQ3vhMFdPelohFS8Pg4YgRwMnHFS7eO_KxNvIKrZETsrAO5sE2f9STlI9ndM7p0-BMFxywYSq1UVOAynXloG1j0fjPYNRFZCv2Uj4_-HiBQf_qmtvKXU2FLg7Rg6PzpYZ8sE1PMwgaoNs6ODhsPVT1e94v2y03LwWPuSOe2r4PqdsM9B8A"
          }}
        />


        {/* Dashboard Body */}
        <div className="p-lg flex flex-col gap-lg max-w-container-max mx-auto w-full grow">
          {/* KPI Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
            {/* Card: Total Revenue */}
            <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-md">
                <div className="p-sm bg-primary-container/10 rounded-lg text-primary">
                  <CreditCard className=" shrink-0"  />
                </div>
                <span className="flex items-center text-secondary text-label-sm font-bold">
                  <TrendingUp className="text-sm shrink-0"  /> +12.5%
                </span>
              </div>
              <p className="text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider">Total Revenue</p>
              <h3 className="text-headline-lg font-headline-lg text-on-surface mt-xs">$428,500</h3>
            </div>

            {/* Card: Active Farmers */}
            <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-md">
                <div className="p-sm bg-primary-container/10 rounded-lg text-primary">
                  <Sprout className=" shrink-0"  />
                </div>
                <span className="flex items-center text-secondary text-label-sm font-bold">
                  <TrendingUp className="text-sm shrink-0"  /> +8.2%
                </span>
              </div>
              <p className="text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider">Active Farmers</p>
              <h3 className="text-headline-lg font-headline-lg text-on-surface mt-xs">12,402</h3>
            </div>

            {/* Card: Active Experts */}
            <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-md">
                <div className="p-sm bg-primary-container/10 rounded-lg text-primary">
                  <UserCheck className=" shrink-0"  />
                </div>
                <span className="flex items-center text-error text-label-sm font-bold">
                  <TrendingDown className="text-sm shrink-0"  /> -2.1%
                </span>
              </div>
              <p className="text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider">Active Experts</p>
              <h3 className="text-headline-lg font-headline-lg text-on-surface mt-xs">1,845</h3>
            </div>

            {/* Card: AI Requests */}
            <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-md">
                <div className="p-sm bg-primary-container/10 rounded-lg text-primary">
                  <Brain className=" shrink-0"  />
                </div>
                <span className="flex items-center text-secondary text-label-sm font-bold">
                  <TrendingUp className="text-sm shrink-0"  /> +24.8%
                </span>
              </div>
              <p className="text-on-surface-variant text-label-sm font-label-sm uppercase tracking-wider">AI Requests</p>
              <h3 className="text-headline-lg font-headline-lg text-on-surface mt-xs">85,290</h3>
            </div>
          </section>

          {/* Middle Section: Chart & Sidebar */}
          <div className="flex flex-col xl:flex-row gap-lg">
            {/* Main Data View */}
            <div className="flex-2 flex flex-col gap-lg">
              {/* Chart Section */}
              <section className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant shadow-sm">
                <div className="flex justify-between items-center mb-xl">
                  <div>
                    <h4 className="text-title-md font-title-md text-on-surface">Monthly Platform Growth</h4>
                    <p className="text-body-md font-body-md text-on-surface-variant">Aggregated user activity and revenue trends</p>
                  </div>
                  <select className="bg-surface-container border-none rounded-lg text-label-sm focus:ring-primary px-sm py-xs">
                    <option>Last 6 Months</option>
                    <option>Last Year</option>
                  </select>
                </div>
                <div className="h-64 flex items-end justify-between gap-base px-sm">
                  {[
                    { month: "Jan", val: "60%", bg: "45%" },
                    { month: "Feb", val: "75%", bg: "60%" },
                    { month: "Mar", val: "40%", bg: "85%" },
                    { month: "Apr", val: "90%", bg: "70%" },
                    { month: "May", val: "85%", bg: "95%" },
                    { month: "Jun", val: "95%", bg: "80%" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-sm">
                      <div className="w-full bg-primary-container/20 rounded-t-lg relative overflow-hidden" style={{ height: item.bg }}>
                        <div
                          className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-1000 chart-bar-admin"
                          data-height={item.val}
                          style={{ height: "0%" }}
                        ></div>
                      </div>
                      <span className="text-label-sm font-label-sm text-outline">{item.month}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* User Management Table */}
              <section className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
                <div className="p-lg border-b border-outline-variant flex justify-between items-center bg-surface-container-low/50">
                  <h4 className="text-title-md font-title-md text-on-surface">Recent User Management</h4>
                  <button className="text-primary text-label-sm font-bold hover:underline">View All Users</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-surface-container-low text-on-surface-variant text-label-sm uppercase tracking-wider font-bold">
                      <tr>
                        <th className="px-lg py-md">User</th>
                        <th className="px-lg py-md">Role</th>
                        <th className="px-lg py-md">Status</th>
                        <th className="px-lg py-md text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                      <tr className="hover:bg-primary-container/5 transition-colors">
                        <td className="px-lg py-md flex items-center gap-md">
                          <div className="w-8 h-8 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-bold text-xs">NL</div>
                          <div>
                            <p className="text-body-md font-bold">Nguyen Lam</p>
                            <p className="text-label-sm text-outline">lam.nguyen@agrifarm.vn</p>
                          </div>
                        </td>
                        <td className="px-lg py-md">
                          <span className="px-sm py-base bg-secondary-container/20 text-secondary rounded text-[10px] font-bold uppercase">Farmer</span>
                        </td>
                        <td className="px-lg py-md">
                          <div className="flex items-center gap-xs text-secondary text-body-md">
                            <span className="w-2 h-2 rounded-full bg-secondary"></span> Active
                          </div>
                        </td>
                        <td className="px-lg py-md text-right">
                          <button className="text-outline hover:text-primary transition-colors">
                            <MoreVertical className=" shrink-0"  />
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-primary-container/5 transition-colors">
                        <td className="px-lg py-md flex items-center gap-md">
                          <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs">DT</div>
                          <div>
                            <p className="text-body-md font-bold">Dr. Tran</p>
                            <p className="text-label-sm text-outline">tran.expert@agrostream.com</p>
                          </div>
                        </td>
                        <td className="px-lg py-md">
                          <span className="px-sm py-base bg-tertiary-container/20 text-tertiary rounded text-[10px] font-bold uppercase">Expert</span>
                        </td>
                        <td className="px-lg py-md">
                          <div className="flex items-center gap-xs text-secondary text-body-md">
                            <span className="w-2 h-2 rounded-full bg-secondary"></span> Active
                          </div>
                        </td>
                        <td className="px-lg py-md text-right">
                          <button className="text-outline hover:text-primary transition-colors">
                            <MoreVertical className=" shrink-0"  />
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-primary-container/5 transition-colors">
                        <td className="px-lg py-md flex items-center gap-md">
                          <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold text-xs">PV</div>
                          <div>
                            <p className="text-body-md font-bold">Phan Van</p>
                            <p className="text-label-sm text-outline">van.p@gmail.com</p>
                          </div>
                        </td>
                        <td className="px-lg py-md">
                          <span className="px-sm py-base bg-secondary-container/20 text-secondary rounded text-[10px] font-bold uppercase">Farmer</span>
                        </td>
                        <td className="px-lg py-md">
                          <div className="flex items-center gap-xs text-outline text-body-md">
                            <span className="w-2 h-2 rounded-full bg-outline"></span> Suspended
                          </div>
                        </td>
                        <td className="px-lg py-md text-right">
                          <button className="text-outline hover:text-primary transition-colors">
                            <MoreVertical className=" shrink-0"  />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {/* Right Sidebar: Feed & Alerts */}
            <aside className="xl:w-80 flex flex-col gap-lg">
              {/* Platform Alerts */}
              <section className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm">
                <div className="flex justify-between items-center mb-md">
                  <h4 className="text-body-lg font-bold text-on-surface">System Alerts</h4>
                  <span className="w-5 h-5 bg-error text-on-error rounded-full flex items-center justify-center text-[10px] font-bold">3</span>
                </div>
                <div className="flex flex-col gap-sm">
                  <div className="p-sm bg-error-container text-on-error-container rounded-lg border-l-4 border-error">
                    <p className="text-label-sm font-bold flex items-center gap-xs">
                      <FileWarning className="text-sm shrink-0"  /> High Server Load
                    </p>
                    <p className="text-[11px] opacity-90 mt-xs">AI Inference engine operating at 92% capacity.</p>
                  </div>
                  <div className="p-sm bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-lg border-l-4 border-tertiary">
                    <p className="text-label-sm font-bold flex items-center gap-xs">
                      <Info className="text-sm shrink-0"  /> Update Scheduled
                    </p>
                    <p className="text-[11px] opacity-90 mt-xs">v2.4.0 core engine migration tonight at 02:00.</p>
                  </div>
                </div>
              </section>

              {/* Activity Feed */}
              <section className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm flex-1">
                <h4 className="text-body-lg font-bold text-on-surface mb-lg">Platform Activity</h4>
                <div className="flex flex-col gap-md relative">
                  <div className="absolute left-3 top-0 bottom-0 w-px bg-outline-variant"></div>
                  <div className="relative pl-8">
                    <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-surface"></div>
                    <p className="text-label-sm font-bold">New Expert Verified</p>
                    <p className="text-[11px] text-on-surface-variant">Dr. Nguyen completed credential validation.</p>
                    <span className="text-[10px] text-outline">2 mins ago</span>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-secondary ring-4 ring-surface"></div>
                    <p className="text-label-sm font-bold">Payout Processed</p>
                    <p className="text-[11px] text-on-surface-variant">Weekly payouts to 450 experts completed.</p>
                    <span className="text-[10px] text-outline">45 mins ago</span>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-outline ring-4 ring-surface"></div>
                    <p className="text-label-sm font-bold">System Backup</p>
                    <p className="text-[11px] text-on-surface-variant">Automated cloud backup successful.</p>
                    <span className="text-[10px] text-outline">3 hours ago</span>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-surface"></div>
                    <p className="text-label-sm font-bold">Campaign Launch</p>
                    <p className="text-[11px] text-on-surface-variant">&quot;Green Tech 2024&quot; initiative live for users.</p>
                    <span className="text-[10px] text-outline">5 hours ago</span>
                  </div>
                </div>
                <button className="w-full mt-lg py-sm text-label-sm font-bold text-primary border border-primary rounded-lg hover:bg-primary-container/10 transition-colors">
                  Full Audit Log
                </button>
              </section>
            </aside>
          </div>
        </div>

        {/* Footer Component */}
        <Footer appName="AgriSmart Ecosystem" className="mt-auto" />
      </main>

      {/* Global Floating Action Button for Mobile Context */}
      <button className="md:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-on-primary shadow-xl flex items-center justify-center z-50">
        <Plus className=" shrink-0"  />
      </button>
    </div>
  );
}
