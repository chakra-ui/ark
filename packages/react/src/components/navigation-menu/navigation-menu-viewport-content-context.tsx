import { type ReactNode, createContext, useContext, useRef, useState } from 'react'

export interface ViewportContentContext {
  hasViewport: boolean
  setHasViewport: (value: boolean) => void
  items: Map<string, ReactNode>
}

const ViewportContentContext = createContext<ViewportContentContext | null>(null)

export const useViewportContentContext = () => {
  const context = useContext(ViewportContentContext)
  return context
}

export interface NavigationMenuContentProviderProps {
  children: ReactNode
}

export const NavigationMenuContentProvider = (props: NavigationMenuContentProviderProps) => {
  const { children } = props
  const [hasViewport, setHasViewport] = useState(false)
  const itemsRef = useRef<Map<string, ReactNode>>(new Map())

  return (
    <ViewportContentContext.Provider value={{ hasViewport, setHasViewport, items: itemsRef.current }}>
      {children}
    </ViewportContentContext.Provider>
  )
}
