'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useComposedRefs } from '../../utils/compose-refs.ts'
import type { HTMLProps, PolymorphicProps } from '../factory.ts'
import { ark } from '../factory.ts'
import { PresenceGate } from '../presence/presence-gate.tsx'
import { useSwapContext } from './use-swap-context.ts'

export interface SwapIndicatorBaseProps extends PolymorphicProps {
  type: 'on' | 'off'
}

export interface SwapIndicatorProps extends HTMLProps<'span'>, SwapIndicatorBaseProps {}

export const SwapIndicator = forwardRef<HTMLSpanElement, SwapIndicatorProps>((props, ref) => {
  const { type, ...restProps } = props
  const swap = useSwapContext()
  const presence = type === 'on' ? swap.onPresence : swap.offPresence
  const composedRefs = useComposedRefs(presence.ref, ref)
  const mergedProps = mergeProps(swap.getIndicatorProps({ type }), restProps)

  return (
    <PresenceGate presence={presence}>
      <ark.span {...mergedProps} ref={composedRefs} />
    </PresenceGate>
  )
})

SwapIndicator.displayName = 'SwapIndicator'
