import { Navbar } from '@/components/navigation/navbar/Navbar'
import { IconButton } from '@/components/shared/IconButton'
import { css, cx } from '@/panda/css'
import { Inter, Roboto_Mono } from '@next/font/google'
import { Container } from 'panda/jsx/container'
import { Stack } from 'panda/jsx/stack'
import type { PropsWithChildren } from 'react'
import { FiCircle } from 'react-icons/fi'
import '../../panda/styles.css'
// TODO use panda for styling
import '../../public/code.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const roboto = Roboto_Mono({ subsets: ['latin'], variable: '--font-roboto-mono' })

const RootLayout = (props: PropsWithChildren) => {
  return (
    <html lang="en" className={cx(inter.variable, roboto.variable)}>
      <head />
      <body>
        <div className={css({ minHeight: 'full' })}>
          <Navbar />
          <Container py="4">
            <Stack gap="4">
              <Stack gap="4" direction="row">
                <IconButton aria-label="foo" size="md" variant="primary" icon={<FiCircle />} />
                <IconButton aria-label="foo" size="lg" variant="primary" icon={<FiCircle />} />
                <IconButton aria-label="foo" size="xl" variant="primary" icon={<FiCircle />} />
                <IconButton aria-label="foo" size="2xl" variant="primary" icon={<FiCircle />} />
              </Stack>
              <Stack gap="4" direction="row">
                <IconButton aria-label="foo" size="md" variant="secondary" icon={<FiCircle />} />
                <IconButton aria-label="foo" size="lg" variant="secondary" icon={<FiCircle />} />
                <IconButton aria-label="foo" size="xl" variant="secondary" icon={<FiCircle />} />
                <IconButton aria-label="foo" size="2xl" variant="secondary" icon={<FiCircle />} />
              </Stack>
              <Stack gap="4" direction="row">
                <IconButton aria-label="foo" size="md" variant="tertiary" icon={<FiCircle />} />
                <IconButton aria-label="foo" size="lg" variant="tertiary" icon={<FiCircle />} />
                <IconButton aria-label="foo" size="xl" variant="tertiary" icon={<FiCircle />} />
                <IconButton aria-label="foo" size="2xl" variant="tertiary" icon={<FiCircle />} />
              </Stack>
            </Stack>
          </Container>
          {props.children}
        </div>
      </body>
    </html>
  )
}

export default RootLayout
