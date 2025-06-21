import { Skeleton } from "./ui/skeleton";

interface MessageUsageCardProps {
  usedMessages: number;
  totalMessages: number;
  resetTime: string;
  loading: boolean;
}

export default function RateLimitCard({
  usedMessages,
  totalMessages,
  resetTime,
  loading,
}: MessageUsageCardProps) {
  const percentageUsed = (usedMessages / totalMessages) * 100;
  const messagesRemaining = totalMessages - usedMessages;

  return (
    <div className="bg-dark-card-bg rounded-xl py-2 px-2.5 border">
      <div className="flex md:flex-col md:justify-center justify-between md:mb-5 mb-3">
        <div className="text-sm font-medium">Credit Usage</div>
        <div className="text-sm text-muted-foreground">{resetTime}</div>
      </div>

      {loading ? (
        <div className="flex mb-2">
          <Skeleton className="flex items-center h-8 w-full" />
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Free</span>
            <span className="text-sm text-muted-foreground">
              {usedMessages}/{totalMessages}
            </span>
          </div>
          <div
            className="w-full  bg-dark-progress-bg bg-muted-foreground/30 rounded-full h-2.5"
            role="progressbar"
            aria-valuenow={usedMessages}
            aria-valuemin={0}
            aria-valuemax={totalMessages}
          >
            <div
              className="bg-progress-fill bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentageUsed}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="text-sm text-muted-foreground mt-1">
        {messagesRemaining} credits remaining
      </div>
    </div>
  );
}
