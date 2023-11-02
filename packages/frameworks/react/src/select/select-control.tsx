import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export interface SelectControlProps extends HTMLArkProps<'div'> {}

export const SelectControl = forwardRef<HTMLDivElement, SelectControlProps>((props, ref) => {
  const api = useSelectContext()
  const mergedProps = mergeProps(api.controlProps, props)

  return (
    <>
      <ark.div {...mergedProps} ref={ref} />
      <select {...api.hiddenSelectProps}>
        {api.collection.toArray().map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  )
})
SelectControl.displayName = 'SelectControl'
