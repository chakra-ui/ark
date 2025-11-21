import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseMarqueeProps, useMarquee } from './use-marquee'
import { MarqueeProvider } from './use-marquee-context'

export interface MarqueeRootBaseProps extends UseMarqueeProps, PolymorphicProps {}
export interface MarqueeRootProps extends HTMLProps<'div'>, MarqueeRootBaseProps {}

const splitRootProps = createSplitProps<UseMarqueeProps>()

export const MarqueeRoot = forwardRef<HTMLDivElement, MarqueeRootProps>((props, ref) => {
  const [useMarqueeProps, localProps] = splitRootProps(props, [
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
  const marqueeApi = useMarquee(useMarqueeProps)
  const mergedProps = mergeProps(marqueeApi.getRootProps(), localProps)

  return (
    <MarqueeProvider value={marqueeApi}>
      <ark.div {...mergedProps} ref={ref} />
    </MarqueeProvider>
  )
})

MarqueeRoot.displayName = 'MarqueeRoot'
