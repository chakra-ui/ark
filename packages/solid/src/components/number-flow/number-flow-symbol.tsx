import type { SymbolProps } from '@zag-js/number-flow'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useNumberFlowContext } from './use-number-flow-context.ts'

export interface NumberFlowSymbolBaseProps extends SymbolProps, PolymorphicProps<'span'> {}
export interface NumberFlowSymbolProps extends HTMLProps<'span'>, NumberFlowSymbolBaseProps {}

export const NumberFlowSymbol = (props: NumberFlowSymbolProps) => {
  const [symbolProps, localProps] = createSplitProps<SymbolProps>()(props, ['segment'])
  const numberFlow = useNumberFlowContext()
  const mergedProps = mergeProps(() => numberFlow().getSymbolProps(symbolProps), localProps)

  return <ark.span {...mergedProps}>{localProps.children ?? symbolProps.segment.value}</ark.span>
}
