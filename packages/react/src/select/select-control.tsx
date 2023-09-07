import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useSelectContext } from './select-context'

export type SelectControlProps = ComponentPropsWithoutRef<typeof ark.div>

export const SelectControl = forwardRef<HTMLDivElement, SelectControlProps>((props, ref) => {
  const api = useSelectContext()
  const mergedProps = mergeProps(api.controlProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

SelectControl.displayName = 'SelectControl'
