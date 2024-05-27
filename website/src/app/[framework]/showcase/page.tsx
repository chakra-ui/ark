import { cva } from 'styled-system/css'
import { Container, Grid, GridItem, Stack, styled } from 'styled-system/jsx'
import { PageHeader } from '~/components/page-header'
import { Card } from '~/components/ui'
import { showcases } from '.velite'

export default function Page() {
  return (
    <Container py={{ base: '16', md: '16' }} maxW="7xl">
      <Stack gap={{ base: '8', md: '12' }}>
        <PageHeader
          heading="Showcase"
          subHeading="Community"
          description="Discover amazing projects built with Ark UI. Share your own by opening an issue on our GitHub repository."
        />
        <Grid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: '4', md: '8' }}>
          {showcases.map((showcase) => (
            <GridItem key={showcase.url} display="flex">
              <a href={showcase.url} className={link} target="_blank" rel="noreferrer">
                <Card.Root boxShadow="none">
                  <Card.Header px="4" pt="4" pb="3">
                    <styled.img src={showcase.image} alt={showcase.title} borderRadius="l2" />
                  </Card.Header>
                  <Card.Body px="4" pt="0" pb="4">
                    <Card.Title textStyle="md">{showcase.title}</Card.Title>
                    <Card.Description>{showcase.description}</Card.Description>
                  </Card.Body>
                </Card.Root>
              </a>
            </GridItem>
          ))}
        </Grid>
      </Stack>
    </Container>
  )
}

const link = cva({
  base: {
    borderWidth: '1px',
    borderRadius: 'l3',
    display: 'flex',
    transitionDuration: 'normal',
    transitionProperty: 'border-color, box-shadow',
    transitionTimingFunction: 'default',
    overflow: 'hidden',
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
