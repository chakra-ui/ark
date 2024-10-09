import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}
const getSnapshot = () => false
const getServerSnapshot = () => true

export const useIsServer = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
