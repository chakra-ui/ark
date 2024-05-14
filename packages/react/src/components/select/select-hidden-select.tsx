import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectHiddenSelectProps extends HTMLArkProps<'select'> {}

export const SelectHiddenSelect = forwardRef<HTMLSelectElement, SelectHiddenSelectProps>(
  (props, ref) => {
    const select = useSelectContext()
    const mergedProps = mergeProps(select.hiddenSelectProps, props)
    const isValueEmpty = select.value.length === 0

    return (
      <ark.select {...mergedProps} ref={ref}>
        {isValueEmpty && <option value="" />}
        {select.collection.toArray().map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </ark.select>
    )
  },
)
SelectHiddenSelect.displayName = 'SelectHiddenSelect'
