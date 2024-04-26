import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { RenderStrategyProvider, splitRenderStrategyProps } from '../../utils/render-strategy'
import {
  PresenceProvider,
  type UsePresenceProps,
  splitPresenceProps,
  usePresence,
} from '../presence'
import { type UseDialogProps, useDialog } from './use-dialog'
import { DialogProvider } from './use-dialog-context'

export interface DialogRootProps extends UseDialogProps, UsePresenceProps {
  children?: JSX.Element
}

export const DialogRoot = (props: DialogRootProps) => {
  const [presenceProps, dialogProps] = splitPresenceProps(props)
  const [renderStrategyProps] = splitRenderStrategyProps(presenceProps)
  const [useDialogProps, localProps] = createSplitProps<UseDialogProps>()(dialogProps, [
    'aria-label',
    'closeOnEscape',
    'closeOnInteractOutside',
    'finalFocusEl',
    'id',
    'ids',
    'initialFocusEl',
    'modal',
    'onEscapeKeyDown',
    'onFocusOutside',
    'onInteractOutside',
    'onOpenChange',
    'onPointerDownOutside',
    'open',
    'preventScroll',
    'restoreFocus',
    'role',
    'trapFocus',
  ])

  const api = useDialog(useDialogProps)
  const apiPresence = usePresence(mergeProps(presenceProps, () => ({ present: api().open })))

  return (
    <DialogProvider value={api}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <PresenceProvider value={apiPresence}>{localProps.children}</PresenceProvider>
      </RenderStrategyProvider>
    </DialogProvider>
  )
}
