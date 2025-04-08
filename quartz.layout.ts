import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {},
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.DesktopOnly(Component.RecentNotes({ 
      showTags: false, 
      limit: 3, 
      title: "Recent Notes",
      filter: (file) => {
        const blacklist = new Set(["private", "drafts", "polish"]);
        return !blacklist.has((file.slug ?? "").split("/")[0]);
      },
    })),
    Component.Explorer({
      filterFn: (node) => {
        const omit = new Set(["authoring content", "tags", "hosting"])
        return !omit.has((node.slug ?? "").split("/")[0]);
      },
    }),
  ],
  right: [
    Component.Graph({
      localGraph: {
        linkDistance: 30,
        depth: 2,
    
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
    }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    Component.DesktopOnly(Component.TagIndex())
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
