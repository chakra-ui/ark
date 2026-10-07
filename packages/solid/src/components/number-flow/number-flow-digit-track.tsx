import type { DigitTrackProps } from '@zag-js/number-flow'
import { mergeProps } from '@zag-js/solid'
import { For } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { NumberFlowDigitCell } from './number-flow-digit-cell.tsx'
import { useNumberFlowContext } from './use-number-flow-context.ts'

export interface NumberFlowDigitTrackBaseProps extends DigitTrackProps, PolymorphicProps<'span'> {}
export interface NumberFlowDigitTrackProps extends HTMLProps<'span'>, NumberFlowDigitTrackBaseProps {}

export const NumberFlowDigitTrack = (props: NumberFlowDigitTrackProps) => {
  const [digitTrackProps, localProps] = createSplitProps<DigitTrackProps>()(props, ['segment'])
  const numberFlow = useNumberFlowContext()
  const mergedProps = mergeProps(() => numberFlow().getDigitTrackProps(digitTrackProps), localProps)

  return (
    <ark.span {...mergedProps}>
      {localProps.children ?? (
        <For each={numberFlow().digitCells}>
          {(cell) => <NumberFlowDigitCell segment={digitTrackProps.segment} cell={cell} />}
        </For>
      )}
    </ark.span>
  )
}
