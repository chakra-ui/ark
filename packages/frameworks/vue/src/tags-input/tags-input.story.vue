<script setup lang="ts">
import { ref } from 'vue'
import { TagsInput } from './'
import './tags-input.css'

const frameworks = ref(['React', 'Solid', 'Vue'])
</script>

<template>
  <Story title="Tags Input">
    <Variant title="Basic">
      <TagsInput.Root v-slot="api">
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Item
            v-for="(value, index) in api.value"
            :key="index"
            :index="index"
            :value="value"
          >
            <TagsInput.ItemInput />
            <TagsInput.ItemText>{{ value }}</TagsInput.ItemText>
            <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
          </TagsInput.Item>
          <TagsInput.Input placeholder="Add Framework" />
          <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
        </TagsInput.Control>
      </TagsInput.Root>
    </Variant>

    <Variant title="InitialValue">
      <TagsInput.Root v-slot="api" v-model="frameworks">
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Item
            v-for="(value, index) in api.value"
            :key="index"
            :index="index"
            :value="value"
          >
            <TagsInput.ItemInput />
            <TagsInput.ItemText>{{ value }}</TagsInput.ItemText>
            <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
          </TagsInput.Item>
          <TagsInput.Input placeholder="Add Framework" />
          <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
        </TagsInput.Control>
      </TagsInput.Root>
    </Variant>

    <Variant title="MaxWithOverflow">
      <TagsInput.Root v-slot="api" :max="3" allowOverflow>
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Item
            v-for="(value, index) in api.value"
            :key="index"
            :index="index"
            :value="value"
          >
            <TagsInput.ItemInput />
            <TagsInput.ItemText>{{ value }}</TagsInput.ItemText>
            <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
          </TagsInput.Item>
          <TagsInput.Input placeholder="Add Framework" />
          <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
        </TagsInput.Control>
      </TagsInput.Root>
    </Variant>

    <Variant title="Validated">
      <TagsInput.Root
        v-slot="api"
        :validate="
          (details) => {
            return !details.value.includes(details.inputValue)
          }
        "
      >
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Item
            v-for="(value, index) in api.value"
            :key="index"
            :index="index"
            :value="value"
          >
            <TagsInput.ItemInput />
            <TagsInput.ItemText>{{ value }}</TagsInput.ItemText>
            <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
          </TagsInput.Item>
          <TagsInput.Input placeholder="Add Framework" />
          <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
        </TagsInput.Control>
      </TagsInput.Root>
    </Variant>

    <Variant title="BlurBehavior">
      <TagsInput.Root v-slot="api" blurBehavior="add">
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Item
            v-for="(value, index) in api.value"
            :key="index"
            :index="index"
            :value="value"
          >
            <TagsInput.ItemInput />
            <TagsInput.ItemText>{{ value }}</TagsInput.ItemText>
            <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
          </TagsInput.Item>
          <TagsInput.Input placeholder="Add Framework" />
          <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
        </TagsInput.Control>
      </TagsInput.Root>
    </Variant>

    <Variant title="PasteBehavior">
      <TagsInput.Root v-slot="api" addOnPaste delimiter=",">
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Item
            v-for="(value, index) in api.value"
            :key="index"
            :index="index"
            :value="value"
          >
            <TagsInput.ItemInput />
            <TagsInput.ItemText>{{ value }}</TagsInput.ItemText>
            <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
          </TagsInput.Item>
          <TagsInput.Input placeholder="Add Framework" />
          <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
        </TagsInput.Control>
      </TagsInput.Root>
    </Variant>

    <Variant title="DisabledEditing">
      <TagsInput.Root v-slot="api" :allowEditTag="false">
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Item
            v-for="(value, index) in api.value"
            :key="index"
            :index="index"
            :value="value"
          >
            <TagsInput.ItemInput />
            <TagsInput.ItemText>{{ value }}</TagsInput.ItemText>
            <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
          </TagsInput.Item>
          <TagsInput.Input placeholder="Add Framework" />
          <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
        </TagsInput.Control>
      </TagsInput.Root>
    </Variant>

    <Variant title="OnEvent">
      <TagsInput.Root
        v-slot="api"
        @value-change="
          (details) => {
            console.log('tags changed to:', details.value)
          }
        "
        @highlight-change="
          (details) => {
            console.log('highlighted tag:', details.highlightedValue)
          }
        "
        @value-invalid="
          (details) => {
            console.log('Invalid!', details.reason)
          }
        "
        :max="3"
        allowOverflow
        :validate="
          (details) => {
            return !details.value.includes(details.inputValue)
          }
        "
      >
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Item
            v-for="(value, index) in api.value"
            :key="index"
            :index="index"
            :value="value"
          >
            <TagsInput.ItemInput />
            <TagsInput.ItemText>{{ value }}</TagsInput.ItemText>
            <TagsInput.ItemDeleteTrigger>Delete</TagsInput.ItemDeleteTrigger>
          </TagsInput.Item>
          <TagsInput.Input placeholder="Add Framework" />
          <TagsInput.ClearTrigger>Clear all</TagsInput.ClearTrigger>
        </TagsInput.Control>
      </TagsInput.Root>
    </Variant>
  </Story>
</template>
