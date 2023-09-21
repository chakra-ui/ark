import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { NumberInputProvider } from './number-input-context'
import { useNumberInput, type UseNumberInputProps } from './use-number-input'

export interface NumberInputProps extends Assign<HTMLArkProps<'div'>, UseNumberInputProps> {}

export const NumberInput = forwardRef<HTMLDivElement, NumberInputProps>((props, ref) => {
  const [useNumberInputProps, divProps] = createSplitProps<UseNumberInputProps>()(props, [
    'allowMouseWheel',
    'allowOverflow',
    'clampValueOnBlur',
    'defaultValue',
    'dir',
    'disabled',
    'focusInputOnChange',
    'form',
    'format',
    'getRootNode',
    'id',
    'ids',
    'inputMode',
    'invalid',
    'max',
    'maxFractionDigits',
    'min',
    'minFractionDigits',
    'name',
    'onFocusChange',
    'onValueChange',
    'onValueInvalid',
    'parse',
    'pattern',
    'readOnly',
    'spinOnPress',
    'step',
    'translations',
    'validateCharacter',
    'value',
  ])
  const api = useNumberInput(useNumberInputProps)
  const mergedProps = mergeProps(api.rootProps, divProps)

  return (
    <NumberInputProvider value={api}>
      <ark.div {...mergedProps} ref={ref} />
    </NumberInputProvider>
  )
})

NumberInput.displayName = 'NumberInput'
