import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useSelectContext } from './select-context'

export type SelectHiddenSelectProps = ComponentPropsWithoutRef<typeof ark.select>

export const SelectHiddenSelect = forwardRef<HTMLSelectElement, SelectHiddenSelectProps>(
  (props, ref) => {
    const { hiddenSelectProps } = useSelectContext()
    const mergedProps = mergeProps(hiddenSelectProps, props)

    return <ark.select {...mergedProps} ref={ref} />
  },
)

SelectHiddenSelect.displayName = 'SelectHiddenSelect'
