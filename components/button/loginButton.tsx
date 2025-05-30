import { ChevronRight, ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();

  return (
    <div className="flex flex-col px-3.5 py-5 border border-bg-neutral-700 font-sans space-y-1 rounded-2xl">
      <div className="text-lg text-foreground/90 font-medium">Login In</div>
      <p className="text-sm font-medium pb-3 text-muted-foreground ">
        Join thousands of people using Breeze to create beautiful docs.
      </p>

      <Button
        onClick={() => router.push("/signin")}
        className="group relative overflow-hidden"
        size="lg"
      >
        <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">
          Get Started
        </span>
        <i className="absolute right-1 top-1 bottom-1 rounded-sm z-10 grid w-1/4 place-items-center transition-all duration-500 bg-primary-foreground/15 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95 text-black-500">
          <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
        </i>
      </Button>
    </div>
  );
}
