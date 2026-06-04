"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useAuthStore } from "@/store/useAuthStore";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-64 w-[calc(100%-16rem)] h-16 flex items-center justify-between px-6 bg-transparent z-50">
        <div className="flex items-center gap-3">
  <img
    src="/images/logo2.png"
    alt="Logo"
    className="h-10 w-auto object-contain"
  />
</div>

        <div className="relative" ref={ref}>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex items-center focus:outline-none"
          >
            <div className="relative">
              <Image
                src="https://randomuser.me/api/portraits/men/15.jpg"
                alt="Avatar"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full border shadow-sm"
              />
              <span className="absolute bottom-0 right-0 block w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
            </div>
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-52 bg-white shadow-lg rounded-md border py-2 z-50">
              <div className="px-4 py-2 border-b">
                <p className="font-semibold text-gray-700 text-sm">{user?.name ?? "John Doe"}</p>
                <p className="text-xs text-gray-500">
  {(user?.role ?? "ADMINISTRATOR").toUpperCase()}
</p>
              </div>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</a>
              <button
                type="button"
                onClick={() => logout()}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
      <div className="h-16" />
    </>
  );
}
