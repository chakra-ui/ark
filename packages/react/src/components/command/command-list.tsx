'use client'

import { mergeProps } from '@zag-js/react'
import { type PointerEvent, forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { parts } from './command.anatomy.ts'
import { useCommandContext } from './use-command-context.ts'

export interface CommandListBaseProps extends PolymorphicProps {}
export interface CommandListProps extends HTMLProps<'div'>, CommandListBaseProps {}

const keepInputFocus = (event: PointerEvent<HTMLDivElement>) => {
  if (event.button === 0) event.preventDefault()
}

export const CommandList = forwardRef<HTMLDivElement, CommandListProps>((props, ref) => {
  const command = useCommandContext()
  const mergedProps = mergeProps(command.getListProps(), parts.list.attrs(''), { onPointerDown: keepInputFocus }, props)

  return <ark.div {...mergedProps} ref={ref} />
})

CommandList.displayName = 'CommandList'
