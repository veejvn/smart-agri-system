// ─── Domain Model Types ───────────────────────────────────────────────────────

// ── Order ──────────────────────────────────────────────────────────────────

export interface Order {
  id: string;
  date: string;
  customer: string;
  customerInitials: string;
  amount: number;
  status: "Shipped" | "Delivered" | "Processing";
}

export interface OrderItem {
  id: string;
  name: string;
  spec: string;
  sku: string;
  qty: number;
  price: number;
  image: string;
}

// ── Marketplace ────────────────────────────────────────────────────────────

export interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  tag: string;
  tagType: "ORGANIC" | "SMART TOOL" | "ARTISAN" | "NONE";
  image: string;
  farmer: string;
  farmerImage: string;
}

// ── Expert ─────────────────────────────────────────────────────────────────

export interface Expert {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: number;
  rate: number;
  available: string;
  availableStatus: "online" | "away" | "offline";
  description: string;
  image: string;
  waitlist?: boolean;
}

// ── Market Trends ──────────────────────────────────────────────────────────

export type Commodity = "rice" | "coffee" | "pepper" | "durian";

export interface CommodityTrend {
  title: string;
  desc: string;
  type: "up" | "down";
  tag: string;
  action: string;
}

export interface CommodityData {
  title: string;
  description: string;
  history: number[];
  trends: CommodityTrend[];
}
