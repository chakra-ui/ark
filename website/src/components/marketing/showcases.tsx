import { cva } from 'styled-system/css'
import { Box, Container, Grid, GridItem, Stack, styled } from 'styled-system/jsx'
import { SectionHeader } from '../section-header'
import { Card } from '../ui/card'
import { showcases } from '.velite'

export const Showcases = () => {
  return (
    <Container py={{ base: '16', md: '24' }}>
      <Stack gap={{ base: '12', md: '16' }}>
        <SectionHeader
          tagline="Built with Ark UI"
          headline="See What's Possible"
          description="Explore real-world applications built by developers who trust Ark UI. From startups to enterprises, see how our headless components power modern web experiences."
          alignItems="center"
          textAlign="center"
        />
        <Grid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: '4', md: '8' }}>
          {showcases.map((showcase) => (
            <GridItem key={showcase.url} display="flex">
              <a href={showcase.url} className={link} target="_blank" rel="noreferrer">
                <Card.Root boxShadow="none">
                  <Card.Header px="4" pt="4" pb="3" maxH="13rem" overflow="hidden">
                    <styled.img src={showcase.image} alt={showcase.title} borderRadius="l2" />
                  </Card.Header>
                  <Card.Body p="4">
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
