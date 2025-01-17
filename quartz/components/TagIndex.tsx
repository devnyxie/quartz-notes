import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { resolveRelative, SimpleSlug, slugTag } from "../util/path"
import { i18n } from "../i18n"

const TagIndex: QuartzComponent = ({ allFiles, displayClass, cfg, fileData }: QuartzComponentProps) => {
  const getTagCount = (tag: string) => {
    return allFiles.filter(file => file.frontmatter?.tags?.includes(tag)).length
  }

  const tags = [...new Set(
    allFiles.flatMap((data) => data.frontmatter?.tags ?? [])
  )].sort((a, b) => {
    const countDiff = getTagCount(b) - getTagCount(a)
    return countDiff !== 0 ? countDiff : a.localeCompare(b)
  })

  if (tags.length === 0) {
    return null
  }

  return (
    <div class={classNames(displayClass)}>
      <h3>Tags</h3>
      <ul class="tags">
        {tags.map((tag) => {
          const taggedPages = allFiles.filter(file => 
            file.frontmatter?.tags?.includes(tag)
          )
          const linkDest = resolveRelative(fileData.slug!, `tags/${slugTag(tag)}` as SimpleSlug)
          
          return (
            <li>
              <a href={linkDest} class="internal tag-link">
                {tag} ({taggedPages.length})
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

TagIndex.css = `
.tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0;
}
`

export default (() => TagIndex) satisfies QuartzComponentConstructor