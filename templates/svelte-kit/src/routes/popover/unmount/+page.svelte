<script lang="ts">
  // biome-ignore lint/correctness/noUnusedImports: works
  import { Popover } from '@ark-ui/svelte/popover'

  let visible = $state(true)

  const toggleArkVisibility = () => {
    visible = !visible
  }
</script>

<section>
  <div class="row">
    <button class="btn" onclick={toggleArkVisibility}>Toggle Ark visibility</button>
  </div>

  {#if visible}
    <div class="block">
      <h3>Ark UI Popover</h3>

      <Popover.Root>
        <Popover.Trigger class="trigger">Open Ark UI Popover</Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content class="panel">
            <div class="panel-content">content</div>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    </div>
  {/if}
</section>

<style>
  section {
    display: grid;
    gap: 16px;
    justify-items: start;
    padding: 24px;
  }
  .row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .block {
    display: grid;
    gap: 8px;
    padding: 12px;
    border: 1px solid #e3e3e3;
    border-radius: 8px;
  }
  .btn {
    padding: 6px 10px;
    border: 1px solid #e3e3e3;
    border-radius: 6px;
    background: #fafafa;
    cursor: pointer;
  }

  :global(.trigger) {
    padding: 6px 10px;
    border: 1px solid #e3e3e3;
    border-radius: 6px;
    background: #f5f5ff;
    cursor: pointer;
  }

  :global(.panel) {
    background: red;
    border: 1px solid #d0d0ff;
    border-radius: 8px;
    padding: 24px;

    &[data-state='open'] {
      animation: fadeIn 0.25s ease-out;
    }

    &[data-state='closed'] {
      animation: fadeOut 0.5s ease-in;
    }
  }

  :global(.panel-content) {
    min-width: 200px;
  }

  @keyframes -global-fadeIn {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }

  @keyframes -global-fadeOut {
    to {
      opacity: 0;
      scale: 0.8;
    }
  }
</style>
