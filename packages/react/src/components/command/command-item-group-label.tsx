'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { parts } from './command.anatomy.ts'
import { useCommandContext } from './use-command-context.ts'
import { useCommandItemGroupPropsContext } from './use-command-item-group-props-context.ts'

export interface CommandItemGroupLabelBaseProps extends PolymorphicProps {}
export interface CommandItemGroupLabelProps extends HTMLProps<'div'>, CommandItemGroupLabelBaseProps {}

export const CommandItemGroupLabel = forwardRef<HTMLDivElement, CommandItemGroupLabelProps>((props, ref) => {
  const command = useCommandContext()
  const itemGroupProps = useCommandItemGroupPropsContext()
  const mergedProps = mergeProps(
    command.getItemGroupLabelProps({ htmlFor: itemGroupProps.id }),
    parts.itemGroupLabel.attrs(''),
    props,
  )

  return <ark.div {...mergedProps} ref={ref} />
})

CommandItemGroupLabel.displayName = 'CommandItemGroupLabel'
