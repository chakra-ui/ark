'use client'
import { SignaturePad } from '@ark-ui/react/signature-pad'
import { RotateCcwIcon } from 'lucide-react'
import { sva } from 'styled-system/css'
import { IconButton } from '~/components/ui/icon-button'

const styles = sva({
  slots: ['root', 'label', 'control', 'segment', 'clearTrigger', 'guide'],
  className: 'signature-pad',
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
      width: 'full',
    },
    label: {
      color: 'fg.default',
      fontWeight: 'medium',
      textStyle: 'sm',
    },
    control: {
      bg: 'bg.subtle',
      borderWidth: '1px',
      borderRadius: 'l2',
      position: 'relative',
      minH: '52',
      minWidth: 0,
    },
    clearTrigger: {
      position: 'absolute',
      top: '3',
      right: '3',
    },
    segment: {
      fill: 'fg.default',
    },
    guide: {
      borderColor: 'gray.8',
      borderStyle: 'dashed',
      borderBottomWidth: '1px',
      position: 'absolute',
      bottom: '6',
      left: '6',
      right: '6',
    },
  },
})()

export const Demo = (props: SignaturePad.RootProps) => {
  return (
    <SignaturePad.Root {...props} className={styles.root}>
      <SignaturePad.Label className={styles.label}>Signature</SignaturePad.Label>
      <SignaturePad.Control className={styles.control}>
        <SignaturePad.Segment className={styles.segment} />
        <SignaturePad.ClearTrigger asChild className={styles.clearTrigger}>
          <IconButton variant="ghost">
            <RotateCcwIcon />
          </IconButton>
        </SignaturePad.ClearTrigger>
        <SignaturePad.Guide className={styles.guide} />
      </SignaturePad.Control>
    </SignaturePad.Root>
  )
}
