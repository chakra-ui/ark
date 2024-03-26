import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectControlProps extends HTMLArkProps<'div'> {}

export const SelectControl = forwardRef<HTMLDivElement, SelectControlProps>((props, ref) => {
  const context = useSelectContext()
  const mergedProps = mergeProps(context.controlProps, props)
  const isValueEmpty = context.value.length === 0

  return (
    <>
      <ark.div {...mergedProps} ref={ref} />
      <select {...context.hiddenSelectProps}>
        {isValueEmpty && <option value="" />}
        {context.collection.toArray().map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  )
})
SelectControl.displayName = 'SelectControl'
