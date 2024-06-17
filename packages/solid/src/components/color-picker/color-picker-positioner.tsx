import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { Show } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerPositionerBaseProps extends PolymorphicProps<'div'> {}
export interface ColorPickerPositionerProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
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
