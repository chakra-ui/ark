import { LockIcon } from 'lucide-react'
import type { Metadata } from 'next'
import NextLink from 'next/link'
import { Box, Container, Stack } from 'styled-system/jsx'
import { stack } from 'styled-system/patterns'
import { hasUserPermission } from '~/app/actions'
import { CodeTabs } from '~/components/code-tabs'
import { ExamplesFooter } from '~/components/navigation/examples/examples-footer'
import { Button } from '~/components/ui/button'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'
import { notFound } from 'next/navigation'
import { fetchCodeExamples, fetchExample } from '~/lib/examples'
import { type Framework, examplesHref, isFramework } from '~/lib/frameworks'
import { getPublicUrl } from '~/lib/get-public-url'

interface Props {
  params: Promise<{ framework: string; id: string }>
}

export default async function Page(props: Props) {
  const { framework, id } = await props.params
  if (!isFramework(framework)) notFound()
  const example = await fetchExample(id)

  const isPaidExample = example.accessLevel === 'paid'
  const hasAccess = isPaidExample ? await hasUserPermission() : true
  const codeExamples = hasAccess ? await fetchCodeExamples({ id, framework }) : []

  return (
    <Container display="flex" py="12" gap="8" justifyContent="center">
      <Stack gap="16" px={{ base: '0', xl: '8' }} width="full">
        <Box maxW="61rem" mx="auto" width="full">
          <article
            className={stack({
              lineHeight: '1.75',
              color: 'var(--colors-prose-body)',
              mb: '10',
            })}
          >
            <Heading as="h1" fontWeight="bold" textStyle="4xl">
              {example.title}
            </Heading>
            <Text color="fg.muted">{example.description}</Text>
          </article>
          {hasAccess ? (
            <Stack gap="6">
              <Box borderRadius="lg" borderWidth="1px" overflow="hidden" bg="bg.default" className="not-prose">
                <iframe
                  src={example.previewUrl}
                  title={example.title}
                  style={{
                    width: '100%',
                    height: '500px',
                    border: 'none',
                  }}
                />
              </Box>
              {codeExamples.length > 0 && <CodeTabs examples={codeExamples} defaultValue={codeExamples[0]?.value} />}
            </Stack>
          ) : (
            <Stack gap="3.5">
              <Button variant="outline" asChild alignSelf="flex-end" borderColor="border.muted">
                <NextLink href="/plus">
                  <LockIcon />
                  Unlock Ark Plus
                </NextLink>
              </Button>
              <Box borderRadius="lg" borderWidth="1px" overflow="hidden" bg="bg.default" className="not-prose">
                <iframe
                  src={example.previewUrl}
                  title={example.title}
                  style={{
                    width: '100%',
                    height: '500px',
                    border: 'none',
                  }}
                />
              </Box>
            </Stack>
          )}
        </Box>
        <Box maxW="61rem" mx="auto" width="full">
          <ExamplesFooter example={example} framework={framework} />
        </Box>
      </Stack>
    </Container>
  )
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const { framework, id } = await props.params
  const example = await fetchExample(id)
  if (!example) return {}
  return {
    title: example.title,
    description: example.description,
    alternates: { canonical: getPublicUrl(examplesHref(framework as Framework, id)) },
  }
}
