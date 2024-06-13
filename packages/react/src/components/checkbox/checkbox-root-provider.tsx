import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import type { UseCheckboxReturn } from './use-checkbox'
import { CheckboxProvider } from './use-checkbox-context'

export interface CheckboxRootProviderBaseProps {
  value: UseCheckboxReturn
}
export interface CheckboxRootProviderProps
  extends HTMLArkProps<'label'>,
    CheckboxRootProviderBaseProps {}

export const CheckboxRootProvider = forwardRef<HTMLLabelElement, CheckboxRootProviderProps>(
  (props, ref) => {
    const [{ value: checkbox }, localProps] = createSplitProps<CheckboxRootProviderBaseProps>()(
      props,
      ['value'],
    )
    const mergedProps = mergeProps(checkbox.getRootProps(), localProps)

    return (
      <CheckboxProvider value={checkbox}>
        <ark.label {...mergedProps} ref={ref} />
      </CheckboxProvider>
    )
  },
)

CheckboxRootProvider.displayName = 'CheckboxRootProvider'
