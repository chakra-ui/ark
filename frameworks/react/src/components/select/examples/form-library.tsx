import { ChevronsDownUpIcon } from 'lucide-react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { Select } from '../..'

export const FormLibrary = () => {
  type Inputs = {
    framework: string
  }
  const items = ['React', 'Solid', 'Vue']
  const { control, handleSubmit } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="framework"
        control={control}
        render={({ field }) => (
          <Select.Root onValueChange={(e) => field.onChange(e?.value)} items={items}>
            <Select.Label>Framework</Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select a Framework" />
                <Select.Indicator>
                  <ChevronsDownUpIcon />
                </Select.Indicator>
              </Select.Trigger>
              <Select.ClearTrigger>Clear</Select.ClearTrigger>
            </Select.Control>
            <Select.Positioner>
              <Select.Content>
                <Select.ItemGroup>
                  <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
                  {items.map((item) => (
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
