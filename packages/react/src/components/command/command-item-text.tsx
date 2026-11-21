'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { parts } from './command.anatomy.ts'
import { useCommandContext } from './use-command-context.ts'
import { useCommandItemPropsContext } from './use-command-item-props-context.ts'

export interface CommandItemTextBaseProps extends PolymorphicProps {}
export interface CommandItemTextProps extends HTMLProps<'span'>, CommandItemTextBaseProps {}

export const CommandItemText = forwardRef<HTMLSpanElement, CommandItemTextProps>((props, ref) => {
  const command = useCommandContext()
  const itemProps = useCommandItemPropsContext()
  const mergedProps = mergeProps(command.getItemTextProps(itemProps), parts.itemText.attrs(''), props)

  return <ark.span {...mergedProps} ref={ref} />
})

CommandItemText.displayName = 'CommandItemText'
