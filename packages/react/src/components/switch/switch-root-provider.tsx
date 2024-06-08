import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import type { UseSwitchReturn } from './use-switch'
import { SwitchProvider } from './use-switch-context'

interface RootProviderProps {
  value: UseSwitchReturn
}

export interface SwitchRootProviderProps extends HTMLArkProps<'label'>, RootProviderProps {}

export const SwitchRootProvider = forwardRef<HTMLLabelElement, SwitchRootProviderProps>(
  (props, ref) => {
    const [{ value: api }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
    const mergedProps = mergeProps(api.getRootProps(), localProps)

    return (
      <SwitchProvider value={api}>
        <ark.label {...mergedProps} ref={ref} />
      </SwitchProvider>
    )
  },
)

SwitchRootProvider.displayName = 'SwitchRootProvider'
