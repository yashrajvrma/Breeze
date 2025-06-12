"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import RateLimitCard from "./rate-limit-card";
import RateLimit from "./sidebar/RateLimit";
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
  const [workFunction, setWorkFunction] = React.useState<string>("");
  const [hasChanges, setHasChanges] = React.useState(false);

  const router = useRouter();
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

  const localTime = getFormattedResetTime();

  // Dummy data for readonly fields
  const fullName = session?.user.name || "";
  const email = session?.user?.email || "";

  const workOptions = [
    { value: "content-creator", label: "Content Creator" },
    { value: "developer", label: "Developer" },
    { value: "researcher", label: "Researcher" },
    { value: "student", label: "Student" },
    { value: "business-user", label: "Business User" },
    { value: "other", label: "Other" },
  ];

  const handleWorkFunctionChange = (value: string) => {
    setWorkFunction(value);
    setHasChanges(true);
  };

  const handleSave = async () => {
    // do task
    // Implement save logic here, e.g., send data to an API
    console.log("Saving profile settings:", {
      fullName,
      email,
      workFunction,
    });
    setHasChanges(false); // Reset changes state after saving
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="flex py-1 px-5">
        <Skeleton className="flex items-center h-20 w-full" />
      </div>
    );
  }

  return (
    <div className="px-2 py-2">
      {/* <h2 className="text-2xl font-bold mb-4">Profile Settings</h2> */}
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

      {/* <div className="mb-6">
        <Label htmlFor="workFunction">What best describes your work?</Label>
        <Select onValueChange={handleWorkFunctionChange} value={workFunction}>
          <SelectTrigger
            id="workFunction"
            className="w-full mt-1 cursor-default bg-primary-foreground"
          >
            <SelectValue placeholder="Select your work function" />
          </SelectTrigger>
          <SelectContent className="font-sans bg-primary-foreground">
            {workOptions.map((option) => (
              <SelectItem
                className="cursor-pointer px-7 py-2 hover:bg-muted-foreground/20"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => handleSave()} disabled={!hasChanges}>
          Save
        </Button>
      </div> */}
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
