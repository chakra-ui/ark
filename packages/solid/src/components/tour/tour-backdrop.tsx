import { mergeProps } from '@zag-js/solid'
import type { BackdropState } from '@zag-js/tour'
import { Show } from 'solid-js'
import { composeRefs } from '../../utils/compose-refs.ts'
import { useRenderStrategyContext } from '../../utils/render-strategy.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { usePresence } from '../presence/index.tsx'
import { useTourContext } from './use-tour-context.ts'

export interface TourBackdropState extends BackdropState {}

export interface TourBackdropBaseProps extends PolymorphicProps<'div', TourBackdropState> {}
export interface TourBackdropProps extends HTMLProps<'div'>, TourBackdropBaseProps {}

export const TourBackdrop = (props: TourBackdropProps) => {
  const tour = useTourContext()
  const renderStrategyProps = useRenderStrategyContext()
  const presence = usePresence(mergeProps(renderStrategyProps, () => ({ present: tour().open })))
  const mergedProps = mergeProps(
    () => tour().getBackdropProps(),
    () => presence().presenceProps,
    props,
  )

  return (
    <Show when={!presence().unmounted}>
      <ark.div
        {...mergedProps}
        hidden={!tour().step?.backdrop}
        ref={composeRefs(presence().ref, props.ref)}
        state={tour().getBackdropState()}
      />
    </Show>
  )
}
