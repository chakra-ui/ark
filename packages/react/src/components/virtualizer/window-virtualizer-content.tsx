'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useWindowVirtualizerContext } from './use-window-virtualizer-context.ts'

export interface WindowVirtualizerContentBaseProps extends PolymorphicProps {}
export interface WindowVirtualizerContentProps extends HTMLProps<'div'>, WindowVirtualizerContentBaseProps {}

export const WindowVirtualizerContent = forwardRef<HTMLDivElement, WindowVirtualizerContentProps>((props, ref) => {
  const virtualizer = useWindowVirtualizerContext()
  const mergedProps = mergeProps({ style: virtualizer.getContentStyle() }, props)

  return <ark.div {...mergedProps} ref={ref} />
})

WindowVirtualizerContent.displayName = 'WindowVirtualizerContent'
