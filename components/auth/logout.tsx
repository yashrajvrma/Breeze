"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="bg-red-600 mt-4 px-4 py-2 rounded text-white"
    >
      Logout
    </button>
  );
}
