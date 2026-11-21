'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { parts } from './command.anatomy.ts'
import { useCommandContext } from './use-command-context.ts'

export interface CommandControlBaseProps extends PolymorphicProps {}
export interface CommandControlProps extends HTMLProps<'div'>, CommandControlBaseProps {}

export const CommandControl = forwardRef<HTMLDivElement, CommandControlProps>((props, ref) => {
  const command = useCommandContext()
  const mergedProps = mergeProps(command.getControlProps(), parts.control.attrs(''), props)

  return <ark.div {...mergedProps} ref={ref} />
})

CommandControl.displayName = 'CommandControl'
