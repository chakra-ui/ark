import { sva } from 'styled-system/css'

export const layout = sva({
  slots: ['header', 'nav', 'main'],
  base: {
    header: {
      background: 'bg.surface',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      width: '100vw',
      top: '0',
      zIndex: 'sticky',
    },
    nav: {
      background: 'bg.surface',
      borderEndWidth: '1px',
      bottom: '0',
      display: { base: 'none', md: 'flex' },
      flexDirection: 'column',
      left: '0',
      overflow: 'auto',
      position: 'fixed',
      px: { base: '4', md: '6' },
      py: '6',
      top: '20',
      width: '64',
    },
    main: {
      background: 'bg.surface',
      display: 'flex',
      flexDirection: 'column',
      pt: { base: '110px', md: '20' },
      ps: { base: '0', md: '64' },
    },
  },
})
