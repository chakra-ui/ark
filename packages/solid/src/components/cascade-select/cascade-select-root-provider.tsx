import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { PresenceProvider, type UsePresenceProps, splitPresenceProps, usePresence } from '../presence'
import type { UseCascadeSelectReturn } from './use-cascade-select'
import { CascadeSelectProvider } from './use-cascade-select-context'

interface RootProviderProps {
  value: UseCascadeSelectReturn
}

export interface CascadeSelectRootProviderBaseProps
  extends RootProviderProps, UsePresenceProps, PolymorphicProps<'div'> {}
export interface CascadeSelectRootProviderProps extends Assign<HTMLProps<'div'>, CascadeSelectRootProviderBaseProps> {}

export const CascadeSelectRootProvider = (props: CascadeSelectRootProviderProps) => {
  const [presenceProps, cascadeSelectProps] = splitPresenceProps(props)
  const [{ value: cascadeSelect }, localProps] = createSplitProps<RootProviderProps>()(cascadeSelectProps, ['value'])
  const presenceApi = usePresence(mergeProps(() => ({ present: cascadeSelect().open }), presenceProps))
  const mergedProps = mergeProps(() => cascadeSelect().getRootProps(), localProps)

  return (
    <CascadeSelectProvider value={cascadeSelect}>
      <PresenceProvider value={presenceApi}>
        <ark.div {...mergedProps} />
      </PresenceProvider>
    </CascadeSelectProvider>
  )
}
