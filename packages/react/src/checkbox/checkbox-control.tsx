import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useCheckboxContext } from './checkbox-context'

export type CheckboxControlProps = ComponentPropsWithoutRef<typeof ark.div>

export const CheckboxControl = forwardRef<HTMLDivElement, CheckboxControlProps>((props, ref) => {
  const api = useCheckboxContext()
  const mergedProps = mergeProps(api.controlProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

CheckboxControl.displayName = 'CheckboxControl'
