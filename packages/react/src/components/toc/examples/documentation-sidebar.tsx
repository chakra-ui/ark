import { Toc } from '@ark-ui/react/toc'
import { BoxIcon, ChevronRightIcon, ExternalLinkIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import styles from 'styles/toc.module.css'
import { ShowcaseArticle, showcaseItems } from './showcase-data'

export const DocumentationSidebar = () => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [activeValue, setActiveValue] = useState(showcaseItems[0].value)
  const active = showcaseItems.find((item) => item.value === activeValue) ?? showcaseItems[0]

  return (
    <Toc.Root
      className={`${styles.ShowcaseRoot} ${styles.DocsRoot}`}
      items={showcaseItems}
      scrollEl={() => contentRef.current}
      onActiveChange={({ activeItems }) => setActiveValue(activeItems.at(-1)?.value ?? showcaseItems[0].value)}
    >
      <Toc.Nav className={`${styles.ShowcasePanel} ${styles.DocsPanel}`}>
        <div className={styles.DocsBrand}>
          <span>
            <BoxIcon />
          </span>
          <div>
            <strong>Ark UI</strong>
            <small>Documentation</small>
          </div>
        </div>
        <div className={styles.DocsBreadcrumb}>
          <span>Guides</span>
          <ChevronRightIcon />
          <strong>{active.label}</strong>
        </div>
        <Toc.List className={styles.DocsList}>
          {showcaseItems.map((item) => (
            <Toc.Item key={item.value} item={item}>
              <Toc.Link
                className={styles.DocsLink}
                href={`#${item.value}`}
                style={{ '--depth': item.depth } as React.CSSProperties}
              >
                {item.label}
              </Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
        <a className={styles.DocsHelp} href="#api-reference">
          <span>
            <strong>Need help?</strong>
            <small>Read the API reference</small>
          </span>
          <ExternalLinkIcon />
        </a>
      </Toc.Nav>
      <ShowcaseArticle contentRef={contentRef} />
    </Toc.Root>
  )
}
