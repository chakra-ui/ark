import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { type UseNumberInputProps, useNumberInput } from './use-number-input'
import { NumberInputProvider } from './use-number-input-context'

export interface NumberInputRootProps extends Assign<HTMLArkProps<'div'>, UseNumberInputProps> {}

export const NumberInputRoot = (props: NumberInputRootProps) => {
  const [useNumberInputProps, localProps] = createSplitProps<UseNumberInputProps>()(props, [
    'allowMouseWheel',
    'allowOverflow',
    'clampValueOnBlur',
    'disabled',
    'focusInputOnChange',
    'form',
    'formatOptions',
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
  const api = useNumberInput(useNumberInputProps)
  const mergedProps = mergeProps(() => api().rootProps, localProps)

  return (
    <NumberInputProvider value={api}>
      <ark.div {...mergedProps} />
    </NumberInputProvider>
  )
}
