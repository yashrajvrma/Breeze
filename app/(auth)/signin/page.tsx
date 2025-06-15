import Login from "@/components/auth/Login";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signin",
};

export default function Signin() {
  return <Login />;
}
