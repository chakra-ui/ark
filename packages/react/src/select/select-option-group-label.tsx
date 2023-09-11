import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'

export type SelectOptionGroupLabelProps = Assign<HtmlArkProps<'div'>, { htmlFor: string }>

export const SelectOptionGroupLabel = forwardRef<HTMLDivElement, SelectOptionGroupLabelProps>(
  (props, ref) => {
    const { htmlFor, ...labelProps } = props
    const { getOptionGroupLabelProps } = useSelectContext()
    const mergedProps = mergeProps(getOptionGroupLabelProps({ htmlFor }), labelProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

SelectOptionGroupLabel.displayName = 'SelectOptionGroupLabel'
