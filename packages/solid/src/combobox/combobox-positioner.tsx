import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export type ComboboxPositionerProps = HTMLArkProps<'div'>

export const ComboboxPositioner = (props: ComboboxPositionerProps) => {
  const combobox = useComboboxContext()
  const mergedProps = createMemo(() => mergeProps(combobox().positionerProps, props))
  return <ark.div {...mergedProps()} />
}
