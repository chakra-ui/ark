import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import type { UsePresenceProps } from '../presence'
import { PresenceProvider, usePresence } from '../presence'
import { splitPresenceProps } from '../presence/split-presence-props'
import { type UseFloatingPanelProps, useFloatingPanel } from './use-floating-panel'
import { FloatingPanelProvider } from './use-floating-panel-context'

export interface FloatingPanelRootBaseProps extends UseFloatingPanelProps, UsePresenceProps {}
export interface FloatingPanelRootProps extends FloatingPanelRootBaseProps {
  children?: ReactNode | undefined
}

export const FloatingPanelRoot = (props: FloatingPanelRootProps) => {
  const [presenceProps, otherProps] = splitPresenceProps(props)
  const [useFloatingPanelProps, localProps] = createSplitProps<UseFloatingPanelProps>()(otherProps, [
    'allowOverflow',
    'closeOnEscape',
    'defaultOpen',
    'defaultPosition',
    'defaultSize',
    'dir',
    'disabled',
    'draggable',
    'getAnchorPosition',
    'getBoundaryEl',
    'gridSize',
    'id',
    'ids',
    'lockAspectRatio',
    'maxSize',
    'minSize',
    'onOpenChange',
    'onPositionChange',
    'onPositionChangeEnd',
    'onSizeChange',
    'onSizeChangeEnd',
    'onStageChange',
    'open',
    'persistRect',
    'position',
    'resizable',
    'size',
    'strategy',
    'translations',
  ])

  const floatingPanel = useFloatingPanel(useFloatingPanelProps)

  const usePresenceProps = mergeProps({ present: floatingPanel.open }, presenceProps)
  const presence = usePresence(usePresenceProps)

  return (
    <FloatingPanelProvider value={floatingPanel}>
      <PresenceProvider value={presence}>{localProps.children}</PresenceProvider>
    </FloatingPanelProvider>
  )
}
