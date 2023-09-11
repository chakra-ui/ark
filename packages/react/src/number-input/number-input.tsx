import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HtmlArkProps } from '../factory'
import { type Assign } from '../types'
import { NumberInputProvider } from './number-input-context'
import { useNumberInput, type UseNumberInputProps } from './use-number-input'

export type NumberInputProps = Assign<HtmlArkProps<'div'>, UseNumberInputProps>

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
    'onBlur',
    'onChange',
    'onFocus',
    'onInvalid',
    'parse',
    'pattern',
    'readOnly',
    'spinOnPress',
    'step',
    'translations',
    'validateCharacter',
    'value',
  ])
  const pinInput = useNumberInput(useNumberInputProps)
  const mergedProps = mergeProps(pinInput.rootProps, divProps)

  return (
    <NumberInputProvider value={pinInput}>
      <ark.div {...mergedProps} ref={ref} />
    </NumberInputProvider>
  )
})

NumberInput.displayName = 'NumberInput'
