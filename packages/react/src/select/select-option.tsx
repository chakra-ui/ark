import { Assign, forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

type OptionProps = Parameters<ReturnType<typeof useSelectContext>['getOptionProps']>[0]
export type SelectOptionProps = Assign<HTMLArkProps<'li'>, OptionProps>

export const SelectOption = forwardRef<'li', SelectOptionProps>((props, ref) => {
  const [optionProps, liProps] = createSplitProps<OptionProps>()(props, [
    'disabled',
    'label',
    'value',
    'valueText', // TODO what is value text
  ])

  const { getOptionProps } = useSelectContext()
  const mergedProps = mergeProps(getOptionProps(optionProps), liProps)

  return <ark.li {...mergedProps} ref={ref} />
})
