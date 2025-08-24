import { SparklesIcon } from 'lucide-react'
import NextLink from 'next/link'
import { cva } from 'styled-system/css'
import { Container, Grid, HStack, Stack } from 'styled-system/jsx'
import { Button } from '~/components/ui/button'
import { Heading } from '~/components/ui/heading'
import { Icon } from '~/components/ui/icon'
import { Text } from '~/components/ui/text'
import { fetchExamples } from '~/lib/examples'

export const ExamplesShowcase = async () => {
  const examples = await fetchExamples()
  const featuredExamples = examples.filter((example) => example.accessLevel === 'paid').slice(0, 6)

  return (
    <Container py="16" maxW="7xl">
      <Stack gap="12" alignItems="center">
        <Stack gap="4" textAlign="center" maxW="2xl">
          <Heading size={{ base: '3xl', md: '4xl' }} fontWeight="bold">
            Premium Examples
          </Heading>
          <Text color="fg.muted" textStyle="lg">
            Get access to carefully crafted examples to accelerate your development
          </Text>
        </Stack>

        <Grid columns={{ base: 1, sm: 2, lg: 3 }} gap="6" maxW="5xl" width="full">
          {featuredExamples.map((example) => (
            <NextLink key={example.id} href={`/examples/${example.id}`} className={link()}>
              <HStack gap="2" mb="2">
                <Text fontWeight="medium" flex="1">
                  {example.title}
                </Text>
                {example.accessLevel === 'paid' && (
                  <Icon size="sm" color="colorPalette.default">
                    <SparklesIcon />
                  </Icon>
                )}
              </HStack>
              <Text color="fg.muted" textStyle="sm">
                {example.description}
              </Text>
            </NextLink>
          ))}
        </Grid>

        <Button size="lg" asChild>
          <NextLink href="/examples">Browse Examples</NextLink>
        </Button>
      </Stack>
    </Container>
  )
}

const link = cva({
  base: {
    borderRadius: 'lg',
    borderWidth: '1px',
    borderColor: 'border.default',
    p: '4',
    display: 'block',
    transition: 'all',
    _hover: {
      borderColor: 'colorPalette.default',
      boxShadow: 'sm',
    },
  },
})
