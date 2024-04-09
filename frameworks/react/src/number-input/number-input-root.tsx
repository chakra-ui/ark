import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { useNumberInput, type UseNumberInputProps } from './use-number-input'
import { NumberInputProvider } from './use-number-input-context'

export interface NumberInputRootProps extends Assign<HTMLArkProps<'div'>, UseNumberInputProps> {}

export const NumberInputRoot = forwardRef<HTMLDivElement, NumberInputRootProps>((props, ref) => {
  const [useNumberInputProps, localProps] = createSplitProps<UseNumberInputProps>()(props, [
    'allowMouseWheel',
    'allowOverflow',
    'clampValueOnBlur',
    'defaultValue',
    'dir',
    'disabled',
    'focusInputOnChange',
    'form',
    'formatOptions',
    'getRootNode',
    'id',
    'ids',
    'inputMode',
    'invalid',
    'locale',
    'max',
    'min',
    'name',
    'onFocusChange',
    'onValueChange',
    'onValueInvalid',
    'pattern',
    'readOnly',
    'spinOnPress',
    'step',
    'translations',
    'value',
  ])
  const numberInput = useNumberInput(useNumberInputProps)
  const mergedProps = mergeProps(numberInput.rootProps, localProps)

  return (
    <NumberInputProvider value={numberInput}>
      <ark.div {...mergedProps} ref={ref} />
    </NumberInputProvider>
  )
})

NumberInputRoot.displayName = 'NumberInputRoot'
