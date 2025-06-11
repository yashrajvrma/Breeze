"use client";

export function getFormattedResetTime(): string {
  const fixedUtcHour = 18;
  const fixedUtcMinute = 29;

  const now = new Date();
  const utcYear = now.getUTCFullYear();
  const utcMonth = now.getUTCMonth();
  const utcDate = now.getUTCDate();

  let resetUtc = new Date(
    Date.UTC(utcYear, utcMonth, utcDate, fixedUtcHour, fixedUtcMinute)
  );

  if (now > resetUtc) {
    resetUtc = new Date(
      Date.UTC(utcYear, utcMonth, utcDate + 1, fixedUtcHour, fixedUtcMinute)
    );
  }

  // Force English locale
  return resetUtc.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
