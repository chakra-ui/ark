'use client'
import { Highlight } from '@ark-ui/react/highlight'
import { css } from 'styled-system/css'

const markStyle = css({
  bg: 'colorPalette.default',
  color: 'white',
  lineHeight: '1',
  mx: '1',
  px: '1',
  py: '1',
  rounded: 'sm',
})

export const Demo = () => {
  return (
    <div className={css({ textStyle: 'xl' })}>
      <Highlight
        query={['customizable', 'accessible']}
        text="Fully customizable and accessible UI components"
        className={markStyle}
      />
    </div>
  )
}
