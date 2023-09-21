import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export interface SelectLabelProps extends HTMLArkProps<'label'> {}

export const SelectLabel = forwardRef<HTMLLabelElement, SelectLabelProps>((props, ref) => {
  const api = useSelectContext()
  const mergedProps = mergeProps(api.labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})

SelectLabel.displayName = 'SelectLabel'
