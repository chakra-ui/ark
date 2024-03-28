import { useCopyToClipboard } from '@uidotdev/usehooks'
import { CheckIcon, CopyIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { IconButton } from '~/components/ui'

interface Props {
  content: string
  dark?: boolean
}

export const CopyToClipboardButton = (props: Props) => {
  const { content, dark } = props
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

  const styles = dark ? { color: 'gray.dark.12', _hover: { bg: 'gray.dark.a3' } } : {}

  return (
    <IconButton
      variant="ghost"
      size="sm"
      aria-label="Copy code to clipboard"
      display={{ base: 'none', lg: 'inline-flex' }}
      onClick={handleClick}
      {...styles}
    >
      {visible ? <CopyIcon /> : <CheckIcon />}
    </IconButton>
  )
}
