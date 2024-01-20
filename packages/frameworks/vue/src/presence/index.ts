// import { Presence as PresenceRoot, type PresenceProps } from './presence'
import PresenceRoot from './PresenceRoot.vue'
import { PresenceProvider, usePresenceContext, type PresenceContext } from './presence-context'
import {
  PresencePropsProvider,
  usePresencePropsContext,
  type PresencePropsContext,
} from './presence-props-context'
import type { PresenceProps } from './presence.props'
import { usePresence, type UsePresenceProps, type UsePresenceReturn } from './use-presence'

const Presence = Object.assign(PresenceRoot, {
  Root: PresenceRoot,
})

export {
  Presence,
  PresencePropsProvider,
  PresenceProvider,
  usePresence,
  usePresenceContext,
  usePresencePropsContext,
}

export type {
  PresenceContext,
  PresenceProps,
  PresencePropsContext,
  UsePresenceProps,
  UsePresenceReturn,
}
