import { NavigationMenu } from '@ark-ui/react/navigation-menu'
import { useState } from 'react'

export const Controlled = () => {
  const [value, setValue] = useState<string>('')

  return (
    <>
      <button onClick={() => setValue('features')}>Open Features</button>
      <NavigationMenu.Root value={value} onValueChange={(e) => setValue(e.value)}>
        <NavigationMenu.List>
          <NavigationMenu.Item value="features">
            <NavigationMenu.Trigger value="features">Features</NavigationMenu.Trigger>
            <NavigationMenu.Content value="features">
              <NavigationMenu.Link href="#overview" value="features">
                Overview
              </NavigationMenu.Link>
              <NavigationMenu.Link href="#features" value="features">
                Features
              </NavigationMenu.Link>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item value="docs">
            <NavigationMenu.Trigger value="docs">Documentation</NavigationMenu.Trigger>
            <NavigationMenu.Content value="docs">
              <NavigationMenu.Link href="#introduction" value="docs">
                Introduction
              </NavigationMenu.Link>
              <NavigationMenu.Link href="#installation" value="docs">
                Installation
              </NavigationMenu.Link>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item value="about">
            <NavigationMenu.Link href="#about" value="about">
              About
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </>
  )
}
