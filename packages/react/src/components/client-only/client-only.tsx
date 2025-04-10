import { useSyncExternalStore } from 'react'

export interface ClientOnlyProps {
  children: React.ReactNode
  fallback?: React.ReactNode | undefined
}

const noop = () => void 0

export const ClientOnly = (props: ClientOnlyProps): React.ReactNode => {
  const { children, fallback } = props

  const isClient = useSyncExternalStore(
    () => noop,
    () => true,
    () => false,
  )

  if (!isClient) {
    return fallback
  }

  return <>{children}</>
}
