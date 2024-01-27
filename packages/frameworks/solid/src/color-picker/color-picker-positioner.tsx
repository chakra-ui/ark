import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useColorPickerContext } from './color-picker-context'

export interface ColorPickerPositionerProps extends HTMLArkProps<'div'> {}

export const ColorPickerPositioner: ArkComponent<'div'> = (props: ColorPickerPositionerProps) => {
  const api = useColorPickerContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(() => api().positionerProps, props)

  return (
    <Show when={!presenceApi().isUnmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}
