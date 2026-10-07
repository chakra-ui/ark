'use client'

import type { Segment } from '@zag-js/number-flow'
import { Fragment, type ReactNode } from 'react'
import { NumberFlowDigit } from './number-flow-digit.tsx'
import { NumberFlowSymbol } from './number-flow-symbol.tsx'
import { useNumberFlowContext } from './use-number-flow-context.ts'

export interface NumberFlowSegmentsProps {
  /**
   * Render each segment yourself. Defaults to a `Digit` for digit segments and a `Symbol` for the rest.
   */
  children?: ((segment: Segment) => ReactNode) | undefined
}

export const NumberFlowSegments = (props: NumberFlowSegmentsProps) => {
  const numberFlow = useNumberFlowContext()

  return numberFlow.segments.map((segment) => (
    <Fragment key={segment.key}>
      {props.children ? (
        props.children(segment)
      ) : segment.kind === 'digit' ? (
        <NumberFlowDigit segment={segment} />
      ) : (
        <NumberFlowSymbol segment={segment} />
      )}
    </Fragment>
  ))
}

NumberFlowSegments.displayName = 'NumberFlowSegments'
