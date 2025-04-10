import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { composeRefs } from '../../utils/compose-refs'
import { useRenderStrategyContext } from '../../utils/render-strategy'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresence } from '../presence'
import { useTourContext } from './use-tour-context'

export interface TourContentBaseProps extends PolymorphicProps<'div'> {}
export interface TourContentProps extends HTMLProps<'div'>, TourContentBaseProps {}

export const TourContent = (props: TourContentProps) => {
  const tour = useTourContext()
  const renderStrategyProps = useRenderStrategyContext()
  const presence = usePresence(mergeProps(renderStrategyProps, () => ({ present: tour().open })))
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
