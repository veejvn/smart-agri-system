"use client";

import { ChevronRight, MessageSquare, MapPin, ArrowRight, UserCircle, BookOpen, CalendarCheck, Zap, Stars, Calendar, Video, ChevronLeft, FileText, Download, FlaskConical, BadgeCheck, Star } from "lucide-react";

import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/layouts/DashboardLayout";


type ConsultationType = "video" | "message" | "field";

export default function BookConsultation() {
  const [consultationType, setConsultationType] = useState<ConsultationType>("video");
  const [selectedDay, setSelectedDay] = useState<number>(5);
  const [selectedTime, setSelectedTime] = useState<string>("02:00 PM");


  const days = [
    { num: 1, available: false },
    { num: 2, available: false },
    { num: 3, available: false },
    { num: 4, available: false },
    { num: 5, available: true },
    { num: 6, available: false },
    { num: 7, available: false },
    { num: 8, available: false },
    { num: 9, available: false },
    { num: 10, available: true },
    { num: 11, available: false },
    { num: 12, available: false },
  ];

  const times = ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"];

  return (
    <DashboardLayout
      searchPlaceholder="Search experts, articles, tools..."
      contentClassName="p-lg md:p-xl max-w-6xl mx-auto grow w-full space-y-xl"
    >
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-xs text-on-surface-variant font-label-sm">
            <Link href="/experts" className="hover:text-primary font-medium">
              Experts
            </Link>
            <ChevronRight className="text-[16px] shrink-0"  />
            <span className="text-primary font-bold">Dr. Elena Vance</span>
          </nav>

          {/* Expert Profile Header */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-lg bg-white border border-outline-variant/30 rounded-2xl p-lg shadow-sm">
            <div className="lg:col-span-8 flex flex-col md:flex-row gap-xl items-start">
              <div className="relative w-32 h-32 md:w-44 md:h-44 shrink-0 mx-auto md:mx-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full rounded-2xl object-cover shadow-md border-4 border-white"
                  alt="Dr. Elena Vance portrait"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxK90Y4a-XRdTKXOkTS5jWrf8Y_MLFJWPoWzPivIax0oeAiecafxyfpfWV_SUmWRIGfKc4fT-I1nr9brZJ9yff2Z4_WFfUL1Kgbn_O2wDVbdhcB_6Cowp5oOopsr66qxW7vJzc_aA016Gkfr9WYnWML_kkZdqViZPABwl8bn37GPV237S3fmDu4UxfWSSnRcs8vDjv91kN008afjMoZHt9QW0-FRmt3ThofZa25nyVoV8yIVUlNv3KyB1yyVmXmuEd9AglPLE_WA"
                />
                <div className="absolute -bottom-2 -right-2 bg-primary text-on-primary p-xs rounded-full border-4 border-white flex items-center justify-center">
                  <BadgeCheck className="w-5 h-5 shrink-0" />
                </div>
              </div>
              <div className="flex-1 space-y-md text-center md:text-left">
                <div>
                  <h1 className="text-headline-lg font-headline-lg text-on-surface font-bold">Dr. Elena Vance</h1>
                  <p className="text-title-md font-title-md text-secondary font-semibold">
                    Senior Soil Pathologist & Regenerative Specialist
                  </p>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-sm">
                  <span className="bg-secondary-container/20 text-on-secondary-container px-md py-xs rounded-full font-label-sm border border-secondary-container">
                    15+ Years Experience
                  </span>
                  <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-md py-xs rounded-full font-label-sm">
                    PhD Agronomy
                  </span>
                  <span className="bg-surface-container-high text-on-surface-variant px-md py-xs rounded-full font-label-sm">
                    98% Satisfaction
                  </span>
                </div>
                <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
                  Pioneering research in microbial soil health and carbon sequestration strategies. Helping large-scale commercial
                  farms transition to regenerative practices without compromising yield stability. Specialist in high-latitude
                  cereal crops.
                </p>
              </div>
            </div>

            {/* Fast Stats */}
            <div className="lg:col-span-4 flex flex-col gap-md">
              <div className="bg-surface-container-low p-md rounded-xl border border-outline-variant flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-md">
                  <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                    <CalendarCheck className=" shrink-0"  />
                  </div>
                  <div>
                    <p className="text-label-sm font-label-sm text-on-surface-variant">Next Available</p>
                    <p className="text-body-md font-bold text-on-surface">Tomorrow, 09:00 AM</p>
                  </div>
                </div>
                <ChevronRight className="text-outline shrink-0"  />
              </div>
              <div className="bg-surface-container-low p-md rounded-xl border border-outline-variant flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-md">
                  <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
                    <MessageSquare className=" shrink-0"  />
                  </div>
                  <div>
                    <p className="text-label-sm font-label-sm text-on-surface-variant">Response Time</p>
                    <p className="text-body-md font-bold text-on-surface">&lt; 2 Hours</p>
                  </div>
                </div>
                <Zap className="text-outline shrink-0"  />
              </div>
              <div className="p-md bg-inverse-surface rounded-xl flex items-center gap-md text-inverse-on-surface shadow-md">
                <Stars className="text-primary-fixed shrink-0"  />
                <p className="font-bold">AgriSmart Top Rated 2024</p>
              </div>
            </div>
          </section>

          {/* Booking and Publications */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
            {/* Left: Booking Engine */}
            <div className="col-span-12 lg:col-span-8 space-y-xl">
              <div className="bg-surface-container-lowest rounded-2xl p-lg md:p-xl border border-outline-variant shadow-sm space-y-lg">
                <h2 className="text-title-md font-title-md text-on-surface font-bold flex items-center gap-sm">
                  <Calendar className="text-primary shrink-0"  />
                  Schedule a Consultation
                </h2>

                {/* Consultation Type Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                  <button
                    onClick={() => setConsultationType("video")}
                    className={`flex flex-col items-center gap-sm p-lg rounded-xl border-2 transition-all ${
                      consultationType === "video"
                        ? "border-primary bg-primary-container/10 text-primary"
                        : "border-outline-variant hover:border-primary/40 hover:bg-surface-container text-on-surface"
                    }`}
                  >
                    <Video className="text-display-lg shrink-0"  />
                    <p className="font-bold">Video Call</p>
                    <p className="text-label-sm">$120 / hr</p>
                  </button>
                  <button
                    onClick={() => setConsultationType("message")}
                    className={`flex flex-col items-center gap-sm p-lg rounded-xl border-2 transition-all ${
                      consultationType === "message"
                        ? "border-primary bg-primary-container/10 text-primary"
                        : "border-outline-variant hover:border-primary/40 hover:bg-surface-container text-on-surface"
                    }`}
                  >
                    <MessageSquare className="text-display-lg shrink-0"  />
                    <p className="font-bold">Messaging</p>
                    <p className="text-label-sm">$45 / query</p>
                  </button>
                  <button
                    onClick={() => setConsultationType("field")}
                    className={`flex flex-col items-center gap-sm p-lg rounded-xl border-2 transition-all ${
                      consultationType === "field"
                        ? "border-primary bg-primary-container/10 text-primary"
                        : "border-outline-variant hover:border-primary/40 hover:bg-surface-container text-on-surface"
                    }`}
                  >
                    <MapPin className="text-display-lg shrink-0"  />
                    <p className="font-bold">Field Visit</p>
                    <p className="text-label-sm">Custom Quote</p>
                  </button>
                </div>

                {/* Interactive Calendar (Mock) */}
                <div className="bg-surface-container-low p-lg md:p-xl rounded-xl border border-outline-variant/30 space-y-md">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-on-surface">September 2024</p>
                    <div className="flex gap-sm">
                      <button className="p-xs hover:bg-surface-container-high rounded-full">
                        <ChevronLeft className=" shrink-0"  />
                      </button>
                      <button className="p-xs hover:bg-surface-container-high rounded-full">
                        <ChevronRight className=" shrink-0"  />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 text-center font-label-sm text-on-surface-variant font-bold mb-xs">
                    <span>Mo</span>
                    <span>Tu</span>
                    <span>We</span>
                    <span>Th</span>
                    <span>Fr</span>
                    <span>Sa</span>
                    <span>Su</span>
                  </div>
                  <div className="grid grid-cols-7 gap-sm text-center">
                    {/* Calendar filler */}
                    {[26, 27, 28, 29, 30, 31].map((filler) => (
                      <div key={filler} className="p-md text-on-surface-variant opacity-25">
                        {filler}
                      </div>
                    ))}
                    {days.map((d) => (
                      <div
                        key={d.num}
                        onClick={() => d.available && setSelectedDay(d.num)}
                        className={`p-md rounded-lg font-bold transition-all ${
                          d.available
                            ? selectedDay === d.num
                              ? "bg-primary text-on-primary shadow-md cursor-pointer scale-105"
                              : "bg-primary-container text-on-primary-container shadow-sm cursor-pointer hover:bg-primary hover:text-white"
                            : "bg-white border border-outline-variant/60"
                        }`}
                      >
                        {d.num}
                      </div>
                    ))}
                  </div>
                  <div className="mt-xl space-y-md">
                    <p className="font-bold text-on-surface">Available Slots for Sept {selectedDay}</p>
                    <div className="flex flex-wrap gap-sm">
                      {times.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`px-md py-sm rounded-lg border transition-all font-semibold ${
                            selectedTime === t
                              ? "bg-primary text-on-primary border-primary shadow-sm"
                              : "bg-white border-outline-variant hover:border-primary text-on-surface"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-md">
                  <Link
                    href={`/checkout?type=${consultationType}&day=${selectedDay}&time=${selectedTime}`}
                    className="bg-primary text-on-primary px-xl py-md rounded-full font-bold shadow-lg hover:opacity-90 transition-opacity flex items-center gap-sm"
                  >
                    Proceed to Payment <ArrowRight className=" shrink-0"  />
                  </Link>
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-white rounded-2xl p-lg md:p-xl border border-outline-variant shadow-sm space-y-lg">
                <h2 className="text-title-md font-title-md text-on-surface font-bold">What Farmers Say</h2>
                <div className="space-y-xl">
                  <div className="flex gap-md">
                    <div className="w-12 h-12 rounded-full bg-surface-container shrink-0 flex items-center justify-center text-outline">
                      <UserCircle className=" shrink-0"  />
                    </div>
                    <div className="space-y-sm">
                      <div className="flex items-center gap-sm">
                        <span className="font-bold text-on-surface">Jacob Miller</span>
                        <div className="flex text-primary">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className="w-[18px] h-[18px] fill-current text-primary shrink-0"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-body-md text-on-surface-variant italic leading-relaxed">
                        &quot;Dr. Vance provided a soil health roadmap that transformed our corn yields within two seasons. Extremely
                        professional and data-driven.&quot;
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-md border-t border-outline-variant/40 pt-xl">
                    <div className="w-12 h-12 rounded-full bg-surface-container shrink-0 flex items-center justify-center text-outline">
                      <UserCircle className=" shrink-0"  />
                    </div>
                    <div className="space-y-sm">
                      <div className="flex items-center gap-sm">
                        <span className="font-bold text-on-surface">Sarah Chen</span>
                        <div className="flex text-primary">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className="w-[18px] h-[18px] fill-current text-primary shrink-0"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-body-md text-on-surface-variant italic leading-relaxed">
                        &quot;The remote video consultation saved us thousands in travel costs. Her diagnostic skills through
                        high-res video are impressive.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Knowledge Center Publications */}
            <div className="col-span-12 lg:col-span-4 space-y-xl">
              <div className="bg-surface-container-low rounded-2xl p-lg md:p-xl border border-outline-variant shadow-sm space-y-lg">
                <div className="flex justify-between items-center">
                  <h2 className="text-title-md font-title-md text-on-surface font-bold flex items-center gap-sm">
                    <BookOpen className="text-primary shrink-0"  />
                    Publications
                  </h2>
                  <Link href="/knowledge" className="text-label-sm text-primary hover:underline font-bold">
                    View All
                  </Link>
                </div>
                <div className="flex flex-col gap-lg">
                  {/* Publication 1 */}
                  <div className="group cursor-pointer">
                    <div className="h-40 rounded-xl overflow-hidden mb-md border border-outline-variant/30">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt="Microscopic view of healthy soil networks"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCIYi_d-G8nWeuykdXs3FCUO5y1l1JfwIBbYn8ukIeGN31GjXwYp42QxmcgsBChOTuP6pzQcy8ocMN5dvKsCTinAfGXzq38JgNbd0vuDXPLmsW4mYF4yqf1nZrik_0_FFP22TQWUPsmycp3EIqHzIO4Pm1yoHstfy6Z-AjhNy8XbNLCfppVOGdWw6UhI6uNXNqzJtZ7U0NiT4-ur2eCOi6-Se_Zm9rEpoeeyu72XF3IKmIwNcf6-sOOyEPJZPj_7BRklVK7vF5rw"
                      />
                    </div>
                    <span className="text-label-sm font-label-sm text-secondary font-bold">Research Paper • 12 min read</span>
                    <h3 className="text-body-lg font-bold text-on-surface mt-xs group-hover:text-primary transition-colors leading-snug">
                      Microbial Resilience in Semi-Arid Climates
                    </h3>
                    <p className="text-body-md text-on-surface-variant mt-xs line-clamp-2 leading-relaxed">
                      A study on how specific fungal networks improve water retention in wheat production.
                    </p>
                  </div>
                  {/* Publication 2 */}
                  <div className="group cursor-pointer">
                    <div className="h-40 rounded-xl overflow-hidden mb-md border border-outline-variant/30">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt="High latitude cereal crop field"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs3Obyu1knev0LcYRhLaoi-aZFqhLcnqI2sOP2_DGg-LzA158OUS8pfeXlrjGFIrpPOGs8qVeUQOXZvE27E_sGNR8304Z_WvhncJRq-H68F9K3IO25vit8wuyFdq0Jdl_xf6jcJDHLaVfcDGsG1kbuiG61JmI7KVn84dr7kpamQss1mNMgf6djSNWYalCLW23KLmzWKYly9JHuRy1lPO2bynYXhOYfKiN5t4hVkWKP-CZUOfkjaTLdXhdKvR2lsjDVncL1HprVQA"
                      />
                    </div>
                    <span className="text-label-sm font-label-sm text-secondary font-bold">Technical Guide • 8 min read</span>
                    <h3 className="text-body-lg font-bold text-on-surface mt-xs group-hover:text-primary transition-colors leading-snug">
                      Transitioning to No-Till: A Case Study
                    </h3>
                    <p className="text-body-md text-on-surface-variant mt-xs line-clamp-2 leading-relaxed">
                      Lessons learned from a 5,000-acre transition over three harvest cycles.
                    </p>
                  </div>

                  {/* Soil health checklist download */}
                  <div className="p-md bg-white rounded-xl border border-outline-variant flex items-center gap-md shadow-sm">
                    <FileText className="text-tertiary text-display-lg shrink-0"  />
                    <div>
                      <p className="font-bold text-on-surface text-body-md leading-tight">Soil Health Checklist (PDF)</p>
                      <p className="text-[11px] text-on-surface-variant mt-1">Free Download • 2MB</p>
                    </div>
                    <button className="ml-auto p-xs rounded-full hover:bg-surface-container flex items-center justify-center text-primary">
                      <Download className=" shrink-0"  />
                    </button>
                  </div>
                </div>
              </div>

              {/* Specialty Card Custom Quote */}
              <div className="bg-surface-container-lowest border border-outline-variant/80 p-lg rounded-2xl shadow-md relative overflow-hidden">
                <div className="relative z-10 space-y-md">
                  <h4 className="text-title-md font-bold text-primary">Need a Custom Quote?</h4>
                  <p className="text-body-md text-on-surface-variant leading-relaxed">
                    For corporate advisory, long-term soil monitoring programs, or speaking engagements.
                  </p>
                  <button className="w-full py-md border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary/5 transition-colors">
                    Inquire Today
                  </button>
                </div>
                {/* Subtle graphic element */}
                <div className="absolute -right-10 -bottom-10 opacity-10 text-primary pointer-events-none select-none">
                  <FlaskConical className="text-[160px] shrink-0"  />
                </div>
              </div>
            </div>
          </div>
    </DashboardLayout>
  );
}
