import { mergeProps } from '@zag-js/solid'
import { Show } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { usePresenceContext } from '../presence/index.tsx'
import { useTourContext } from './use-tour-context.ts'

export interface TourPositionerBaseProps extends PolymorphicProps<'div'> {}
export interface TourPositionerProps extends HTMLProps<'div'>, TourPositionerBaseProps {}

export const TourPositioner = (props: TourPositionerProps) => {
  const tour = useTourContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(() => tour().getPositionerProps(), props)

  return (
    <Show when={!presence().unmounted}>
      <ark.div {...mergedProps} />
    </Show>
  )
}
