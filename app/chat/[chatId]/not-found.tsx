import { GoBack } from "@/components/button/go-back";

export default function NotFoud() {
  return (
    <div className="flex flex-col justify-center items-center align-middle gap-y-2 font-sans h-screen px-5">
      <div className="flex flex-col items-center align-middle md:text-9xl text-8xl md:font-bold font-bold text-muted-foreground/60">
        404
      </div>
      <div className="text-xl font-semibold md:mt-4 mt-2">Page Not Found</div>
      <div className="text-base text-muted-foreground text-center">
        Oops! The page you're looking for doesn't exist or has been moved.
      </div>
      <div className="mt-1">
        <GoBack />
      </div>
    </div>
  );
}
