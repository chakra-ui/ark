import { cva } from 'styled-system/css'
import { GridItem, styled } from 'styled-system/jsx'
import { Card } from './ui/card'
import type { Showcase } from '~/data/showcases'

interface ShowcaseCardProps {
  data: Showcase
}

export const ShowcaseCard = ({ data }: ShowcaseCardProps) => {
  return (
    <GridItem display="flex">
      <a href={data.url} className={link} target="_blank" rel="noreferrer">
        <Card.Root boxShadow="none">
          <Card.Header px="4" pt="4" pb="3" maxH="13rem" overflow="hidden">
            <styled.img
              src={data.image}
              alt={data.title}
              borderRadius="l2"
              minH="8rem"
              aspectRatio="16 / 9"
              objectFit="cover"
              objectPosition="top center"
            />
          </Card.Header>
          <Card.Body p="4">
            <Card.Title textStyle="md">{data.title}</Card.Title>
            <Card.Description>{data.description}</Card.Description>
          </Card.Body>
        </Card.Root>
      </a>
    </GridItem>
  )
}

const link = cva({
  base: {
    borderWidth: '1px',
    borderRadius: 'l3',
    display: 'flex',
    transitionDuration: 'normal',
    transitionProperty: 'border-color, box-shadow',
    transitionTimingFunction: 'default',
    overflow: 'hidden',
    _hover: {
      borderColor: 'colorPalette.default',
      boxShadow: '0 0 0 1px var(--colors-accent-default)',
    },
    _focusVisible: {
      outline: 'none',
      borderColor: 'colorPalette.default',
      boxShadow: '0 0 0 1px var(--colors-accent-default)',
    },
  },
})()
