import NextLink from 'next/link'
import { css } from 'styled-system/css'
import { Grid } from 'styled-system/jsx'
import { defaultFramework, docsHref } from '~/lib/frameworks'
import { getServerContext } from '~/lib/server-context'
import { getSidebarTabs } from '~/lib/sidebar'

const link = css({
  color: 'fg.default',
  fontWeight: 'medium',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '2',
  _hover: { textDecoration: 'underline', textUnderlineOffset: '4px' },
})

const dot = css({ boxSize: '2', rounded: 'full', bg: 'colorPalette.default' })

interface Props {
  tab?: string
}

export const ComponentGrid = ({ tab = 'components' }: Props) => {
  const framework = getServerContext().framework ?? defaultFramework
  const active = getSidebarTabs().find((entry) => entry.key === tab)
  const items = (active?.groups ?? [])
    .flatMap((group) => group.items)
    .filter((item) => !item.slug.endsWith('/overview'))
    .sort((a, b) => a.title.localeCompare(b.title))

  return (
    <Grid columns={{ base: 2, md: 3 }} columnGap="8" rowGap="5" mt="6" className="not-prose">
      {items.map((item) => (
        <NextLink key={item.slug} href={docsHref(framework, item.slug)} className={link}>
          {item.title}
          {item.status === 'new' && <span className={dot} role="img" aria-label="New" />}
        </NextLink>
      ))}
    </Grid>
  )
}
