"use client";

import { Search, ChevronRight, Download, Plus, ShoppingBag, Clock, Truck, CreditCard, Filter, Eye, Printer, MoreVertical, TrendingUp } from "lucide-react";

import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import type { Order } from "@/types";



export default function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState<"all" | "drafts" | "archived">("all");

  const initialOrders: Order[] = [
    { id: "#ORD-2934", date: "Nov 14, 2024", customer: "Whole Foods Market", customerInitials: "WF", amount: 1240.00, status: "Shipped" },
    { id: "#ORD-2933", date: "Nov 13, 2024", customer: "Green Apple Co-op", customerInitials: "GA", amount: 895.50, status: "Delivered" },
    { id: "#ORD-2932", date: "Nov 13, 2024", customer: "Traders Outlet", customerInitials: "TO", amount: 4120.00, status: "Processing" },
    { id: "#ORD-2931", date: "Nov 12, 2024", customer: "Sprouts Hub", customerInitials: "SH", amount: 215.00, status: "Processing" },
  ];

  const filteredOrders = initialOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    // In this mock, all orders belong to "all", drafts & archived are empty for now
    if (selectedTab === "drafts" || selectedTab === "archived") return false;
    return matchesSearch;
  });

  return (
    <DashboardLayout
      searchPlaceholder="Search orders..."
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      showRoleSwitcher
      footerAppName="AgriSmart Ecosystem"
      contentClassName="max-w-container-max mx-auto mt-md p-md md:p-xl"
    >
        <div className="max-w-container-max mx-auto mt-md">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-xl">
            <div>
              <nav className="flex items-center gap-xs text-on-surface-variant text-label-sm mb-xs">
                <span>Marketplace</span>
                <ChevronRight className="w-3.5 h-3.5 shrink-0"  />
                <span className="text-primary font-semibold">Orders</span>
              </nav>
              <h1 className="text-headline-lg font-headline-lg text-on-surface">Order Management</h1>
              <p className="text-body-md text-on-surface-variant mt-base">Manage wholesale transactions and track fulfillment status.</p>
            </div>
            <div className="flex gap-sm">
              <button className="flex items-center gap-xs border border-outline-variant px-md py-sm rounded-lg text-label-sm font-medium hover:bg-surface-container transition-colors">
                <Download className="w-4.5 h-4.5 shrink-0"  /> Export CSV
              </button>
              <button className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg text-label-sm font-medium hover:shadow-md transition-all">
                <Plus className="w-4.5 h-4.5 shrink-0"  /> Create Order
              </button>
            </div>
          </div>

          {/* KPI Dashboard Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mb-xl">
            <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-xl hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-sm">
                <span className="text-on-surface-variant text-label-sm">Total Orders</span>
                <div className="p-xs bg-surface-container-high rounded-full">
                  <ShoppingBag className="w-4.5 h-4.5 text-primary shrink-0"  />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-title-md font-bold">1,284</h3>
                <span className="text-primary text-2.75 font-bold bg-primary-container/20 px-xs rounded">+12%</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-xl hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-sm">
                <span className="text-on-surface-variant text-label-sm">Pending</span>
                <div className="p-xs bg-surface-container-high rounded-full">
                  <Clock className="w-4.5 h-4.5 text-tertiary shrink-0"  />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-title-md font-bold">42</h3>
                <span className="text-tertiary text-2.75 font-bold bg-tertiary-fixed/40 px-xs rounded">-3%</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-xl hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-sm">
                <span className="text-on-surface-variant text-label-sm">Shipping</span>
                <div className="p-xs bg-surface-container-high rounded-full">
                  <Truck className="w-4.5 h-4.5 text-secondary shrink-0"  />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-title-md font-bold">156</h3>
                <span className="text-secondary text-2.75 font-bold bg-secondary-fixed/40 px-xs rounded">+8%</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-xl hover:shadow-sm transition-shadow overflow-hidden relative">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-sm">
                  <span className="text-on-surface-variant text-label-sm">Gross Revenue</span>
                  <div className="p-xs bg-surface-container-high rounded-full">
                    <CreditCard className="w-4.5 h-4.5 text-on-secondary-container shrink-0"  />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <h3 className="text-title-md font-bold">$42.8k</h3>
                  <span className="text-on-secondary-container text-2.75 font-bold bg-secondary-container/50 px-xs rounded">+24%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Data Table Container */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden mb-xxl">
            {/* Table Controls */}
            <div className="p-md flex flex-col md:flex-row md:items-center justify-between gap-md border-b border-outline-variant">
              <div className="flex items-center gap-sm">
                <button
                  onClick={() => setSelectedTab("all")}
                  className={`px-md py-xs rounded-full text-label-sm font-semibold transition-colors ${
                    selectedTab === "all" ? "bg-surface-container-high text-on-surface" : "hover:bg-surface-container-low text-on-surface-variant"
                  }`}
                >
                  All Orders
                </button>
                <button
                  onClick={() => setSelectedTab("drafts")}
                  className={`px-md py-xs rounded-full text-label-sm font-semibold transition-colors ${
                    selectedTab === "drafts" ? "bg-surface-container-high text-on-surface" : "hover:bg-surface-container-low text-on-surface-variant"
                  }`}
                >
                  Drafts
                </button>
                <button
                  onClick={() => setSelectedTab("archived")}
                  className={`px-md py-xs rounded-full text-label-sm font-semibold transition-colors ${
                    selectedTab === "archived" ? "bg-surface-container-high text-on-surface" : "hover:bg-surface-container-low text-on-surface-variant"
                  }`}
                >
                  Archived
                </button>
              </div>
              <div className="flex items-center gap-sm">
                <div className="relative">
                  <Search className="absolute left-xs top-1/2 -translate-y-1/2 text-outline w-4.5 h-4.5 shrink-0"  />
                  <input
                    className="pl-xl pr-md py-xs bg-surface border border-outline-variant rounded text-label-sm focus:ring-1 focus:ring-primary focus:outline-none w-48 lg:w-64"
                    placeholder="Filter by ID, Customer..."
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="flex items-center gap-xs border border-outline-variant px-sm py-xs rounded text-label-sm font-medium hover:bg-surface-container transition-colors">
                  <Filter className="w-4 h-4 shrink-0"  /> Filter
                </button>
              </div>
            </div>

            {/* Premium Stripe-style Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-2.75 uppercase tracking-wider text-on-surface-variant font-bold border-b border-outline-variant">
                    <th className="px-md py-sm">Order ID</th>
                    <th className="px-md py-sm">Date</th>
                    <th className="px-md py-sm">Customer</th>
                    <th className="px-md py-sm text-right">Amount</th>
                    <th className="px-md py-sm">Status</th>
                    <th className="px-md py-sm text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-body-md divide-y divide-surface-container">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-surface transition-colors cursor-pointer group">
                        <td className="px-md py-md font-medium text-primary">
                          <Link href="/order-details" className="hover:underline">{order.id}</Link>
                        </td>
                        <td className="px-md py-md text-on-surface-variant">{order.date}</td>
                        <td className="px-md py-md">
                          <div className="flex items-center gap-sm">
                            <div className="w-6 h-6 rounded-full bg-surface-dim flex items-center justify-center text-2.5 font-bold">
                              {order.customerInitials}
                            </div>
                            <span>{order.customer}</span>
                          </div>
                        </td>
                        <td className="px-md py-md text-right font-semibold">${order.amount.toFixed(2)}</td>
                        <td className="px-md py-md">
                          <span
                            className={`inline-flex items-center gap-xs px-xs py-0.5 rounded text-label-sm font-bold ${
                              order.status === "Shipped"
                                ? "bg-secondary-container/30 text-on-secondary-container"
                                : order.status === "Delivered"
                                ? "bg-primary-container/10 text-primary"
                                : "bg-tertiary-fixed/30 text-on-tertiary-fixed-variant"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                order.status === "Shipped"
                                  ? "bg-secondary"
                                  : order.status === "Delivered"
                                  ? "bg-primary"
                                  : "bg-tertiary"
                              }`}
                            ></span>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-md py-md text-right">
                          <div className="flex justify-end gap-xs opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link href="/order-details" className="p-xs hover:bg-surface-container-high rounded text-on-surface-variant" title="View Details">
                              <Eye className="w-5 h-5 shrink-0"  />
                            </Link>
                            <button className="p-xs hover:bg-surface-container-high rounded text-on-surface-variant" title="Print Invoice">
                              <Printer className="w-5 h-5 shrink-0"  />
                            </button>
                            <button className="p-xs hover:bg-surface-container-high rounded text-on-surface-variant" title="Update Status">
                              <MoreVertical className="w-5 h-5 shrink-0"  />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-md py-xl text-center text-on-surface-variant">
                        No orders found matching your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-md flex items-center justify-between bg-surface-container-low border-t border-outline-variant">
              <span className="text-label-sm text-on-surface-variant">Showing 1 to {filteredOrders.length} of 1,284 results</span>
              <div className="flex gap-xs">
                <button className="px-sm py-xs border border-outline-variant rounded hover:bg-surface transition-colors text-label-sm font-medium disabled:opacity-50" disabled={true}>Previous</button>
                <button className="px-sm py-xs border border-outline-variant rounded hover:bg-surface transition-colors text-label-sm font-medium">Next</button>
              </div>
            </div>
          </div>

          {/* Footer Stats / Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div className="bg-surface-container border border-outline-variant p-lg rounded-xl flex items-center gap-xl">
              <div className="flex-1">
                <h4 className="text-label-sm font-bold text-on-surface-variant mb-xs">Logistics Network</h4>
                <p className="text-body-md text-on-surface mb-sm">Your delivery efficiency has improved by 14% this month due to optimized route planning.</p>
                <a className="text-primary font-bold text-label-sm hover:underline animate-pulse" href="#logistic-map">View Delivery Map →</a>
              </div>
              <div className="hidden lg:block w-32 h-20 bg-surface-container-low rounded-lg border border-outline-variant overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover"
                  alt="California Central Valley Map"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfTnvsb52WxwDRKLQE6zeyoQ2NozI0pUkWGjMrH-NTfi28NgKR1vmI35xguF6P5Yi0E9QoJlqdSmlbDWgaXPPzNAeX1DyW40d7Tb5XZ8dErHkfwYK3gh3ZrM670WQOm7EfnByM4GAz5S9e83jd0ygKjxjXJcxRHM0QObmuWZEEYSRXYwJQp4oPcvhe5d8gq1unFB7i7W8WPmu7H0HaBxfp-0fggvZ63BnsvVbpeEWVkJjqfl97sOrhiGT0z4D7d0lJCPOricOYlw"
                />
              </div>
            </div>
            <div className="bg-surface-container-highest border border-outline-variant p-lg rounded-xl">
              <div className="flex justify-between items-center mb-md">
                <h4 className="text-label-sm font-bold text-on-surface-variant">Demand Forecast</h4>
                <TrendingUp className="text-primary shrink-0"  />
              </div>
              <div className="space-y-sm">
                <div className="flex items-center gap-md">
                  <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[85%]"></div>
                  </div>
                  <span className="text-2.75 font-bold w-16 text-right">Tomatoes</span>
                </div>
                <div className="flex items-center gap-md">
                  <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-[45%]"></div>
                  </div>
                  <span className="text-2.75 font-bold w-16 text-right">Lettuce</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </DashboardLayout>
  );
}
