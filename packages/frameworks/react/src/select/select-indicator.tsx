import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSelectContext } from './select-context'

export interface SelectIndicatorProps extends HTMLArkProps<'div'> {}

export const SelectIndicator = forwardRef<HTMLDivElement, SelectIndicatorProps>((props, ref) => {
  const api = useSelectContext()
  const mergedProps = mergeProps(api.indicatorProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

SelectIndicator.displayName = 'SelectIndicator'
