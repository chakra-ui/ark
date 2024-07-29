'use client'
import { useCopyToClipboard } from '@uidotdev/usehooks'
import { CheckIcon, CopyIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { IconButton } from '~/components/ui/icon-button'

interface Props {
  content: string
}

export const CopyToClipboardButton = (props: Props) => {
  const { content } = props
  const [_, copyToClipboard] = useCopyToClipboard()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (visible) return
    const timer = setTimeout(() => setVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [visible])

  const handleClick = () => {
    copyToClipboard(content)
    setVisible(false)
  }

  return (
    <IconButton
      variant="ghost"
      size="sm"
      aria-label="Copy code to clipboard"
      display={{ base: 'none', lg: 'inline-flex' }}
      color="gray.dark.12"
      _hover={{ bg: 'gray.dark.a3' }}
      onClick={handleClick}
    >
      {visible ? <CopyIcon /> : <CheckIcon />}
    </IconButton>
  )
}
