import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'

export type SelectOptionGroupLabelProps = Assign<
  ComponentPropsWithoutRef<typeof ark.label>,
  { htmlFor: string }
>

export const SelectOptionGroupLabel = forwardRef<HTMLLabelElement, SelectOptionGroupLabelProps>(
  (props, ref) => {
    const { htmlFor, ...labelProps } = props
    const { getOptionGroupLabelProps } = useSelectContext()
    const mergedProps = mergeProps(getOptionGroupLabelProps({ htmlFor }), labelProps)

    return <ark.label {...mergedProps} ref={ref} />
  },
)

SelectOptionGroupLabel.displayName = 'SelectOptionGroupLabel'
