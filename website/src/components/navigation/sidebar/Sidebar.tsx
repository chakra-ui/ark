'use client'
import { Link } from '@/components/shared/Link'
import { Text } from '@/components/shared/Text'
import { css, cx } from '@/panda/css'
import { Box, HStack, Stack } from '@/panda/jsx'
import { useCallback, useRef, type MouseEvent } from 'react'
import { FaBookOpen, FaDiscord, FaGithub } from 'react-icons/fa'
import { PageLink } from '../PageLink'
import { useRegisterSidebar, useSidebar } from './sidebarContext'
import { useOutsideClick } from './useOutsideClick'

type SidebarItem = {
  name: string
  route: string
  isActive: boolean
}

type SidebarProps = {
  items: SidebarItem[]
  className?: string
}

const links = [
  {
    label: 'Documentation',
    href: 'https://ark-ui.com',
    icon: <FaBookOpen />,
    isActive: true,
  },
  {
    label: 'Discord',
    href: 'https://discord.com/invite/dQHfcWF',
    icon: <FaDiscord />,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/chakra-ui/chakra-ui',
    icon: <FaGithub />,
  },
]

export const Sidebar = (props: SidebarProps) => {
  const { className } = props

  const { isOpen, onClose } = useSidebar()
  useRegisterSidebar()

  const sidebarRef = useRef<HTMLElement>(null)

  useOutsideClick(
    sidebarRef,
    onClose,
    useCallback(
      (element: HTMLElement) => !element.matches('[data-sidebar-button], [data-sidebar-button] *'),
      [],
    ),
  )

  return (
    <Box
      as="aside"
      ref={sidebarRef}
      onClick={(e: MouseEvent) => {
        if ('tagName' in e.target && e.target.tagName === 'A') {
          onClose()
        }
      }}
      className={cx(
        css({
          '--header-height': 'sizes.18',
          transitionProperty: 'base',
          transitionDuration: '100',
          transitionTimingFunction: 'ease-out',
        }),
        isOpen
          ? // @ts-expect-error typings are wrong
            css({
              transform: { base: 'translateX(0)', lg: 'none' },
            })
          : // @ts-expect-error typings are wrong
            css({
              transform: { base: 'translateX(-100%)', lg: 'none' },
            }),
        className,
      )}
      position={{ base: 'fixed', lg: 'sticky' }}
      bg={{ base: 'bg.canvas', lg: 'transparent' }}
      shadow={{ base: '2xl', lg: 'none' }}
      pl={{ base: '6', md: '10', lg: '0' }}
      left="0"
      zIndex="1"
      top="var(--header-height)"
      w="64"
      maxW="100vw"
      py="8"
      maxH="calc(100vh - var(--header-height))"
      overflowY="auto"
    >
      <Stack gap="12">
        <Stack
          as="ul"
          gap="4"
          textStyle="sm"
          fontWeight="medium"
          color="fg.muted"
          listStyle="none"
          ps="0"
        >
          {links.map((link) => (
            <li key={link.label}>
              <HStack
                as="a"
                gap="4"
                _currentPage={{ color: 'accent.default', fontWeight: 'semibold' }}
                aria-current={link.isActive ? 'page' : false}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  w="6"
                  h="6"
                  backgroundColor="bg.subtle"
                  borderRadius="md"
                  fontSize="md"
                  borderWidth="1px"
                >
                  {link.icon}
                </Box>
                <Text as="span">{link.label}</Text>
              </HStack>
            </li>
          ))}
        </Stack>
        <Stack gap="3">
          <Text fontSize="sm" lineHeight="1.5rem" fontWeight="semibold">
            Overview
          </Text>
          <Stack borderLeftWidth="1px" gap="2">
            {['Introduction', 'Getting started', 'Styling', 'Roadmap', 'Changelog'].map((item) => (
              <Link key={item} variant="sidebar">
                {item}
              </Link>
            ))}
          </Stack>
        </Stack>
        <Stack gap="3" alignSelf="stretch">
          <Text textStyle="sm" lineHeight="1.5rem" fontWeight="semibold">
            Components
          </Text>
          <Stack borderLeftWidth="1px" alignSelf="stretch">
            {props.items.map((item, id) => (
              <PageLink
                key={id}
                href={item.route}
                variant="sidebar"
                aria-current={item.isActive ? 'page' : false}
              >
                {item.name}
              </PageLink>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}
