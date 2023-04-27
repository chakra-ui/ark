import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxPositionerProps = HTMLArkProps<'div'>

export const ComboboxPositioner = forwardRef<'div', ComboboxPositionerProps>((props, ref) => {
  const { positionerProps } = useComboboxContext()
  const mergedProps = mergeProps(positionerProps, props)
  return <ark.div {...mergedProps} ref={ref} />
})
