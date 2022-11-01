import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputIncrementButtonProps = HTMLAtlasProps<'button'>

export const NumberInputIncrementButton = forwardRef<'button', NumberInputIncrementButtonProps>(
  (props, ref) => {
    const { incrementButtonProps } = useNumberInputContext()
    return <atlas.button {...incrementButtonProps} {...props} ref={ref} />
  },
)
