import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/auth/logout";

export default async function ProfilePage() {
  const session = await getServerSession(authConfig);

  if (!session) redirect("/signin");

  return (
    <div className="p-10 font-sans">
      <h1 className="text-2xl">Welcome, {session.user?.name}</h1>
      {/* <p>id: {session.user?}</p> */}
      <p>Email: {session.user?.email}</p>
      <p>Avatar: {session.user?.image}</p>
      <img
        src={session.user?.image!}
        referrerPolicy="no-referrer"
        alt="Profile"
        width={300}
        height={300}
        className="w-24 h-24 rounded-full mt-4"
      />
      <LogoutButton />
    </div>
  );
}
