import NextLink from 'next/link'
import { cva } from 'styled-system/css'
import { Grid } from 'styled-system/jsx'
import { Text } from '~/components/ui/text'
import { fetchExample } from '~/lib/examples'
import { getServerContext } from '~/lib/server-context'

interface Props {
  id: string
}

export const ExamplesPreview = async (props: Props) => {
  const { id } = props
  const { framework } = getServerContext()
  const example = await fetchExample(id)

  return (
    <Grid columns={{ base: 1, sm: 2, md: 3 }} gap="8" className="not-prose">
      {example.relatedExamples.map((relatedExample) => {
        return (
          <NextLink
            key={relatedExample.id}
            href={`/${framework}/examples/${relatedExample.id}`}
            className={link}
          >
            <Text fontWeight="medium" color="fg.default">
              {relatedExample?.title}
            </Text>
            <Text color="fg.muted" textStyle="sm">
              {relatedExample?.description}
            </Text>
          </NextLink>
        )
      })}
    </Grid>
  )
}

const link = cva({
  base: {
    borderRadius: 'lg',
    borderWidth: '1px',
    display: 'flex',

    flexDirection: 'column',
    gap: '1',
    p: '4',
    transitionDuration: 'normal',
    transitionProperty: 'border-color, box-shadow',
    transitionTimingFunction: 'default',
    _hover: {
      borderColor: 'accent.default',
      boxShadow: '0 0 0 1px var(--colors-accent-default)',
    },
    _focusVisible: {
      outline: 'none',
      borderColor: 'accent.default',
      boxShadow: '0 0 0 1px var(--colors-accent-default)',
    },
  },
})()
