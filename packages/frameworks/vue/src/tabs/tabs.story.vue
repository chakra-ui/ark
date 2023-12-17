<script setup lang="ts">
import { ref } from 'vue'
import { Tabs } from './'
import './tabs.css'

const value = ref('react')
</script>

<template>
  <Story title="Tabs">
    <Variant title="Basic">
      <Tabs.Root>
        <Tabs.List>
          <Tabs.Trigger value="react">React</Tabs.Trigger>
          <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
          <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="react">React Content</Tabs.Content>
        <Tabs.Content value="vue">Vue Content</Tabs.Content>
        <Tabs.Content value="solid">Solid Content</Tabs.Content>
      </Tabs.Root>
    </Variant>

    <Variant title="InitialTab">
      <Tabs.Root v-model="value">
        <Tabs.List>
          <Tabs.Trigger value="react">React</Tabs.Trigger>
          <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
          <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="react">React Content</Tabs.Content>
        <Tabs.Content value="vue">Vue Content</Tabs.Content>
        <Tabs.Content value="solid">Solid Content</Tabs.Content>
      </Tabs.Root>
    </Variant>

    <Variant title="Indicator">
      <Tabs.Root>
        <Tabs.List>
          <Tabs.Trigger value="react">React</Tabs.Trigger>
          <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
          <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Content value="react">React Content</Tabs.Content>
        <Tabs.Content value="vue">Vue Content</Tabs.Content>
        <Tabs.Content value="solid">Solid Content</Tabs.Content>
      </Tabs.Root>
    </Variant>

    <Variant title="LazyMount">
      <Tabs.Root lazyMount unmountOnExit>
        <Tabs.List>
          <Tabs.Trigger value="react">React</Tabs.Trigger>
          <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
          <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Content value="react">React Content</Tabs.Content>
        <Tabs.Content value="vue">Vue Content</Tabs.Content>
        <Tabs.Content value="solid">Solid Content</Tabs.Content>
      </Tabs.Root>
    </Variant>

    <Variant title="DisabledTab">
      <Tabs.Root defaultValue="react">
        <Tabs.List>
          <Tabs.Trigger value="react">React</Tabs.Trigger>
          <Tabs.Trigger value="vue" disabled>Vue</Tabs.Trigger>
          <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="react">React Content</Tabs.Content>
        <Tabs.Content value="vue">Vue Content</Tabs.Content>
        <Tabs.Content value="solid">Solid Content</Tabs.Content>
      </Tabs.Root>
    </Variant>

    <Variant title="Controlled">
      <Tabs.Root v-model="value">
        <Tabs.List>
          <Tabs.Trigger value="react">React</Tabs.Trigger>
          <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
          <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="react">React Content</Tabs.Content>
        <Tabs.Content value="vue">Vue Content</Tabs.Content>
        <Tabs.Content value="solid">Solid Content</Tabs.Content>
      </Tabs.Root>
    </Variant>

    <Variant title="Vertical">
      <Tabs.Root v-model="value" orientation="vertical">
        <Tabs.List>
          <Tabs.Trigger value="react">React</Tabs.Trigger>
          <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
          <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="react">React Content</Tabs.Content>
        <Tabs.Content value="vue">Vue Content</Tabs.Content>
        <Tabs.Content value="solid">Solid Content</Tabs.Content>
      </Tabs.Root>
    </Variant>

    <Variant title="Manual">
      <Tabs.Root v-model="value" activationMode="manual">
        <Tabs.List>
          <Tabs.Trigger value="react">React</Tabs.Trigger>
          <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
          <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="react">React Content</Tabs.Content>
        <Tabs.Content value="vue">Vue Content</Tabs.Content>
        <Tabs.Content value="solid">Solid Content</Tabs.Content>
      </Tabs.Root>
    </Variant>
  </Story>
</template>
