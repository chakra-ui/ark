import { Moon, Sun } from 'lucide-react'
import { useIsClient } from 'usehooks-ts'
import { useColorMode } from '~/lib/use-color-mode'
import { Button, ButtonProps } from './ui/button'

export const ColorModeButton = (props: ButtonProps) => {
  const { toggle, colorMode } = useColorMode()
  const isClient = useIsClient()
  if (!isClient) {
    return null
  }

  return (
    <Button variant="tertiary" px="0" onClick={toggle} {...props}>
      {colorMode === 'light' ? <Moon /> : <Sun />}
    </Button>
  )
}
