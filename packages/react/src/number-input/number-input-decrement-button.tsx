import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputDecrementButtonProps = HTMLAtlasProps<'button'>

export const NumberInputDecrementButton = forwardRef<'button', NumberInputDecrementButtonProps>(
  (props, ref) => {
    const { decrementButtonProps } = useNumberInputContext()
    const mergedProps = mergeProps(decrementButtonProps, props)

    return <atlas.button {...mergedProps} ref={ref} />
  },
)
