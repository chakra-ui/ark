import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import type { UseNumberInputReturn } from './use-number-input'
import { NumberInputProvider } from './use-number-input-context'

interface RootProviderProps {
  value: UseNumberInputReturn
}

export interface NumberInputRootProviderBaseProps extends RootProviderProps {}
export interface NumberInputRootProviderProps
  extends HTMLArkProps<'div'>,
    NumberInputRootProviderBaseProps {}

export const NumberInputRootProvider = forwardRef<HTMLDivElement, NumberInputRootProviderProps>(
  (props, ref) => {
    const [{ value: numberInput }, localProps] = createSplitProps<RootProviderProps>()(props, [
      'value',
    ])
    const mergedProps = mergeProps(numberInput.getRootProps(), localProps)

    return (
      <NumberInputProvider value={numberInput}>
        <ark.div {...mergedProps} ref={ref} />
      </NumberInputProvider>
    )
  },
)

NumberInputRootProvider.displayName = 'NumberInputRootProvider'
