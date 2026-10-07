import type { DigitCellProps } from '@zag-js/number-flow'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useNumberFlowContext } from './use-number-flow-context.ts'

export interface NumberFlowDigitCellBaseProps extends DigitCellProps, PolymorphicProps<'span'> {}
export interface NumberFlowDigitCellProps extends HTMLProps<'span'>, NumberFlowDigitCellBaseProps {}

export const NumberFlowDigitCell = (props: NumberFlowDigitCellProps) => {
  const [digitCellProps, localProps] = createSplitProps<DigitCellProps>()(props, ['cell', 'segment'])
  const numberFlow = useNumberFlowContext()
  const mergedProps = mergeProps(() => numberFlow().getDigitCellProps(digitCellProps), localProps)

  return <ark.span {...mergedProps}>{localProps.children ?? digitCellProps.cell.glyph}</ark.span>
}
