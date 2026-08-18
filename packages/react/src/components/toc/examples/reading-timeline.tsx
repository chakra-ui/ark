import { Toc } from '@ark-ui/react/toc'
import { CheckIcon, Clock3Icon } from 'lucide-react'
import { useRef, useState } from 'react'
import styles from 'styles/toc.module.css'
import { ShowcaseArticle, showcaseItems } from './showcase-data'

export const ReadingTimeline = () => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [activeValue, setActiveValue] = useState(showcaseItems[0].value)
  const activeIndex = Math.max(
    0,
    showcaseItems.findIndex((item) => item.value === activeValue),
  )
  const progress = Math.round(((activeIndex + 1) / showcaseItems.length) * 100)

  return (
    <Toc.Root
      className={styles.ShowcaseRoot}
      items={showcaseItems}
      scrollEl={() => contentRef.current}
      onActiveChange={({ activeItems }) => setActiveValue(activeItems.at(-1)?.value ?? showcaseItems[0].value)}
    >
      <Toc.Nav className={`${styles.ShowcasePanel} ${styles.TimelinePanel}`}>
        <div className={styles.ProgressHeader}>
          <div className={styles.ProgressDial} style={{ '--progress': `${progress * 3.6}deg` } as React.CSSProperties}>
            <span>{progress}%</span>
          </div>
          <div>
            <strong>Reading progress</strong>
            <span>
              {showcaseItems.slice(activeIndex + 1).reduce((sum, item) => sum + item.minutes, 0)} min remaining
            </span>
          </div>
        </div>
        <Toc.List className={styles.TimelineList}>
          {showcaseItems.map((item, index) => (
            <Toc.Item
              key={item.value}
              item={item}
              className={styles.TimelineItem}
              data-complete={index < activeIndex || undefined}
            >
              <span className={styles.TimelineDot}>{index < activeIndex ? <CheckIcon /> : index + 1}</span>
              <Toc.Link className={styles.TimelineLink} href={`#${item.value}`}>
                <span>{item.label}</span>
                <small>
                  <Clock3Icon />
                  {item.minutes} min
                </small>
              </Toc.Link>
            </Toc.Item>
          ))}
        </Toc.List>
      </Toc.Nav>
      <ShowcaseArticle contentRef={contentRef} />
    </Toc.Root>
  )
}
