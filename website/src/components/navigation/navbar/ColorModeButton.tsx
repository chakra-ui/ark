'use client'
import { Button } from '@/components/shared/Button'
import { useColorMode } from '@/lib/useColorMode'

// TODO use IconButton
export const ColorModeButton = () => {
  const { toggle } = useColorMode()
  return (
    <Button variant="tertiary" size="md" onClick={toggle}>
      Toggle ColorMode
    </Button>
  )
}
