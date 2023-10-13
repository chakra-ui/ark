import { Portal } from '@ark-ui/react'
import { HStack, Stack } from '@ark-ui/styled-system/jsx'
import type { CollectionEntry } from 'astro:content'
import { AsteriskIcon, HelpCircle, MinusIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Code } from './ui/code'
import { Icon } from './ui/icon'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverPositioner,
  PopoverTrigger,
} from './ui/popover'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Heading } from './ui/typography'

type Props = {
  types: CollectionEntry<'types'>
}

export const ComponentPropsTable = (props: Props) => {
  const { types } = props
  return (
    <Stack gap="6">
      <Heading as="h1" textStyle="2xl">
        API Reference
      </Heading>
      {Object.entries(types.data).map(([key, properties]) => (
        <Stack key={key} gap="4">
          <Heading textStyle="xl" fontWeight="semibold">
            {key}
          </Heading>
          <Table variant="outline" size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Prop</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Default</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(properties).map(([name, property]) => (
                <TableRow key={key}>
                  <TableCell width="40">
                    <HStack>
                      <Code size="sm" color="accent.default">
                        {name}
                        {property.isRequired && <AsteriskIcon size="10" />}
                      </Code>
                      {property.description && (
                        <Popover portalled>
                          <PopoverTrigger asChild>
                            <Button size="xs" px="0" variant="link" color="fg.subtle">
                              <HelpCircle />
                            </Button>
                          </PopoverTrigger>
                          <Portal>
                            <PopoverPositioner>
                              <PopoverContent>
                                <PopoverDescription>{property.description}</PopoverDescription>
                              </PopoverContent>
                            </PopoverPositioner>
                          </Portal>
                        </Popover>
                      )}
                    </HStack>
                  </TableCell>
                  <TableCell height="auto">
                    <Code size="sm">{property.type}</Code>
                  </TableCell>
                  <TableCell width="12" textAlign="center">
                    {property.defaultValue ? (
                      <Code size="sm">{property.defaultValue}</Code>
                    ) : (
                      <Icon size="xs" color="fg.muted">
                        <MinusIcon />
                      </Icon>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Stack>
      ))}
    </Stack>
  )
}
