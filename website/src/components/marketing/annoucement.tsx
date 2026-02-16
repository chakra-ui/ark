'use client'
import { ArrowRightIcon, SparklesIcon } from 'lucide-react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge } from '~/components/ui/badge'
import { Icon } from '../ui/icon'

const excludePaths = ['/plus', '/showcase']

export const Announcement = () => {
  const pathname = usePathname()

  if (excludePaths.includes(pathname)) {
    return null
  }

  return (
    <NextLink href="/docs/components/image-cropper">
      <Badge size="lg" variant="outline">
        <Icon color="colorPalette.default">
          <SparklesIcon />
        </Icon>
        [New] Image Cropper component
        <ArrowRightIcon />
      </Badge>
    </NextLink>
  )
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
