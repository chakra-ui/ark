import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useNumberFlowContext } from './use-number-flow-context.ts'

export interface NumberFlowHiddenValueTextBaseProps extends PolymorphicProps<'span'> {}
export interface NumberFlowHiddenValueTextProps extends HTMLProps<'span'>, NumberFlowHiddenValueTextBaseProps {}

export const NumberFlowHiddenValueText = (props: NumberFlowHiddenValueTextProps) => {
  const numberFlow = useNumberFlowContext()
  const mergedProps = mergeProps(() => numberFlow().getValueTextProps(), props)

  return <ark.span {...mergedProps}>{props.children ?? numberFlow().announcedValueText}</ark.span>
}
