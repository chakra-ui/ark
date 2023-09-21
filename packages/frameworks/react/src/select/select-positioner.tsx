import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export interface SelectPositionerProps extends HTMLArkProps<'div'> {}

export const SelectPositioner = forwardRef<HTMLDivElement, SelectPositionerProps>((props, ref) => {
  const api = useSelectContext()
  const mergedProps = mergeProps(api.positionerProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

SelectPositioner.displayName = 'SelectPositioner'
