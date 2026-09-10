import { mergeProps } from '@zag-js/solid'
import type { RootState } from '@zag-js/switch'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseSwitchReturn } from './use-switch.ts'
import { SwitchProvider } from './use-switch-context.ts'

interface RootProviderProps {
  value: UseSwitchReturn
}

export interface SwitchRootProviderState extends RootState {}

export interface SwitchRootProviderBaseProps extends PolymorphicProps<'label', SwitchRootProviderState> {}
export interface SwitchRootProviderProps extends HTMLProps<'label'>, RootProviderProps, SwitchRootProviderBaseProps {}

export const SwitchRootProvider = (props: SwitchRootProviderProps) => {
  const [{ value: api }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <SwitchProvider value={api}>
      <ark.label {...mergedProps} state={api().getRootState()} />
    </SwitchProvider>
  )
}
