import { mergeProps, normalizeProps } from '@zag-js/solid'
import type { Assign } from '../../types.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useGridVirtualizerContext } from './use-grid-virtualizer-context.ts'

export interface GridVirtualizerContentBaseProps extends PolymorphicProps<'div'> {}
export interface GridVirtualizerContentProps extends Assign<HTMLProps<'div'>, GridVirtualizerContentBaseProps> {}

export const GridVirtualizerContent = (props: GridVirtualizerContentProps) => {
  const virtualizer = useGridVirtualizerContext()
  const mergedProps = mergeProps(() => ({ style: normalizeProps.style(virtualizer.getContentStyle()) }), props)

  return <ark.div {...mergedProps} />
}
