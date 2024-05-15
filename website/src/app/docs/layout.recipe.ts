import { sva } from 'styled-system/css'

export const layout = sva({
  slots: ['header', 'aside', 'main', 'logo', 'content', 'divider'],
  base: {
    header: {
      position: 'fixed',
      width: '100vw',
      top: '0',
      zIndex: 'sticky',
    },
    logo: {
      position: 'absolute',
      display: { base: 'none', md: 'flex' },
      alignItems: 'center',
      top: '0',
      left: '0',
      height: 'var(--ark-nav-height)',
      ps: 'var(--ark-sidebar-ps)',
      width: {
        base: 'var(--ark-sidebar-width)',
        '2xl': 'var(--ark-sidebar-max-width)',
      },
      bg: {
        base: 'gray.2',
        _dark: '#0e0e0e',
      },
      borderRightWidth: '1px',
    },
    content: {
      pe: 'calc((100vw - 1440px) / 2)',
      flexGrow: '1',
      flexShrink: '0',
    },
    aside: {
      pt: '16',
      ps: 'var(--ark-sidebar-ps)',
      pe: '8',
      display: { base: 'none', md: 'block' },
      width: {
        base: 'var(--ark-sidebar-width)',
        '2xl': 'var(--ark-sidebar-max-width)',
      },
      position: 'fixed',
      overflow: 'auto',
      top: '0',
      bottom: '0',
      left: '0',
      maxW: '100%',
      bg: {
        base: 'gray.2',
        _dark: 'black.a3',
      },
      borderRightWidth: '1px',
    },
    main: {
      pt: {
        base: '28',
        md: '16',
      },
      pb: { base: '8', md: '16' },
      ps: {
        base: '0',
        md: 'var(--ark-sidebar-width)',
        '2xl': 'var(--ark-main-ps)',
      },
      pe: 'var(--ark-main-pe)',
      background: 'bg.canvas',
      flex: '1',
    },
    divider: {
      ps: {
        base: '0',
        md: 'var(--ark-sidebar-width)',
        '2xl': 'var(--ark-main-ps)',
      },
    },
  },
})
