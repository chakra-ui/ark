import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerPositionerBaseProps extends PolymorphicProps<'div'> {}
export interface ColorPickerPositionerProps
  extends HTMLProps<'div'>,
    ColorPickerPositionerBaseProps {}

export const ColorPickerPositioner = (props: ColorPickerPositionerProps) => {
  const api = useColorPickerContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(() => api().getPositionerProps(), props)

  return (
    <Show when={!presenceApi().unmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}
