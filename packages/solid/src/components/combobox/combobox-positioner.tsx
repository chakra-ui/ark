import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxPositionerBaseProps extends PolymorphicProps<'div'> {}
export interface ComboboxPositionerProps extends HTMLProps<'div'>, ComboboxPositionerBaseProps {}

export const ComboboxPositioner = (props: ComboboxPositionerProps) => {
  const api = useComboboxContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(() => api().getPositionerProps(), props)

  return (
    <Show when={!presenceApi().unmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}
