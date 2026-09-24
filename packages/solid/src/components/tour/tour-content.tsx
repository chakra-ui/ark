import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { composeRefs } from '../../utils/compose-refs.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { usePresenceContext } from '../presence/index.tsx'
import { useTourContext } from './use-tour-context.ts'

export interface TourContentBaseProps extends PolymorphicProps<'div'> {}
export interface TourContentProps extends HTMLProps<'div'>, TourContentBaseProps {}

export const TourContent = (props: TourContentProps) => {
  const tour = useTourContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(
    () => tour().getContentProps(),
    () => presence().presenceProps,
    props,
  )

  return (
    <Show when={!presence().unmounted}>
      <ark.div {...mergedProps} ref={composeRefs(presence().ref, props.ref)} />
    </Show>
  )
}
