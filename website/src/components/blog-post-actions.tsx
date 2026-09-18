'use client'

import { useClipboard } from '@ark-ui/react/clipboard'
import { CheckIcon, RssIcon, Share2Icon } from 'lucide-react'
import { css } from 'styled-system/css'
import { HStack } from 'styled-system/jsx'
import { toaster } from '~/components/toaster'

interface Props {
  url: string
  title: string
}

const action = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '1.5',
  textStyle: 'sm',
  color: 'fg.muted',
  cursor: 'pointer',
  transitionProperty: 'color',
  transitionDuration: 'normal',
  _hover: { color: 'fg.default' },
})

export const BlogPostActions = ({ url, title }: Props) => {
  const clipboard = useClipboard({ value: url, timeout: 1500 })

  const share = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {
        // share sheet dismissed — nothing to do
      }
      return
    }
    clipboard.copy()
    toaster.create({ title: 'Link copied to clipboard' })
  }

  return (
    <HStack gap="4">
      <a href="/rss.xml" className={action} aria-label="RSS feed">
        <RssIcon size={16} />
        RSS
      </a>
      <button type="button" onClick={share} className={action} aria-label="Share this post">
        {clipboard.copied ? <CheckIcon size={16} /> : <Share2Icon size={16} />}
        Share
      </button>
    </HStack>
  )
}
