import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useSelectContext } from './select-context'

export type SelectPositionerProps = HtmlArkProps<'div'>

export const SelectPositioner = forwardRef<HTMLDivElement, SelectPositionerProps>((props, ref) => {
  const { positionerProps } = useSelectContext()
  const mergedProps = mergeProps(positionerProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

SelectPositioner.displayName = 'SelectPositioner'
