import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useSelectContext } from './use-select-context'

export interface SelectContentProps extends HTMLArkProps<'div'> {}

export const SelectContent = (props: SelectContentProps) => {
  const select = useSelectContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(
    () => select().getContentProps(),
    () => presenceApi().presenceProps,
    props,
  )

  return (
    <Show when={!presenceApi().unmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}
