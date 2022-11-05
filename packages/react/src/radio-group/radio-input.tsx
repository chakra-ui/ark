import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useRadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioInputProps = HTMLAtlasProps<'input'>

export const RadioInput = forwardRef<'input', RadioInputProps>((props, ref) => {
  const { getItemInputProps } = useRadioGroupContext()
  const context = useRadioContext()
  const mergedProps = mergeProps(getItemInputProps(context), props)

  return <atlas.input {...mergedProps} ref={ref} />
})
