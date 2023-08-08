import { mergeProps } from '@zag-js/react'
import type { OptionProps } from '@zag-js/select'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'

export type SelectOptionProps = Assign<ComponentPropsWithoutRef<typeof ark.div>, OptionProps>

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
