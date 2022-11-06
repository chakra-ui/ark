import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputIncrementButtonProps = HTMLArkProps<'button'>

export const NumberInputIncrementButton = forwardRef<'button', NumberInputIncrementButtonProps>(
  (props, ref) => {
    const { incrementButtonProps } = useNumberInputContext()
    const mergedProps = mergeProps(incrementButtonProps, props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)
