import { Tooltip, useTooltip } from '@ark-ui/solid/tooltip'
import { Portal } from '@solidjs/web'
import styles from 'styles/tooltip.module.css'

export const FollowCursor = () => {
  let pointer: { x: number; y: number; element: HTMLElement } | null = null

  const tooltip = useTooltip({
    openDelay: 0,
    positioning: {
      placement: 'bottom-start',
      gutter: 12,
      getAnchorElement() {
        const current = pointer
        if (!current) return null
        return {
          contextElement: current.element,
          getBoundingClientRect: () => new DOMRect(current.x, current.y, 0, 0),
        }
      },
    },
  })

  return (
    <Tooltip.RootProvider value={tooltip}>
      <Tooltip.Trigger
        class={styles.Trigger}
        onPointerMove={(event) => {
          pointer = { x: event.clientX, y: event.clientY, element: event.currentTarget }
          tooltip().reposition()
        }}
      >
        Hover Me
      </Tooltip.Trigger>
      <Portal>
        <Tooltip.Positioner class={styles.Positioner}>
          <Tooltip.Content class={styles.Content}>I follow your cursor</Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip.RootProvider>
  )
}
