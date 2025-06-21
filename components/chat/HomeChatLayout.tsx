"use client";

import { Suspense, useEffect } from "react";
import ChatForm from "./chat-form";
import ChatTemplates from "./chat-template";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function HomeChatLayout() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Only redirect when we're sure the user is not authenticated
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  if (status === "unauthenticated" || !session) {
    return null;
  }

  const userId = session?.user.id!;

  return (
    <div className="flex flex-col font-sans h-screen">
      {/* <div className="md:hidden">
        <HomeChatHeader title="Breeze" />
      </div> */}

      <div className="flex flex-col justify-center items-center align-middle text-center h-screen">
        <div className="md:text-5xl text-3xl tracking-tighter font-semibold text-primary text-center px-1">
          What do you want to create?
        </div>
        <div className="md:mt-2.5 mt-1.5 md:text-lg text-base font-sans tracking-tight text-muted-foreground">
          Prompt, research and edit documents with AI.
        </div>

        <div className="md:w-[650px] w-full md:mt-7 mt-5 px-5">
          <Suspense
            fallback={
              <div className="h-[150px] animate-pulse bg-gray-100 rounded-2xl" />
            }
          >
            <ChatForm userId={userId} />
          </Suspense>
        </div>

        <Suspense
          fallback={
            <div className="flex gap-2 my-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-10 w-32 bg-gray-100 animate-pulse rounded-xl"
                />
              ))}
            </div>
          }
        >
          <ChatTemplates userId={userId} />
        </Suspense>
      </div>
    </div>
  );
}
