import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import type { UseToggleGroupReturn } from './use-toggle-group'
import { ToggleGroupProvider } from './use-toggle-group-context'

interface RootProviderProps {
  value: UseToggleGroupReturn
}

export interface ToggleGroupRootProviderProps extends HTMLArkProps<'div'>, RootProviderProps {}

export const ToggleGroupRootProvider = (props: ToggleGroupRootProviderProps) => {
  const [{ value: toggleGroup }, localProps] = createSplitProps<RootProviderProps>()(props, [
    'value',
  ])
  const mergedProps = mergeProps(() => toggleGroup().getRootProps(), localProps)

  return (
    <ToggleGroupProvider value={toggleGroup}>
      <ark.div {...mergedProps} />
    </ToggleGroupProvider>
  )
}
