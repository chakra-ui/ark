import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import type { UseRadioGroupReturn } from './use-radio-group'
import { RadioGroupProvider } from './use-radio-group-context'

interface RootProviderProps {
  value: UseRadioGroupReturn
}

export interface RadioGroupRootProviderProps extends HTMLArkProps<'div'>, RootProviderProps {}

export const RadioGroupRootProvider = forwardRef<HTMLDivElement, RadioGroupRootProviderProps>(
  (props, ref) => {
    const [{ value: radioGroup }, localProps] = createSplitProps<RootProviderProps>()(props, [
      'value',
    ])
    const mergedProps = mergeProps(radioGroup.rootProps, localProps)

    return (
      <RadioGroupProvider value={radioGroup}>
        <ark.div {...mergedProps} ref={ref} />
      </RadioGroupProvider>
    )
  },
)

RadioGroupRootProvider.displayName = 'RadioGroupRootProvider'
