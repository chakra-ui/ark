import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { splitProps, type Assign } from '../split-props'
import { NumberInputProvider } from './number-input-context'
import { useNumberInput, UseNumberInputProps } from './use-number-input'

export type NumberInputProps = Assign<HTMLAtlasProps<'div'>, UseNumberInputProps>

export const NumberInput = forwardRef<'div', NumberInputProps>((props, ref) => {
  const [useNumberInputProps, rootProps] = splitProps(props, [
    'allowMouseWheel',
    'allowOverflow',
    'clampValueOnBlur',
    'defaultValue',
    'dir',
    'disabled',
    'focusInputOnChange',
    'format',
    'getRootNode',
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

  return (
    <NumberInputProvider value={pinInput}>
      <atlas.div {...pinInput.rootProps} {...rootProps} ref={ref} />
    </NumberInputProvider>
  )
})
