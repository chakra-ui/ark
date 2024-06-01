import { BlocksIcon, HeartHandshakeIcon, ShoppingCartIcon, UsersIcon } from 'lucide-react'
import { Stack } from 'styled-system/jsx'
import { Button, Card, Icon, Text } from '~/components/ui'
import { SignInLink } from '../auth/sign-in-link'

type Props = {
  variant: 'personal' | 'team'
}

export const PricingCard = (props: Props) => {
  const license = licenses[props.variant]

  return (
    <Card.Root flex="1" boxShadow="md">
      <Card.Header>
        <Card.Title textStyle="xl">{license.name}</Card.Title>
        <Card.Description textStyle="md">{license.description}</Card.Description>
      </Card.Header>
      <Card.Body gap="8">
        <Stack direction="row" gap="6" align="start">
          <Text
            textStyle="2xl"
            fontWeight="semibold"
            textDecoration="line-through"
            textDecorationThickness="2px"
            pt="2"
          >
            {license.originalPrice}
          </Text>
          <Text textStyle="5xl" fontWeight="bold">
            {license.price}
          </Text>
        </Stack>
        <Stack gap="3">
          <Button width="full" asChild>
            <a href={license.checkoutUrl}>Buy Now</a>
          </Button>
          <Text color="fg.muted" textStyle="sm">
            Already purchased? <SignInLink />
          </Text>
        </Stack>

        <Stack gap="6">
          {license.features.map((feature, id) => (
            <Stack key={id} direction="row">
              <Icon color="accent.default" size="lg" flexShrink={0}>
                <feature.icon />
              </Icon>
              <Text textStyle="sm" fontWeight="medium">
                {feature.label}
                <Text as="span" color="fg.muted" fontWeight="normal">
                  {feature.description}
                </Text>
              </Text>
            </Stack>
          ))}
        </Stack>
      </Card.Body>
    </Card.Root>
  )
}

const licenses = {
  personal: {
    name: 'Personal',
    description: 'For individuals and freelancers',
    price: '$199',
    originalPrice: '$249',
    checkoutUrl:
      'https://chakra-pro.lemonsqueezy.com/buy/f7b5e908-749f-4930-b19e-0940b37abc3b?discount=0&aff=OALPM',
    features: [
      {
        label: 'Access to All Examples',
        description:
          ' — Get access to all examples in React, Solid, and Vue. Includes all future updates and new examples.',
        icon: BlocksIcon,
      },
      {
        label: 'One-time Purchase',
        description:
          ' — Pay once for lifetime access to all examples. No hidden fees, no recurring payments.',
        icon: ShoppingCartIcon,
      },
      {
        label: 'Support the Project',
        description: ' — Help us maintain and enhance Ark UI with quality examples and components.',
        icon: HeartHandshakeIcon,
      },
    ],
  },
  team: {
    name: 'Team',
    description: 'Same as personal, but for teams',
    price: '$599',
    originalPrice: '$649',
    checkoutUrl:
      'https://chakra-pro.lemonsqueezy.com/buy/32116f45-7b47-40b6-9fb7-a5f0d9a72d51?discount=0&enabled=399172&aff=OALPM',
    features: [
      {
        label: 'Access for Your Entire Team',
        description:
          ' — Everyone on your team, including employees and contractors, can access and use the examples.',
        icon: UsersIcon,
      },
    ],
  },
}
