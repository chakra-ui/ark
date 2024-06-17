import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import type { UseNumberInputReturn } from './use-number-input'
import { NumberInputProvider } from './use-number-input-context'

interface RootProviderProps {
  value: UseNumberInputReturn
}

export interface NumberInputRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface NumberInputRootProviderProps
  extends HTMLAttributes<HTMLDivElement>,
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
