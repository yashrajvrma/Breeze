"use client";

import { getFormattedResetTime } from "@/lib/utils/getLocalTimeZone";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import RateLimitCard from "../rate-limit-card";
import { Skeleton } from "../ui/skeleton";

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
export default function RateLimit() {
  const { data: session, status } = useSession();
  const [requestCount, setRequestCount] = useState<number>(0);
  const [maxRequest, setMaxRequest] = useState<number>(5);

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

  useEffect(() => {
    if (RateLimitData) {
      setRequestCount(RateLimitData?.requestCount);
      setMaxRequest(RateLimitData?.maxRequest);
    }
  }, [RateLimitData]);

  const localTime = getFormattedResetTime();

  if (status === "loading" || isLoading) {
    return (
      <div className="flex py-1 px-5">
        <Skeleton className="flex items-center h-20 w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center font-sans text-sm rounded-xl mx-3 my-1">
      <RateLimitCard
        usedMessages={requestCount}
        totalMessages={maxRequest}
        resetTime={`Resets after ${localTime}`}
      />
    </div>
  );
}
