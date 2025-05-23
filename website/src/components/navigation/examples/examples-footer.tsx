import NextLink from 'next/link'
import { cva } from 'styled-system/css'
import { Grid, Stack } from 'styled-system/jsx'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'
import type { Example } from '~/lib/examples'
import { pages } from '.velite'

interface Props {
  example: Example
}

export const ExamplesFooter = (props: Props) => {
  const { example } = props

  return (
    <Stack gap="12">
      <Stack gap="6">
        <Heading textStyle="2xl">Components in this Example</Heading>
        <Grid columns={{ base: 1, sm: 2, md: 3 }} gap="8">
          {example.relatedComponents.map((component) => {
            const page = pages.find((page) => page.id === component)
            return (
              <NextLink key={component} href={`/docs/components/${component}`} className={link}>
                <Text fontWeight="medium">{page?.title}</Text>
                <Text color="fg.muted" textStyle="sm">
                  {page?.description}
                </Text>
              </NextLink>
            )
          })}
        </Grid>
      </Stack>
      {example.relatedExamples.length > 0 && (
        <Stack gap="6">
          <Heading textStyle="2xl">Related Examples</Heading>
          <Grid columns={{ base: 1, sm: 2, md: 3 }} gap="8">
            {example.relatedExamples.map((relatedExample) => {
              return (
                <NextLink key={relatedExample.id} href={`/examples/${relatedExample.id}`} className={link}>
                  <Text fontWeight="medium">{relatedExample?.title}</Text>
                  <Text color="fg.muted" textStyle="sm">
                    {relatedExample?.description}
                  </Text>
                </NextLink>
              )
            })}
          </Grid>
        </Stack>
      )}
    </Stack>
  )
}

const link = cva({
  base: {
    borderRadius: 'lg',
    borderWidth: '1px',
    display: 'flex',

    flexDirection: 'column',
    gap: '1.5',
    p: '4',
    transitionDuration: 'normal',
    transitionProperty: 'border-color, box-shadow',
    transitionTimingFunction: 'default',
    _hover: {
      borderColor: 'colorPalette.default',
      boxShadow: '0 0 0 1px var(--colors-accent-default)',
    },
    _focusVisible: {
      outline: 'none',
      borderColor: 'colorPalette.default',
      boxShadow: '0 0 0 1px var(--colors-accent-default)',
    },
  },
})()
