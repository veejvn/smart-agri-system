"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/hooks/useAuthHooks";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const register = useRegisterMutation();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    register.mutate(
      { username, email, password },
      { onSuccess: () => router.push("/login") },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-md py-xl">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[28rem] bg-surface rounded-2xl shadow-lg border border-outline-variant p-xl"
      >
        <h1 className="text-headline-lg text-primary">Đăng ký</h1>
        <p className="text-body-md text-on-surface-variant mb-lg">Tạo tài khoản AgriSmart Pro</p>

        <label className="block text-label-sm font-bold text-on-surface mb-xs" htmlFor="username">
          Tên đăng nhập
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          minLength={3}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-surface-container rounded-lg border border-outline-variant px-md py-sm mb-md outline-none focus:border-primary"
        />

        <label className="block text-label-sm font-bold text-on-surface mb-xs" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-surface-container rounded-lg border border-outline-variant px-md py-sm mb-md outline-none focus:border-primary"
        />

        <label className="block text-label-sm font-bold text-on-surface mb-xs" htmlFor="password">
          Mật khẩu
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-surface-container rounded-lg border border-outline-variant px-md py-sm mb-md outline-none focus:border-primary"
        />

        {register.isError && (
          <p role="alert" className="text-error text-label-sm mb-md">
            Đăng ký thất bại. Tên đăng nhập hoặc email có thể đã tồn tại.
          </p>
        )}

        <button
          type="submit"
          disabled={register.isPending}
          className="w-full bg-primary text-on-primary rounded-full py-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {register.isPending ? "Đang đăng ký..." : "Đăng ký"}
        </button>

        <p className="text-body-md text-on-surface-variant mt-md text-center">
          Đã có tài khoản?{" "}
          <Link href="/login" className="text-primary font-bold">
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  );
}
