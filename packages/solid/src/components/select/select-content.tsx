import type { ContentState } from '@zag-js/select'
import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { composeRefs } from '../../utils/compose-refs.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { usePresenceContext } from '../presence/index.tsx'
import { useSelectContext } from './use-select-context.ts'

export interface SelectContentState extends ContentState {}

export interface SelectContentBaseProps extends PolymorphicProps<'div', SelectContentState> {}
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
      <ark.div {...mergedProps} ref={composeRefs(presenceApi().ref, props.ref)} state={select().getContentState()} />
    </Show>
  )
}
