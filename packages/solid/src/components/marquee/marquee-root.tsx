import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseMarqueeProps, useMarquee } from './use-marquee'
import { MarqueeProvider } from './use-marquee-context'

export interface MarqueeRootBaseProps extends UseMarqueeProps, PolymorphicProps<'div'> {}
export interface MarqueeRootProps extends HTMLProps<'div'>, MarqueeRootBaseProps {}

export const MarqueeRoot = (props: MarqueeRootProps) => {
  const [useMarqueeProps, localProps] = createSplitProps<UseMarqueeProps>()(props, [
    'autoFill',
    'defaultPaused',
    'delay',
    'id',
    'ids',
    'loopCount',
    'onComplete',
    'onLoopComplete',
    'onPauseChange',
    'paused',
    'pauseOnInteraction',
    'reverse',
    'side',
    'spacing',
    'speed',
    'translations',
  ])

  const context = useMarquee(useMarqueeProps)
  const mergedProps = mergeProps(() => context().getRootProps(), localProps)

  return (
    <MarqueeProvider value={context}>
      <ark.div {...mergedProps} />
    </MarqueeProvider>
  )
}
