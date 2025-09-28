import { Select, createListCollection } from '@ark-ui/react/select'
import { ChevronDownIcon } from 'lucide-react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'

interface Inputs {
  framework: string
}

export const FormLibrary = () => {
  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: { framework: 'React' },
  })

  const collection = createListCollection({
    items: ['React', 'Solid', 'Vue', 'Svelte'],
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    window.alert(JSON.stringify(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="framework"
        control={control}
        render={({ field }) => (
          <Select.Root
            collection={collection}
            value={field.value ? [field.value] : []}
            onValueChange={(e) => field.onChange(e.value[0])}
            name={field.name}
            onInteractOutside={() => field.onBlur()}
          >
            <Select.Label>Framework</Select.Label>
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select a Framework" />
                <Select.Indicator>
                  <ChevronDownIcon />
                </Select.Indicator>
              </Select.Trigger>
              <Select.ClearTrigger>Clear</Select.ClearTrigger>
            </Select.Control>
            <Select.Positioner>
              <Select.Content>
                <Select.ItemGroup>
                  <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
                  {collection.items.map((item) => (
                    <Select.Item key={item} item={item}>
                      <Select.ItemText>{item}</Select.ItemText>
                      <Select.ItemIndicator>✓</Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.ItemGroup>
              </Select.Content>
            </Select.Positioner>
          </Select.Root>
        )}
      />

      <button type="submit">Submit</button>
    </form>
  )
}
