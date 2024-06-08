import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useSelectContext } from './use-select-context'

export interface SelectLabelProps extends HTMLArkProps<'label'> {}

export const SelectLabel = forwardRef<HTMLLabelElement, SelectLabelProps>((props, ref) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(select.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

SelectLabel.displayName = 'SelectLabel'
