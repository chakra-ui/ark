import type { Assign } from '../../types'
import { composeRefs } from '../../utils/compose-refs'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { parts } from './sizer.anatomy'
import { type UseSizerProps, useSizer } from './use-sizer'
import { SizerProvider } from './use-sizer-context'

export interface SizerRootBaseProps extends UseSizerProps, PolymorphicProps<'div'> {}
export interface SizerRootProps extends Assign<HTMLProps<'div'>, SizerRootBaseProps> {}

export const SizerRoot = (props: SizerRootProps) => {
  const [useSizerProps, localProps] = createSplitProps<UseSizerProps>()(props, ['onSizeChange'])
  const sizer = useSizer(useSizerProps)

  return (
    <SizerProvider value={sizer}>
      <ark.div {...parts.root} {...localProps} ref={composeRefs(sizer().rootRef, props.ref)} />
    </SizerProvider>
  )
}
