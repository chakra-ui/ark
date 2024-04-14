import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLArkProps, ark } from '../../factory'
import { usePresenceContext } from '../presence'
import { useSelectContext } from './use-select-context'

export interface SelectContentProps extends HTMLArkProps<'div'> {}

export const SelectContent = (props: SelectContentProps) => {
  const api = useSelectContext()
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
