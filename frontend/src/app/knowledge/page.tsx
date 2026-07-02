"use client";

import { Clock, User, ArrowRight, Bug, Cpu, Brain, Sun, Headphones, Play } from "lucide-react";

import Link from "next/navigation";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import Footer from "@/components/footer";


export default function KnowledgeCenter() {


  return (
    <div className="min-h-screen bg-background text-on-background">
      <Sidebar />

      {/* Main Content Area */}
      <main className="md:ml-64 min-h-screen flex flex-col">
        {/* TopNavBar */}
        <Header
          showSearch
          searchPlaceholder="Search for disease treatment, farming techniques..."
          showStats
          showRoleSwitcher
        />


        {/* Canvas Area */}
        <div className="p-lg md:p-xl max-w-6xl mx-auto space-y-xl grow w-full">
          {/* Hero Header */}
          <section className="space-y-sm">
            <h1 className="text-headline-lg font-headline-lg text-on-surface tracking-tight">
              Knowledge Center
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-2xl">
              Empowering your farm with data-driven wisdom. Discover expert-vetted techniques and real-time plant health solutions.
            </p>
          </section>

          {/* Categories Section (Bento Inspired) */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-md">
            <button className="bg-surface-container-lowest border border-outline-variant/40 p-lg rounded-xl flex flex-col items-center justify-center text-center gap-sm group hover:border-primary transition-all shadow-sm">
              <div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center text-error">
                <Bug className="w-5 h-5 shrink-0" />
              </div>
              <span className="text-body-md font-bold text-on-surface">Plant Diseases</span>
            </button>
            <button className="bg-surface-container-lowest border border-outline-variant/40 p-lg rounded-xl flex flex-col items-center justify-center text-center gap-sm group hover:border-primary transition-all shadow-sm">
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
                <Cpu className="w-5 h-5 shrink-0" />
              </div>
              <span className="text-body-md font-bold text-on-surface">Smart Farming</span>
            </button>
            <button className="bg-surface-container-lowest border border-outline-variant/40 p-lg rounded-xl flex flex-col items-center justify-center text-center gap-sm group hover:border-primary transition-all shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                <Brain className="w-5 h-5 shrink-0" />
              </div>
              <span className="text-body-md font-bold text-on-surface">AI Tools</span>
            </button>
            <button className="bg-surface-container-lowest border border-outline-variant/40 p-lg rounded-xl flex flex-col items-center justify-center text-center gap-sm group hover:border-primary transition-all shadow-sm">
              <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
                <Sun className="w-5 h-5 shrink-0" />
              </div>
              <span className="text-body-md font-bold text-on-surface">Weather Adaptation</span>
            </button>
          </section>

          {/* Featured Articles & Expert CTA (Bento Layout) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
            {/* Featured Article 1 */}
            <div className="lg:col-span-8 relative overflow-hidden rounded-xl h-[400px] group border border-outline-variant/30 shadow-md">
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Emerald green crops in a sun-drenched valley"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGPEzouMdkp72wAPdPh4Vy2OeIC0XtEeZ-IODDhgQK0CB55U8_JABuwv6Fp3eBsFXDrwaQY5_8yM86g679vNXWIneKaRR57tWKDE0V2DQSNBSyEaPbf--c1CEmoi391Ec7z_TfaSnqrpDVtbnkOpn_VZLtvffuMIAPmGjHmABh_KJrF3I5jCfiQHXHasnYUho7Tj8u-cu-RFROXYGbTGBqNO3nThXVe2c6Kr0xw3U3kP9w7KdcYjLYzQhcB_RXyOhdF1iryLdKFg"
              />
              <div className="absolute bottom-0 left-0 p-lg z-20 text-white space-y-md">
                <span className="bg-primary text-on-primary text-label-sm px-md py-1 rounded-full uppercase font-bold">
                  Smart Farming
                </span>
                <h2 className="text-headline-lg font-headline-lg leading-tight font-bold">
                  Optimizing Nitrogen Cycle in Vertical Farms: A 2024 Deep Dive
                </h2>
                <div className="flex items-center gap-md text-slate-200">
                  <div className="flex items-center gap-sm">
                    <Clock className="text-sm shrink-0"  />
                    <span className="text-label-sm">12 min read</span>
                  </div>
                  <div className="flex items-center gap-sm">
                    <User className="text-sm shrink-0"  />
                    <span className="text-label-sm">Dr. Helena Vance (Expert)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Expert CTA Card */}
            <div className="lg:col-span-4 bg-primary text-on-primary p-lg rounded-xl flex flex-col justify-between shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              <div className="z-10">
                <Headphones className="w-10 h-10 shrink-0" />
                <h3 className="text-title-md font-title-md mt-md font-bold">Need specialized guidance?</h3>
                <p className="text-body-md text-on-primary-container/90 mt-sm leading-relaxed">
                  Connect with our network of certified agronomists for personalized field analysis and strategic planning.
                </p>
              </div>
              <a 
                href="/book-consultation"
                className="bg-primary-fixed text-on-primary-fixed hover:bg-white text-center font-bold py-md px-lg rounded-lg transition-colors w-full mt-lg block z-10"
              >
                Book a 1:1 session with an agronomist
              </a>
            </div>
          </section>

          {/* Video Tutorial Section */}
          <section className="space-y-md">
            <div className="flex justify-between items-end">
              <div className="space-y-xs">
                <h3 className="text-title-md font-title-md text-on-surface font-bold">Video Tutorials</h3>
                <p className="text-body-md text-on-surface-variant">Step-by-step visual guides for modern equipment and procedures.</p>
              </div>
              <a className="text-primary font-bold text-label-sm flex items-center gap-sm hover:underline" href="#all-videos">
                View All <ArrowRight className="text-sm shrink-0"  />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              {/* Video Card 1 */}
              <div className="space-y-sm group cursor-pointer">
                <div className="aspect-video relative rounded-lg overflow-hidden border border-outline-variant/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Autonomous farming drone over high-tech vineyard"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIVWVI8s4ESpcy3bAR1ajkhZqhcE7eiyzrQYl3W-XqJ7dU-lu3v1RmREyfNP02AmmKIiOBwAlqhO6_2Vduw_tx3Cigz4AuW35K00bjl-VOuMwC9j0N5DE_V2Mc98FN_UdyvqaupTX4ppSD5-qaBcddE-GMFeAJ4aDHHvIefMWz056ju1ohX91bqG-ZnpbJ89tybAMGFjPrf5H4dy0BnkDLJmWSiE3ycVaokwcOqvst5pGjN4PMylbHs67cl_v4LQQRamYrN6WhNQ"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-xl">
                      <Play className="w-6 h-6 fill-current shrink-0" />
                    </div>
                  </div>
                </div>
                <h4 className="text-body-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                  Calibrating Soil Moisture Sensors
                </h4>
                <span className="text-label-sm text-on-surface-variant">08:45 • Advanced Equipment</span>
              </div>

              {/* Video Card 2 */}
              <div className="space-y-sm group cursor-pointer">
                <div className="aspect-video relative rounded-lg overflow-hidden border border-outline-variant/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Dew drops on tomato leaf"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0Ag70Hp9GDurNi5K5GiZQNBYrigDzHViJFm51NuMAen93ojgRyPcEycvx-FTN9AQLLB5l-mPFkJXhsO_RoVqRsTOA38nhH0dv2SAToxr6xObwT1YnsfbtU2sqK375AXVF4ZvrMea7kraug6Q-Yj-aLcK5YJQ47XvTSoDy061ZCqez2nWRKqS3MqFmjLybRrmS3vwJ3esgTTdkOeU3tNxvZj4QUNJZYL8YV_WCv-7Zs2xdK2Jsf0N50L5EolFQo6--BxJ-FgFIDg"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-xl">
                      <Play className="w-6 h-6 fill-current shrink-0" />
                    </div>
                  </div>
                </div>
                <h4 className="text-body-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                  Identifying Early Blight in Tomatoes
                </h4>
                <span className="text-label-sm text-on-surface-variant">05:20 • Disease Prevention</span>
              </div>

              {/* Video Card 3 */}
              <div className="space-y-sm group cursor-pointer">
                <div className="aspect-video relative rounded-lg overflow-hidden border border-outline-variant/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Hydroponic greenhouse interior"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8Wo0SuapHeLx3ARHERlE3sj4zEdc99jw0-_K64Htb5onUoBbYu8mED4gpnggwdJ_dirxUA-dv8PSsMbAeuFd9KggFwgCQaSzXlOIT3OpTRRfLHhGdNB0GwpptUEgk-N0njaHEoQRlkQVvnl_pJrM_5IfddmEy8ouIU5coTRp_tH01XK_J9RuMXxYVRsi9mkvY4f21lJCYuVXjxfkby2Fn6iiMlBIf6H6AgHzyjusr_sCj-vVUiXeQJgy0NjX_LKBXlq9klDn9iQ"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-xl">
                      <Play className="w-6 h-6 fill-current shrink-0" />
                    </div>
                  </div>
                </div>
                <h4 className="text-body-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                  Sustainable Irrigation Scaling
                </h4>
                <span className="text-label-sm text-on-surface-variant">15:10 • Resource Management</span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <Footer appName="AgriSmart Ecosystem" className="mt-auto" />
      </main>
    </div>
  );
}
