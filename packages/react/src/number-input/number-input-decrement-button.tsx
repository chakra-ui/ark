import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputDecrementButtonProps = HTMLArkProps<'button'>

export const NumberInputDecrementButton = forwardRef<'button', NumberInputDecrementButtonProps>(
  (props, ref) => {
    const { decrementButtonProps } = useNumberInputContext()
    const mergedProps = mergeProps(decrementButtonProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)
