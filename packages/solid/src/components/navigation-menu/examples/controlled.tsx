import { NavigationMenu } from '@ark-ui/solid/navigation-menu'
import { createSignal } from 'solid-js'

export const Controlled = () => {
  const [value, setValue] = createSignal<string>('')

  return (
    <>
      <button onClick={() => setValue('features')}>Open Features</button>
      <NavigationMenu.Root value={value()} onValueChange={(e) => setValue(e.value)}>
        <NavigationMenu.List>
          <NavigationMenu.Item value="features">
            <NavigationMenu.Trigger>Features</NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <NavigationMenu.Link href="#overview">Overview</NavigationMenu.Link>
              <NavigationMenu.Link href="#features">Features</NavigationMenu.Link>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item value="docs">
            <NavigationMenu.Trigger>Documentation</NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <NavigationMenu.Link href="#introduction">Introduction</NavigationMenu.Link>
              <NavigationMenu.Link href="#installation">Installation</NavigationMenu.Link>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item value="about">
            <NavigationMenu.Link href="#about">About</NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </>
  )
}
