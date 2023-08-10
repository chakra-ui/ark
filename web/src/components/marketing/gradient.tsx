import { Box } from 'styled-system/jsx'

// TODO looks like shit in Firefox maybe use pattern.svg
export const Gradient = () => (
  <Box
    position="absolute"
    display={{ base: 'none', sm: 'block' }}
    inset="0"
    height="830px"
    background="radial-gradient(42.48% 42.48% at calc(50% + 100vw / 2) center, #EB5E41 0%, rgba(235, 94, 65, 0) 100%)"
    filter="blur(282px)"
  />
)
