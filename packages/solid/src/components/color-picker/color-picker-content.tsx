import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { composeRefs } from '../../utils/compose-refs'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerContentBaseProps extends PolymorphicProps<'div'> {}
export interface ColorPickerContentProps extends HTMLProps<'div'>, ColorPickerContentBaseProps {}

export const ColorPickerContent = (props: ColorPickerContentProps) => {
  const api = useColorPickerContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(
    () => api().getContentProps(),
    () => presenceApi().presenceProps,
    props,
  )

  return (
    <Show when={!presenceApi().unmounted}>
      <ark.div {...mergedProps} ref={composeRefs(presenceApi().ref, props.ref)} />
    </Show>
  )
}
