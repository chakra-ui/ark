import type { DigitProps } from '@zag-js/number-flow'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { NumberFlowDigitTrack } from './number-flow-digit-track.tsx'
import { useNumberFlowContext } from './use-number-flow-context.ts'

export interface NumberFlowDigitBaseProps extends DigitProps, PolymorphicProps<'span'> {}
export interface NumberFlowDigitProps extends HTMLProps<'span'>, NumberFlowDigitBaseProps {}

export const NumberFlowDigit = (props: NumberFlowDigitProps) => {
  const [digitProps, localProps] = createSplitProps<DigitProps>()(props, ['segment'])
  const numberFlow = useNumberFlowContext()
  const mergedProps = mergeProps(() => numberFlow().getDigitProps(digitProps), localProps)

  return (
    <ark.span {...mergedProps}>{localProps.children ?? <NumberFlowDigitTrack segment={digitProps.segment} />}</ark.span>
  )
}
