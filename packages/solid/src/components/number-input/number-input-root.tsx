import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { type UseNumberInputProps, useNumberInput } from './use-number-input.ts'
import { NumberInputProvider } from './use-number-input-context.ts'

export interface NumberInputRootBaseProps extends UseNumberInputProps, PolymorphicProps<'div'> {}
export interface NumberInputRootProps extends Assign<HTMLProps<'div'>, NumberInputRootBaseProps> {}

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
    'largeStep',
    'locale',
    'max',
    'min',
    'name',
    'onFocusChange',
    'onValueChange',
    'onValueCommit',
    'onValueInvalid',
    'pattern',
    'readOnly',
    'required',
    'smallStep',
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
