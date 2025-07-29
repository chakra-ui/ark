<script>
  let { children } = $props()
</script>

<nav>
  <a href="/">Home</a>
  <a href="/select">Select</a>
</nav>

<div style="padding: 1rem;">
  {@render children()}
</div>
