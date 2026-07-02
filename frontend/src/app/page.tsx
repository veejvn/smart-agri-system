"use client";

import Link from "next/link";
import {
  Sun,
  Brain,
  ArrowRight,
  TrendingUp,
  Users,
  ShoppingCart,
  ChevronRight,
  Lock
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-on-background">

      {/* Main Content Area */}
      <main className="min-h-screen flex flex-col">
        {/* TopNavBar */}
        <Header showNav activeNav="home" showSearch showRoleSwitcher showStats />


        {/* Hero Section */}
        <section className="relative min-h-[600px] flex items-center overflow-hidden px-margin-mobile md:px-xxl py-xl">
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover brightness-[0.85]"
              alt="Emerald farm at sunrise"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAYQsOBUfBEyxDdO9bewLFBld_CKsS_xmWxQIY9is5ourEWFBmZDxyxGZs7FNYEIVJ2a-RQTDKUTRIIiPn-Qq5MqWwqQ71SQuOJ2wfD3S4KNRyqaKxmpwdH7XR1j_B8brLbTih3jNEYTPe_ceULwzBW2ikkTujeAlM4LRAgYyuJnekod8KD7VKk7VixuQQsUTX-YAMn1XBFjRWOHrGwwMyW-aT2CHTNLaAoEqV8PgBmEXdaEFIOib3inwR6eTgQrEJEtbD8gkeEA"
            />
            <div className="absolute inset-0 bg-linear-to-r from-background/95 via-background/40 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block bg-primary-container text-on-primary px-md py-xs rounded-full text-label-sm font-bold mb-md">
              REVOLUTIONIZING AGRICULTURE
            </span>
            <h1 className="text-headline-lg-mobile md:text-display-lg font-display-lg text-on-surface leading-tight mb-md">
              Cultivate the Future with Intelligence
            </h1>
            <p className="text-body-lg text-on-surface-variant mb-xl">
              AgriSmart Pro integrates real-time IoT data, AI diagnostics, and a global marketplace to empower modern growers with unprecedented control and profitability.
            </p>
            <div className="flex flex-col sm:flex-row gap-md">
              <Link href="/dashboard" className="bg-primary text-on-primary px-xxl py-lg rounded-xl font-bold hover:scale-[1.02] transition-transform shadow-lg text-center">
                Join the Ecosystem
              </Link>
              <a href="#demo" className="bg-surface-container-lowest text-primary border border-outline-variant px-xxl py-lg rounded-xl font-bold hover:bg-surface-container-low transition-colors text-center">
                Watch Demo
              </a>
            </div>
          </div>
        </section>

        {/* Live Ticker Marquee */}
        <section className="bg-surface-container-low py-sm border-y border-outline-variant overflow-hidden">
          <div className="flex whitespace-nowrap overflow-x-hidden relative">
            <div className="flex gap-xl px-xl items-center animate-marquee">
              <div className="flex items-center gap-xs"><span className="font-bold text-primary">CORN (C1):</span> <span className="text-body-md">$4.52</span> <span className="text-secondary text-label-sm">▲ 1.2%</span></div>
              <div className="flex items-center gap-xs"><span className="font-bold text-primary">WHEAT (W1):</span> <span className="text-body-md">$6.18</span> <span className="text-error text-label-sm">▼ 0.4%</span></div>
              <div className="flex items-center gap-xs"><span className="font-bold text-primary">SOY:</span> <span className="text-body-md">$13.40</span> <span className="text-secondary text-label-sm">▲ 0.8%</span></div>
              <div className="flex items-center gap-xs"><span className="font-bold text-primary">LOCAL TEMP:</span> <span className="text-body-md">24°C</span> <Sun className="text-secondary w-4 h-4 shrink-0" /></div>
              <div className="flex items-center gap-xs"><span className="font-bold text-primary">HUMIDITY:</span> <span className="text-body-md">62%</span> <span className="text-on-surface-variant text-label-sm">Optimal</span></div>
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex gap-xl px-xl items-center animate-marquee absolute top-0 left-full">
              <div className="flex items-center gap-xs"><span className="font-bold text-primary">CORN (C1):</span> <span className="text-body-md">$4.52</span> <span className="text-secondary text-label-sm">▲ 1.2%</span></div>
              <div className="flex items-center gap-xs"><span className="font-bold text-primary">WHEAT (W1):</span> <span className="text-body-md">$6.18</span> <span className="text-error text-label-sm">▼ 0.4%</span></div>
              <div className="flex items-center gap-xs"><span className="font-bold text-primary">SOY:</span> <span className="text-body-md">$13.40</span> <span className="text-secondary text-label-sm">▲ 0.8%</span></div>
              <div className="flex items-center gap-xs"><span className="font-bold text-primary">LOCAL TEMP:</span> <span className="text-body-md">24°C</span> <Sun className="text-secondary w-4 h-4 shrink-0" /></div>
              <div className="flex items-center gap-xs"><span className="font-bold text-primary">HUMIDITY:</span> <span className="text-body-md">62%</span> <span className="text-on-surface-variant text-label-sm">Optimal</span></div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-xxl px-margin-mobile md:px-xxl max-w-container-max mx-auto w-full">
          <div className="mb-xl text-center">
            <h2 className="text-headline-lg font-headline-lg text-on-surface">Intelligent Growth Tools</h2>
            <p className="text-body-lg text-on-surface-variant">Precision technology designed for the modern farm environment.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
            {/* Feature 1 */}
            <div className="md:col-span-8 bg-surface-container-lowest rounded-xl p-lg border border-outline-variant flex flex-col justify-between overflow-hidden relative group min-h-[280px] hover:shadow-md transition-shadow">
              <div className="relative z-10">
                <Brain className="text-primary w-10 h-10 mb-md shrink-0" />
                <h3 className="text-title-md font-title-md mb-sm">AI-Powered Farming</h3>
                <p className="text-body-md text-on-surface-variant">Our neural networks analyze soil moisture, nitrogen levels, and pest migration patterns to provide actionable daily reports.</p>
              </div>
              <div className="mt-lg z-10">
                <Link href="/agroai" className="text-primary font-bold flex items-center gap-sm hover:opacity-85">
                  Explore Models <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
              </div>
              <div className="absolute bottom-0 right-0 w-1/2 h-full opacity-10 group-hover:opacity-20 transition-opacity">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover translate-y-12 transition-transform duration-500 group-hover:translate-y-8"
                  alt="AI crop monitoring"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-OmZDO93Ut6gqDDvTNKBIaJE-_vDlOLJ79fsOYazP50SozOqI8WpMBgWTe3vsKeatB_P05mIf1qQQQHtXtb6wSjO_7UxBsNXpBeJ4gVvXk9vmV2saycL19X85xtw7U5wIqCSvuLYn66J8FZhkYRz8u5dM1-hk-zwPRmKtFpwjIrksB_M437DnDNcyVbvMthSAju-aCe5Gilp1HWLYz_i4ANCksQw65vt5yrZZdoOZ_miJ9bybL7DCVEnEkJocrBABKqZN601AqQ"
                />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="md:col-span-4 bg-primary text-on-primary rounded-xl p-lg flex flex-col justify-between min-h-[280px] hover:shadow-md transition-shadow">
              <div>
                <TrendingUp className="w-10 h-10 mb-md shrink-0" />
                <h3 className="text-title-md font-title-md mb-sm">Market Intelligence</h3>
                <p className="text-body-md opacity-90">Real-time futures, historical pricing trends, and logistical route optimization for maximum profit.</p>
              </div>
              <Link href="/market-trends" className="bg-on-primary text-primary px-lg py-sm rounded-lg font-bold text-label-sm w-fit text-center block hover:opacity-90">
                Live Dashboard
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="md:col-span-4 bg-secondary-container text-on-secondary-container rounded-xl p-lg flex flex-col justify-between overflow-hidden relative min-h-[280px] hover:shadow-md transition-shadow">
              <div>
                <Users className="w-10 h-10 mb-md shrink-0" />
                <h3 className="text-title-md font-title-md mb-sm">Expert Consultation</h3>
                <p className="text-body-md opacity-80">Connect with certified agronomists for personalized soil reports and climate adaptation strategies.</p>
              </div>
              <Link href="/experts" className="underline font-bold text-label-sm hover:opacity-85">Book a session</Link>
            </div>

            {/* Feature 4 */}
            <div className="md:col-span-8 bg-surface-container rounded-xl p-lg flex flex-col md:flex-row gap-lg items-center min-h-[280px] hover:shadow-md transition-shadow border border-outline-variant">
              <div className="flex-1">
                <h3 className="text-title-md font-title-md mb-sm">Satellite Monitoring</h3>
                <p className="text-body-md text-on-surface-variant">Continuous field monitoring with sub-meter resolution, providing real-time alerts on crop stress or irrigation leaks.</p>
              </div>
              <div className="w-full md:w-1/2 h-full rounded-lg overflow-hidden border border-outline-variant min-h-[160px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover"
                  alt="Satellite monitoring"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuACQX02ZEMV7GcDNBkJd_vFfflAT5OHsDvyi91YLHyDQ6X_5nD0mJY9UuGrYWb9agu2KQkVuZbB8YiHuQ617j71nRK5dRTw2PD5prSBeZIWkfhsrnDSm3R5tWyhYjLbg53NXpF_sA3fZpTptgNaFVXlho8-EhEQpPJDBnUusAjabccV08QNn04XOH0dLRvCUj25A_upUdVQM9eAtO1Ckfg8DUu2yuVWnt4aIVZAXkzGNSjFhj3GcK3xhuXjP6gu-Nf82sGlGRV7xw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Marketplace Preview */}
        <section className="bg-surface-dim py-xxl w-full">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-xxl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-xl gap-md">
              <div>
                <h2 className="text-headline-lg font-headline-lg text-on-surface">AgroStream Marketplace</h2>
                <p className="text-body-lg text-on-surface-variant">The direct bridge between premium producers and institutional buyers.</p>
              </div>
              <Link href="/marketplace" className="bg-primary text-on-primary px-lg py-md rounded-xl font-bold flex items-center gap-sm hover:opacity-90">
                View Full Marketplace <ShoppingCart className="w-5 h-5 shrink-0" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg">
              {/* Category Card 1 */}
              <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                <div className="h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Premium Seeds"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyGD_hwixvXzDuaFIBIP-vW5JxqbWwHwrSijNGdZs_rCf4n-rVENOelte7-k2BJRbs5h_oNuUaD31l4vmH43xJOSdkDDLeT7FA5U-fdLVkJup3qKuPEZ-IaHzuq_SwBD1eLPu-x_tVfNrGg1CWOLmYLSymiyqPsRSoWLY94RNkgy_vcBVcsHKNi_Wi6ltUAEK_qHkdM5RoU2HfAU_GAlCmfiGke4xhQ_ec4_iEh__p0lpp8cXJEOnELOQCwJKr7bF-juftWjwPtA"
                  />
                </div>
                <div className="p-md">
                  <div className="flex justify-between items-center mb-xs">
                    <h4 className="text-title-md font-bold">Premium Seeds</h4>
                    <span className="bg-secondary-container text-on-secondary-container text-[10px] px-sm py-[2px] rounded-full font-bold">TOP CATEGORY</span>
                  </div>
                  <p className="text-body-md text-on-surface-variant mb-md">Drought-resistant hybrids and heritage varieties.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-label-sm font-bold text-primary">1,240+ Listings</span>
                    <ChevronRight className="w-5 h-5 text-on-surface-variant shrink-0" />
                  </div>
                </div>
              </div>

              {/* Category Card 2 */}
              <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                <div className="h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Wholesale Crops"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrI7LKdFuxc8l9s5rNu20C9TJtxXvEKU33l6GVbjhigU7BCrMIx43ZbkEO0MTiBcMESzhKfxjeFRs17zGB_c-NyqD7kdcWPse_LqbA_XAi0Gf9LkhFK554AuLRUxzdGNgqgh9ioyukFVLXQbF7LoebElMB3--APpyv7Ri3FbiivjfCyEIOdLsnRreWj5A4icwE9xnokit0tAa3NmWOhcWjTHb9zvR0V4_-NbqOQgs9kIvl0T64fAKKetuVR2y3Ka3xrjXkvf9Sbw"
                  />
                </div>
                <div className="p-md">
                  <h4 className="text-title-md font-bold mb-xs">Wholesale Crops</h4>
                  <p className="text-body-md text-on-surface-variant mb-md">Bulk contracts for seasonal harvests and futures.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-label-sm font-bold text-primary">850+ Active Deals</span>
                    <ChevronRight className="w-5 h-5 text-on-surface-variant shrink-0" />
                  </div>
                </div>
              </div>

              {/* Category Card 3 */}
              <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                <div className="h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Machinery"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCihAu5Zi9ma7tDzJAwvBM1yY9dRwdN2vt3aydBXTY_UhrX6-_W4Z46SkjPi7qXSvMIjAGoOlV82_kal1MMXu3Yq_4k3Rzn5SKFbd_aSPoCKnz5JMT6BFt4FlyjOs0MxBFbJ56tVwgaCecmKdC0Jo2ta6qnhSs_pHPJNA75R7LNB6GUHQJIF5ac-bEOBpeviBKXZBHtktGQrGZTq54N0VqC0fAoLzDUWh_dQxnaqPc7QANvhVDm0x1uvR_VtdVLtYeG-6FAIcXq0g"
                  />
                </div>
                <div className="p-md">
                  <h4 className="text-title-md font-bold mb-xs">Machinery</h4>
                  <p className="text-body-md text-on-surface-variant mb-md">Leasing and purchase for AI-driven equipment.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-label-sm font-bold text-primary">320+ Available</span>
                    <ChevronRight className="w-5 h-5 text-on-surface-variant shrink-0" />
                  </div>
                </div>
              </div>

              {/* Category Card 4 */}
              <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                <div className="h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="Organic Inputs"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqEfw5llNyH-i-jYypLaHIwp3x-R1girGc25uL_es6tNkfOLZjgKooHRz5boyoaktCdolhLXFuI3FmD0aC9EtbRl6X74xCBotMTfsrKvZnmRx0Hkbj194XuJRI-AzrFt-Cx3Y6twPibiOio-bZBGIFzBROEYbbTVZJ5jxc400_v-Y3DucmDr36xtwcLVbXDGMpJkDELtGbz_egvJb8E5Rv53h8yoDihwh02RegYoraxgD-EsMhBCynC7WL8Kz-bVs9r1WQeBuOYw"
                  />
                </div>
                <div className="p-md">
                  <h4 className="text-title-md font-bold mb-xs">Organic Inputs</h4>
                  <p className="text-body-md text-on-surface-variant mb-md">Sustainable fertilizers and biological control agents.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-label-sm font-bold text-primary">2,100+ Products</span>
                    <ChevronRight className="w-5 h-5 text-on-surface-variant shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof & Community */}
        <section className="py-xxl px-margin-mobile md:px-xxl max-w-container-max mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-xxl items-center">
            <div className="space-y-lg">
              <h2 className="text-headline-lg font-headline-lg text-on-surface">Rooted in Global Trust</h2>
              <div className="space-y-lg">
                <div className="glass-card p-lg rounded-xl border-l-4 border-primary">
                  <p className="text-body-lg italic mb-md">&quot;AgriSmart Pro transformed our 500-acre corn operation. We&apos;ve seen a 22% increase in yield while reducing irrigation costs by nearly a third.&quot;</p>
                  <div className="flex items-center gap-md">
                    <div className="w-12 h-12 rounded-full bg-surface-container-highest overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="w-full h-full object-cover" alt="Mark Henderson" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2TrkzicQyQk-E0UxFL7IHxOKL0O1WpUya5IDb0WvMpHZSM0bTi401IHrRu9KiX5bX3MKGGGiFFuldOPxwwXSMnn4dInOnqrVEImDVwBspCiuTecJjoJkdlOF6NnQ1ozzgKnGdyBGOdhnEBN3sVwdbrC_U7qQHKHbxJnnsrsy0A4ixvzC7zCxaOy9JTQw-d8_6yoc0_2RhboLj_3k0ocR9qeKN3JBRQIWDFcq1QDKqf8s3j2jxZvEyITpLuFlLIU6Xsbav7SbtkA" />
                    </div>
                    <div>
                      <h5 className="font-bold text-on-surface">Mark Henderson</h5>
                      <p className="text-label-sm text-on-surface-variant">Principal, Henderson Bio-Farms</p>
                    </div>
                  </div>
                </div>
                <div className="glass-card p-lg rounded-xl border-l-4 border-secondary">
                  <p className="text-body-lg italic mb-md">&quot;The market intelligence platform gave us the edge we needed for grain futures this season. Absolute game-changer for mid-size exporters.&quot;</p>
                  <div className="flex items-center gap-md">
                    <div className="w-12 h-12 rounded-full bg-surface-container-highest overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="w-full h-full object-cover" alt="Elena Rodriguez" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDSbTywgEpTxfpR49wzmbGp6Yc5jtZayUFFrw4SM5PdgzIhuuDO9ybu-23tEoV7nxOtxO_Pv8qd5r3clhVwsmxKfIOOOIUyaRpMq1azYuYunrbz5EgwNwb5yt0Db4hkQdc3UImiwtNpoY2XnfUNgIZSH2NNvHHIxxfJjze31CgR-cVPc8PmkqZjS_09rSOL70ENTnsBcDcn1wFsLBtWBJv6zizAV5soxoeTMUAz0XHJulHfVNRXUPDGT66o3XwMADuiVXA8yIMxQ" />
                    </div>
                    <div>
                      <h5 className="font-bold text-on-surface">Elena Rodriguez</h5>
                      <p className="text-label-sm text-on-surface-variant">Chief Operations, Global Harvest Co.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-xxl p-xl shadow-xl border border-outline-variant relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg mb-md">Thriving Community</h3>
                <p className="text-body-lg text-on-surface-variant mb-xl">Join 50,000+ agricultural professionals sharing insights daily.</p>
                <div className="grid grid-cols-2 gap-lg">
                  <div className="text-center p-md bg-surface-container rounded-xl">
                    <div className="text-display-lg font-display-lg text-primary">12K+</div>
                    <div className="text-label-sm font-bold uppercase tracking-wider text-on-surface-variant">Active Discussions</div>
                  </div>
                  <div className="text-center p-md bg-surface-container rounded-xl">
                    <div className="text-display-lg font-display-lg text-secondary">4.9/5</div>
                    <div className="text-label-sm font-bold uppercase tracking-wider text-on-surface-variant">Expert Rating</div>
                  </div>
                  <div className="text-center p-md bg-surface-container rounded-xl">
                    <div className="text-display-lg font-display-lg text-primary">150+</div>
                    <div className="text-label-sm font-bold uppercase tracking-wider text-on-surface-variant">Weekly Webinars</div>
                  </div>
                  <div className="text-center p-md bg-surface-container rounded-xl">
                    <div className="text-display-lg font-display-lg text-secondary">24/7</div>
                    <div className="text-label-sm font-bold uppercase tracking-wider text-on-surface-variant">Expert Support</div>
                  </div>
                </div>
                <button className="w-full mt-xl bg-primary-container text-on-primary py-lg rounded-xl font-bold hover:opacity-90 transition-opacity">Enter the Forum</button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-xxl px-margin-mobile relative overflow-hidden w-full">
          <div className="max-w-container-max mx-auto bg-primary text-on-primary rounded-[32px] p-xl md:p-xxl relative overflow-hidden flex flex-col md:flex-row items-center gap-xxl">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
            </div>
            <div className="relative z-10 flex-1">
              <h2 className="text-headline-lg font-headline-lg mb-md">Ready to scale your farm&apos;s potential?</h2>
              <p className="text-body-lg opacity-80 mb-xl">Get started with a free field audit and experience the precision of AgriSmart Pro&apos;s ecosystem today.</p>
              <div className="flex flex-wrap gap-md">
                <Link href="/dashboard" className="bg-on-primary text-primary px-xxl py-lg rounded-xl font-bold text-title-md hover:scale-[1.02] transition-transform">
                  Get Started for Free
                </Link>
                <a href="#sales" className="bg-transparent text-on-primary border border-on-primary/30 px-xxl py-lg rounded-xl font-bold text-title-md hover:bg-on-primary/10 transition-colors">
                  Talk to Sales
                </a>
              </div>
            </div>
            <div className="relative z-10 w-full md:w-1/3">
              <div className="bg-white/10 backdrop-blur-md p-lg rounded-xxl border border-white/20">
                <div className="flex items-center gap-md mb-md">
                  <Lock className="w-8 h-8 text-secondary-container shrink-0" />
                  <h4 className="font-bold">Enterprise Security</h4>
                </div>
                <p className="text-body-md opacity-80">Your data is yours. We use industry-standard encryption and transparent data sovereignty protocols.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
