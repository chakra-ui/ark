import NextLink from 'next/link'
import { css } from 'styled-system/css'
import { Box, Grid, Stack } from 'styled-system/jsx'
import { defaultFramework, docsHref } from '~/lib/frameworks'
import { getPageBySlug } from '~/lib/pages'
import { getServerContext } from '~/lib/server-context'
import { getSidebarTabs } from '~/lib/sidebar'

const card = css({
  borderWidth: '1px',
  borderColor: 'border.default',
  rounded: 'l2',
  p: '4',
  textDecoration: 'none',
  transitionProperty: 'border-color, background',
  transitionDuration: 'normal',
  transitionTimingFunction: 'default',
  _hover: { borderColor: 'colorPalette.default', bg: 'bg.subtle' },
})

interface Props {
  tab?: string
}

export const ComponentGrid = ({ tab = 'components' }: Props) => {
  const framework = getServerContext().framework ?? defaultFramework
  const active = getSidebarTabs().find((entry) => entry.key === tab)
  const items = (active?.groups ?? [])
    .flatMap((group) => group.items)
    .filter((item) => !item.slug.endsWith('/overview'))

  return (
    <Grid columns={{ base: 1, sm: 2, lg: 3 }} gap="4" mt="8">
      {items.map((item) => {
        const meta = getPageBySlug(item.slug.split('/'))
        return (
          <NextLink key={item.slug} href={docsHref(framework, item.slug)} className={card}>
            <Stack gap="1">
              <Box fontWeight="semibold" color="fg.default">
                {item.title}
              </Box>
              {meta?.description && (
                <Box color="fg.muted" textStyle="sm" lineClamp="2">
                  {meta.description}
                </Box>
              )}
            </Stack>
          </NextLink>
        )
      })}
    </Grid>
  )
}
