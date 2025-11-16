import { NavigationMenu } from '@ark-ui/react/navigation-menu'

export const WithIndicator = () => (
  <NavigationMenu.Root>
    <NavigationMenu.List>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger>Features</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <NavigationMenu.Link href="#overview">Overview</NavigationMenu.Link>
          <NavigationMenu.Link href="#features">Features</NavigationMenu.Link>
        </NavigationMenu.Content>
      </NavigationMenu.Item>

      <NavigationMenu.Item>
        <NavigationMenu.Trigger>Documentation</NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <NavigationMenu.Link href="#introduction">Introduction</NavigationMenu.Link>
          <NavigationMenu.Link href="#installation">Installation</NavigationMenu.Link>
        </NavigationMenu.Content>
      </NavigationMenu.Item>

      <NavigationMenu.Item>
        <NavigationMenu.Link href="#about">About</NavigationMenu.Link>
      </NavigationMenu.Item>

      <NavigationMenu.IndicatorTrack>
        <NavigationMenu.Indicator />
      </NavigationMenu.IndicatorTrack>
    </NavigationMenu.List>
  </NavigationMenu.Root>
)
