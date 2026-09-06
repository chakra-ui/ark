import { mergeProps, normalizeProps } from '@zag-js/solid'
import type { Assign } from '../../types.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useListVirtualizerContext } from './use-list-virtualizer-context.ts'

export interface ListVirtualizerContentBaseProps extends PolymorphicProps<'div'> {}
export interface ListVirtualizerContentProps extends Assign<HTMLProps<'div'>, ListVirtualizerContentBaseProps> {}

export const ListVirtualizerContent = (props: ListVirtualizerContentProps) => {
  const virtualizer = useListVirtualizerContext()
  const mergedProps = mergeProps(() => ({ style: normalizeProps.style(virtualizer.getContentStyle()) }), props)

  return <ark.div {...mergedProps} />
}
