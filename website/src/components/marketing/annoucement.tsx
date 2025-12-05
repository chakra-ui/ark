import { ArrowRightIcon, SparklesIcon } from 'lucide-react'
import NextLink from 'next/link'
import { Badge } from '~/components/ui/badge'
import { Icon } from '../ui/icon'

export const Announcement = () => {
  return null
}

export const Announcement_ = () => {
  return (
    <NextLink href="/docs/components/marquee">
      <Badge size="lg" variant="outline">
        <Icon color="colorPalette.default">
          <SparklesIcon />
        </Icon>
        [New] Marquee component
        <ArrowRightIcon />
      </Badge>
    </NextLink>
  )
}
