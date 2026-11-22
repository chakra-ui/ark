import { css } from 'styled-system/css'

export const NewMarker = () => (
  <svg
    viewBox="0 0 14 14"
    role="img"
    aria-label="New"
    className={css({ width: '3.5', height: '3.5', flexShrink: '0', color: 'colorPalette.default' })}
  >
    <title>New</title>
    <rect x="6" y="3.5" width="2" height="7" rx="1" fill="currentColor" />
    <rect x="3.5" y="6" width="7" height="2" rx="1" fill="currentColor" />
  </svg>
)
