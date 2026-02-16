import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { composeRefs } from '../../utils/compose-refs'
import type { HTMLProps, PolymorphicProps } from '../factory'
import { ark } from '../factory'
import { useSwapContext } from './use-swap-context'

export interface SwapIndicatorBaseProps extends PolymorphicProps {
  type: 'on' | 'off'
}

export interface SwapIndicatorProps extends HTMLProps<'span'>, SwapIndicatorBaseProps {}

export const SwapIndicator = forwardRef<HTMLSpanElement, SwapIndicatorProps>((props, ref) => {
  const { type, ...restProps } = props
  const swap = useSwapContext()
  const presence = type === 'on' ? swap.onPresence : swap.offPresence

  if (presence.unmounted) return null

  const mergedProps = mergeProps(swap.getIndicatorProps({ type }), restProps)

  return <ark.span {...mergedProps} ref={composeRefs(presence.ref, ref)} />
})

SwapIndicator.displayName = 'SwapIndicator'
