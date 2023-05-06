import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'

export type SelectOptionGroupProps = Assign<HTMLArkProps<'div'>, { id: string }>

export const SelectOptionGroup = forwardRef<'div', SelectOptionGroupProps>((props, ref) => {
  const { id, ...divProps } = props
  const { getOptionGroupProps } = useSelectContext()
  const mergedProps = mergeProps(getOptionGroupProps({ id }), divProps)

  return <ark.div {...mergedProps} ref={ref} />
})
