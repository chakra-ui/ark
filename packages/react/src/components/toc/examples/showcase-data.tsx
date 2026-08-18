import type { RefObject } from 'react'
import styles from 'styles/toc.module.css'

export const showcaseItems = [
  { value: 'overview', depth: 2, label: 'Overview', eyebrow: 'Start here', minutes: 2, lines: 8 },
  { value: 'installation', depth: 2, label: 'Installation', eyebrow: 'Setup', minutes: 3, lines: 10 },
  { value: 'configuration', depth: 3, label: 'Configuration', eyebrow: 'Setup', minutes: 4, lines: 8 },
  { value: 'composition', depth: 2, label: 'Composition', eyebrow: 'Concepts', minutes: 5, lines: 12 },
  { value: 'controlled-state', depth: 3, label: 'Controlled state', eyebrow: 'Concepts', minutes: 4, lines: 9 },
  { value: 'accessibility', depth: 2, label: 'Accessibility', eyebrow: 'Quality', minutes: 3, lines: 10 },
  { value: 'api-reference', depth: 2, label: 'API reference', eyebrow: 'Reference', minutes: 6, lines: 12 },
]

export type ShowcaseItem = (typeof showcaseItems)[number]

export const ShowcaseArticle = ({ contentRef }: { contentRef: RefObject<HTMLDivElement | null> }) => (
  <article className={styles.ShowcaseArticle} ref={contentRef}>
    <header className={styles.ArticleHero}>
      <span className={styles.ArticleKicker}>Guide · 27 min read</span>
      <h1>Build an accessible command menu</h1>
      <p>A practical guide to composing keyboard-friendly interfaces with Ark UI.</p>
    </header>
    {showcaseItems.map((item) => (
      <section className={styles.ShowcaseSection} key={item.value}>
        <span className={styles.SectionEyebrow}>{item.eyebrow}</span>
        {item.depth === 2 ? <h2 id={item.value}>{item.label}</h2> : <h3 id={item.value}>{item.label}</h3>}
        <div className={styles.ShowcaseCopy}>
          {Array.from({ length: item.lines }, (_, index) => (
            <span key={index} style={{ width: `${92 - ((index * 13) % 37)}%` }} />
          ))}
        </div>
      </section>
    ))}
  </article>
)
