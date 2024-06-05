import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import type { UseNumberInputReturn } from './use-number-input'
import { NumberInputProvider } from './use-number-input-context'

interface RootProviderProps {
  value: UseNumberInputReturn
}

export interface NumberInputRootProviderProps extends HTMLArkProps<'div'>, RootProviderProps {}

export const NumberInputRootProvider = (props: NumberInputRootProviderProps) => {
  const [{ value: numberInput }, localProps] = createSplitProps<RootProviderProps>()(props, [
    'value',
  ])
  const mergedProps = mergeProps(() => numberInput().rootProps, localProps)

  return (
    <NumberInputProvider value={numberInput}>
      <ark.div {...mergedProps} />
    </NumberInputProvider>
  )
}
