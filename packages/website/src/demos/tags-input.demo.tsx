import { XIcon } from 'lucide-react'
import { Button, IconButton, TagsInput, type TagsInputProps } from '~/components/ui'

export const Demo = (props: TagsInputProps) => {
  return (
    <TagsInput.Root defaultValue={['React', 'Solid', 'Vue']} maxW="xs" {...props}>
      {(api) => (
        <>
          <TagsInput.Label>Frameworks</TagsInput.Label>
          <TagsInput.Control>
            {api.value.map((value, index) => (
              <TagsInput.Item key={index} index={index} value={value}>
                <TagsInput.ItemText>{value}</TagsInput.ItemText>
                <TagsInput.ItemDeleteTrigger asChild>
                  <IconButton variant="link" size="xs">
                    <XIcon />
                  </IconButton>
                </TagsInput.ItemDeleteTrigger>
                <TagsInput.ItemInput />
              </TagsInput.Item>
            ))}
            <TagsInput.Input placeholder="Add Framework" />
          </TagsInput.Control>
          <TagsInput.ClearTrigger asChild>
            <Button variant="outline">Clear</Button>
          </TagsInput.ClearTrigger>
        </>
      )}
    </TagsInput.Root>
  )
}
