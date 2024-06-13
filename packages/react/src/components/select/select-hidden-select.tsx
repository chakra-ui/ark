import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export type SelectHiddenSelectBaseProps = {}
export interface SelectHiddenSelectProps
  extends HTMLArkProps<'select'>,
    SelectHiddenSelectBaseProps {}

export const SelectHiddenSelect = forwardRef<HTMLSelectElement, SelectHiddenSelectProps>(
  (props, ref) => {
    const select = useSelectContext()
    const mergedProps = mergeProps(select.getHiddenSelectProps(), props)
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
