import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import type { UseSwitchReturn } from './use-switch'
import { SwitchProvider } from './use-switch-context'

interface RootProviderProps {
  value: UseSwitchReturn
}

export interface SwitchRootProviderBaseProps extends PolymorphicProps<'label'> {}
export interface SwitchRootProviderProps
  extends JSX.LabelHTMLAttributes<HTMLLabelElement>,
    RootProviderProps,
    SwitchRootProviderBaseProps {}

export const SwitchRootProvider = (props: SwitchRootProviderProps) => {
  const [{ value: api }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <SwitchProvider value={api}>
      <ark.label {...mergedProps} />
    </SwitchProvider>
  )
}
