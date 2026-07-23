import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseScrollAreaReturn } from './use-scroll-area.ts'
import { ScrollAreaProvider } from './use-scroll-area-context.ts'

interface RootProviderProps {
  value: UseScrollAreaReturn
}

export interface ScrollAreaRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface ScrollAreaRootProviderProps
  extends HTMLProps<'div'>, RootProviderProps, ScrollAreaRootProviderBaseProps {}

export const ScrollAreaRootProvider = (props: ScrollAreaRootProviderProps) => {
  const [{ value: scrollArea }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => scrollArea().getRootProps(), localProps)

  return (
    <ScrollAreaProvider value={scrollArea}>
      <ark.div {...mergedProps} />
    </ScrollAreaProvider>
  )
}
