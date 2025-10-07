<script lang="ts">
  import { Collapsible } from '@ark-ui/svelte/collapsible'
  import { ChevronRightIcon } from 'lucide-svelte'
</script>

<Collapsible.Root>
  <Collapsible.Trigger>
    Getting Started
    <Collapsible.Indicator>
      <ChevronRightIcon />
    </Collapsible.Indicator>
  </Collapsible.Trigger>
  <Collapsible.Content>
    <p>Welcome to the documentation. Here are some topics to explore:</p>

    <Collapsible.Root>
      <Collapsible.Trigger>
        Installation
        <Collapsible.Indicator>
          <ChevronRightIcon />
        </Collapsible.Indicator>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <p>To install the package, run one of the following commands:</p>
        <p>npm install @ark-ui/svelte</p>
      </Collapsible.Content>
    </Collapsible.Root>

    <Collapsible.Root>
      <Collapsible.Trigger>
        Configuration
        <Collapsible.Indicator>
          <ChevronRightIcon />
        </Collapsible.Indicator>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <p>Configure your project settings to use Ark UI components.</p>
      </Collapsible.Content>
    </Collapsible.Root>
  </Collapsible.Content>
</Collapsible.Root>
