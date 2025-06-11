import { SparkleIcon } from 'lucide-react'
import Link from 'next/link'
import { css } from 'styled-system/css'
import { linkOverlay } from 'styled-system/patterns'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'

export const SupportAd = () => {
  return (
    <Card.Root maxW="200px" mt="8">
      <Card.Body gap="2" pt="5" pos="relative">
        <Card.Title textStyle="xl" fontWeight="medium" lineHeight="1.3">
          <span className={css({ color: 'colorPalette.9' })}>Pro Support</span> and Training{' '}
          <SparkleIcon className={css({ pos: 'absolute', top: '5', right: '5', color: 'colorPalette.9' })} />
        </Card.Title>
        <Text textStyle="sm" color="fg.muted">
          Supercharge your team with support from the creators of Ark UI
        </Text>

        <Button
          asChild
          variant="outline"
          css={linkOverlay.raw({
            mt: '3',
            colorPalette: 'coral',
            pos: 'unset',
          })}
        >
          <Link
            target="_blank"
            referrerPolicy="no-referrer"
            href="https://chakra-pro.lemonsqueezy.com/buy/604cf94a-e4c4-4199-aeb6-a27afc30c815"
          >
            Get Pro Support
          </Link>
        </Button>
      </Card.Body>
    </Card.Root>
  )
}
