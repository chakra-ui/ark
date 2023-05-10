import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useSelectContext } from './select-context'

export type SelectTriggerProps = HTMLArkProps<'button'>

export const SelectTrigger = forwardRef<'button'>((props, ref) => {
  const { triggerProps } = useSelectContext()
  const mergedProps = mergeProps(triggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})
