import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLArkProps, ark } from '~/factory'
import { usePresenceContext } from '../presence'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerContentProps extends HTMLArkProps<'div'> {}

export const ColorPickerContent = (props: ColorPickerContentProps) => {
  const api = useColorPickerContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(
    () => api().contentProps,
    () => presenceApi().presenceProps,
    props,
  )

  return (
    <Show when={!presenceApi().isUnmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}
