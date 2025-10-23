import { forwardRef } from 'react'
import { composeRefs } from '../../utils/compose-refs'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { parts } from './sizer.anatomy'
import { splitSizerProps } from './split-sizer-props'
import { type UseSizerProps, useSizer } from './use-sizer'
import { SizerProvider } from './use-sizer-context'

export interface SizerRootBaseProps extends UseSizerProps, PolymorphicProps {}
export interface SizerRootProps extends HTMLProps<'div'>, SizerRootBaseProps {}

export const SizerRoot = forwardRef<HTMLDivElement, SizerRootProps>((props, ref) => {
  const [useSizerProps, localProps] = splitSizerProps(props, ['onSizeChange'])
  const sizer = useSizer(useSizerProps)

  return (
    <SizerProvider value={sizer}>
      <ark.div {...parts.root} {...localProps} ref={composeRefs(sizer.rootRef, ref)} />
    </SizerProvider>
  )
})

SizerRoot.displayName = 'SizerRoot'
