import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputControlProps = HTMLArkProps<'div'>

export const NumberInputControl = forwardRef<'div', NumberInputControlProps>((props, ref) => {
  const { controlProps } = useNumberInputContext()
  const mergedProps = mergeProps(controlProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
