import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputIncrementButtonProps = HTMLAtlasProps<'button'>

export const NumberInputIncrementButton = forwardRef<'button', NumberInputIncrementButtonProps>(
  (props, ref) => {
    const { incrementButtonProps } = useNumberInputContext()
    const mergedProps = mergeProps(incrementButtonProps, props)

    return <atlas.button {...mergedProps} ref={ref} />
  },
)
