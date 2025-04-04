import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { composeRefs } from '../../utils/compose-refs'
import { useRenderStrategyContext } from '../../utils/render-strategy'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresence } from '../presence'
import { useDialogContext } from './use-dialog-context'

export interface DialogBackdropBaseProps extends PolymorphicProps<'div'> {}
export interface DialogBackdropProps extends HTMLProps<'div'>, DialogBackdropBaseProps {}

export const DialogBackdrop = (props: DialogBackdropProps) => {
  const api = useDialogContext()
  const renderStrategyProps = useRenderStrategyContext()
  const presenceApi = usePresence(mergeProps(renderStrategyProps, () => ({ present: api().open })))
  const mergedProps = mergeProps(
    () => api().getBackdropProps(),
    () => presenceApi().presenceProps,
    props,
  )

  return (
    <Show when={!presenceApi().unmounted}>
      <ark.div {...mergedProps} ref={composeRefs(presenceApi().ref, props.ref)} />
    </Show>
  )
}
