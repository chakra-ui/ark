import { Portal } from '@ark-ui/react/portal'
import { Tooltip, useTooltip } from '@ark-ui/react/tooltip'
import { useRef } from 'react'
import styles from 'styles/tooltip.module.css'

export const FollowCursor = () => {
  const pointerRef = useRef<{ x: number; y: number; element: HTMLElement } | null>(null)

  const tooltip = useTooltip({
    openDelay: 0,
    positioning: {
      placement: 'bottom-start',
      gutter: 12,
      getAnchorElement() {
        const pointer = pointerRef.current
        if (!pointer) return null
        return {
          contextElement: pointer.element,
          getBoundingClientRect: () => new DOMRect(pointer.x, pointer.y, 0, 0),
        }
      },
    },
  })

  return (
    <Tooltip.RootProvider value={tooltip}>
      <Tooltip.Trigger
        className={styles.Trigger}
        onPointerMove={(event) => {
          pointerRef.current = { x: event.clientX, y: event.clientY, element: event.currentTarget }
          tooltip.reposition()
        }}
      >
        Hover Me
      </Tooltip.Trigger>
      <Portal>
        <Tooltip.Positioner className={styles.Positioner}>
          <Tooltip.Content className={styles.Content}>I follow your cursor</Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip.RootProvider>
  )
}
