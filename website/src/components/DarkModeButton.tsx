'use client'
import { useColorMode, UseColorModeProps } from '@/lib/useColorMode'
import { Button } from './shared/Button'

type DarkModeButton = UseColorModeProps

// TODO use IconButton
export const DarkModeButton = (props: DarkModeButton) => {
  const { colorMode, toggle } = useColorMode(props)
  return (
    <Button variant="tertiary" size="md" onClick={toggle}>
      {colorMode}
    </Button>
  )
}
