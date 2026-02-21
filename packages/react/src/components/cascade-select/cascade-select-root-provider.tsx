import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { PresenceProvider, type UsePresenceProps, splitPresenceProps, usePresence } from '../presence'
import type { UseCascadeSelectReturn } from './use-cascade-select'
import { CascadeSelectProvider } from './use-cascade-select-context'

interface RootProviderProps {
  value: UseCascadeSelectReturn
}

export interface CascadeSelectRootProviderBaseProps extends RootProviderProps, UsePresenceProps, PolymorphicProps {}
export interface CascadeSelectRootProviderProps extends Assign<HTMLProps<'div'>, CascadeSelectRootProviderBaseProps> {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const CascadeSelectRootProvider = forwardRef<HTMLDivElement, CascadeSelectRootProviderProps>((props, ref) => {
  const [presenceProps, cascadeSelectProps] = splitPresenceProps(props)
  const [{ value: cascadeSelect }, localProps] = splitRootProviderProps(cascadeSelectProps, ['value'])
  const presence = usePresence(mergeProps({ present: cascadeSelect.open }, presenceProps))
  const mergedProps = mergeProps(cascadeSelect.getRootProps(), localProps)

  return (
    <CascadeSelectProvider value={cascadeSelect}>
      <PresenceProvider value={presence}>
        <ark.div {...mergedProps} ref={ref} />
      </PresenceProvider>
    </CascadeSelectProvider>
  )
})

CascadeSelectRootProvider.displayName = 'CascadeSelectRootProvider'
