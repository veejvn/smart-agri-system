"use client";

import { CheckCircle2, Truck, CreditCard, Contact } from "lucide-react";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import Footer from "@/components/footer";


export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div className="min-h-screen bg-background text-on-background">
      <Sidebar />

      {/* Main Content Area */}
      <main className="md:ml-64 min-h-screen flex flex-col">
        {/* TopNavBar */}
        <Header
          showNav
          activeNav="marketplace"
          showStats
          showUser
          user={{
            avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_5PW1AsxV1xb1m0HC9noAFNCiY7gexJpALe4qTcdBgve9TlrfdUwWgz5cPDau9_rbAhIDkyqOwDXXwbAZmDxFn-AuKV_3t_eX28Ta2ZUOg0P6dzj24dANauGaoc0ev32Z-5Rd-wMYSZvBsKEFPHnaKWVOjJWt4N5VFeSeAtt8GM12aKJFbdGLSF2JUCBEsxDRhocThbB2Mb0P8Ypku5aiIGeXThpGEC8Hc1VCsj0WrNFLonzohIkCMUTg_caWCcIXQ93gOj2UrA"
          }}
        />


        {/* Checkout Canvas */}
        <div className="max-w-container-max mx-auto px-lg py-xl w-full grow">
          {success ? (
            <div className="max-w-xl mx-auto bg-surface-container-lowest p-xl rounded-2xl border border-outline-variant text-center space-y-lg shadow-lg my-xl animate-fade-in">
              <CheckCircle2 className="text-primary text-[80px] bg-secondary-container/20 p-md rounded-full shrink-0"  />
              <h2 className="text-headline-lg font-bold text-primary">Đặt hàng thành công!</h2>
              <p className="text-body-lg text-on-surface-variant">
                Cảm ơn bạn đã lựa chọn AgriSmart Pro. Mã đơn hàng của bạn là <strong className="text-primary font-mono">#ORD-90251</strong>.
                Chúng tôi sẽ xử lý và chuyển phát tới trang trại của bạn trong thời gian sớm nhất.
              </p>
              <div className="flex justify-center gap-md pt-md">
                <Link href="/order-details" className="bg-primary text-on-primary font-bold px-lg py-md rounded-xl hover:opacity-90 transition-opacity">
                  Theo dõi hành trình
                </Link>
                <Link href="/marketplace" className="border border-outline-variant font-bold px-lg py-md rounded-xl hover:bg-surface-container transition-colors">
                  Tiếp tục mua sắm
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-xl">
              {/* Header & Progress Indicator */}
              <div className="text-center">
                <h1 className="text-headline-lg font-headline-lg text-on-surface mb-md">Checkout | Hoàn tất Đơn hàng</h1>
                <div className="flex items-center justify-center gap-sm max-w-2xl mx-auto mt-lg">
                  <div className="flex items-center gap-xs text-primary font-bold">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-label-sm">1</span>
                    <span className="text-label-sm">Vận chuyển</span>
                  </div>
                  <div className="w-16 h-0.5 bg-outline-variant"></div>
                  <div className="flex items-center gap-xs text-outline">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant text-label-sm">2</span>
                    <span className="text-label-sm">Thanh toán</span>
                  </div>
                  <div className="w-16 h-0.5 bg-outline-variant"></div>
                  <div className="flex items-center gap-xs text-outline">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant text-label-sm">3</span>
                    <span className="text-label-sm">Xem lại</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-xl">
                {/* Left Column: Shipping & Contact Forms */}
                <div className="md:col-span-7 space-y-lg">
                  {/* Contact Details */}
                  <section className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm">
                    <div className="flex items-center gap-sm mb-lg">
                      <Contact className="text-primary shrink-0"  />
                      <h2 className="text-title-md font-title-md text-on-surface">Thông tin liên hệ</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                      <div className="flex flex-col gap-xs">
                        <label className="text-label-sm text-on-surface-variant font-medium">Họ và Tên</label>
                        <input required className="border border-outline-variant rounded-lg p-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all" placeholder="Nguyễn Văn A" type="text" />
                      </div>
                      <div className="flex flex-col gap-xs">
                        <label className="text-label-sm text-on-surface-variant font-medium">Số điện thoại</label>
                        <input required className="border border-outline-variant rounded-lg p-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all" placeholder="090 123 4567" type="tel" />
                      </div>
                      <div className="md:col-span-2 flex flex-col gap-xs">
                        <label className="text-label-sm text-on-surface-variant font-medium">Email</label>
                        <input required className="border border-outline-variant rounded-lg p-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all" placeholder="nva@agri-farm.com" type="email" />
                      </div>
                    </div>
                  </section>

                  {/* Shipping Address */}
                  <section className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm">
                    <div className="flex items-center gap-sm mb-lg">
                      <Truck className="text-primary shrink-0"  />
                      <h2 className="text-title-md font-title-md text-on-surface">Địa chỉ giao hàng</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-md">
                      <div className="flex flex-col gap-xs">
                        <label className="text-label-sm text-on-surface-variant font-medium">Địa chỉ chi tiết</label>
                        <input required className="border border-outline-variant rounded-lg p-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all" placeholder="Số nhà, Tên đường" type="text" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                        <div className="flex flex-col gap-xs">
                          <label className="text-label-sm text-on-surface-variant font-medium">Tỉnh/Thành phố</label>
                          <select className="border border-outline-variant rounded-lg p-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all bg-white cursor-pointer">
                            <option>TP. Hồ Chí Minh</option>
                            <option>Hà Nội</option>
                            <option>Đồng Tháp</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-xs">
                          <label className="text-label-sm text-on-surface-variant font-medium">Quận/Huyện</label>
                          <select className="border border-outline-variant rounded-lg p-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all bg-white cursor-pointer">
                            <option>Quận 1</option>
                            <option>Cao Lãnh</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-xs">
                          <label className="text-label-sm text-on-surface-variant font-medium">Phường/Xã</label>
                          <select className="border border-outline-variant rounded-lg p-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all bg-white cursor-pointer">
                            <option>Bến Nghé</option>
                            <option>Mỹ Tân</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Payment Methods */}
                  <section className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm">
                    <div className="flex items-center gap-sm mb-lg">
                      <CreditCard className="text-primary shrink-0"  />
                      <h2 className="text-title-md font-title-md text-on-surface">Phương thức thanh toán</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                      <div>
                        <input
                          className="hidden"
                          id="momo"
                          name="payment"
                          type="radio"
                          checked={paymentMethod === "momo"}
                          onChange={() => setPaymentMethod("momo")}
                        />
                        <label
                          className={`flex flex-col items-center gap-sm p-md border-2 rounded-xl cursor-pointer hover:border-primary transition-all text-center ${
                            paymentMethod === "momo" ? "border-primary bg-surface-container-low" : "border-outline-variant"
                          }`}
                          htmlFor="momo"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img alt="MoMo" className="h-10 w-10 object-contain rounded-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7xFOzewOVhrh2_yHekvGHEhGbEe4qjchyk70cvcZUMfQrpkWt0XTAVQVNBAPsdNPybvmRKLCEqdRWS8tc_t6jA53K3RL5LML6NgsBr_QHhWmpltmQGelE96-hK6F5u92eV_HRyt6SViQTviCj6MoSwcX7LyyRGN5nAYX8bT-87ZqMgSbIpNEcerJsE5geV3EyVaGbDrf7ZYhpcJUVQNtAJtEDb8mKBnVycx4_z_FhuqFBcmOTXoY1VTJ8I3tyNU9Nn-tho-N58w" />
                          <span className="text-label-sm font-bold">Ví MoMo</span>
                        </label>
                      </div>
                      <div>
                        <input
                          className="hidden"
                          id="zalopay"
                          name="payment"
                          type="radio"
                          checked={paymentMethod === "zalopay"}
                          onChange={() => setPaymentMethod("zalopay")}
                        />
                        <label
                          className={`flex flex-col items-center gap-sm p-md border-2 rounded-xl cursor-pointer hover:border-primary transition-all text-center ${
                            paymentMethod === "zalopay" ? "border-primary bg-surface-container-low" : "border-outline-variant"
                          }`}
                          htmlFor="zalopay"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img alt="ZaloPay" className="h-10 w-10 object-contain rounded-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfaVPhSCOVRUqzSATrRrjdoggKpJc1Olb5XfFRWEh6NbMwFRu_AabSJ50XzXDVmAkAzHZz6x1aacYcGMkLdIW_mrHJw2JpOArBf7xVFVNY8FsQQ5fOv16B_J3At9L9tChYOJJh6XLEoofQsZGoV00g0rMpKYZJ8lAg2eusR_QXq-OaXu9e5WqRScZwakV08mKm5v543w6TLD0jZsrXnCvbt89WX5OK265959JLkjQMYMOKwx6ANC-rQFOuKGYDl7jyXU_hW3PIgw" />
                          <span className="text-label-sm font-bold">ZaloPay</span>
                        </label>
                      </div>
                      <div>
                        <input
                          className="hidden"
                          id="credit"
                          name="payment"
                          type="radio"
                          checked={paymentMethod === "credit"}
                          onChange={() => setPaymentMethod("credit")}
                        />
                        <label
                          className={`flex flex-col items-center gap-sm p-md border-2 rounded-xl cursor-pointer hover:border-primary transition-all text-center ${
                            paymentMethod === "credit" ? "border-primary bg-surface-container-low" : "border-outline-variant"
                          }`}
                          htmlFor="credit"
                        >
                          <CreditCard className="text-on-surface-variant text-4xl shrink-0"  />
                          <span className="text-label-sm font-bold">Credit Card</span>
                        </label>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Right Column: Order Summary */}
                <div className="md:col-span-5">
                  <div className="sticky top-24 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-lg p-lg overflow-hidden">
                    <h2 className="text-title-md font-title-md text-on-surface mb-lg">Tóm tắt đơn hàng</h2>
                    
                    {/* Line Items */}
                    <div className="space-y-md max-h-96 overflow-y-auto mb-lg border-b border-outline-variant pb-lg scrollbar-thin">
                      <div className="flex gap-md items-center">
                        <div className="w-16 h-16 rounded-lg bg-surface-container overflow-hidden shrink-0 border border-outline-variant">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt="Organic Wheat"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeC4m5XQuY4yH42vfN7zeGsmpf_ATjxd34thUmargRmO0wyo4bTia_LjlRFX4_s0bcKb_SpFU1SFLHwJuy0ZmGD8uDUllFzWmRTl1wh9794-PdrqbJeogeVuXJIqSc94CX2wpSQh7yIhhWblnJC7Ryygyrv8Qg-mmNnyDSfWEhUqI48dO2DqtOeCxjbJaKzbD29XUh6OtYlH1tQ_46e65cUJtE-d2Ftkcz3aVythTEbZ5ZYOz7R0FhdxKHgccP4dKxnGbh_-sz4g"
                          />
                        </div>
                        <div className="grow">
                          <h3 className="text-body-md font-bold text-on-surface">Organic Wheat - Grade A</h3>
                          <p className="text-label-sm text-on-surface-variant">Số lượng: 200 kg</p>
                        </div>
                        <div className="text-right">
                          <span className="text-body-md font-bold text-primary">12.000.000₫</span>
                        </div>
                      </div>
                      <div className="flex gap-md items-center">
                        <div className="w-16 h-16 rounded-lg bg-surface-container overflow-hidden shrink-0 border border-outline-variant">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt="Soil Moisture Sensors"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJx0MGvKf8_QJ1UxDEKSPDYrC2z1pwB_br7kQeOckp3GF4nt54C9P1PQYaybmEqKFRcxAaYQILaM51cs_EgQOp5fPZUWpDPYlsDxAN4FExvnKnQeK0Gn4bR6ZcbI4mLUH-nfmKD4For5F3bm4gObq8mjZlyQ4_G9PqqYWZmZmXOr4FYrmcjOkgi87Vep0ckp2LbKJ99qFx5zwVVTad6SDnG1wJYegnCEiN1XGCEePippXuRambJFtOxIIBt0oHXu5IzdPo_fNLGA"
                          />
                        </div>
                        <div className="grow">
                          <h3 className="text-body-md font-bold text-on-surface">Soil Moisture Sensor v3</h3>
                          <p className="text-label-sm text-on-surface-variant">Số lượng: 5 cái</p>
                        </div>
                        <div className="text-right">
                          <span className="text-body-md font-bold text-primary">2.500.000₫</span>
                        </div>
                      </div>
                    </div>

                    {/* Pricing Breakdown */}
                    <div className="space-y-sm text-on-surface-variant border-b border-outline-variant pb-lg mb-lg">
                      <div className="flex justify-between">
                        <span className="text-body-md">Tạm tính</span>
                        <span className="text-body-md">14.500.000₫</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-body-md">Phí vận chuyển</span>
                        <span className="text-body-md">250.000₫</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-body-md">Thuế (VAT 8%)</span>
                        <span className="text-body-md">1.160.000₫</span>
                      </div>
                      <div className="flex justify-between items-center text-primary font-medium bg-secondary-container/20 p-sm rounded-lg">
                        <span className="text-label-sm">Mã giảm giá (FARM2024)</span>
                        <span className="text-label-sm">-500.000₫</span>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-end mb-xl">
                      <span className="text-title-md font-bold text-on-surface">Tổng cộng</span>
                      <div className="text-right">
                        <p className="text-headline-lg font-headline-lg text-primary">15.410.000₫</p>
                        <p className="text-label-sm text-on-surface-variant italic">Bao gồm VAT</p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary text-white py-md rounded-xl font-bold text-lg hover:bg-primary-container transition-all transform active:scale-95 shadow-md shadow-primary/20"
                    >
                      Xác nhận &amp; Thanh toán
                    </button>
                    <p className="text-center text-label-sm text-on-surface-variant mt-md">
                      Bằng cách đặt hàng, bạn đồng ý với <a className="text-primary underline hover:opacity-80" href="#terms">Điều khoản &amp; Chính sách</a> của AgriSmart.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <Footer appName="AgriSmart Ecosystem" className="mt-auto" />
      </main>
    </div>
  );
}
