import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer(
    // {
    //   links: {
    //     GitHub: "https://github.com/devnyxie",
    //     "Resume": "https://devnyxie.notion.site/resume",
    //     "Portfolio": "https://devnyxie.com/projects",
    //   },
    // }
),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.RecentNotes({ showTags: false, limit: 5, title: "Activity Log",
      filter: (file) => {
        const blacklist = new Set(["private", "drafts", "polish"]); // Add folder names to blacklist
        return !blacklist.has((file.slug ?? "").split("/")[0]); // Exclude files in blacklisted folders
      },
    })),
    Component.DesktopOnly(Component.Explorer(
      {
        filterFn: (node) => {
          const omit = new Set(["entries"])
          return !omit.has(node.name.toLowerCase())
      },
      }
    )),
  ],
  right: [
    Component.DesktopOnly(Component.Graph({
      localGraph: {
        linkDistance: 30,
        depth: 1,
    
      },
      globalGraph: {
        linkDistance: 30,
        repelForce: 5,
        drag: true,
        zoom: true,
        depth: -1,
        scale: 0.9,
        centerForce: 0.3,
        fontSize: 0.6,
        opacityScale: 1,
        showTags: true,
        removeTags: [],
        focusOnHover: true,
      },
    })),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.DesktopOnly(Component.Backlinks()),
    Component.DesktopOnly(Component.TagIndex()),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta(),],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.RecentNotes({ showTags: false, limit: 5, title: "Activity Log",
      filter: (file) => {
        const blacklist = new Set(["private", "drafts", "polish"]); // Add folder names to blacklist
        return !blacklist.has((file.slug ?? "").split("/")[0]); // Exclude files in blacklisted folders
      },
     })),
    Component.DesktopOnly(Component.Explorer(
      {
        filterFn: (node) => {
          const omit = new Set(["entries"])
          return !omit.has(node.name.toLowerCase())
      },
      }
    ))
  ],
  right: [
    Component.DesktopOnly(Component.Graph({
      localGraph: {
        linkDistance: 30,
        depth: -1,
      },
      globalGraph: {
        linkDistance: 75,
        repelForce: 2.0,
      },
    })),
  ],
}
