import type { Assign } from '../../types'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseScrollAreaContext, ScrollAreaProvider } from './use-scroll-area-context'

export interface ScrollAreaRootProviderBaseProps extends PolymorphicProps<'div'> {
  value: UseScrollAreaContext
}
export interface ScrollAreaRootProviderProps extends Assign<HTMLProps<'div'>, ScrollAreaRootProviderBaseProps> {}

export const ScrollAreaRootProvider = (props: ScrollAreaRootProviderProps) => {
  const { value, children, ...localProps } = props
  return (
    <ScrollAreaProvider value={value}>
      <ark.div {...localProps}>{children}</ark.div>
    </ScrollAreaProvider>
  )
}
