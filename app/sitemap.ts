import type { MetadataRoute } from "next"

import { featuredProjects } from "@/components/panther-dark/data"

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
  "http://localhost:3000"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    // One entry per case study. Generated from the same list the pages are
    // built from, so a new project cannot be added to the site and forgotten
    // here.
    ...featuredProjects.map((project) => ({
      url: `${siteUrl}/project/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
