import { CreditCardIcon, LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react'
import { HStack } from 'styled-system/jsx'
import { Button, Menu, Text } from '~/components/ui'

export const Demo = (props: Menu.RootProps) => {
  return (
    <Menu.Root {...props}>
      <Menu.Trigger asChild>
        <Button variant="outline" size={props.size}>
          Open menu
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.ItemGroup id="group-1">
            <Menu.ItemGroupLabel htmlFor="group-1">My Account</Menu.ItemGroupLabel>
            <Menu.Separator />
            <Menu.Item id="profile">
              <HStack gap="6" justify="space-between" flex="1">
                <HStack gap="2">
                  <UserIcon />
                  Profile
                </HStack>
                <Text as="span" color="fg.subtle" textStyle="xs">
                  ⇧⌘P
                </Text>
              </HStack>
            </Menu.Item>
            <Menu.Item id="billing">
              <HStack gap="2">
                <CreditCardIcon />
                Billing
              </HStack>
            </Menu.Item>
            <Menu.Item id="settings">
              <HStack gap="6" justify="space-between" flex="1">
                <HStack gap="2">
                  <SettingsIcon />
                  Settings
                </HStack>
                <Text as="span" color="fg.subtle" textStyle="xs">
                  ⌘,
                </Text>
              </HStack>
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item id="logout">
              <HStack gap="2">
                <LogOutIcon />
                Logout
              </HStack>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}
