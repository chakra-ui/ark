'use client'
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

type SidebarContextValue = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onToggle: () => void
  hasSidebar: boolean
  setHasSidebar: (hasSidebar: boolean) => void
}

const sidebarContext = createContext<SidebarContextValue | null>(null)

export type SidebarProviderProps = {
  children: ReactNode
}
export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasSidebar, setHasSidebar] = useState(false)

  const contextValue = useMemo(
    () => ({
      isOpen,
      onOpen: () => setIsOpen(true),
      onClose: () => setIsOpen(false),
      onToggle: () => setIsOpen((isOpen) => !isOpen),
      hasSidebar,
      setHasSidebar,
    }),
    [hasSidebar, isOpen],
  )
  return <sidebarContext.Provider value={contextValue}>{children}</sidebarContext.Provider>
}

export const useSidebar = () => {
  const context = useContext(sidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

export const useRegisterSidebar = () => {
  const { setHasSidebar } = useSidebar()
  useEffect(() => {
    setHasSidebar(true)
    return () => setHasSidebar(false)
  }, [])
}
