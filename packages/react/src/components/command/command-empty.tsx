'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { parts } from './command.anatomy.ts'
import { useCommandContext } from './use-command-context.ts'

export interface CommandEmptyBaseProps extends PolymorphicProps {}
export interface CommandEmptyProps extends HTMLProps<'div'>, CommandEmptyBaseProps {}

export const CommandEmpty = forwardRef<HTMLDivElement, CommandEmptyProps>((props, ref) => {
  const { children, ...rest } = props
  const command = useCommandContext()
  const mergedProps = mergeProps(command.getEmptyProps(), parts.empty.attrs(''), rest)

  return (
    <ark.div {...mergedProps} ref={ref}>
      {command.collection.size === 0 ? children : null}
    </ark.div>
  )
})

CommandEmpty.displayName = 'CommandEmpty'
