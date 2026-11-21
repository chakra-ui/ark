'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { parts } from './command.anatomy.ts'
import { useCommandContext } from './use-command-context.ts'

export interface CommandInputBaseProps extends PolymorphicProps {}
export interface CommandInputProps extends HTMLProps<'input'>, CommandInputBaseProps {}

export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>((props, ref) => {
  const command = useCommandContext()
  const mergedProps = mergeProps(command.getInputProps(), parts.input.attrs(''), props)

  return <ark.input {...mergedProps} ref={ref} />
})

CommandInput.displayName = 'CommandInput'
