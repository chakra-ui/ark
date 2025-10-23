import { forwardRef } from 'react'
import { composeRefs } from '../../utils/compose-refs'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { parts } from './sizer.anatomy'
import type { UseSizerReturn } from './use-sizer'
import { SizerProvider } from './use-sizer-context'

interface RootProviderProps {
  value: UseSizerReturn
}

export interface SizerRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface SizerRootProviderProps extends HTMLProps<'div'>, SizerRootProviderBaseProps {}

export const SizerRootProvider = forwardRef<HTMLDivElement, SizerRootProviderProps>((props, ref) => {
  const { value: sizer, ...localProps } = props
  return (
    <SizerProvider value={sizer}>
      <ark.div {...parts.root} {...localProps} ref={composeRefs(sizer.rootRef, ref)} />
    </SizerProvider>
  )
})

SizerRootProvider.displayName = 'SizerRootProvider'
