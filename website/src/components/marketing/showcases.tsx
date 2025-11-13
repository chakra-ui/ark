import { Container, Grid, Stack } from 'styled-system/jsx'
import { SectionHeader } from '../section-header'
import { ShowcaseCard } from '../showcase-card'
import { showcases } from '~/data/showcases'

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
            <ShowcaseCard key={showcase.url} data={showcase} />
          ))}
        </Grid>
      </Stack>
    </Container>
  )
}
