<script lang="ts">
  import { useFocusVisible } from '@ark-ui/svelte/interaction'

  const isFocusVisible = useFocusVisible()
  let focused = $state(false)
</script>

<div class="container">
  <p class="status">Focus visible: {String(isFocusVisible())}</p>
  <button
    type="button"
    class="button"
    data-focus-visible={focused && isFocusVisible() ? '' : undefined}
    onfocus={() => (focused = true)}
    onblur={() => (focused = false)}
  >
    Tab or click me
  </button>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    font-family: system-ui, sans-serif;
  }

  .status {
    font-size: 14px;
    color: #666;
  }

  .button {
    padding: 8px 16px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background: white;
    cursor: pointer;
    font-size: 14px;
    width: fit-content;
    outline: none;
  }

  .button:hover {
    background: #f9fafb;
  }

  .button[data-focus-visible] {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
</style>
