import { Popover, usePopover } from '@ark-ui/solid/popover'
import { BoldIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon } from 'lucide-solid'
import { onSettled } from 'solid-js'
import { Portal } from '@solidjs/web'
import styles from 'styles/popover.module.css'

export const TextSelection = () => {
  let ref: HTMLParagraphElement | undefined

  const popover = usePopover({
    autoFocus: false,
    positioning: {
      placement: 'top',
      getAnchorElement() {
        const node = ref
        const selection = node?.ownerDocument.getSelection()
        if (!node || !selection?.rangeCount) return null
        const range = selection.getRangeAt(0)
        return {
          contextElement: node,
          getBoundingClientRect: () => range.getBoundingClientRect(),
          getClientRects: () => range.getClientRects(),
        }
      },
    },
  })

  onSettled(() => {
    const node = ref
    if (!node) return
    const doc = node.ownerDocument

    const hasSelection = () => {
      const selection = doc.getSelection()
      if (!selection?.rangeCount) return false
      const range = selection.getRangeAt(0)
      return !range.collapsed && node.contains(range.commonAncestorContainer)
    }

    const onPointerUp = () => {
      if (!hasSelection()) return
      popover().reposition()
      popover().setOpen(true)
    }

    const onSelectionChange = () => {
      if (hasSelection()) popover().reposition()
      else popover().setOpen(false)
    }

    doc.addEventListener('pointerup', onPointerUp)
    doc.addEventListener('selectionchange', onSelectionChange)
    return () => {
      doc.removeEventListener('pointerup', onPointerUp)
      doc.removeEventListener('selectionchange', onSelectionChange)
    }
  })

  return (
    <Popover.RootProvider value={popover}>
      <p ref={ref}>
        Ark UI is a headless component library for building reusable, scalable design systems. Select any part of this
        text to show a formatting toolbar above it.
      </p>
      <Portal>
        <Popover.Positioner class={styles.Positioner}>
          <Popover.Content
            class={`${styles.Content} ${styles.Toolbar}`}
            onMouseDown={(event) => event.preventDefault()}
          >
            <Popover.Arrow class={styles.Arrow}>
              <Popover.ArrowTip class={styles.ArrowTip} />
            </Popover.Arrow>
            <button type="button" class={styles.ToolbarButton} aria-label="Bold">
              <BoldIcon />
            </button>
            <button type="button" class={styles.ToolbarButton} aria-label="Italic">
              <ItalicIcon />
            </button>
            <button type="button" class={styles.ToolbarButton} aria-label="Underline">
              <UnderlineIcon />
            </button>
            <button type="button" class={styles.ToolbarButton} aria-label="Strikethrough">
              <StrikethroughIcon />
            </button>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.RootProvider>
  )
}
