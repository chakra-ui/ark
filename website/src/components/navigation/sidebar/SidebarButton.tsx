'use client'
import { IconButton } from '@/components/shared/IconButton'
import { FiMenu } from 'react-icons/fi'
import { useSidebar } from './sidebarContext'

export const SidebarButton = () => {
  const { isOpen, onToggle, hasSidebar } = useSidebar()

  if (!hasSidebar) {
    return null
  }

  return (
    <IconButton
      variant="tertiary"
      size="md"
      display={{ base: 'flex', lg: 'none' }}
      icon={<FiMenu />}
      aria-label={`${isOpen ? 'Close' : 'Open'} menu`}
      aria-expanded={isOpen || undefined}
      onClick={onToggle}
      data-sidebar-button
    />
  )
}
