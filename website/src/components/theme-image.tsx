import Image, { type ImageProps } from 'next/image'
import { Box } from 'styled-system/jsx'

interface Props extends Omit<ImageProps, 'src' | 'priority' | 'loading'> {
  srcLight: string
  srcDark: string
}

export const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props

  return (
    <>
      <Box display={{ _light: 'block', _dark: 'none' }}>
        <Image {...rest} src={srcLight} />
      </Box>
      <Box display={{ _light: 'none', _dark: 'block' }}>
        <Image {...rest} src={srcDark} />
      </Box>
    </>
  )
}
