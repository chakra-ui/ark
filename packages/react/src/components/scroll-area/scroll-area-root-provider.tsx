import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseScrollAreaReturn } from './use-scroll-area'
import { ScrollAreaProvider } from './use-scroll-area-context'

interface RootProviderProps {
  value: UseScrollAreaReturn
}

export interface ScrollAreaRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface ScrollAreaRootProviderProps extends HTMLProps<'div'>, ScrollAreaRootProviderBaseProps {}

export const ScrollAreaRootProvider = forwardRef<HTMLDivElement, ScrollAreaRootProviderProps>((props, ref) => {
  const [{ value: scrollArea }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(scrollArea.getRootProps(), localProps)

  return (
    <ScrollAreaProvider value={scrollArea}>
      <ark.div {...mergedProps} ref={ref} />
    </ScrollAreaProvider>
  )
})

ScrollAreaRootProvider.displayName = 'ScrollAreaRootProvider'
