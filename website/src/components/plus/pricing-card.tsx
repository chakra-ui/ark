import { BlocksIcon, FigmaIcon, HeartHandshakeIcon, UsersIcon } from 'lucide-react'
import { Stack } from 'styled-system/jsx'
import { Button, Card, Icon, Text } from '~/components/ui'

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
        <Button width="full" asChild>
          <a href={license.checkoutUrl}>Buy Now</a>
        </Button>
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
        label: 'Access to all examples',
        description:
          ' — Get access to all examples and free updates. Use them to kickstart your projects and save time.',
        icon: BlocksIcon,
      },
      {
        label: 'Pro Figma Kit',
        description:
          ' — Use our Figma Kit to customize the components to your needs. It includes all components and is updated regularly.',
        icon: FigmaIcon,
      },
      {
        label: 'Lifetime access',
        description:
          " — Buy once, use forever. It's that simple. Enjoy unlimited lifetime access to all components, along with continual free updates.",
        icon: HeartHandshakeIcon,
      },
    ],
  },
  team: {
    name: 'Team',
    description: 'For companies and agencies',
    price: '$599',
    originalPrice: '$649',
    checkoutUrl:
      'https://chakra-pro.lemonsqueezy.com/buy/32116f45-7b47-40b6-9fb7-a5f0d9a72d51?discount=0&enabled=399172&aff=OALPM',
    features: [
      {
        label: 'Access for your entire team',
        description:
          ' — Team licenses grants permission to all employees and contractors of the licensee to access and use the examples.',
        icon: UsersIcon,
      },
    ],
  },
}
