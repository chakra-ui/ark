import { Heading } from '@/components/shared/Heading'
import { Text } from '@/components/shared/Text'
import { Box, Container, Stack } from '@/panda/jsx'
import { button } from '@/panda/recipes'
import Image from 'next/image'
import Link from 'next/link'

export const Hero = () => (
  <Container py={{ base: '16', md: '24' }} overflowX="hidden">
    <Stack direction={{ base: 'column', md: 'row' }} gap="20" align="center">
      <Stack gap={{ base: '8', md: '12' }} flex="1">
        <Stack gap="6">
          <Heading textStyle={{ base: '4xl', md: '6xl' }} fontWeight="semibold">
            A UI framework made for enterprises
          </Heading>
          <Text textStyle={{ base: 'lg', md: 'xl' }} color="fg.muted">
            Access fully customizable, accessible, and unstyled UI components that give you complete
            control over the styling of your webp app in React, Vue and Solid.js
          </Text>
        </Stack>
        <Stack w="full">
          <Text textStyle={{ base: 'md', md: 'lg' }} fontWeight="semibold">
            Get started with
          </Text>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            gap="3"
            width="full"
            alignItems="stretch"
          >
            {[
              { value: 'react', label: 'React' },
              { value: 'vue', label: 'Vue.js' },
              { value: 'solid', label: 'SolidJS' },
            ].map((framework) => (
              <Link
                key={framework.value}
                href={`/docs/${framework.value}/overview/introduction`}
                className={button({ variant: 'primary', size: { base: 'xl', md: '2xl' } })}
                data-scope="button"
                data-part="root"
              >
                {framework.label}
              </Link>
            ))}
          </Stack>
        </Stack>
      </Stack>

      <Box
        width="700px"
        height="700px"
        maxWidth="100%"
        position="relative"
        left="30px"
        flex="1"
        minHeight={{ lg: '700px' }}
        display={{ base: 'none', lg: 'block' }}
      >
        <Image
          quality={100}
          fill
          sizes="100vw"
          alt="Ark UI"
          src="/assets/hero-img.png"
          style={{ objectFit: 'contain' }}
        />
      </Box>
    </Stack>
  </Container>
)
