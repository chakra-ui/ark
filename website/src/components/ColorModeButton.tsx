'use client'
import { useColorMode } from '@/lib/useColorMode'
import { Button } from './shared/Button'

// TODO use IconButton
export const ColorModeButton = () => {
  const { toggle } = useColorMode()
  return (
    <Button variant="tertiary" size="md" onClick={toggle}>
      Toggle ColorMode
    </Button>
  )
}
