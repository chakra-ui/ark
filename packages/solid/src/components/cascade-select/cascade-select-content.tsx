import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { composeRefs } from '../../utils/compose-refs'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useCascadeSelectContext } from './use-cascade-select-context'

export interface CascadeSelectContentBaseProps extends PolymorphicProps<'div'> {}
export interface CascadeSelectContentProps extends HTMLProps<'div'>, CascadeSelectContentBaseProps {}

export const CascadeSelectContent = (props: CascadeSelectContentProps) => {
  const context = useCascadeSelectContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(
    () => context().getContentProps(),
    () => presenceApi().presenceProps,
    props,
  )

  return (
    <Show when={!presenceApi().unmounted}>
      <ark.div {...mergedProps} ref={composeRefs(presenceApi().ref, props.ref)} />
    </Show>
  )
}
