import { Container, panda, Stack } from '@/panda/jsx'
import { FiArrowRight } from 'react-icons/fi'
import { Button } from '../shared/Button'

// TODO replace with real data
const stats = [
  {
    label: 'Downloads per month',
    description: 'One of the fastest growing headless UI libraries in the world',
    value: '1.3M',
    cta: 'Learn more',
  },
  {
    label: 'Github stars',
    description: 'Appreciated by developers for its simplicity and flexibility',
    value: '30.3K',
    cta: 'Like us on GitHub',
  },
  {
    label: 'Core contributors',
    description: 'A team of talented and passionate developers ready to help',
    value: '8',
    cta: 'Meet the team',
  },
  {
    label: 'Discord members',
    description: 'Join our friendly and helpful developer community on Discord',
    value: '8.3K',
    cta: 'Join Discord',
  },
]

export const Stats = () => {
  return (
    <Container py={{ base: '16', md: '24' }}>
      <Stack gap={{ base: '12', md: '16' }} alignItems="stretch">
        <Stack direction="row" justifyContent="space-between">
          <Stack gap={{ base: '4', md: '5' }} direction="column">
            <panda.h2 textStyle={{ base: '3xl', md: '4xl' }} fontWeight="semibold">
              Build something great
            </panda.h2>
            <panda.p color="fg.muted" textStyle={{ base: 'lg', md: 'xl' }}>
              Everything you need to build modern UI and great products.
            </panda.p>
          </Stack>
          <Stack gap="3" direction="row" display={{ base: 'none', md: 'flex' }}>
            <Button variant="secondary" size="xl">
              Watch Demo
            </Button>
            <Button size="xl">Get Started</Button>
          </Stack>
        </Stack>
        <Stack gap="8" direction={{ base: 'column', md: 'row' }}>
          {stats.map((stat) => (
            <Stat key={stat.label} {...stat} />
          ))}
        </Stack>
      </Stack>
    </Container>
  )
}

interface StatProps {
  label: string
  description: string
  value: string
  cta: string
}

export const Stat = (props: StatProps) => {
  const { label, description, value, cta } = props
  return (
    <Stack gap="3" flex="1">
      <panda.span
        textStyle={{ base: '5xl', md: '6xl' }}
        color="accent.default"
        fontWeight="semibold"
      >
        {value}
      </panda.span>
      <Stack gap="5">
        <Stack>
          <panda.span textStyle="lg" fontWeight="semibold">
            {label}
          </panda.span>
          <panda.p color="fg.muted">{description}</panda.p>
        </Stack>
        <Button variant="link" color="accent.default" rightIcon={<FiArrowRight />}>
          {cta}
        </Button>
      </Stack>
    </Stack>
  )
}
