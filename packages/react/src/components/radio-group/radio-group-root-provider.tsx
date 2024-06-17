import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import type { UseRadioGroupReturn } from './use-radio-group'
import { RadioGroupProvider } from './use-radio-group-context'

interface RootProviderProps {
  value: UseRadioGroupReturn
}

export interface RadioGroupRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface RadioGroupRootProviderProps
  extends HTMLAttributes<HTMLDivElement>,
    RadioGroupRootProviderBaseProps {}

export const RadioGroupRootProvider = forwardRef<HTMLDivElement, RadioGroupRootProviderProps>(
  (props, ref) => {
    const [{ value: radioGroup }, localProps] = createSplitProps<RootProviderProps>()(props, [
      'value',
    ])
    const mergedProps = mergeProps(radioGroup.getRootProps(), localProps)

    return (
      <RadioGroupProvider value={radioGroup}>
        <ark.div {...mergedProps} ref={ref} />
      </RadioGroupProvider>
    )
  },
)

RadioGroupRootProvider.displayName = 'RadioGroupRootProvider'
