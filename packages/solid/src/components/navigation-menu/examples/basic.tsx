import { NavigationMenu } from '@ark-ui/solid/navigation-menu'

export const Basic = () => {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item value="features">
          <NavigationMenu.Trigger>Features</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Indicator>
              <NavigationMenu.Arrow />
            </NavigationMenu.Indicator>
            <NavigationMenu.Link href="#overview">Overview</NavigationMenu.Link>
            <NavigationMenu.Link href="#features">Features</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item value="docs">
          <NavigationMenu.Trigger>Documentation</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Indicator>
              <NavigationMenu.Arrow />
            </NavigationMenu.Indicator>
            <NavigationMenu.Link href="#introduction">Introduction</NavigationMenu.Link>
            <NavigationMenu.Link href="#installation">Installation</NavigationMenu.Link>
            <NavigationMenu.Link href="#components">Components</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item value="about">
          <NavigationMenu.Link href="#about">About</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}
