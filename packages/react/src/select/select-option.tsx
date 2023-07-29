import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'

type OptionProps = Parameters<ReturnType<typeof useSelectContext>['getOptionProps']>[0]
export type SelectOptionProps = Assign<ComponentPropsWithoutRef<typeof ark.li>, OptionProps>

export const SelectOption = forwardRef<HTMLLIElement, SelectOptionProps>((props, ref) => {
  const [optionProps, { children, ...liProps }] = createSplitProps<OptionProps>()(props, [
    'disabled',
    'label',
    'value',
    'valueText',
  ])

  const { getOptionProps } = useSelectContext()
  const mergedProps = mergeProps(getOptionProps(optionProps), liProps)

  return (
    <ark.li {...mergedProps} ref={ref}>
      {children ? children : optionProps.label}
    </ark.li>
  )
})

SelectOption.displayName = 'SelectOption'
