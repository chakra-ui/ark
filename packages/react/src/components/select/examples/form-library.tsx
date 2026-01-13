import { Select, createListCollection } from '@ark-ui/react/select'
import { ChevronsUpDownIcon, XIcon } from 'lucide-react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import button from 'styles/button.module.css'
import styles from 'styles/select.module.css'

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
            className={styles.Root}
            collection={collection}
            value={field.value ? [field.value] : []}
            onValueChange={(e) => field.onChange(e.value[0])}
            name={field.name}
            onInteractOutside={() => field.onBlur()}
          >
            <Select.Label className={styles.Label}>Framework</Select.Label>
            <Select.HiddenSelect />
            <Select.Control className={styles.Control}>
              <Select.Trigger className={styles.Trigger}>
                <Select.ValueText className={styles.ValueText} placeholder="Select a Framework" />
              </Select.Trigger>
              <div className={styles.Indicators}>
                <Select.ClearTrigger className={styles.ClearTrigger}>
                  <XIcon />
                </Select.ClearTrigger>
                <Select.Indicator className={styles.Indicator}>
                  <ChevronsUpDownIcon />
                </Select.Indicator>
              </div>
            </Select.Control>
            <Select.Positioner>
              <Select.Content className={styles.Content}>
                <Select.ItemGroup className={styles.ItemGroup}>
                  <Select.ItemGroupLabel className={styles.ItemGroupLabel}>Frameworks</Select.ItemGroupLabel>
                  {collection.items.map((item) => (
                    <Select.Item className={styles.Item} key={item} item={item}>
                      <Select.ItemText className={styles.ItemText}>{item}</Select.ItemText>
                      <Select.ItemIndicator className={styles.ItemIndicator}>✓</Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.ItemGroup>
              </Select.Content>
            </Select.Positioner>
          </Select.Root>
        )}
      />

      <button className={button.Root} style={{ marginTop: '1rem' }} type="submit">
        Submit
      </button>
    </form>
  )
}
