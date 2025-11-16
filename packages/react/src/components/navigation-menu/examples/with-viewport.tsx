import { NavigationMenu } from '@ark-ui/react/navigation-menu'

export const WithViewport = () => (
  <NavigationMenu.Root className="viewport">
    <NavigationMenu.IndicatorTrack>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Features</NavigationMenu.Trigger>
          <NavigationMenu.TriggerProxy />
          <NavigationMenu.ViewportProxy />
          <NavigationMenu.Content>
            <NavigationMenu.Link href="#overview">Overview</NavigationMenu.Link>
            <NavigationMenu.Link href="#features">Features</NavigationMenu.Link>
            <NavigationMenu.Link href="#pricing">Pricing</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Documentation</NavigationMenu.Trigger>
          <NavigationMenu.TriggerProxy />
          <NavigationMenu.ViewportProxy />
          <NavigationMenu.Content>
            <NavigationMenu.Link href="#introduction">Introduction</NavigationMenu.Link>
            <NavigationMenu.Link href="#installation">Installation</NavigationMenu.Link>
            <NavigationMenu.Link href="#components">Components</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link href="#about">About</NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator>
          <NavigationMenu.Arrow />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>
    </NavigationMenu.IndicatorTrack>

    <NavigationMenu.ViewportPositioner>
      <NavigationMenu.Viewport />
    </NavigationMenu.ViewportPositioner>
  </NavigationMenu.Root>
)
