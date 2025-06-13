"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import RateLimitCard from "./rate-limit-card";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getFormattedResetTime } from "@/lib/utils/getLocalTimeZone";
import { Skeleton } from "./ui/skeleton";

type RateLimitProps = {
  success: boolean;
  requestCount: number;
  maxRequest: number;
};
const rateLimitFn = async (userId: string): Promise<RateLimitProps> => {
  try {
    const response = await axios.get(
      `/api/v1/chat/rate-limit?userId=${userId}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};

export function ProfileSettings() {
  const [requestCount, setRequestCount] = React.useState<number>(0);
  const [maxRequest, setMaxRequest] = React.useState<number>(5);

  const { data: session, status } = useSession();

  const userId = session?.user.id!;

  const {
    data: RateLimitData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["rateLimit", userId],
    queryFn: () => rateLimitFn(userId),
    enabled: !!session,
  });

  React.useEffect(() => {
    if (RateLimitData) {
      setRequestCount(RateLimitData?.requestCount);
      setMaxRequest(RateLimitData?.maxRequest);
    }
  }, [RateLimitData]);

  if (status === "loading" || isLoading) {
    return (
      <div className="flex py-1 px-5">
        <Skeleton className="flex items-center h-20 w-full" />
      </div>
    );
  }

  const localTime = getFormattedResetTime();

  const fullName = session?.user.name || "";
  const email = session?.user?.email || "";

  return (
    <div className="px-2 py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 font-normal font-sans">
        <div>
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            value={fullName}
            readOnly
            className="mt-1 outline-0 bg-primary-foreground"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={email}
            readOnly
            className="mt-1 outline-0 bg-primary-foreground"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-y-2 text-sm">
        <span className="font-medium">Token</span>
        <RateLimitCard
          usedMessages={requestCount}
          totalMessages={maxRequest}
          resetTime={`Resets after ${localTime}`}
        />
      </div>
    </div>
  );
}
