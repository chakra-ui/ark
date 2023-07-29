import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'

export type SelectOptionGroupProps = Assign<
  ComponentPropsWithoutRef<typeof ark.div>,
  { id: string }
>

export const SelectOptionGroup = forwardRef<HTMLDivElement, SelectOptionGroupProps>(
  (props, ref) => {
    const { id, ...divProps } = props
    const { getOptionGroupProps } = useSelectContext()
    const mergedProps = mergeProps(getOptionGroupProps({ id }), divProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

SelectOptionGroup.displayName = 'SelectOptionGroup'
