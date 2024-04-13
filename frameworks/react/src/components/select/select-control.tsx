import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '~/factory'
import { useSelectContext } from './use-select-context'

export interface SelectControlProps extends HTMLArkProps<'div'> {}

export const SelectControl = forwardRef<HTMLDivElement, SelectControlProps>((props, ref) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(select.controlProps, props)
  const isValueEmpty = select.value.length === 0

  return (
    <>
      <ark.div {...mergedProps} ref={ref} />
      <select {...select.hiddenSelectProps}>
        {isValueEmpty && <option value="" />}
        {select.collection.toArray().map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  )
})
SelectControl.displayName = 'SelectControl'
