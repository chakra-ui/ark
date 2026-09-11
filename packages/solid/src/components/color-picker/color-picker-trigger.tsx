import type { TriggerState } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useColorPickerContext } from './use-color-picker-context.ts'

export interface ColorPickerTriggerState extends TriggerState {}

export interface ColorPickerTriggerBaseProps extends PolymorphicProps<'button', ColorPickerTriggerState> {}
export interface ColorPickerTriggerProps extends HTMLProps<'button'>, ColorPickerTriggerBaseProps {}

export const ColorPickerTrigger = (props: ColorPickerTriggerProps) => {
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getTriggerProps(), props)

  return <ark.button {...mergedProps} state={api().getTriggerState()} />
}
