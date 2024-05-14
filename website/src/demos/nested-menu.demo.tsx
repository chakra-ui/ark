import { Portal } from '@ark-ui/react'
import {
  ChevronRightIcon,
  CreditCardIcon,
  LogOutIcon,
  MailIcon,
  MessageSquareIcon,
  PlusCircleIcon,
  SettingsIcon,
  UserIcon,
  UserPlusIcon,
} from 'lucide-react'
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
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel>My Account</Menu.ItemGroupLabel>
            <Menu.Separator />
            <Menu.Item value="profile">
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
            <Menu.Item value="billing">
              <HStack gap="2">
                <CreditCardIcon />
                Billing
              </HStack>
            </Menu.Item>
            <Menu.Item value="settings">
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
            <Menu.Root positioning={{ placement: 'right-start', gutter: -2 }} {...props}>
              <Menu.TriggerItem justifyContent="space-between">
                <HStack gap="2">
                  <UserPlusIcon />
                  Invite member
                </HStack>
                <ChevronRightIcon />
              </Menu.TriggerItem>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="email">
                      <HStack gap="2">
                        <MailIcon />
                        Email
                      </HStack>
                    </Menu.Item>
                    <Menu.Item value="message">
                      <HStack gap="2">
                        <MessageSquareIcon />
                        Message
                      </HStack>
                    </Menu.Item>
                    <Menu.Separator />
                    <Menu.Item value="other">
                      <HStack gap="2">
                        <PlusCircleIcon />
                        More Options...
                      </HStack>
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
            <Menu.Separator />
            <Menu.Item value="logout">
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
