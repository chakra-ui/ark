import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { NumberInputProvider } from './number-input-context'
import { useNumberInput, UseNumberInputProps } from './use-number-input'

export type NumberInputProps = Assign<HTMLArkProps<'div'>, UseNumberInputProps>

export const NumberInput = forwardRef<'div', NumberInputProps>((props, ref) => {
  const [useNumberInputProps, divProps] = createSplitProps<UseNumberInputProps>()(props, [
    'allowMouseWheel',
    'allowOverflow',
    'clampValueOnBlur',
    'defaultValue',
    'dir',
    'disabled',
    'focusInputOnChange',
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
    'readonly',
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
