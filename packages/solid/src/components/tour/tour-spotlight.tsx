import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { composeRefs } from '../../utils/compose-refs.ts'
import { useRenderStrategyContext } from '../../utils/render-strategy.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { usePresence } from '../presence/index.tsx'
import { useTourContext } from './use-tour-context.ts'
import type { SpotlightState } from '@zag-js/tour'

export interface TourSpotlightState extends SpotlightState {}

export interface TourSpotlightBaseProps extends PolymorphicProps<'div', TourSpotlightState> {}
export interface TourSpotlightProps extends HTMLProps<'div'>, TourSpotlightBaseProps {}

export const TourSpotlight = (props: TourSpotlightProps) => {
  const tour = useTourContext()
  const renderStrategyProps = useRenderStrategyContext()
  const presenceApi = usePresence(mergeProps(renderStrategyProps, () => ({ present: tour().open })))
  const mergedProps = mergeProps(
    () => tour().getSpotlightProps(),
    () => presenceApi().presenceProps,
    props,
  )

  return (
    <Show when={!presenceApi().unmounted}>
      <ark.div
        {...mergedProps}
        hidden={!tour().open || !tour().step?.target?.()}
        ref={composeRefs(presenceApi().ref, props.ref)}
        state={tour().getSpotlightState()}
      />
    </Show>
  )
}
