import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectLabelProps extends HTMLArkProps<'label'> {}

export const SelectLabel = forwardRef<HTMLLabelElement, SelectLabelProps>((props, ref) => {
  const context = useSelectContext()
  const mergedProps = mergeProps(context.labelProps, props)

  return <ark.label {...mergedProps} ref={ref} />
})

SelectLabel.displayName = 'SelectLabel'
