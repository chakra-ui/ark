import { mergeProps } from '@zag-js/react'
import type { OptionGroupProps } from '@zag-js/select'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HtmlArkProps } from '../factory'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'

export type SelectOptionGroupProps = Assign<HtmlArkProps<'div'>, OptionGroupProps>

export const SelectOptionGroup = forwardRef<HTMLDivElement, SelectOptionGroupProps>(
  (props, ref) => {
    const [optionProps, localProps] = createSplitProps<OptionGroupProps>()(props, ['id'])

    const { getOptionGroupProps } = useSelectContext()
    const mergedProps = mergeProps(getOptionGroupProps(optionProps), localProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

SelectOptionGroup.displayName = 'SelectOptionGroup'
