import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useComboboxContext } from './combobox-context'

export type ComboboxPositionerProps = HTMLArkProps<'div'>

export const ComboboxPositioner = forwardRef<'div'>((props, ref) => {
  const { positionerProps } = useComboboxContext()
  const mergedProps = mergeProps(positionerProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
