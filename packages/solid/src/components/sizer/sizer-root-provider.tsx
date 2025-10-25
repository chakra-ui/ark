import { mergeProps } from '@zag-js/solid'
import type { Accessor } from 'solid-js'
import { composeRefs } from '../../utils/compose-refs'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { parts } from './sizer.anatomy'
import type { UseSizerReturn } from './use-sizer'
import { SizerProvider } from './use-sizer-context'

interface RootProviderProps {
  value: Accessor<UseSizerReturn>
}

export interface SizerRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface SizerRootProviderProps extends HTMLProps<'div'>, RootProviderProps, SizerRootProviderBaseProps {}

export const SizerRootProvider = (props: SizerRootProviderProps) => {
  const [{ value: sizer }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(parts.root, localProps)

  return (
    <SizerProvider value={sizer}>
      <ark.div {...mergedProps} ref={composeRefs(sizer().rootRef, props.ref)} />
    </SizerProvider>
  )
}
