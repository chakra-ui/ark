import { Portal } from '@ark-ui/react'
import {
  FiChevronRight,
  FiCreditCard,
  FiLogOut,
  FiMail,
  FiMessageSquare,
  FiPlusCircle,
  FiSettings,
  FiUser,
  FiUserPlus,
} from 'react-icons/fi'
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
        <Button variant="secondary">Open menu</Button>
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
                    <FiUser />
                    Profile
                  </HStack>
                  <Typography as="span" color="fg.subtle" textStyle="xs">
                    ⇧⌘P
                  </Typography>
                </HStack>
              </MenuItem>
              <MenuItem id="billing">
                <HStack gap="2">
                  <FiCreditCard /> Billing
                </HStack>
              </MenuItem>
              <MenuItem id="settings">
                <HStack gap="6" justify="space-between" flex="1">
                  <HStack gap="2">
                    <FiSettings /> Settings
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
                      <FiUserPlus />
                      Inivte member
                    </HStack>
                    <FiChevronRight />
                  </HStack>
                </MenuTriggerItem>
                <Portal>
                  <MenuPositioner>
                    <MenuContent>
                      <MenuItem id="email">
                        <HStack gap="2">
                          <FiMail /> Email
                        </HStack>
                      </MenuItem>
                      <MenuItem id="message">
                        <HStack gap="2">
                          <FiMessageSquare /> Message
                        </HStack>
                      </MenuItem>
                      <MenuSeparator />
                      <MenuItem id="other">
                        <HStack gap="2">
                          <FiPlusCircle /> More Options...
                        </HStack>
                      </MenuItem>
                    </MenuContent>
                  </MenuPositioner>
                </Portal>
              </Menu>

              <MenuSeparator />
              <MenuItem id="logout">
                <HStack gap="2">
                  <FiLogOut />
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
