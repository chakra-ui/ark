import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseCheckboxReturn } from './use-checkbox'
import { CheckboxProvider } from './use-checkbox-context'

interface RootProviderProps {
  value: UseCheckboxReturn
}

export interface CheckboxRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface CheckboxRootProviderProps
  extends HTMLProps<'label'>,
    CheckboxRootProviderBaseProps {}

export const CheckboxRootProvider = forwardRef<HTMLLabelElement, CheckboxRootProviderProps>(
  (props, ref) => {
    const [{ value: checkbox }, localProps] = createSplitProps<RootProviderProps>()(props, [
      'value',
    ])
    const mergedProps = mergeProps(checkbox.getRootProps(), localProps)

    return (
      <CheckboxProvider value={checkbox}>
        <ark.label {...mergedProps} ref={ref} />
      </CheckboxProvider>
    )
  },
)

CheckboxRootProvider.displayName = 'CheckboxRootProvider'
