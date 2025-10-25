<script lang="ts">
  import { Sizer } from '@ark-ui/svelte/sizer'

  let items = $state(['Item 1', 'Item 2', 'Item 3'])

  const addItem = () => {
    items = [...items, `Item ${items.length + 1}`]
  }

  const removeItem = (index: number) => {
    items = items.filter((_, i) => i !== index)
  }
</script>

<div>
  <div class="sizer-controls">
    <button type="button" onclick={addItem}>Add Item</button>
    <button type="button" onclick={() => (items = [])}>Clear All</button>
  </div>

  <Sizer.Root style="height: var(--sizer-height); transition: height 0.25s cubic-bezier(0.22, 1, 0.36, 1);">
    <Sizer.Content>
      {#if items.length === 0}
        <div class="sizer-empty">No items. Click "Add Item" to start.</div>
      {:else}
        <ul class="sizer-list">
          {#each items as item, index}
            <li class="sizer-list-item">
              <span>{item}</span>
              <button type="button" onclick={() => removeItem(index)} class="sizer-button-remove">Remove</button>
            </li>
          {/each}
        </ul>
      {/if}
    </Sizer.Content>
  </Sizer.Root>
</div>
