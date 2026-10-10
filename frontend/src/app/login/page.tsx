"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/hooks/useAuthHooks";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useLoginMutation();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login.mutate(
      { username, password },
      { onSuccess: () => router.push("/dashboard") },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-md py-xl">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[28rem] bg-surface rounded-2xl shadow-lg border border-outline-variant p-xl"
      >
        <h1 className="text-headline-lg text-primary">Đăng nhập</h1>
        <p className="text-body-md text-on-surface-variant mb-lg">AgriSmart Pro</p>

        <label className="block text-label-sm font-bold text-on-surface mb-xs" htmlFor="username">
          Tên đăng nhập
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-surface-container rounded-lg border border-outline-variant px-md py-sm mb-md outline-none focus:border-primary"
        />

        <label className="block text-label-sm font-bold text-on-surface mb-xs" htmlFor="password">
          Mật khẩu
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-surface-container rounded-lg border border-outline-variant px-md py-sm mb-md outline-none focus:border-primary"
        />

        {login.isError && (
          <p role="alert" className="text-error text-label-sm mb-md">
            Đăng nhập thất bại. Kiểm tra tên đăng nhập hoặc mật khẩu.
          </p>
        )}

        <button
          type="submit"
          disabled={login.isPending}
          className="w-full bg-primary text-on-primary rounded-full py-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {login.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        <p className="text-body-md text-on-surface-variant mt-md text-center">
          Chưa có tài khoản?{" "}
          <Link href="/register" className="text-primary font-bold">
            Đăng ký
          </Link>
        </p>
      </form>
    </div>
  );
}
