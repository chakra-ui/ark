'use client'
import { ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import { Box, HStack } from 'styled-system/jsx'
import { Text } from '~/components/ui/text'

export const Breadcrumbs = () => {
  const pathname = usePathname()
  const crumbs = pathname
    .split('/')
    .filter(Boolean)
    .filter((path) => !['docs', 'react', 'vue', 'solid', 'usage', 'types'].includes(path))
    .map((path) => path.replace(/-/g, ' '))
    .map((item) => item.charAt(0).toUpperCase() + item.substring(1))

  return (
    <HStack gap="1">
      {crumbs?.map((crumb, index, arr) => (
        <Fragment key={index}>
          <Text
            as="span"
            textStyle="sm"
            color="fg.muted"
            fontWeight="medium"
            textTransform="capitalize"
          >
            {crumb}
          </Text>
          {arr.length - 1 !== index && (
            <Box color="fg.subtle">
              <ChevronRight size="16" />
            </Box>
          )}
        </Fragment>
      ))}
    </HStack>
  )
}
