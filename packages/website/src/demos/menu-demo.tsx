import { Portal } from '@ark-ui/react'
import {
  ChevronRight,
  CreditCard,
  LogOut,
  Mail,
  MessageSquare,
  PlusCircle,
  Settings,
  User,
  UserPlus,
} from 'lucide-react'
import { HStack } from 'styled-system/jsx'
import { Button } from '~/components/ui/button'
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
  MenuTriggerItem,
} from '~/components/ui/menu'
import { Typography } from '~/components/ui/typography'

export const MenuDemo = () => {
  return (
    <Menu>
      <MenuTrigger asChild>
        <Button variant="outline">Open menu</Button>
      </MenuTrigger>
      <Portal>
        <MenuPositioner>
          <MenuContent>
            <MenuItemGroup id="group-1">
              <MenuItemGroupLabel htmlFor="group-1">My Account</MenuItemGroupLabel>
              <MenuSeparator />
              <MenuItem id="profile">
                <HStack gap="6" justify="space-between" flex="1">
                  <HStack gap="2">
                    <User />
                    Profile
                  </HStack>
                  <Typography as="span" color="fg.subtle" textStyle="xs">
                    ⇧⌘P
                  </Typography>
                </HStack>
              </MenuItem>
              <MenuItem id="billing">
                <HStack gap="2">
                  <CreditCard /> Billing
                </HStack>
              </MenuItem>
              <MenuItem id="settings">
                <HStack gap="6" justify="space-between" flex="1">
                  <HStack gap="2">
                    <Settings /> Settings
                  </HStack>
                  <Typography as="span" color="fg.subtle" textStyle="xs">
                    ⌘,
                  </Typography>
                </HStack>
              </MenuItem>
              <Menu positioning={{ placement: 'right-start', gutter: -2 }}>
                <MenuTriggerItem>
                  <HStack gap="12" justify="space-between" flex="1">
                    <HStack gap="2">
                      <UserPlus />
                      Inivte member
                    </HStack>
                    <ChevronRight />
                  </HStack>
                </MenuTriggerItem>
                <Portal>
                  <MenuPositioner>
                    <MenuContent>
                      <MenuItem id="email">
                        <HStack gap="2">
                          <Mail /> Email
                        </HStack>
                      </MenuItem>
                      <MenuItem id="message">
                        <HStack gap="2">
                          <MessageSquare /> Message
                        </HStack>
                      </MenuItem>
                      <MenuSeparator />
                      <MenuItem id="other">
                        <HStack gap="2">
                          <PlusCircle /> More Options...
                        </HStack>
                      </MenuItem>
                    </MenuContent>
                  </MenuPositioner>
                </Portal>
              </Menu>

              <MenuSeparator />
              <MenuItem id="logout">
                <HStack gap="2">
                  <LogOut />
                  Logout
                </HStack>
              </MenuItem>
            </MenuItemGroup>
          </MenuContent>
        </MenuPositioner>
      </Portal>
    </Menu>
  )
}
