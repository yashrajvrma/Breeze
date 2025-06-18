import { MetadataRoute } from "next";

export default function robot(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/auth", "/chat/"],
    },
    sitemap: "https://www.breezeai.live/sitemap.xml",
  };
}
