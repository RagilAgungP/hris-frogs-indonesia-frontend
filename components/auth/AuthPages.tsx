"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

/* ===================== LOGIN PAGE ===================== */
export function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login({
      email: email || "guest",
      password: password || "",
    });

    router.replace("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* LEFT SIDE (LOGO IMAGE) */}
        <div className="auth-left">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="auth-logo-img"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-right">
          <h1>Login</h1>
          <div className="auth-subtitle">Welcome back, please login.</div>

          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <div className="auth-forgot">
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit">Login</button>
          </form>

          <div className="auth-register">
            Don&apos;t have an account? <Link href="/register">Register</Link>
          </div>
        </div>

      </div>

      <style jsx global>{authStyles}</style>
    </div>
  );
}

/* ===================== REGISTER PAGE ===================== */
export function RegisterPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login({
      email: email || "guest",
      password: password || "",
      name: name || "User",
    });

    router.replace("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* LEFT SIDE (LOGO IMAGE) */}
        <div className="auth-left">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="auth-logo-img"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-right">
          <h1>Register</h1>
          <div className="auth-subtitle">Create your account.</div>

          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />

            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <button type="submit">Register</button>
          </form>

          <div className="auth-register">
            Already have an account? <Link href="/login">Login</Link>
          </div>
        </div>

      </div>

      <style jsx global>{authStyles}</style>
    </div>
  );
}

/* ===================== STYLE ===================== */
const authStyles = `
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: linear-gradient(to bottom, #3db5ff, white);
}

.auth-card {
  width: 100%;
  max-width: 600px;
  display: flex;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  background: white;
}

.auth-left {
  flex: 1;
  background: linear-gradient(to right, #3db5ff, white);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
}

/* LOGO IMAGE */
.auth-logo-img {
  width: 220px;
  height: auto;
  object-fit: contain;
}

.auth-right {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.auth-right h1 {
  font-size: 24px;
  margin-bottom: 4px;
}

.auth-subtitle {
  font-size: 12px;
  color: #666;
  margin-bottom: 10px;
}

.auth-right label {
  font-size: 12px;
  margin-bottom: 5px;
  display: block;
  font-weight: 600;
}

.auth-right input {
  width: 100%;
  padding: 10px;
  margin-bottom: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
}

.auth-right input:focus {
  border-color: #3db5ff;
  outline: none;
}

.auth-right button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: #3db5ff;
  color: white;
  font-size: 14px;
  cursor: pointer;
}

.auth-register {
  text-align: center;
  font-size: 12px;
  margin-top: 14px;
  color: #666;
}

.auth-register a {
  color: #3db5ff;
  font-weight: bold;
  text-decoration: none;
}

@media (max-width: 768px) {
  .auth-card {
    flex-direction: column;
  }
}
`;