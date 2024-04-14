import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { useRenderStrategyContext } from '../../utils/render-strategy'
import { type HTMLArkProps, ark } from '../factory'
import { usePresence } from '../presence'
import { useDialogContext } from './use-dialog-context'

export interface DialogBackdropProps extends HTMLArkProps<'div'> {}

export const DialogBackdrop = (props: DialogBackdropProps) => {
  const api = useDialogContext()
  const renderStrategyProps = useRenderStrategyContext()
  const presenceApi = usePresence(
    mergeProps(renderStrategyProps, () => ({ present: api().isOpen })),
  )
  const mergedProps = mergeProps(
    () => api().backdropProps,
    () => presenceApi().presenceProps,
    props,
  )

  return (
    <Show when={!presenceApi().isUnmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}
