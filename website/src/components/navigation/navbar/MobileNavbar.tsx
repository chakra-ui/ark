'use client'
import { IconButton } from '@/components/shared/IconButton'
import { Text } from '@/components/shared/Text'
import { Box, Container, Stack } from '@/panda/jsx'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import { FiChevronRight, FiMenu } from 'react-icons/fi'

export const MobileNavbar = () => {
  const pathName = usePathname()
  const crumbs = pathName
    ?.split('/')
    .filter(Boolean)
    .filter((path) => !['docs', 'react', 'vue', 'solid', 'props', 'overview'].includes(path))
    .map((path) => path.replace(/-/g, ' '))

  return (
    <Box borderBottomWidth="1px" display={{ base: 'block', lg: 'none' }}>
      <Container>
        <Stack direction="row" py="3" align="center">
          <IconButton icon={<FiMenu />} aria-label="Menu" variant="link" minW="unset" />
          {crumbs?.map((crumb, index, arr) => (
            <Fragment key={index}>
              <Text
                key={index}
                textStyle="sm"
                fontWeight="medium"
                color="fg.muted"
                textTransform="capitalize"
                _last={{ color: 'accent.default' }}
              >
                {crumb}
              </Text>
              {arr.length - 1 !== index && (
                <Box color="fg.subtle">
                  <FiChevronRight />
                </Box>
              )}
            </Fragment>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}
