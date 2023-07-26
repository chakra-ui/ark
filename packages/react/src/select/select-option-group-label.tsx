import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'

export type SelectOptionGroupLabelProps = Assign<HTMLArkProps<'label'>, { htmlFor: string }>

export const SelectOptionGroupLabel = forwardRef<'label', SelectOptionGroupLabelProps>(
  (props, ref) => {
    const { htmlFor, ...labelProps } = props
    const { getOptionGroupLabelProps } = useSelectContext()
    const mergedProps = mergeProps(getOptionGroupLabelProps({ htmlFor }), labelProps)

    return <ark.label {...mergedProps} ref={ref} />
  },
)
