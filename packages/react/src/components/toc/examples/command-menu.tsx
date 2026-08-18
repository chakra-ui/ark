import { Toc } from '@ark-ui/react/toc'
import { CornerDownLeftIcon, SearchIcon } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import styles from 'styles/toc.module.css'
import { ShowcaseArticle, showcaseItems } from './showcase-data'

export const CommandMenu = () => {
  const contentRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlighted, setHighlighted] = useState(0)
  const results = useMemo(
    () => showcaseItems.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
      }
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus())
  }, [open])

  const choose = (value: string) => {
    document.getElementById(value)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpen(false)
    setQuery('')
  }

  return (
    <Toc.Root
      className={`${styles.ShowcaseRoot} ${styles.CommandRoot}`}
      items={showcaseItems}
      scrollEl={() => contentRef.current}
    >
      <button className={styles.CommandTrigger} type="button" onClick={() => setOpen(true)}>
        <SearchIcon />
        <span>Jump to a section…</span>
        <kbd>⌘ K</kbd>
      </button>
      <ShowcaseArticle contentRef={contentRef} />
      {open && (
        <div className={styles.CommandBackdrop}>
          <button
            className={styles.CommandDismiss}
            type="button"
            aria-label="Close command menu"
            onClick={() => setOpen(false)}
          />
          <div className={styles.CommandMenu} role="dialog" aria-modal="true" aria-label="Jump to a section">
            <label className={styles.CommandSearch}>
              <SearchIcon />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setHighlighted(0)
                }}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown') {
                    event.preventDefault()
                    setHighlighted((value) => Math.min(value + 1, results.length - 1))
                  }
                  if (event.key === 'ArrowUp') {
                    event.preventDefault()
                    setHighlighted((value) => Math.max(value - 1, 0))
                  }
                  if (event.key === 'Enter' && results[highlighted]) choose(results[highlighted].value)
                }}
                placeholder="Search documentation…"
              />
            </label>
            <div className={styles.CommandGroup}>
              <span>Sections</span>
              {results.map((item, index) => (
                <button
                  type="button"
                  key={item.value}
                  data-highlighted={index === highlighted || undefined}
                  onMouseEnter={() => setHighlighted(index)}
                  onClick={() => choose(item.value)}
                >
                  <span className={styles.CommandIcon}>{item.label.slice(0, 1)}</span>
                  <span>
                    <strong>{item.label}</strong>
                    <small>Guides / {item.eyebrow}</small>
                  </span>
                  {index === highlighted && <CornerDownLeftIcon />}
                </button>
              ))}
            </div>
            <footer>
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> Navigate
              </span>
              <span>
                <kbd>↵</kbd> Open
              </span>
              <span>
                <kbd>esc</kbd> Close
              </span>
            </footer>
          </div>
        </div>
      )}
    </Toc.Root>
  )
}
