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
          <span className={css({ color: 'colorPalette.9' })}>Design System</span> Support{' '}
          <SparkleIcon className={css({ pos: 'absolute', top: '5', right: '5', color: 'colorPalette.9' })} />
        </Card.Title>
        <Text textStyle="sm" color="fg.muted">
          Expert design system support from the creators of Ark UI
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
            href="mailto:support@chakra-ui.com?subject=Design System Support"
          >
            Get Support
          </Link>
        </Button>
      </Card.Body>
    </Card.Root>
  )
}
