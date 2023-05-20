import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'

type OptionProps = Parameters<ReturnType<typeof useSelectContext>['getOptionProps']>[0]
export type SelectOptionProps = Assign<HTMLArkProps<'li'>, OptionProps>

export const SelectOption = forwardRef<'li', SelectOptionProps>((props, ref) => {
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
