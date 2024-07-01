import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useFieldContext } from '../field'
import { useSelectContext } from './use-select-context'

export interface SelectHiddenSelectBaseProps extends PolymorphicProps {}
export interface SelectHiddenSelectProps extends HTMLProps<'select'>, SelectHiddenSelectBaseProps {}

export const SelectHiddenSelect = forwardRef<HTMLSelectElement, SelectHiddenSelectProps>(
  (props, ref) => {
    const select = useSelectContext()
    const mergedProps = mergeProps(select.getHiddenSelectProps(), props)
    const isValueEmpty = select.value.length === 0
    const field = useFieldContext()

    return (
      <ark.select aria-describedby={field?.ariaDescribedby} {...mergedProps} ref={ref}>
        {isValueEmpty && <option value="" />}
        {select.collection.items.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </ark.select>
    )
  },
)
SelectHiddenSelect.displayName = 'SelectHiddenSelect'
