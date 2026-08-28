import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseMarqueeReturn } from './use-marquee.ts'
import { MarqueeProvider } from './use-marquee-context.ts'

interface RootProviderProps {
  value: UseMarqueeReturn
}

export interface MarqueeRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'div'> {}
export interface MarqueeRootProviderProps extends HTMLProps<'div'>, MarqueeRootProviderBaseProps {}

export const MarqueeRootProvider = (props: MarqueeRootProviderProps) => {
  const [{ value: marquee }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => marquee().getRootProps(), localProps)

  return (
    <MarqueeProvider value={marquee}>
      <ark.div {...mergedProps} />
    </MarqueeProvider>
  )
}
