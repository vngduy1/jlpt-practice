import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JLPT Practice",
    short_name: "JLPT",
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf8",
    theme_color: "#304b91",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}