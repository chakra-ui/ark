import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export type SelectControlProps = HTMLArkProps<'div'>

export const SelectControl = forwardRef<HTMLDivElement, SelectControlProps>((props, ref) => {
  const api = useSelectContext()
  const mergedProps = mergeProps(api.controlProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

SelectControl.displayName = 'SelectControl'
