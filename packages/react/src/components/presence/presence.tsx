import { forwardRef } from 'react'
import { useComposedRefs } from '../../utils/compose-refs.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { PresenceGate } from './presence-gate.tsx'
import { splitPresenceProps } from './split-presence-props.ts'
import { type UsePresenceProps, usePresence } from './use-presence.ts'

export interface PresenceBaseProps extends UsePresenceProps, PolymorphicProps {}
export interface PresenceProps extends HTMLProps<'div'>, PresenceBaseProps {}

export const Presence = forwardRef<HTMLDivElement, PresenceProps>((props, ref) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const presence = usePresence(presenceProps)
  const composedRefs = useComposedRefs(presence.ref, ref)

  return (
    <PresenceGate presence={presence}>
      <ark.div
        {...localProps}
        {...presence.getPresenceProps()}
        data-scope="presence"
        data-part="root"
        ref={composedRefs}
      />
    </PresenceGate>
  )
})

Presence.displayName = 'Presence'
