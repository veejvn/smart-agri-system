"use client";

import { Filter, ShoppingBasket, X, ShoppingCart, Heart, Grid, Sprout, Apple, Wrench, Leaf, Droplet, Star } from "lucide-react";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { Product } from "@/types";



export default function Marketplace() {
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Produce");


  const products: Product[] = [
    {
      id: 1,
      title: "Hydroponic Kale Mix",
      price: 12.50,
      rating: 4.9,
      reviews: 124,
      tag: "ORGANIC",
      tagType: "ORGANIC",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8FMjRvSO0yzbPs7gICLBA8TFEmjqqxvraM-hZ0o8ll6RBpFpEp_x6iLpx2dVSHBg9oOPsZ6Fczc-cHvlSUewXX7HmObnt79BU46IpupxxWptKEJLSvUljt_bL3EgrGE5P-Xid4lZb4m5G-OQW8m2aaPc9ctLfzYbwgip-tJRVE8J6Z9sees0_6WCtJs-nvTtbYT0LrZtY8Rp_WzqHDnzNZaWJs7Mke2EJbA7RsqgZ1kT9QRKAyBJOAJve6SQz-td2ywIRbulLDg",
      farmer: "Green Valley Farm",
      farmerImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLj1pHnB3AQW4t2JaPTJfZ0Qrtu6tv6EctIPL9oaZjBNqf_XJOyDLpq6X0CmupplpVs40dlxSB0zZEfECYDlATS4EDE0s5hGy0W7x1GJTDuCTvbRLT-YE9-Uyz1zUo9hV26Rdr9bVawaFkwmSXC_TpSVG5FXg3yvKUDgXGx3AhHydSbbogC8uZn5Wp9ifcHnd01qei3G3V2iwMa0QKJU5NlwGmg0knZlZvrCS0ZCL7P0sRh7HydvJ5ozi3Xxs-NBZRMYyPdhVNKQ",
    },
    {
      id: 2,
      title: "SoilSense Pro V2",
      price: 299.00,
      rating: 5.0,
      reviews: 48,
      tag: "SMART TOOL",
      tagType: "SMART TOOL",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDncqdTeMwppDRAyCzoYrpIb5IdAHWpHh00OGkRq-U2nxlF9zR6E3XHKDk-5KH-RP7-76GirRk9kMqiCUEyp-r2ttbkHI9_nmqAJQkzx_iF3oQm8ePlduMDrnbK22LiQe72OF7OrVa6bGimymgdm8qzGpOiyQ1zEhbF7XWFhBbsusihyqgGkYQC9p0sfSD0YMcq4QQHCVB1PA4irqSXvPYyXAjREE9_ihLDmylg2u6xXXPpB-3-vafeB2VeUBXac2Rq8R0pCD-PbQ",
      farmer: "AgriTech Solutions",
      farmerImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqtZL41zHbyPls1bsuVLOjQfLBUUfqAU2IBLBb3UC8x1UqkDfu74TIq6DVoqPlMwg3BGwq6xhJCuItZhhOwTcWNExyOXbYbTby4a9fd0PAbIUxWNcUWo20ilABMGtcgR-mTSFv9LJOQxzWXEcSfApFQo3VNQkBrbL2JlvzPHYyxbvTaXsXbJOqJRJw_eudEYrSQRDdF5tfDGVURC1rmCTB5cDTJdORc6t928jILfEH95SpnwXIz8bFRG6_CVSf9IkX9CjETs2TQw",
    },
    {
      id: 3,
      title: "Heirloom Carrot Bundle",
      price: 8.00,
      rating: 4.7,
      reviews: 210,
      tag: "ORGANIC",
      tagType: "ORGANIC",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMf3AHgmDAW2ZD_xynST_MLm5WqmrL5LnFo93aGc8qdhTWzOWYjhAwGER2TWqT6q2vJfdznqBBmo8ZL_ZYUzQVE6p71zpF0-1Dw25t7GzILDR3lA228xChTwWm_3jQT2pFK9BqSd1PfRjiID1tcMyV2Te26jfZSjYFbyZPtZ4drjAdD0xFP7Ue6c-Ks5Ju2CWcrifs_ZijVRKi61DJLAQ085S7c3X64M9EEYJyY0tzpO71Kz8LpjcGoY7nyzKLstKVANHERYp_TA",
      farmer: "Roots & Shoots",
      farmerImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAd3M6FDjkcmwaogp5QQvPYr-Xl4xhRZNVrIVj-OaaCEd2y6mFp1NMgerYniQtRfzmglxy21-Vl77BotTvUC_BrqvBU8z9PkTeSFmQQfhv6HUvH-I8qaWIg52PPN8PVw46-Hstl5fi8v34wQhvLxK0st-GUaD4nSKO6iTkrsagTU9dRLCPD9dSCxf85EIYrYTmONFd6WjRYA2vizhz9o05-JsAMjxDS_Ybz2FvO2AqGrO-AvsOUmjEYx_b6dPPozcO_s1RdnMTZsg",
    },
    {
      id: 4,
      title: "Wildflower Honey",
      price: 18.90,
      rating: 4.9,
      reviews: 356,
      tag: "ARTISAN",
      tagType: "ARTISAN",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkR0pCSq4VkSlaMCjgw1MIJtHWgOoIwghZZBgwdwbr2Gz_XuH0EP7PrmFHhVnkFu4HE3cTTO_AzyStiZC06w7CmNuX2vbkHx5rotY6g3_-sml_b1y7cajZX1bN28-KR7I2ASbLrQhpdSNzENe4SbtuTUqdSttcqWvXpbVeCEtBbRwWbUiu04K-1yY3Lj9y6bDyGvCnaIGrxwMMt2T56fdlzKfDWuLYDhcnVLIz-ifnpYEqd2Kx5eQNHRqWR3z2RUqD0sk6Gn0zEw",
      farmer: "Sunny Apiaries",
      farmerImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXoPy5-qAH-cQZAGG3FYeproOwja8M6rgcrtJl43xJpDHTWpA5CNU7n8M4rzf3AStLAz8oRkzuHQqK4tws0cdSkA_gLxWXO5Ka2z3kMQxIqRsQShBSF2zkmC5RdXCZwm2Xhhvj-iRDyo7xdEimab9W-Pv9VDZdnmBjWzV69-ZnUrpdTQsEXyIumMrS4WsA_y2cUydqBEE9nP_QfpcGSEEHzpXPIIe89GPqhfBqeV3bXyg4oO8pSDACCwiGqawZvXnvGhPpNuobVA",
    },
  ];

  const categories = [
    { title: "All Produce", icon: Grid },
    { title: "Organic Crops", icon: Sprout },
    { title: "Seasonal Fruits", icon: Apple },
    { title: "Smart Equipment", icon: Wrench },
    { title: "Bio-Seeds", icon: Leaf },
    { title: "Irrigation", icon: Droplet },
  ];

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      {/* Main Content Area */}
      <main className="min-h-screen flex flex-col relative">
        {/* TopNavBar */}
        <Header showNav activeNav="marketplace" showSearch showStats showRoleSwitcher />


        {/* Product View Canvas */}
        <div className="flex-1 px-lg py-xl max-w-container-max mx-auto w-full">
          {/* Category Chips */}
          <section className="mb-xl overflow-x-auto flex items-center gap-sm scrollbar-hide pb-md">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.title;
              const IconComponent = cat.icon;
              return (
                <button
                  key={cat.title}
                  onClick={() => setSelectedCategory(cat.title)}
                  className={`flex items-center gap-sm px-lg py-md rounded-xl font-bold whitespace-nowrap shadow-sm transition-all ${
                    isSelected
                      ? "bg-primary-container text-on-primary-container"
                      : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant"
                  }`}
                >
                  <IconComponent className="w-5 h-5 shrink-0" />
                  {cat.title}
                </button>
              );
            })}
          </section>

          {/* Advanced Filter Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-lg mb-xl bg-surface-container-lowest p-lg rounded-xxl border border-outline-variant shadow-sm">
            <div>
              <h1 className="text-headline-lg font-headline-lg text-on-background">Marketplace</h1>
              <p className="text-body-md text-on-surface-variant">Sourced directly from certified intelligent farms.</p>
            </div>
            <div className="flex items-center gap-md">
              <div className="flex items-center bg-surface-container-low px-md py-sm rounded-lg border border-outline-variant">
                <span className="text-label-sm font-label-sm mr-sm">Sort By:</span>
                <select className="bg-transparent border-none p-0 text-label-sm font-bold focus:ring-0 cursor-pointer">
                  <option>Highest Rated</option>
                  <option>Price: Low to High</option>
                  <option>Newest Arrivals</option>
                </select>
              </div>
              <button className="flex items-center gap-sm bg-on-background text-background px-lg py-sm rounded-lg font-bold hover:opacity-90">
                <Filter className=" shrink-0"  /> Filters
              </button>
            </div>
          </div>

          {/* Bento Product Grid */}
          <div className="bento-grid mb-xxl">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={() => setCartOpen(true)} />
            ))}
          </div>

          {/* Personalized Suggestions */}
          <section className="mb-xxl">
            <div className="flex items-center justify-between mb-lg">
              <h2 className="text-headline-lg font-headline-lg">Suggested for Your Farm</h2>
              <a className="text-primary font-bold hover:underline" href="#suggestions">See All Suggestions</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
              <div className="flex items-center gap-md p-md bg-surface-container-low rounded-xl border border-outline-variant hover:border-primary transition-all cursor-pointer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-20 h-20 rounded-lg object-cover"
                  alt="Nitrogen Booster"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzs9GNUNAob_lor85YW0BVpRLgiRBlv1llPTJvSi9qLBcR-g37Hz-tSOe5bkNfsOzz-pI7fjAK2t7TOzuRd00gQcRE0gvO9Ww7-idyMF0a80zy5UXh_d-erhtoa2rZhbXDcspTf898K3ToGRIUJUMf_Ot_uPa5i7mQZypbk4IqfRTsnBDcqNIWCYQ8alK4ClhoCBvQZbgmjTLNA5OsihkOmAKJyVFCTTVJ0-Sk0k7M6Iy3h3gP1TfNlGoRoo0fOvSKZoR0yPzD8Q"
                />
                <div>
                  <p className="text-label-sm font-bold text-primary">RECURRING ITEM</p>
                  <h4 className="font-bold text-on-background">Nitrogen Booster Pellets</h4>
                  <p className="text-label-sm text-on-surface-variant">$45.00 / 25kg</p>
                </div>
              </div>
              <div className="flex items-center gap-md p-md bg-surface-container-low rounded-xl border border-outline-variant hover:border-primary transition-all cursor-pointer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-20 h-20 rounded-lg object-cover"
                  alt="Hybrid Corn Seeds"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDObwmK98e7d-o0ChdaiTzLoZUpc6vy4bMVJqYXqNsMIxI-t3u_kuP00LXE5YIeB0fWz6kX1qB5diLjCDMZnbXet6m-uOZAd9iHaGe-iSzLBWyd6GhZRDYrDoAq7za2MdyWpAWLnhswTni_cSHZIMZU8RcNiweNzEklIuWMhilfK4cdsjAY-oUpQ3pKhxds4w6OamgNYYLpTAQfXeCHBuq9rklFDRxooWoCRY7U5VUbFqMpSiK-rlxpxlaPg5SHmMfh01TAT9TFGg"
                />
                <div>
                  <p className="text-label-sm font-bold text-primary">NEW ARRIVAL</p>
                  <h4 className="font-bold text-on-background">Hybrid Corn Seeds</h4>
                  <p className="text-label-sm text-on-surface-variant">$120.00 / Bulk</p>
                </div>
              </div>
              <div className="flex items-center gap-md p-md bg-surface-container-low rounded-xl border border-outline-variant hover:border-primary transition-all cursor-pointer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-20 h-20 rounded-lg object-cover"
                  alt="Eco Pesticide"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFqpjeKDHGNllcPuDcXWPUaOahbm6hR5Y2MyFb6m9DHwHfNxL1TVlOXb7dX75r0DhgSr173zVC9vSh3UWWr12drEQhpUouxr-W3GWb-8nE5I9E7K_silKtl75nxoMlhM6rSVoqWXEkBaFwn1-2FvwI7JTyk58NnwMsRdw99VDZP1iQfjRoNDIQcc_I2UXIz5ZSF3NBtz4At9h551BJJDK944CGJzI_tt861OMgpk_0v3310G4mQM31M4EU0SI2ZubqhU01z-NAMg"
                />
                <div>
                  <p className="text-label-sm font-bold text-primary">TOP RATED</p>
                  <h4 className="font-bold text-on-background">Eco-Friendly Pesticide</h4>
                  <p className="text-label-sm text-on-surface-variant">$32.50 / Litre</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <Footer appName="AgriSmart Ecosystem" />
      </main>

      {/* Shopping Cart Sidebar (Overlay Drawer) */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-sm bg-surface-container-lowest shadow-2xl z-50 transition-transform duration-300 flex flex-col border-l border-outline-variant ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-lg border-b border-outline-variant flex items-center justify-between">
          <div className="flex items-center gap-md">
            <ShoppingBasket className="text-primary shrink-0"  />
            <h2 className="text-title-md font-bold">Your Cart</h2>
          </div>
          <button className="w-10 h-10 flex items-center justify-center hover:bg-surface-container rounded-full" onClick={() => setCartOpen(false)}>
            <X className=" shrink-0"  />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-lg flex flex-col gap-lg">
          <div className="flex gap-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-16 h-16 rounded-lg object-cover"
              alt="Kale mix"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDMEP-cE7queOBlKYDHQduTZ57H0sgONY86kPB506yyYTFNhzg9jnasKfqVTUpiWPJXzjlDEcCYSC_V7_tEcFP3iaDM-j4W5tOa83zv52JuMDvy1mejg7UEY5hXtt9U6ALQID4ByKuO2t_CyzBYy_VdcURw0l0c9fRykIEvx1JK8C1rhtLRjVGuKiw7Ay8XeDRofSVR_JyOzNWo3hbFVgXzGfv5c5-dN1MAtfhgYzNusp8HJgTWzS_cG4AzemSaRPZfd1vId0G8w"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="font-bold text-body-lg">Hydroponic Kale Mix</h4>
                <span className="font-bold text-primary">$12.50</span>
              </div>
              <p className="text-label-sm text-on-surface-variant">Qty: 1</p>
              <button className="text-error text-label-sm font-bold mt-sm hover:underline">Remove</button>
            </div>
          </div>
          <div className="flex gap-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-16 h-16 rounded-lg object-cover"
              alt="Heirloom carrots"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7Iipc4TxhQAfZEkDiBQaPscoFwvkf5BCezy30RvXyvd2VKnED_a_r8US4bTUu4g0H_bSxPJk31apzDNexZOv2be4i24t_ug9LMlKKUDioCH85EJw3gqGtLOCa7zuQ3m56D_SsYFL6zG_0veFgywxWsNZ_6_MJvM99wIXHtX4hce9bEx5ThIh-WGEJB5rxxkWdLujxlfer0vCRTIM8iv84xjKHo_QJ8AidIB7FyqBoGO4JtFb00OYuAUgnGlR5uNQLjaV2fc7Gog"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="font-bold text-body-lg">Heirloom Carrots</h4>
                <span className="font-bold text-primary">$8.00</span>
              </div>
              <p className="text-label-sm text-on-surface-variant">Qty: 2</p>
              <button className="text-error text-label-sm font-bold mt-sm hover:underline">Remove</button>
            </div>
          </div>
        </div>
        <div className="p-lg bg-surface-container-low border-t border-outline-variant">
          <div className="flex justify-between mb-sm">
            <span className="text-on-surface-variant">Subtotal</span>
            <span className="font-bold">$28.50</span>
          </div>
          <div className="flex justify-between mb-lg">
            <span className="text-on-surface-variant">Platform Fee</span>
            <span className="font-bold">$2.50</span>
          </div>
          <div className="flex justify-between mb-xl text-lg">
            <span className="font-bold">Total</span>
            <span className="font-extrabold text-primary">$31.00</span>
          </div>
          <Link
            href="/checkout"
            className="w-full bg-primary text-on-primary py-lg rounded-xl font-bold hover:opacity-90 transition-all shadow-md block text-center"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>

      {/* Floating Action Button (FAB) for Marketplace (Authority: Contextual FAB) */}
      <button
        className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group"
        onClick={() => setCartOpen(true)}
      >
        <ShoppingCart className="text-3xl shrink-0"  />
        <span className="absolute top-0 right-0 bg-error text-on-error text-xs w-6 h-6 flex items-center justify-center rounded-full border-2 border-surface font-bold shadow-sm">3</span>
        <div className="absolute right-full mr-4 bg-on-background text-background px-md py-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-label-sm font-bold pointer-events-none">
          View Shopping Cart
        </div>
      </button>
    </div>
  );
}

