import { NavigationMenu } from '@ark-ui/react/navigation-menu'

export const Basic = () => (
  <NavigationMenu.Root>
    <NavigationMenu.List>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger>Features</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <NavigationMenu.Indicator>
            <NavigationMenu.Arrow />
          </NavigationMenu.Indicator>
          <NavigationMenu.Link href="#overview">Overview</NavigationMenu.Link>
          <NavigationMenu.Link href="#features">Features</NavigationMenu.Link>
        </NavigationMenu.Content>
      </NavigationMenu.Item>

      <NavigationMenu.Item>
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

      <NavigationMenu.Item>
        <NavigationMenu.Link href="#about">About</NavigationMenu.Link>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  </NavigationMenu.Root>
)
