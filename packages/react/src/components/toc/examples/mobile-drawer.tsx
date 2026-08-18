import { Dialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { Toc } from '@ark-ui/react/toc'
import { ListIcon, XIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import styles from 'styles/toc.module.css'
import { ShowcaseArticle, showcaseItems } from './showcase-data'

export const MobileDrawer = () => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [activeValue, setActiveValue] = useState(showcaseItems[0].value)
  const active = showcaseItems.find((item) => item.value === activeValue) ?? showcaseItems[0]

  return (
    <Toc.Root
      className={`${styles.ShowcaseRoot} ${styles.MobileShowcase}`}
      items={showcaseItems}
      scrollEl={() => contentRef.current}
      onActiveChange={({ activeItems }) => setActiveValue(activeItems.at(-1)?.value ?? showcaseItems[0].value)}
    >
      <Dialog.Root open={open} onOpenChange={({ open: next }) => setOpen(next)}>
        <Dialog.Trigger className={styles.MobileTrigger}>
          <ListIcon />
          <span>
            <small>On this page</small>
            <strong>{active.label}</strong>
          </span>
          <span className={styles.MobileProgress}>
            {showcaseItems.findIndex((item) => item.value === activeValue) + 1}/{showcaseItems.length}
          </span>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop className={styles.DrawerBackdrop} />
          <Dialog.Positioner className={styles.DrawerPositioner}>
            <Dialog.Content className={styles.DrawerContent}>
              <div className={styles.DrawerHandle} />
              <div className={styles.DrawerHeading}>
                <div>
                  <small>Navigate this guide</small>
                  <Dialog.Title>On this page</Dialog.Title>
                </div>
                <Dialog.CloseTrigger className={styles.IconButton}>
                  <XIcon />
                </Dialog.CloseTrigger>
              </div>
              <Toc.List className={styles.DrawerList}>
                {showcaseItems.map((item, index) => (
                  <Toc.Item key={item.value} item={item}>
                    <Toc.Link className={styles.DrawerLink} href={`#${item.value}`} onClick={() => setOpen(false)}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <strong>{item.label}</strong>
                      <small>{item.minutes} min</small>
                    </Toc.Link>
                  </Toc.Item>
                ))}
              </Toc.List>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
      <ShowcaseArticle contentRef={contentRef} />
    </Toc.Root>
  )
}
