import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import type { UseCheckboxReturn } from './use-checkbox'
import { CheckboxProvider } from './use-checkbox-context'

interface RootProviderProps {
  value: UseCheckboxReturn
}

export interface CheckboxRootProviderProps extends HTMLArkProps<'label'>, RootProviderProps {}

export const CheckboxRootProvider = forwardRef<HTMLLabelElement, CheckboxRootProviderProps>(
  (props, ref) => {
    const [{ value: checkbox }, localProps] = createSplitProps<RootProviderProps>()(props, [
      'value',
    ])
    const mergedProps = mergeProps(checkbox.rootProps, localProps)

    return (
      <CheckboxProvider value={checkbox}>
        <ark.label {...mergedProps} ref={ref} />
      </CheckboxProvider>
    )
  },
)

CheckboxRootProvider.displayName = 'CheckboxRootProvider'
