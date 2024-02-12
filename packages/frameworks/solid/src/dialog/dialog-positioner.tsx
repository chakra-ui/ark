import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useDialogContext } from './dialog-context'

export interface DialogPositionerProps extends HTMLArkProps<'div'> {}

export const DialogPositioner: ArkComponent<'div'> = (props: DialogPositionerProps) => {
  const api = useDialogContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(() => api().positionerProps, props)

  return (
    <Show when={!presenceApi().isUnmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}
