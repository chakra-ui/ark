import type { SwatchTriggerProps } from '@zag-js/color-picker'
import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { createSplitProps } from '~/utils/create-split-props'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerSwatchTriggerProps
  extends Assign<HTMLArkProps<'button'>, SwatchTriggerProps> {}

export const ColorPickerSwatchTrigger = (props: ColorPickerSwatchTriggerProps) => {
  const [triggerProps, localProps] = createSplitProps<SwatchTriggerProps>()(props, [
    'value',
    'disabled',
  ])
  const api = useColorPickerContext()
  const mergedProps = mergeProps(() => api().getSwatchTriggerProps(triggerProps), localProps)

  return <ark.button {...mergedProps} />
}
