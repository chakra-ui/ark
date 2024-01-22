import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { NumberInputProvider } from './number-input-context'
import {
  useNumberInput,
  type UseNumberInputProps,
  type UseNumberInputReturn,
} from './use-number-input'

export interface NumberInputRootProps
  extends Assign<
    Assign<
      HTMLArkProps<'div'>,
      {
        children?: ReactNode | ((api: UseNumberInputReturn) => ReactNode)
      }
    >,
    UseNumberInputProps
  > {}

export const NumberInputRoot = forwardRef<HTMLDivElement, NumberInputRootProps>((props, ref) => {
  const [useNumberInputProps, { children, ...localProps }] =
    createSplitProps<UseNumberInputProps>()(props, [
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
  const api = useNumberInput(useNumberInputProps)
  const mergedProps = mergeProps(api.rootProps, localProps)

  const view = runIfFn(children, api)

  return (
    <NumberInputProvider value={api}>
      <ark.div {...mergedProps} ref={ref}>
        {view}
      </ark.div>
    </NumberInputProvider>
  )
})

NumberInputRoot.displayName = 'NumberInputRoot'
