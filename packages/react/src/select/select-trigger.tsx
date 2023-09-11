import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useSelectContext } from './select-context'

export type SelectTriggerProps = HtmlArkProps<'button'>

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>((props, ref) => {
  const { triggerProps } = useSelectContext()
  const mergedProps = mergeProps(triggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

SelectTrigger.displayName = 'SelectTrigger'
