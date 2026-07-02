"use client";

import { ChevronRight, Printer, Package, Info, Send, Plus, CheckCircle2, Truck, BadgeCheck } from "lucide-react";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { OrderItem, ChatMessage } from "@/types";



export default function OrderDetails() {
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "Support Agent",
      role: "agent",
      text: "Update sent to customer regarding carrier delay in Kansas City.",
      time: "2h ago",
    },
    {
      id: "2",
      sender: "Customer Silas T.",
      role: "customer",
      text: "Will these sensors be calibrated for high-clay soil out of the box?",
      time: "4h ago",
    },
    {
      id: "3",
      sender: "System Message",
      role: "system",
      text: "Auto-email: Order confirmation sent to silas.thorne@prairiefarms.com",
      time: "Oct 12",
    },
  ]);

  const items: OrderItem[] = [
    {
      id: "1",
      name: "Bio-Organic Nitrogen Fertilizer",
      spec: "25kg Bag - Sustained Release",
      sku: "AGRI-FERT-042",
      qty: 1,
      price: 124.0,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHXfUCkTuFrJKuaLQHg_LM-lxhsM9EPmN6GaW0FS_ec4xEjOMSq2fRl8MxwvrseG1amEMb8ByHuOkw2SfHzoFmqsHogy2Nf8Jp-mTXYHDSZ-jlVkLpHm0QlrPVLoIzd2wtch0hHJFA4gHZlHePvjCi33H5tP5ObGAtzsAzak7RxFPlTjbzkLQC3tQTxcSYpEmWv4m8n5XXey5PrafYIzRtQoCrC8-sFHafNqJAUI2qemgJr-wQWdxYgnSIeEG1RVdYq31-x-KeZA",
    },
    {
      id: "2",
      name: "Precision Soil Moisture Sensor",
      spec: "Gen 4 Wireless - IoT Mesh Ready",
      sku: "IOT-SOIL-981",
      qty: 2,
      price: 89.5,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLZMA3AMb5rsvfg1Iy-gA1JEBcT9Xy88uczddhhcjC_0je0cob6YZ5b6Fm0Jzh5Mq7mtrmOIowEVI42lJFD0FmmndEKkmtZy7z7FDMb64b6_acU__gftwVeB30BqsPu93fhQR05lqOMCdUsO9OC8cXzSEA18wAei09c34CcWirA4Rfa2dS1JpMjd_d3POvjStPcYCJVzSHKqUX0kifgpDPLbFzXo7MGD_jYiwOGAnC4SHFrDdMqAwF0Z07H7Xj5hR_cRYuzTHWOw",
    },
  ];

  const handleSendChat = () => {
    if (!chatInput.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "Customer Silas T.",
      role: "customer",
      text: chatInput,
      time: "Just now",
    };

    setChatMessages((prev) => [newMsg, ...prev]);
    setChatInput("");

    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "Support Agent",
        role: "agent",
        text: "We have noted your request and forwarded it to our technicians. We will update you shortly.",
        time: "1m ago",
      };
      setChatMessages((prev) => [replyMsg, ...prev]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendChat();
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background">
      <Sidebar />

      {/* Main Content Area */}
      <main className="md:ml-64 min-h-screen flex flex-col">
        {/* TopNavBar */}
        <Header
          showSearch
          searchPlaceholder="Tìm kiếm..."
          showStats
          showRoleSwitcher
          showUser
          user={{
            avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwigNBSqUJlBlxcYGh_RCb4AgJfU8qr9Ou3ANmhxwt2nGEyw_PrYqYKUJ45b1a-vHXxtO2pkS9uA_0mYRKrZz3FP2_ZnjAFal3F4_5De9dbVj23xAbDSqWuXNxXVLFOc85fP4SuCXPI08gDSCRA1vjT11OFAcCyzjlpQcKuvLw_kEX94rwReUMZROyoFLrIuhDlEzaxkKYcvXHe2hzoZ_ZmF_DGkkDNVrzeZTTb1jHKCQ36dMhjqE7vAwpDgFVI_Qv3o3e5w0dAA"
          }}
        />


        {/* Main Content Canvas */}
        <div className="p-lg md:p-xl max-w-6xl mx-auto grow w-full space-y-lg">
          {/* Breadcrumbs & Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-md">
            <div>
              <nav className="flex items-center gap-sm text-label-sm font-label-sm text-on-surface-variant mb-sm">
                <Link href="/marketplace" className="hover:text-primary font-medium">
                  Marketplace
                </Link>
                <ChevronRight className="text-[14px] shrink-0" />
                <Link href="/order-management" className="hover:text-primary font-medium">
                  Order History
                </Link>
              </nav>
              <h1 className="text-headline-lg font-headline-lg text-on-surface font-bold flex flex-wrap items-center gap-md">
                Order #ORD-2024-8842
                <span className="text-label-sm bg-secondary-container text-on-secondary-container px-md py-1 rounded-full font-bold">
                  In Transit
                </span>
              </h1>
            </div>
            <div className="flex gap-sm">
              <button className="flex items-center gap-sm px-md py-sm border border-outline-variant rounded-lg font-label-sm text-label-sm hover:bg-surface-container-low transition-colors font-bold">
                <Printer className="text-[18px] shrink-0" /> Print Invoice
              </button>
              <button className="flex items-center gap-sm px-md py-sm bg-primary text-on-primary rounded-lg font-label-sm text-label-sm hover:opacity-90 transition-opacity shadow-sm font-bold">
                <Package className="text-[18px] shrink-0" /> Edit Order
              </button>
            </div>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
            {/* LEFT COLUMN: Order Items & Tracking (Col 8) */}
            <div className="md:col-span-8 space-y-lg">
              {/* Visual Shipping Tracker */}
              <section className="bg-surface-container-lowest p-lg md:p-xl rounded-xl border border-outline-variant shadow-sm space-y-lg">
                <h2 className="text-title-md font-title-md text-on-surface font-bold">Shipping Progress</h2>
                <div className="relative px-md pt-2">
                  <div className="absolute top-[26px] left-[40px] right-[40px] h-[2px] bg-outline-variant"></div>
                  <div className="absolute top-[26px] left-[40px] w-2/3 h-[2px] bg-primary"></div>
                  <div className="relative flex justify-between">
                    <div className="flex flex-col items-center text-center gap-base">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary z-10 shadow-sm">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                      </div>
                      <p className="text-label-sm font-label-sm font-bold text-primary">Confirmed</p>
                      <p className="text-xs text-on-surface-variant font-semibold">Oct 12, 09:30 AM</p>
                    </div>
                    <div className="flex flex-col items-center text-center gap-base">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary z-10 shadow-sm">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                      </div>
                      <p className="text-label-sm font-label-sm font-bold text-primary">Processing</p>
                      <p className="text-xs text-on-surface-variant font-semibold">Oct 12, 02:45 PM</p>
                    </div>
                    <div className="flex flex-col items-center text-center gap-base">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary z-10 ring-4 ring-primary-container/30 animate-pulse">
                        <Truck className="w-5 h-5 shrink-0" />
                      </div>
                      <p className="text-label-sm font-label-sm font-bold text-primary">In Transit</p>
                      <p className="text-xs text-on-surface-variant font-semibold">Est. Oct 15</p>
                    </div>
                    <div className="flex flex-col items-center text-center gap-base">
                      <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-outline z-10 border border-outline-variant">
                        <Package className=" shrink-0" />
                      </div>
                      <p className="text-label-sm font-label-sm font-medium text-outline">Delivered</p>
                      <p className="text-xs text-on-surface-variant font-semibold">-</p>
                    </div>
                  </div>
                </div>
                <div className="p-md bg-surface-container-low rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-sm border border-outline-variant/30">
                  <div className="flex items-center gap-md">
                    <Info className="text-primary shrink-0" />
                    <span className="text-body-md font-body-md text-on-surface-variant">
                      Current Status: Your shipment has left the Kansas City distribution hub.
                    </span>
                  </div>
                  <a className="text-primary font-bold text-label-sm hover:underline shrink-0" href="#map">
                    Track on Map
                  </a>
                </div>
              </section>

              {/* Itemized List Table */}
              <section className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
                <div className="p-lg border-b border-outline-variant flex justify-between items-center bg-white">
                  <h2 className="text-title-md font-title-md text-on-surface font-bold">Order Items (3)</h2>
                  <span className="text-label-sm font-label-sm text-on-surface-variant font-bold">Weight: 42.5 kg</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-surface-container-low border-b border-outline-variant">
                      <tr>
                        <th className="px-lg py-sm text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
                          Product Details
                        </th>
                        <th className="px-lg py-sm text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">SKU</th>
                        <th className="px-lg py-sm text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">Qty</th>
                        <th className="px-lg py-sm text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">Price</th>
                        <th className="px-lg py-sm text-label-sm font-bold text-on-surface-variant uppercase tracking-wider text-right">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                      {items.map((item) => (
                        <tr key={item.id} className="hover:bg-surface-container transition-colors group">
                          <td className="px-lg py-md">
                            <div className="flex items-center gap-md">
                              <div className="w-12 h-12 bg-surface-container rounded-lg overflow-hidden shrink-0 border border-outline-variant/30">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
                              </div>
                              <div>
                                <p className="text-body-lg font-bold text-on-surface group-hover:text-primary transition-colors leading-tight">
                                  {item.name}
                                </p>
                                <p className="text-label-sm font-label-sm text-on-surface-variant mt-1 font-medium">{item.spec}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-lg py-md text-body-md font-mono text-on-surface-variant">{item.sku}</td>
                          <td className="px-lg py-md text-body-md font-semibold text-on-surface">{item.qty}</td>
                          <td className="px-lg py-md text-body-md font-semibold text-on-surface">${item.price.toFixed(2)}</td>
                          <td className="px-lg py-md text-body-md font-bold text-right text-primary">
                            ${(item.qty * item.price).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-lg bg-surface-container-low flex justify-end border-t border-outline-variant">
                  <div className="w-64 space-y-sm">
                    <div className="flex justify-between text-body-md font-semibold text-on-surface-variant">
                      <span>Subtotal</span>
                      <span>$303.00</span>
                    </div>
                    <div className="flex justify-between text-body-md font-semibold text-on-surface-variant">
                      <span>Shipping (Ground)</span>
                      <span>$15.00</span>
                    </div>
                    <div className="flex justify-between text-body-md font-semibold text-on-surface-variant">
                      <span>Tax (8%)</span>
                      <span>$24.24</span>
                    </div>
                    <div className="flex justify-between text-title-md font-title-md font-bold text-primary pt-sm border-t border-outline-variant">
                      <span>Order Total</span>
                      <span>$342.24</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN: Customer & Internal (Col 4) */}
            <div className="md:col-span-4 space-y-lg">
              {/* Customer Info Card */}
              <section className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm space-y-md">
                <h2 className="text-title-md font-title-md text-on-surface font-bold">Customer Information</h2>
                <div className="flex items-center gap-md pb-md border-b border-outline-variant/30">
                  <div className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center shadow-inner">
                    <span className="text-on-secondary-container font-bold text-headline-lg-mobile">SR</span>
                  </div>
                  <div>
                    <p className="text-body-lg font-body-lg font-bold text-on-surface">Silas Thorne</p>
                    <p className="text-label-sm font-label-sm text-on-surface-variant font-semibold">Premium Member since 2019</p>
                  </div>
                </div>
                <div className="space-y-md">
                  <div>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Contact</p>
                    <p className="text-body-md font-medium text-on-surface mt-1">silas.thorne@prairiefarms.com</p>
                    <p className="text-body-md font-medium text-on-surface mt-0.5">+1 (555) 382-9012</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Shipping Address</p>
                    <p className="text-body-md font-medium text-on-surface mt-1 leading-relaxed">
                      4920 Harvest Moon Lane
                      <br />
                      Wichita, KS 67201
                      <br />
                      United States
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Payment Status</p>
                    <div className="flex items-center gap-sm mt-1">
                      <BadgeCheck className="text-primary w-5 h-5 shrink-0" />
                      <p className="text-body-md font-bold text-primary">Paid via Visa ending in 4429</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Communication History */}
              <section className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm flex flex-col h-[400px]">
                <div className="p-lg border-b border-outline-variant flex items-center justify-between bg-white rounded-t-xl">
                  <h2 className="text-title-md font-title-md text-on-surface font-bold">Communication</h2>
                  <span className="bg-error-container text-on-error-container text-[10px] font-bold px-2 py-0.5 rounded-full">
                    2 Unread
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto p-md space-y-md custom-scrollbar">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-sm rounded-lg border ${msg.role === "customer"
                          ? "bg-primary-container/10 border-primary/20 ml-md"
                          : msg.role === "agent"
                            ? "bg-surface-container-low border-outline-variant/30"
                            : "bg-surface-container-low border-dashed border-outline-variant/40"
                        }`}
                    >
                      <p
                        className={`text-xs font-bold mb-xs ${msg.role === "customer" ? "text-on-surface" : "text-primary"
                          }`}
                      >
                        {msg.sender} • {msg.time}
                      </p>
                      <p
                        className={`text-body-md font-body-md ${msg.role === "customer" ? "italic text-on-surface" : "text-on-surface-variant"
                          }`}
                      >
                        {msg.text}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="p-md border-t border-outline-variant bg-white rounded-b-xl">
                  <div className="relative flex items-center">
                    <input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="w-full bg-surface-container border border-outline-variant rounded-full py-2 pl-md pr-xl text-body-md focus:ring-primary focus:border-primary outline-none"
                      placeholder="Send message..."
                      type="text"
                    />
                    <button
                      onClick={handleSendChat}
                      className="absolute right-2 p-1 text-primary hover:bg-primary-container hover:text-on-primary-container rounded-full transition-colors"
                    >
                      <Send className=" shrink-0" />
                    </button>
                  </div>
                </div>
              </section>

              {/* Internal Notes */}
              <section className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm">
                <div className="flex items-center justify-between mb-md">
                  <h2 className="text-title-md font-title-md text-on-surface font-bold">Internal Notes</h2>
                  <button className="text-primary font-bold text-label-sm hover:underline flex items-center gap-xs">
                    <Plus className="text-[16px] shrink-0" /> Add Note
                  </button>
                </div>
                <div className="space-y-md">
                  <div className="border-l-4 border-outline-variant pl-md py-sm">
                    <p className="text-body-md font-body-md text-on-surface leading-relaxed">
                      Check calibration certificates for Gen 4 probes before warehouse dispatch.
                    </p>
                    <p className="text-[10px] text-on-surface-variant mt-sm font-bold">Mark J. • Oct 12, 10:15 AM</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer appName="AgriSmart Ecosystem" className="mt-auto" />
      </main>
    </div>
  );
}
