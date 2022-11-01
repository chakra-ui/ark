import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputDecrementButtonProps = HTMLAtlasProps<'button'>

export const NumberInputDecrementButton = forwardRef<'button', NumberInputDecrementButtonProps>(
  (props, ref) => {
    const { decrementButtonProps } = useNumberInputContext()
    return <atlas.button {...decrementButtonProps} {...props} ref={ref} />
  },
)
