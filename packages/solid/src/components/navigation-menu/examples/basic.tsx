import { NavigationMenu } from '@ark-ui/solid/navigation-menu'

export const Basic = () => {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item value="features">
          <NavigationMenu.Trigger value="features">Features</NavigationMenu.Trigger>
          <NavigationMenu.Content value="features">
            <NavigationMenu.Indicator>
              <NavigationMenu.Arrow />
            </NavigationMenu.Indicator>
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
            <NavigationMenu.Indicator>
              <NavigationMenu.Arrow />
            </NavigationMenu.Indicator>
            <NavigationMenu.Link href="#introduction" value="docs">
              Introduction
            </NavigationMenu.Link>
            <NavigationMenu.Link href="#installation" value="docs">
              Installation
            </NavigationMenu.Link>
            <NavigationMenu.Link href="#components" value="docs">
              Components
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
  )
}
