import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { type UseNumberInputProps, useNumberInput } from './use-number-input'
import { NumberInputProvider } from './use-number-input-context'

export interface NumberInputRootBaseProps extends UseNumberInputProps, PolymorphicProps<'div'> {}
export interface NumberInputRootProps
  extends Assign<JSX.HTMLAttributes<HTMLDivElement>, NumberInputRootBaseProps> {}

export const NumberInputRoot = (props: NumberInputRootProps) => {
  const [useNumberInputProps, localProps] = createSplitProps<UseNumberInputProps>()(props, [
    'allowMouseWheel',
    'allowOverflow',
    'clampValueOnBlur',
    'defaultValue',
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
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <NumberInputProvider value={api}>
      <ark.div {...mergedProps} />
    </NumberInputProvider>
  )
}
