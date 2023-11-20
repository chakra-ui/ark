import { createForm } from '@felte/solid'
import { createSignal } from 'solid-js'
import { Index, Portal } from 'solid-js/web'
import type { Meta } from 'storybook-solidjs'
import { Select } from './'
import './select.css'

type SelectType = typeof Select

const meta: Meta<SelectType> = {
  title: 'Select',
  component: Select,
}

export default meta

export const Basic = () => {
  const items = ['React', 'Solid', 'Vue']
  return (
    <Select.Root items={items}>
      <Select.Label>Framework</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a Framework" />
          <Select.Indicator>▼</Select.Indicator>
        </Select.Trigger>
        <Select.ClearTrigger>Clear</Select.ClearTrigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            <Select.ItemGroup id="framework">
              <Select.ItemGroupLabel for="framework">Frameworks</Select.ItemGroupLabel>
              <Index each={items}>
                {(item) => (
                  <Select.Item item={item()}>
                    <Select.ItemText>{item()}</Select.ItemText>
                    <Select.ItemIndicator>✓</Select.ItemIndicator>
                  </Select.Item>
                )}
              </Index>
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export const Advanced = () => {
  type Item = { label: string; value: string; disabled?: boolean }
  const items: Item[] = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ]
  return (
    <Select.Root items={items}>
      <Select.Label>Framework</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a Framework" />
        </Select.Trigger>
        <Select.ClearTrigger>Clear</Select.ClearTrigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            <Select.ItemGroup id="framework">
              <Select.ItemGroupLabel for="framework">Frameworks</Select.ItemGroupLabel>
              <Index each={items}>
                {(item) => (
                  <Select.Item item={item()}>
                    <Select.ItemText>{item().label}</Select.ItemText>
                    <Select.ItemIndicator>✓</Select.ItemIndicator>
                  </Select.Item>
                )}
              </Index>
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export const Multiple = () => {
  type Item = { label: string; value: string; disabled?: boolean }
  const items: Item[] = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ]
  return (
    <Select.Root items={items} multiple>
      <Select.Label>Framework</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a Framework" />
        </Select.Trigger>
        <Select.ClearTrigger>Clear</Select.ClearTrigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            <Select.ItemGroup id="framework">
              <Index each={items}>
                {(item) => (
                  <Select.Item item={item()}>
                    <Select.ItemText>{item().label}</Select.ItemText>
                    <Select.ItemIndicator>✓</Select.ItemIndicator>
                  </Select.Item>
                )}
              </Index>
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export const Controlled = () => {
  type Item = { label: string; value: string; disabled?: boolean }
  const [, setSelectedItems] = createSignal<Item[]>([])

  const items: Item[] = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ]

  return (
    <Select.Root items={items} onValueChange={(e) => setSelectedItems(e.items)}>
      <Select.Label>Framework</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a Framework" />
        </Select.Trigger>
        <Select.ClearTrigger>Clear</Select.ClearTrigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            <Select.ItemGroup id="framework">
              <Select.ItemGroupLabel for="framework">Frameworks</Select.ItemGroupLabel>
              <Index each={items}>
                {(item) => (
                  <Select.Item item={item()}>
                    <Select.ItemText>{item().label}</Select.ItemText>
                    <Select.ItemIndicator>✓</Select.ItemIndicator>
                  </Select.Item>
                )}
              </Index>
            </Select.ItemGroup>
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export const FormLibrary = () => {
  type Inputs = {
    framework: string[]
  }
  const items = ['React', 'Solid', 'Vue']
  const { form } = createForm({
    onSubmit: (values) => {
      alert(JSON.stringify(data, null, 4))
    },
  })

  return (
    <form use:form>
      <input type="text" name="email" />
      <input type="password" name="password" />
      <button type="submit">Sign In</button>
    </form>
  )

  // const [_, { Form, Field }] = createForm<Inputs>()

  // const handleSubmit: SubmitHandler<Inputs> = (data) => alert(JSON.stringify(data, null, 4))

  // return (
  //   <Form onSubmit={handleSubmit}>
  //     {/* <Field name="framework" type="string[]">
  //       {(field, props) => (
  //         // Set "multiple" to "true"
  //         <select {...props} multiple>
  //           <For
  //             each={[
  //               { label: 'Preact', value: 'preact' },
  //               { label: 'Solid', value: 'solid' },
  //               { label: 'Qwik', value: 'qwik' },
  //             ]}
  //           >
  //             {({ label, value }) => (
  //               <option value={value} selected={field.value?.includes(value)}>
  //                 {label}
  //               </option>
  //             )}
  //           </For>
  //         </select>
  //       )}
  //     </Field> */}

  //     <Field name="framework" type="string[]">
  //       {(field, props) => (
  //         <Select.Root items={items} value={field.value} {...props}>
  //           <Select.Label>Framework</Select.Label>
  //           <Select.Control>
  //             <Select.Trigger>
  //               <Select.ValueText placeholder="Select a Framework" />
  //               <Select.Indicator>▼</Select.Indicator>
  //             </Select.Trigger>
  //             <Select.ClearTrigger>Clear</Select.ClearTrigger>
  //           </Select.Control>
  //           <Select.Positioner>
  //             <Select.Content>
  //               <Select.ItemGroup id="framework">
  //                 <Select.ItemGroupLabel for="framework">Frameworks</Select.ItemGroupLabel>
  //                 <Index each={items}>
  //                   {(item) => (
  //                     <Select.Item item={item()}>
  //                       <Select.ItemText>{item()}</Select.ItemText>
  //                       <Select.ItemIndicator>✓</Select.ItemIndicator>
  //                     </Select.Item>
  //                   )}
  //                 </Index>
  //               </Select.ItemGroup>
  //             </Select.Content>
  //           </Select.Positioner>
  //         </Select.Root>
  //       )}
  //     </Field>
  //     <button type="submit">Submit</button>
  //   </Form>
  // )
}
