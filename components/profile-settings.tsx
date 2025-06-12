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
import { Textarea } from "@/components/ui/textarea"; // Assuming Textarea is available or using a simple textarea tag
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProfileSettings() {
  const [workFunction, setWorkFunction] = React.useState<string>("");
  const [hasChanges, setHasChanges] = React.useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();

  if (!session) {
    router.push("/signin");
  }

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
            className="mt-1 outline-0 bg-transparent"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={email}
            readOnly
            className="mt-1 outline-0 bg-transparent"
          />
        </div>
      </div>

      <div className="mb-6">
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
      </div>
    </div>
  );
}
