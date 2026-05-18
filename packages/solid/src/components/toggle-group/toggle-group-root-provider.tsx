import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import type { UseToggleGroupReturn } from './use-toggle-group.ts'
import { ToggleGroupProvider } from './use-toggle-group-context.ts'

interface RootProviderProps {
  value: UseToggleGroupReturn
}

export interface ToggleGroupRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface ToggleGroupRootProviderProps
  extends HTMLProps<'div'>, RootProviderProps, ToggleGroupRootProviderBaseProps {}

export const ToggleGroupRootProvider = (props: ToggleGroupRootProviderProps) => {
  const [{ value: toggleGroup }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => toggleGroup().getRootProps(), localProps)

  return (
    <ToggleGroupProvider value={toggleGroup}>
      <ark.div {...mergedProps} />
    </ToggleGroupProvider>
  )
}
