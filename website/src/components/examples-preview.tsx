import { SparklesIcon } from 'lucide-react'
import NextLink from 'next/link'
import { cva } from 'styled-system/css'
import { Grid, HStack } from 'styled-system/jsx'
import { Text } from '~/components/ui/text'
import { fetchExamples } from '~/lib/examples'
import { getServerContext } from '~/lib/server-context'
import { Icon } from './ui/icon'

export const ExamplesPreview = async () => {
  const { framework, component } = getServerContext()
  const examples = (await fetchExamples()).filter((example) =>
    example.relatedComponents.includes(component ?? ''),
  )

  return examples.length > 0 ? (
    <>
      <Text>You can explore the {component} component in the following curated examples.</Text>
      <Grid columns={{ base: 1, sm: 2 }} gap="6" className="not-prose">
        {examples.map((relatedExample) => (
          <NextLink
            key={relatedExample.id}
            href={`/${framework}/examples/${relatedExample.id}`}
            className={link}
          >
            <HStack>
              <Text color="fg.default" fontWeight="medium">
                {relatedExample?.title}
              </Text>
              {relatedExample.accessLevel === 'paid' && (
                <Icon width="3.5" height="3.5" color="colorPalette.default">
                  <SparklesIcon />
                </Icon>
              )}
            </HStack>
            <Text color="fg.muted" textStyle="sm">
              {relatedExample?.description}
            </Text>
          </NextLink>
        ))}
      </Grid>
    </>
  ) : null
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
