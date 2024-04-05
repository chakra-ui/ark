import { ReactIcon, SolidIcon, VueIcon } from '~/components/docs/icons'

import { css } from 'styled-system/css'
import { grid, square, stack } from 'styled-system/patterns'

const logoMap = {
  react: {
    name: 'React',
    logo: ReactIcon,
    href: '/docs/installation/react',
  },
  solid: {
    name: 'Solid',
    logo: SolidIcon,
    href: '/docs/installation/solidjs',
  },
  vue: {
    name: 'Vue',
    logo: VueIcon,
    href: '/docs/installation/vue',
  },
}

type Props = {
  framework: keyof typeof logoMap
}

export const FrameworkCard = (props: Props) => {
  const { framework } = props
  const { logo: Logo, name, href } = logoMap[framework] ?? {}
  return (
    <div
      className={stack({
        gap: '6',
        position: 'relative',
        direction: { base: 'column', sm: 'row' },
        align: { base: 'flex-start', sm: 'center' },
      })}
    >
      <div
        className={square({
          size: '14',
          border: '3px solid var(--shadow-color, #000)',
          boxShadow: '4px 4px 0 0 var(--shadow-color, #000)',
          shadowColor: { _dark: 'gray.a4' },
          rounded: 'md',
          padding: '2',
        })}
      >
        <Logo />
      </div>
      <div>
        <span className={css({ fontWeight: 'medium' })}>
          <a
            href={href}
            className={css({
              textDecoration: 'none',
              _before: {
                content: '""',
                position: 'absolute',
                inset: '0',
              },
            })}
          >
            {name}
          </a>
        </span>
      </div>
    </div>
  )
}

export const FrameworkCards = () => {
  return (
    <div className={grid({ columns: 3, gap: '8', mt: '8', mb: '16' })}>
      {Object.keys(logoMap).map((framework) => (
        <FrameworkCard key={framework} framework={framework as keyof typeof logoMap} />
      ))}
    </div>
  )
}