function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: () => void }) {
  return (
    <div className="bg-surface-container-lowest rounded-xxl overflow-hidden border border-outline-variant group hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="relative h-64 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          alt={product.title}
          src={product.image}
        />
        {product.tagType !== "NONE" && (
          <div
            className={`absolute top-4 left-4 text-label-sm px-sm py-1 rounded font-bold ${
              product.tagType === "ORGANIC"
                ? "bg-primary-container text-on-primary-container"
                : "bg-tertiary-container text-on-tertiary-container"
            }`}
          >
            {product.tag}
          </div>
        )}
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-error hover:bg-white transition-all">
          <Heart className=" shrink-0"  />
        </button>
      </div>
      <div className="p-lg flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-sm">
          <h3 className="text-title-md font-title-md text-on-background line-clamp-1">{product.title}</h3>
          <span className="text-primary font-bold text-lg">${product.price.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-xs mb-md">
          <Star className="text-tertiary fill-current w-4 h-4 shrink-0" />
          <span className="text-label-sm font-bold">{product.rating}</span>
          <span className="text-label-sm text-outline ml-sm">({product.reviews} Reviews)</span>
        </div>
        <div className="flex items-center gap-md mt-auto pt-md border-t border-outline-variant">
          <div className="flex items-center gap-sm flex-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-8 h-8 rounded-full" src={product.farmerImage} alt={product.farmer} />
            <span className="text-label-sm font-bold truncate">{product.farmer}</span>
          </div>
          <button className="text-primary text-label-sm font-bold hover:underline">Follow</button>
        </div>
        <button
          onClick={onAddToCart}
          className="w-full mt-lg bg-secondary text-on-secondary py-md rounded-xl font-bold flex items-center justify-center gap-sm hover:bg-secondary/90 transition-colors"
        >
          <ShoppingCart className=" shrink-0"  /> Add to Cart
        </button>
      </div>
    </div>
  );
}
