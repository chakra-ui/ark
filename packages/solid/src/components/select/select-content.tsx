import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { composeRefs } from '../../utils/compose-refs'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useSelectContext } from './use-select-context'

export interface SelectContentBaseProps extends PolymorphicProps<'div'> {}
export interface SelectContentProps extends HTMLProps<'div'>, SelectContentBaseProps {}

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
      <ark.div {...mergedProps} ref={composeRefs(presenceApi().ref, props.ref)} />
    </Show>
  )
}
