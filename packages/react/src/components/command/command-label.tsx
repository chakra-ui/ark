'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { parts } from './command.anatomy.ts'
import { useCommandContext } from './use-command-context.ts'

export interface CommandLabelBaseProps extends PolymorphicProps {}
export interface CommandLabelProps extends HTMLProps<'label'>, CommandLabelBaseProps {}

export const CommandLabel = forwardRef<HTMLLabelElement, CommandLabelProps>((props, ref) => {
  const command = useCommandContext()
  const mergedProps = mergeProps(command.getLabelProps(), parts.label.attrs(''), props)

  return <ark.label {...mergedProps} ref={ref} />
})

CommandLabel.displayName = 'CommandLabel'
