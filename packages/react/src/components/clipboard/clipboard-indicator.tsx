'use client'

import { mergeProps } from '@zag-js/react'
import { type ReactNode, forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useClipboardContext } from './use-clipboard-context.ts'
import type { IndicatorState } from '@zag-js/clipboard'

export interface ClipboardIndicatorState extends IndicatorState {}

export interface ClipboardIndicatorBaseProps extends PolymorphicProps<ClipboardIndicatorState> {
  copied?: ReactNode | undefined
}
export interface ClipboardIndicatorProps extends HTMLProps<'div'>, ClipboardIndicatorBaseProps {}

export const ClipboardIndicator = forwardRef<HTMLDivElement, ClipboardIndicatorProps>((props, ref) => {
  const { children, copied, ...localProps } = props
  const clipboard = useClipboardContext()
  const mergedProps = mergeProps(clipboard.getIndicatorProps({ copied: clipboard.copied }), localProps)

  return (
    <ark.div {...mergedProps} ref={ref} state={clipboard.getIndicatorState({ copied: clipboard.copied })}>
      {clipboard.copied ? copied : children}
    </ark.div>
  )
})

ClipboardIndicator.displayName = 'ClipboardIndicator'
