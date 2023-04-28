import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useColorPickerContext } from './color-picker-context'

export type ColorPickerContentProps = HTMLArkProps<'div'>

export const ColorPickerContent = forwardRef<'div', ColorPickerContentProps>((props, ref) => {
  const { contentProps } = useColorPickerContext()
  const mergedProps = mergeProps(contentProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
