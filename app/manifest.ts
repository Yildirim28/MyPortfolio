import type { MetadataRoute } from "next";

import { assetPath } from "@/lib/utils";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MD. Shamim Osman Chowdhury — Portfolio",
    short_name: "Shamim Portfolio",
    description: "Software engineering and SQA portfolio of MD. Shamim Osman Chowdhury.",
    start_url: assetPath("/"),
    display: "standalone",
    background_color: "#080e16",
    theme_color: "#080e16",
    icons: [
      {
        src: assetPath("/icon.svg"),
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
