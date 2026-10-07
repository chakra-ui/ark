import type { DigitSegment, Segment, SymbolSegment } from '@zag-js/number-flow'
import { Key } from '@zag-js/solid'
import { type Accessor, type JSX, Show } from 'solid-js'
import { NumberFlowDigit } from './number-flow-digit.tsx'
import { NumberFlowSymbol } from './number-flow-symbol.tsx'
import { useNumberFlowContext } from './use-number-flow-context.ts'

export interface NumberFlowSegmentsProps {
  /**
   * Render each segment yourself. Defaults to a `Digit` for digit segments and a `Symbol` for the rest.
   */
  children?: ((segment: Accessor<Segment>) => JSX.Element) | undefined
}

export const NumberFlowSegments = (props: NumberFlowSegmentsProps) => {
  const numberFlow = useNumberFlowContext()

  return (
    <Key each={numberFlow().segments} by="key">
      {(segment) =>
        props.children ? (
          props.children(segment)
        ) : (
          <Show when={segment().kind === 'digit'} fallback={<NumberFlowSymbol segment={segment() as SymbolSegment} />}>
            <NumberFlowDigit segment={segment() as DigitSegment} />
          </Show>
        )
      }
    </Key>
  )
}
