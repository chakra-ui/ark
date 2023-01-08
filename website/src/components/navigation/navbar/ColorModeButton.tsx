'use client'
import { IconButton } from '@/components/shared/IconButton'
import { useColorMode } from '@/lib/useColorMode'
import { FiMoon } from 'react-icons/fi'

// TODO use IconButton
export const ColorModeButton = () => {
  const { toggle } = useColorMode()
  return (
    <IconButton
      variant="tertiary"
      size="md"
      icon={<FiMoon />}
      aria-label="Toggle color mode"
      onClick={toggle}
    />
  )
}
