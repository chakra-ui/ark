import { Flex, Grid, Stack } from 'styled-system/jsx'
import { Text } from '~/components/ui/text'
import { NextJsIcon, NuxtIcon, SolidStartIcon } from './marketing/icons'

export const quickstartFrameworks = [
  { name: 'Next.js', icon: NextJsIcon, href: 'https://stackblitz.com/edit/github-qcm2dskf' },
  { name: 'Solid Start', icon: SolidStartIcon, href: 'https://stackblitz.com/edit/github-1hgkbbln' },
  { name: 'Nuxt', icon: NuxtIcon, href: 'https://stackblitz.com/edit/github-s3sg6syq' },
]
export const Quickstart = () => {
  return (
    <Grid gap={{ base: '4', md: '6' }} columns={{ base: 2, sm: 3, xl: 5 }} className="not-prose">
      {quickstartFrameworks.map(({ name, icon: Icon, href }) => (
        <a key={name} href={href} target="_blank" rel="noreferrer">
          <Flex
            borderRadius="l3"
            borderWidth="1px"
            p="4"
            bg="bg.default"
            color="fg.default"
            align="center"
            justify="center"
          >
            <Stack gap="2.5">
              <Icon height="48" />
              <Text textStyle="sm" textAlign="center">
                {name}
              </Text>
            </Stack>
          </Flex>
        </a>
      ))}
    </Grid>
  )
}
