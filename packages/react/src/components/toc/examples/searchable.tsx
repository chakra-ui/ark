import { Toc } from '@ark-ui/react/toc'
import { SearchIcon, XIcon } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import styles from 'styles/toc.module.css'
import { ShowcaseArticle, showcaseItems } from './showcase-data'

export const Searchable = () => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')
  const results = useMemo(
    () => showcaseItems.filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase())),
    [query],
  )

  return (
    <Toc.Root className={styles.ShowcaseRoot} items={showcaseItems} scrollEl={() => contentRef.current}>
      <Toc.Nav className={styles.ShowcasePanel}>
        <div className={styles.PanelHeading}>
          <div>
            <span>Contents</span>
            <strong>Find a section</strong>
          </div>
          <span className={styles.CountBadge}>{results.length}</span>
        </div>
        <label className={styles.SearchField}>
          <SearchIcon />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search headings…" />
          {query && (
            <button type="button" onClick={() => setQuery('')} aria-label="Clear search">
              <XIcon />
            </button>
          )}
        </label>
        <Toc.List className={styles.ShowcaseList}>
          {results.map((item) => (
            <Toc.Item key={item.value} item={item}>
              <Toc.Link className={styles.SearchResult} href={`#${item.value}`}>
                <span>{item.label}</span>
                <small>{item.eyebrow}</small>
              </Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
        {!results.length && (
          <div className={styles.EmptyState}>
            <SearchIcon />
            <strong>No sections found</strong>
            <span>Try “state” or “API”.</span>
          </div>
        )}
      </Toc.Nav>
      <ShowcaseArticle contentRef={contentRef} />
    </Toc.Root>
  )
}
