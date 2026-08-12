"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ImageIcon,
  Video,
  Calendar,
  MoreHorizontal,
  ThumbsUp,
  MessageSquare,
  Share2,
  BadgeCheck,
  Play,
  TrendingUp,
  Award,
  Plus,
} from "lucide-react";
import Header from "@/components/header";


export default function Community() {


  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* TopNavBar */}
      <Header
        showNav
        activeNav="community"
        showSearch
        showStats
        showRoleSwitcher
        containerClassName="max-w-container-max mx-auto"
      />


      <div className="flex max-w-container-max mx-auto min-h-screen">
        {/* Main Content */}
        <main className="flex-1 flex flex-col md:flex-row gap-lg p-lg bg-surface max-w-container-max mx-auto">
          {/* Feed Column */}
          <div className="flex-2 flex flex-col gap-lg">
            {/* Create Post Bar */}
            <div className="bg-surface-container-lowest p-md rounded-xl shadow-sm border border-outline-variant/30 flex items-center gap-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="User"
                className="w-10 h-10 rounded-full bg-surface-container object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU7laC_EeBU68J_GO_OBvtJedzCAjXAOxbJ-2OUtpJdr4HgLFfBCm4ePAbFls0UFO4tGp9xX_3DwIfZt0E_kkM3GrAi_HsMV-Mmp2i-LkfqVcztq8RbfXrQoFOT7SZKV3el6WulGA3MxQ5fNiodLmP6x7MvTEC3nbS-BanOWJnCUVUKMnklbrhRX7x-fc_JKjWQDEQdTL9pnR5wRSB9t8NXXFIttGk_ZMqUAmc__VVg1VENAXcygPKTVmC8fWh51FvTapTS3Vkkg"
              />
              <button className="flex-1 text-left px-lg py-md bg-surface-container-low hover:bg-surface-container transition-colors rounded-full text-on-surface-variant text-body-md">
                Chia sẻ kinh nghiệm làm nông của bạn...
              </button>
              <div className="flex items-center gap-sm text-primary">
                <button className="p-sm hover:bg-primary/10 rounded-full transition-colors">
                  <ImageIcon className="w-5 h-5 shrink-0" />
                </button>
                <button className="p-sm hover:bg-primary/10 rounded-full transition-colors">
                  <Video className="w-5 h-5 shrink-0" />
                </button>
                <button className="p-sm hover:bg-primary/10 rounded-full transition-colors">
                  <Calendar className="w-5 h-5 shrink-0" />
                </button>
              </div>
            </div>

            {/* Posts */}
            <div className="flex flex-col gap-lg">
              {/* Post 1: Image Post */}
              <article className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden hover:border-primary/30 transition-all duration-300">
                <div className="p-md flex items-center justify-between">
                  <div className="flex items-center gap-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt="Dr. Minh"
                      className="w-10 h-10 rounded-full bg-primary-container/20 object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5SJaZm80zKFzi6K1-zeYc8GuXUYYF25of-pCLeIf1WkMkt4AnWFDyQsP_D39kl9AdTJQWj-T8QCmosAc406-Zw4TiUp3ivjbE9-nPFnydDnNLq2gXHeEsAQp1pLTwZKQnAKJI6sCVdoSScpZqWB6mJA-aMr8P-semO9V9HeIIJpYGT1MVRRGXbyml4Q33sZbsdsXBXtdVAPKuFfoDMOup5h6p4qQMptD0_uUVPOQYW7vDLNuP5gvDJ0Tt8sw5GfxT5J6FZRqyDA"
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-sm">
                        <span className="font-bold text-on-surface">TS. Nguyễn Văn Minh</span>
                        <span className="px-sm py-0.5 bg-primary/10 text-primary rounded text-2.5 font-bold uppercase tracking-wider">Expert</span>
                      </div>
                      <span className="text-label-sm text-on-surface-variant">2 giờ trước • Toàn quốc</span>
                    </div>
                  </div>
                  <button className="text-on-surface-variant hover:text-primary transition-colors">
                    <MoreHorizontal className="w-5 h-5 shrink-0" />
                  </button>
                </div>
                <div className="px-md pb-md">
                  <h2 className="text-title-md font-bold mb-xs">Cách xử lý bệnh đạo ôn trên lúa mùa mưa</h2>
                  <p className="text-body-md text-on-surface-variant mb-md leading-relaxed">
                    Giai đoạn này độ ẩm cao rất dễ phát sinh đạo ôn lá. Bà con cần lưu ý kiểm tra đồng ruộng thường xuyên, đặc biệt là những trà lúa bón thừa đạm...
                  </p>
                  <div className="flex flex-wrap gap-sm mb-md">
                    <span className="px-md py-xs bg-surface-container-high rounded-full text-label-sm text-on-surface-variant">Dịch bệnh</span>
                    <span className="px-md py-xs bg-surface-container-high rounded-full text-label-sm text-on-surface-variant">Kỹ thuật canh tác</span>
                  </div>
                </div>
                <div className="w-full h-80 bg-surface-container-high relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover"
                    alt="Rice field"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdyZZGUqkwz11evGR8s7i2ZGXepFCF9dA_3TbsrI98jN44_UQlySlfXWNY5qFqafZQmY2UFoaG2cWJGLOJHk2pRu74caihM8hLIZMxIo8Lr9_OEZLI6TjJyT2j1hGJDGb9y9iKaMZuxum_QdJUMKA-ovsmwRcDHN8X71UI6fe5x5oZIvxWQ_51-Bqz3kkJv9cztdVDd3uMx_eb_4pxk-5mbB8-X7AqQxmV-nsADKWWp6xYKL4AEg3vDhS8O8ya-ZQvDgEW-m0Omw"
                  />
                </div>
                <div className="p-sm px-md flex items-center justify-between border-t border-outline-variant/20">
                  <div className="flex items-center gap-md">
                    <button className="flex items-center gap-sm text-on-surface-variant hover:text-primary transition-colors py-sm font-bold text-label-sm">
                      <ThumbsUp className="w-4 h-4 shrink-0" />
                      <span>128</span>
                    </button>
                    <button className="flex items-center gap-sm text-on-surface-variant hover:text-primary transition-colors py-sm font-bold text-label-sm">
                      <MessageSquare className="w-4 h-4 shrink-0" />
                      <span>45</span>
                    </button>
                  </div>
                  <button className="flex items-center gap-sm text-on-surface-variant hover:text-primary transition-colors py-sm font-bold text-label-sm">
                    <Share2 className="w-4 h-4 shrink-0" />
                    <span>Chia sẻ</span>
                  </button>
                </div>
              </article>

              {/* Post 2: Text Post */}
              <article className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 p-md hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-md">
                  <div className="flex items-center gap-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt="Chị Hạnh"
                      className="w-10 h-10 rounded-full bg-secondary-container/20 object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLDEmTIyLp4cET9tcOebI13POUWkH1N9ZIabuIYH-hqp9AvG3Y6d78h9ej6L46kLzy1OCV46kab0mIIPWLLQkXG2W36DaRlJY9DOTpdDUWTIS7M1lAZVQL0wrEx6qjHlphh_79c0md-rO8MhBuO1a3IhpCM7B_Jeb-Q4K-yZ_bvZT5Aau-rCaR3N8Wpu_JYTI_7vng1xI8FXewEmIl-u0x-xwusYYf_OHq6thM7G1P4Qk_3CTosK3ltWXSpljHdINBm23B0gPIDg"
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-sm">
                        <span className="font-bold text-on-surface">Chị Hạnh (Long An)</span>
                        <span className="px-sm py-0.5 bg-secondary/10 text-secondary rounded text-2.5 font-bold uppercase tracking-wider">Farmer</span>
                      </div>
                      <span className="text-label-sm text-on-surface-variant">5 giờ trước</span>
                    </div>
                  </div>
                  <button className="text-on-surface-variant hover:text-primary transition-colors">
                    <MoreHorizontal className="w-5 h-5 shrink-0" />
                  </button>
                </div>
                <h2 className="text-title-md font-bold mb-xs">Cập nhật giá Thanh Long hôm nay tại vườn</h2>
                <p className="text-body-md text-on-surface-variant mb-md leading-relaxed">
                  Thanh Long ruột đỏ loại 1 hôm nay đang dao động mức 25.000 - 28.000đ/kg. Thương lái đang vào hàng mạnh để chuẩn bị cho đợt xuất khẩu cuối tháng. Anh chị em có vườn nào sắp chín không ạ?
                </p>
                <div className="flex flex-wrap gap-sm mb-md">
                  <span className="px-md py-xs bg-surface-container-high rounded-full text-label-sm text-on-surface-variant">Giá thị trường</span>
                </div>
                <div className="p-sm flex items-center justify-between border-t border-outline-variant/20">
                  <div className="flex items-center gap-md">
                    <button className="flex items-center gap-sm text-on-surface-variant hover:text-primary transition-colors py-sm font-bold text-label-sm">
                      <ThumbsUp className="w-4 h-4 shrink-0" />
                      <span>82</span>
                    </button>
                    <button className="flex items-center gap-sm text-on-surface-variant hover:text-primary transition-colors py-sm font-bold text-label-sm">
                      <MessageSquare className="w-4 h-4 shrink-0" />
                      <span>12</span>
                    </button>
                  </div>
                  <button className="flex items-center gap-sm text-on-surface-variant hover:text-primary transition-colors py-sm font-bold text-label-sm">
                    <Share2 className="w-4 h-4 shrink-0" />
                    <span>Chia sẻ</span>
                  </button>
                </div>
              </article>

              {/* Post 3: Video Post */}
              <article className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden hover:border-primary/30 transition-all duration-300">
                <div className="p-md flex items-center justify-between">
                  <div className="flex items-center gap-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt="AgriTech"
                      className="w-10 h-10 rounded-full bg-primary-container/20 object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDppj1GtwaxovHIFVRcXyigOe1v4ixvF1V8l_xIPKiFSLMaWx7tkQEEmCHlf6FlS55wMPemVzOzJ6pzk6Yaf6enHjjS81pc1R8oOHGATWozaW7ubs0vwKhg8cNyAzB05cj-V_ysL0idoaarcXGglPrg7saaM_LFjBz6nVSt06WEP5T2GqARMYBUK4YYkXjnKsCvCMajE0wzJZY_JRFFnUcKZ8-EHt13uvO5KcC8fgBwWLFVLj5VD1G8flQN_fCawNeApDF-lmcSAw"
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-sm">
                        <span className="font-bold text-on-surface">AgriTech Solutions</span>
                        <BadgeCheck className="w-4 h-4 text-primary shrink-0" />
                      </div>
                      <span className="text-label-sm text-on-surface-variant">Hôm qua • Video hướng dẫn</span>
                    </div>
                  </div>
                  <button className="text-on-surface-variant hover:text-primary transition-colors">
                    <MoreHorizontal className="w-5 h-5 shrink-0" />
                  </button>
                </div>
                <div className="px-md pb-md">
                  <h2 className="text-title-md font-bold mb-xs">Công nghệ tưới nhỏ giọt tiết kiệm 40% nước</h2>
                  <p className="text-body-md text-on-surface-variant mb-md leading-relaxed">
                    Giải pháp mới cho các vùng khô hạn miền Trung. Hệ thống cảm biến tự động theo dõi độ ẩm đất và kích hoạt tưới chính xác theo nhu cầu cây trồng...
                  </p>
                  <div className="flex flex-wrap gap-sm mb-md">
                    <span className="px-md py-xs bg-surface-container-high rounded-full text-label-sm text-on-surface-variant">Công nghệ cao</span>
                  </div>
                </div>
                <div className="w-full h-80 bg-surface-container-high relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover"
                    alt="Irrigation system"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhQaWQwZjXSQ81scGYDugy3UBVjYiaXhiCmvdjClB0fGOM_t-JHJ1dzgngCSkkUJJEaanle1QyWCg41msibynwzuvvnLbBvOLKBufxUbcKjLU4Na0IhkxzNWhpgLvj_WphALfxgp0zNt5G-NLTQdmNauSohq11FW0-L3Ekepe4zkt8ni6b68Eul68eWLqwqOvLdKC3X1Rzo-ZRbi09_oaQmGFQmHj5CQLwti82tmZq3aFJzXBcb0Yv6eW5PBu4Zvg6kZO2c3ebWA"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center text-primary shadow-xl hover:scale-105 active:scale-95 transition-transform">
                      <Play className="w-8 h-8 fill-current shrink-0" />
                    </div>
                  </div>
                </div>
                <div className="p-sm px-md flex items-center justify-between border-t border-outline-variant/20">
                  <div className="flex items-center gap-md">
                    <button className="flex items-center gap-sm text-on-surface-variant hover:text-primary transition-colors py-sm font-bold text-label-sm">
                      <ThumbsUp className="w-4 h-4 shrink-0" />
                      <span>312</span>
                    </button>
                    <button className="flex items-center gap-sm text-on-surface-variant hover:text-primary transition-colors py-sm font-bold text-label-sm">
                      <MessageSquare className="w-4 h-4 shrink-0" />
                      <span>67</span>
                    </button>
                  </div>
                  <button className="flex items-center gap-sm text-on-surface-variant hover:text-primary transition-colors py-sm font-bold text-label-sm">
                    <Share2 className="w-4 h-4 shrink-0" />
                    <span>Chia sẻ</span>
                  </button>
                </div>
              </article>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="flex-1 flex flex-col gap-lg min-w-75">
            {/* Trending Topics */}
            <section className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/30">
              <h3 className="text-title-md font-bold mb-md flex items-center gap-sm">
                <TrendingUp className="text-primary w-5 h-5 shrink-0" />
                <span>Xu hướng</span>
              </h3>
              <div className="flex flex-col gap-md">
                <div className="group cursor-pointer">
                  <p className="text-label-sm text-on-surface-variant">#rice_price_today</p>
                  <p className="font-bold text-on-surface group-hover:text-primary transition-colors">Giá lúa Miền Tây biến động mạnh</p>
                  <p className="text-label-sm text-on-surface-variant">1.2k bài đăng</p>
                </div>
                <div className="group cursor-pointer">
                  <p className="text-label-sm text-on-surface-variant">#fruit_trees</p>
                  <p className="font-bold text-on-surface group-hover:text-primary transition-colors">Sầu riêng xuất khẩu Trung Quốc</p>
                  <p className="text-label-sm text-on-surface-variant">856 bài đăng</p>
                </div>
                <div className="group cursor-pointer">
                  <p className="text-label-sm text-on-surface-variant">#disease_prevention</p>
                  <p className="font-bold text-on-surface group-hover:text-primary transition-colors">Kỹ thuật chặn đọt sầu riêng</p>
                  <p className="text-label-sm text-on-surface-variant">542 bài đăng</p>
                </div>
              </div>
            </section>

            {/* Top Contributors */}
            <section className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant/30">
              <h3 className="text-title-md font-bold mb-md flex items-center gap-sm">
                <Award className="text-primary w-5 h-5 shrink-0" />
                <span>Chuyên gia &amp; Nông dân giỏi</span>
              </h3>
              <div className="flex flex-col gap-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt="Expert"
                      className="w-10 h-10 rounded-full bg-surface-container object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCC4SaV9QvOJsVV3GQm7ttqd8PkKeSMIKjWMhYKuTN6NvJT_sC6Vk4X5bwXmBnE3R8IQoKFFhND0V-rIeKZUYgTwjlUN3HbiaACvKJSf89H7DvsAkPM7_SUrD-AOxy5yHdH9YDJ1hhMorpPNnKV_AfHBC88hllIRkvobF5eLmt2jMWSS4buzxLIoW2Ut4AmEl5jw9p8GyuHgDE1y9w3JzQ-BB52qlhTKwHBKdvUWb1VRS0_3VIwYHTNSqpSCZjoqgwvOqf7sQDeKg"
                    />
                    <div>
                      <p className="font-bold text-body-md text-on-surface">Kỹ sư Lê Văn Tám</p>
                      <p className="text-label-sm text-on-surface-variant">Chuyên gia Bảo vệ thực vật</p>
                    </div>
                  </div>
                  <button className="px-md py-sm bg-primary text-on-primary rounded-full text-label-sm font-bold hover:bg-primary-container transition-all active:scale-95">Theo dõi</button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt="Expert"
                      className="w-10 h-10 rounded-full bg-surface-container object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFUVuk119Ylul_7ofHPv9E0ffmYm7zQHRPF-LvVNHUJT4lqmiusR-zmg9IQ_pdOifXAPmUW0SXsRVl0Qcg25E4C7UUjfwmATnWIfzqied42jYdAFdt8Q15-CWNjG-DcmzFHib1RwhfRFxTZzIeMm6Frc_rJ73DKDvF0O7QnhuFBvwrddybfjkxGc4GGlBN1qt1hAJfoGqK5LYJVXS5wycl2ZzAivpM50GyeuZnI7UNrvyz87cLzJNG-vaL3TWKnFqvmp1WyOPMyQ"
                    />
                    <div>
                      <p className="font-bold text-body-md text-on-surface">Lão nông Tư Sáng</p>
                      <p className="text-label-sm text-on-surface-variant">Vua sầu riêng Miền Tây</p>
                    </div>
                  </div>
                  <button className="px-md py-sm border border-outline text-primary rounded-full text-label-sm font-bold hover:bg-primary/5 transition-all active:scale-95">Theo dõi</button>
                </div>
              </div>
            </section>

            {/* Upcoming Events */}
            <section className="bg-primary-container text-on-primary-container p-lg rounded-xl shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-title-md font-bold mb-sm flex items-center gap-sm">
                  <Video className="w-5 h-5 shrink-0" />
                  <span>Webinar Trực Tuyến</span>
                </h3>
                <p className="text-body-md mb-md opacity-90">Kỹ thuật thâm canh lúa hữu cơ chuẩn VietGAP</p>
                <div className="flex items-center gap-sm mb-lg">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span className="text-label-sm">20:00, Thứ Bảy tuần này</span>
                </div>
                <button className="w-full bg-on-primary-container text-primary font-bold py-sm rounded-xl hover:bg-white transition-all active:scale-95">Đăng ký tham gia</button>
              </div>
              <div className="absolute -right-8 -bottom-8 opacity-20 text-on-primary-container">
                <Plus className="w-32 h-32 rotate-45 shrink-0" />
              </div>
            </section>

            {/* Footer Links (Sidebar) */}
            <div className="flex flex-wrap gap-x-md gap-y-sm px-sm">
              <a className="text-label-sm text-on-surface-variant hover:underline" href="#privacy">Chính sách bảo mật</a>
              <a className="text-label-sm text-on-surface-variant hover:underline" href="#terms">Điều khoản sử dụng</a>
              <a className="text-label-sm text-on-surface-variant hover:underline" href="#about">Về chúng tôi</a>
              <p className="text-label-sm text-on-surface-variant w-full mt-sm">© 2024 AgriSmart Ecosystem.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
