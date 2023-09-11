import { mergeProps } from '@zag-js/react'
import type { OptionProps } from '@zag-js/select'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'

export type SelectOptionProps = Assign<HTMLArkProps<'div'>, OptionProps>

export const SelectOption = forwardRef<HTMLDivElement, SelectOptionProps>((props, ref) => {
  const [optionProps, { children, ...localProps }] = createSplitProps<OptionProps>()(props, [
    'disabled',
    'label',
    'value',
    'valueText',
  ])

  const { getOptionProps } = useSelectContext()
  const mergedProps = mergeProps(getOptionProps(optionProps), localProps)

  return (
    <ark.div {...mergedProps} ref={ref}>
      {children ? children : optionProps.label}
    </ark.div>
  )
})

SelectOption.displayName = 'SelectOption'
