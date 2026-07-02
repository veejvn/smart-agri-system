"use client";

import { BadgeCheck, ChevronRight, Mail, ChevronLeft, Star } from "lucide-react";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { Expert } from "@/types";



export default function ExpertDirectory() {
  const [activeSpecialty, setActiveSpecialty] = useState("All");


  const specialties = ["All", "Crop Science", "Pest Management", "Soil Health", "Irrigation Tech"];

  const experts: Expert[] = [
    {
      id: "1",
      name: "Mark J. Sterling",
      specialty: "Pest Management",
      rating: 4.8,
      reviews: 94,
      experience: 8,
      rate: 85,
      available: "Available today",
      availableStatus: "online",
      description: "Integrated pest control specialist with a focus on organic cotton and soybean protection systems.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDw9EHh9O-391oJBXVOCPoOP3dhNo_FiuWmRYpi9JehC-gV6UQm1ML9LlyaFwsYKQ5EbXx13udE_k0wpkGU3sLi4HGnarkguyjmCrl90VDylURTh_jydTtSYW5eNOFnNl3rgFiYHie-DikrJlrp2ElwzyLXrdSDGPjrtea3RlzEKI0opPXlGoI7vZYv1_q1k-B35BNDNrpM3Xq8FiPFNA2ZfKwi6s7TSF2c7vHwNybqyMFChSKqtIFdZ03padby8q6sAbzUPUcp2g",
    },
    {
      id: "2",
      name: "Sarah Chen",
      specialty: "Crop Science",
      rating: 4.9,
      reviews: 112,
      experience: 12,
      rate: 120,
      available: "Next: Tomorrow 9AM",
      availableStatus: "away",
      description: "Expert in high-yield corn varieties and precision genetic placement for diverse climatic zones.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXCqswFPGEETH6g_TXnfzGR9pnrYjsJcZ6lfTUfYmtIUx3PkFaO3qSMBDRyqYht0hAKCoIQ6KNoucnR4Rt4lhQAZ8w9zaJQhCa7_WKor5b7Qg_NCgSbE2oLvAMsZhWRRT0R1ArQlu9EqSsX-vXDScZRdpAgkmHJqk6ZSyrS_PKEDlglcIekvJa_Gz5t9gAuj-FDXIjbEs6boIP71gLTzkUQlksI1ha3uXwk2PlSWv0rGG_cafKo8TLPy0wJoaywfmR3eEchfAj1w",
    },
    {
      id: "3",
      name: "James O'Connell",
      specialty: "Soil Health",
      rating: 5.0,
      reviews: 145,
      experience: 22,
      rate: 150,
      available: "Available today",
      availableStatus: "online",
      description: "Specialist in carbon sequestration and nitrogen cycle optimization for large-scale operations.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-Em2TRV0cEgIV0CMR21zu5KNMXthDi0hlb_6GIh6TJo9L8lgJDU1eXcTYJzNgno5L1sMPK_1OmNraGQtVkpRuoVSTgaiBb1qcfvHJa3UDCt9ux2PYZp2iSsbO8pFIzgYl9Ad4Xu0cLY7Bi_7EvBXxZouMWwSx0ydQ-EMicDqoGqr7gXOkJ-yXsG2ddaGZbSLjqYbujQETiJpKA-c1B1ZKTfYq0ILHjTeIXkQH4uT2cGb1HzbWa7gFvZcextj8IviB4YZL9eYm7w",
    },
    {
      id: "4",
      name: "Maya Patel",
      specialty: "Irrigation Tech",
      rating: 4.7,
      reviews: 58,
      experience: 6,
      rate: 95,
      available: "Away until Monday",
      availableStatus: "offline",
      description: "Designing smart drip irrigation systems with integrated satellite sensor feedback loops.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7vD8FAzEhKJB73ExLhH2ZoAEmC7tavUqsUdvzkCm-82556Qo86Jl67fC-Hxr3Mc8P73VYC7u26xgPQyN7omfoPs3ABrJoaJ14T7WM1drdRbL9lmv9yEpWwA6Ascf4QO0-YQOs-FpknWD6dYvSTTzz51eArgfV4r8nv73tesOqPu8m3Q4aC59tW8sJeANA0oZkTNJX9t6dXGoRHZsJiYROsjOMMx6Wwwzr8FKNU7081ju72gJ7IkmLptEoyOpI956PqueBLT__yQ",
      waitlist: true,
    },
    {
      id: "5",
      name: "David Vance",
      specialty: "Soil Health", // Matches Regenerative Ag / Soil Health
      rating: 4.8,
      reviews: 76,
      experience: 10,
      rate: 110,
      available: "Available today",
      availableStatus: "online",
      description: "Specializing in no-till farming techniques and multi-species cover cropping strategies.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNTH3OJbJ1gerUfn23NE6GxBKrU88RGlJeQvaSM9V0DMwrz-kDS3zLMrcAJ1JsE21JUuK-gi5ogJFB6Y3BvRgTHPiX-S3HaZhOOenQZwsKspRr_mGuH2Y-HYrJJ7PutOrQYGWyQqBHWbzOBZi4c3RrWpTwSSuQq_8FX6I8Pxe6LmQoxcS8uexWjWKR56Qs2kq5xo9WhNjoV3hO5mKh5DSWAMoUsC10nhdin_4RBdMRLziiRY2_EXt5UjjkO_votXHwOMQII8tKYQ",
    },
    {
      id: "6",
      name: "Dr. Linda Wu",
      specialty: "Crop Science", // Matches Plant Pathology
      rating: 4.9,
      reviews: 83,
      experience: 14,
      rate: 135,
      available: "Available today",
      availableStatus: "online",
      description: "Diagnostic expert for fungal and bacterial diseases in stone fruit and citrus groves.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeuDN6R4yMmUzi1dpJUkNy1yrJqyPV96KA27qbXdRTZlPYf7c9a3eZW5tql0V6Ok7S60aOenEeKfs2yPfET-i-Wskz1v8QSlWO7vgTP6ykiuH6GrJhMlkgHth0M7yLCafufONvM5_dCDRGTc0OAP59DkmjugeTtDMH2trDGXX6yAG7DvXzp4oukQW5Pxbyid1_pOCex_G6q1IGM0itgTHoz2ercUH-ZSx6GQVonHT5zeTqRrXpvofXgyfDoSQRU0cG9xTZxEPe3A",
    },
  ];

  const filteredExperts = activeSpecialty === "All"
    ? experts
    : experts.filter((e) => e.specialty === activeSpecialty);

  return (
    <div className="min-h-screen bg-background text-on-background">
      <Sidebar />

      {/* Main Content Area */}
      <main className="md:ml-64 min-h-screen flex flex-col">
        {/* Top Bar */}
        <Header
          showSearch
          searchPlaceholder="Search experts, specialties, or topics..."
          showStats
          showRoleSwitcher
          showUser
          user={{
            avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3l9dlfZGDxeqFXgV0tcbCAf-6-w4eccFmlUu75UyLOzr2Mk3JXN-mWY4VMgVD5aRvScTuePWib93HtXTvIlK7o1gbFqa10IHgRVMYp54fqKhK7yWFtB708LIZQpOY8PCyvtOftk6xLjok2NGoEm7yRMuYZnIdexorJ4e2--ovc41dYPgTV3gIPNVFFz_UuMbjaN9HHMG7z8O4_Pd6TA3e_llC7MCJ77VM6FqsXVGk9e3mLJwXzAkLLE9ZH_gEUA-TnyXUAknGWg"
          }}
        />


        {/* Content Canvas */}
        <div className="p-lg md:p-xl max-w-6xl mx-auto grow w-full space-y-xl">
          {/* Hero / Featured Section */}
          <section className="space-y-lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
              <div>
                <h2 className="text-headline-lg font-headline-lg text-on-surface font-bold">Expert Consultations</h2>
                <p className="text-body-lg text-on-surface-variant">
                  Connect with world-class agronomists and specialists to optimize your yield.
                </p>
              </div>
              <div className="flex gap-sm bg-surface-container-low p-base rounded-xl border border-outline-variant">
                <button className="px-lg py-sm rounded-lg bg-white shadow-sm text-primary font-bold text-label-sm">
                  Directory
                </button>
                <button className="px-lg py-sm rounded-lg text-on-surface-variant font-medium text-label-sm hover:bg-surface-container transition-all">
                  My Bookings
                </button>
              </div>
            </div>

            {/* Featured Expert Card */}
            <div className="relative overflow-hidden rounded-2xl bg-primary-container text-on-primary-container p-xl flex flex-col md:flex-row gap-xl items-center shadow-xl">
              <div className="absolute top-0 right-0 p-lg">
                <span className="bg-secondary-container text-on-secondary-container px-md py-xs rounded-full text-[10px] font-bold flex items-center gap-xs">
                  <Star className="w-4 h-4 fill-current shrink-0" />
                  FEATURED EXPERT
                </span>
              </div>
              <div className="w-44 h-44 rounded-2xl overflow-hidden shadow-2xl shrink-0 border-2 border-white/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Featured Expert"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAezoa7jqWOMDkp10g2bRp5xFA5J9oaDJmPUVIJGB7emqaWb2ZBoTpJUVIK6_jgDtnGQIdSxVruItjcu2CzuvxYI8RD9e2jgWAMkvHv9HoPxyWM4PxSlOju1Y8--qc9LzWlHpfIdTsouF7NEUcQZQh_PTENcak6dBzVes-L1aUSOcLXoWDLWYOPY3BCEmpTbPG0bUmZ52cgY4WtznyWJJxIEFm5mICqznNgovaodAioX6ZcSUs7fzoQMNCFVtujzeDj4B2_hHd7Sg"
                />
              </div>
              <div className="grow space-y-md z-10">
                <div className="space-y-xs">
                  <h3 className="text-display-lg font-display-lg font-bold leading-tight">Dr. Elena Rodriguez</h3>
                  <p className="text-title-md font-title-md opacity-90 font-medium">
                    Senior Soil Microbiologist & Climate Resilience Specialist
                  </p>
                </div>
                <div className="flex flex-wrap gap-md">
                  <span className="flex items-center gap-xs bg-white/10 px-md py-xs rounded-full border border-white/20 text-label-sm font-semibold">
                    <BadgeCheck className="text-[18px] shrink-0"  /> 15+ Years Exp.
                  </span>
                  <span className="flex items-center gap-xs bg-white/10 px-md py-xs rounded-full border border-white/20 text-label-sm font-semibold">
                    <Star className="w-[18px] h-[18px] fill-current shrink-0" />{" "}
                    4.9 (128 Reviews)
                  </span>
                </div>
                <p className="text-body-lg max-w-2xl opacity-85 leading-relaxed">
                  Specializing in regenerative agriculture and soil health restoration. Dr. Rodriguez has helped over 200 commercial
                  farms reduce synthetic inputs by 30% while maintaining yield consistency.
                </p>
                <div className="flex gap-md pt-md">
                  <Link
                    href="/book-consultation"
                    className="bg-white text-primary-container px-xl py-md rounded-xl font-bold hover:scale-[1.03] transition-transform text-center"
                  >
                    Book Consultation
                  </Link>
                  <button className="border border-white/30 text-white px-xl py-md rounded-xl font-bold hover:bg-white/10 transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Filters Section */}
          <section className="flex flex-col lg:flex-row gap-lg items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-sm">
              {specialties.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setActiveSpecialty(spec)}
                  className={`px-md py-sm rounded-full text-label-sm font-semibold transition-all ${
                    activeSpecialty === spec
                      ? "bg-primary text-white font-bold"
                      : "bg-white border border-outline-variant text-on-surface-variant hover:bg-surface-container"
                  }`}
                >
                  {spec === "All" ? "All Specialties" : spec}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-md">
              <span className="text-label-sm text-outline font-medium">Sort by:</span>
              <select className="bg-white border border-outline-variant rounded-lg text-label-sm font-semibold py-xs px-sm focus:ring-primary focus:border-primary outline-none">
                <option>Highest Rated</option>
                <option>Most Experienced</option>
                <option>Availability</option>
              </select>
            </div>
          </section>

          {/* Expert Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg">
            {filteredExperts.map((exp) => (
              <div
                key={exp.id}
                className="bg-white rounded-2xl p-md border border-outline-variant flex flex-col h-full hover:-translate-y-xs hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-md mb-md">
                  <div className="relative shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt={exp.name} className="w-20 h-20 rounded-xl object-cover" src={exp.image} />
                    <span
                      className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${
                        exp.availableStatus === "online"
                          ? "bg-green-500"
                          : exp.availableStatus === "away"
                          ? "bg-amber-400"
                          : "bg-slate-300"
                      }`}
                    ></span>
                  </div>
                  <div className="grow">
                    <div className="flex justify-between items-start">
                      <h4 className="text-title-md font-bold text-on-surface">{exp.name}</h4>
                      <span className="text-primary font-bold flex items-center text-label-sm">
                        <Star className="w-4 h-4 fill-current mr-xs shrink-0" />{" "}
                        {exp.rating}
                      </span>
                    </div>
                    <p className="text-label-sm text-on-surface-variant font-medium">{exp.specialty}</p>
                    <p className="text-[11px] text-outline mt-xs font-semibold">{exp.available}</p>
                  </div>
                </div>
                <p className="text-body-md text-on-surface-variant mb-md grow leading-relaxed">{exp.description}</p>
                <div className="flex items-center justify-between py-sm border-t border-surface-container-high mb-md">
                  <div className="text-label-sm text-outline font-semibold">{exp.experience} Years Exp.</div>
                  <div className="text-title-md font-bold text-primary">
                    ${exp.rate}
                    <span className="text-label-sm text-outline font-normal">/hr</span>
                  </div>
                </div>
                {exp.waitlist ? (
                  <button className="w-full bg-surface-container text-outline py-sm rounded-xl font-bold cursor-not-allowed">
                    Join Waitlist
                  </button>
                ) : (
                  <Link
                    href="/book-consultation"
                    className="w-full bg-primary-container text-on-primary-container py-sm rounded-xl font-bold hover:bg-primary hover:text-white transition-colors text-center block"
                  >
                    Book Consultation
                  </Link>
                )}
              </div>
            ))}
          </section>

          {/* Pagination */}
          <section className="flex justify-center items-center gap-sm">
            <button className="p-sm rounded-lg hover:bg-surface-container transition-colors disabled:opacity-30" disabled>
              <ChevronLeft className=" shrink-0"  />
            </button>
            <button className="w-10 h-10 rounded-lg bg-primary text-white font-bold">1</button>
            <button className="w-10 h-10 rounded-lg hover:bg-surface-container transition-colors font-medium">2</button>
            <button className="w-10 h-10 rounded-lg hover:bg-surface-container transition-colors font-medium">3</button>
            <span className="px-sm text-outline font-semibold">...</span>
            <button className="w-10 h-10 rounded-lg hover:bg-surface-container transition-colors font-medium">12</button>
            <button className="p-sm rounded-lg hover:bg-surface-container transition-colors">
              <ChevronRight className=" shrink-0"  />
            </button>
          </section>
        </div>

        {/* Footer */}
        <Footer className="mt-auto" />
      </main>
    </div>
  );
}
