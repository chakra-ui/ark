import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useComboboxContext } from './combobox-context'

export interface ComboboxContentProps extends HTMLArkProps<'div'> {}

export const ComboboxContent: ArkComponent<'div'> = (props: ComboboxContentProps) => {
  const api = useComboboxContext()
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
