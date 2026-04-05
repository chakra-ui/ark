---
description: Sync changelog updates from chakra-ui/zag repo to all Ark UI framework changelogs
---

## Steps

1. Fetch the latest CHANGELOG.md from the chakra-ui/zag repository
   - Use `gh api repos/chakra-ui/zag/contents/CHANGELOG.md -H "Accept: application/vnd.github.raw+json"` to get the
     changelog content

2. Determine which Zag versions are new
   - Check the current `@zag-js/*` version in `packages/react/package.json`
   - Compare the latest Ark UI release changelog (`packages/react/CHANGELOG.md`) against the Zag changelog
   - Identify Zag versions whose changes are NOT yet reflected in the Ark UI changelogs

3. Parse the new changes from Zag.js changelog
   - Extract all entries from the new Zag versions
   - Identify component-specific changes and general improvements
   - Filter out Zag.js internal changes that don't affect Ark UI (build system, core state machine internals, docs-only,
     framework-specific fixes for frameworks Ark doesn't use like Preact/Vanilla)

4. Review the changes with me before applying
   - Show me the extracted changes
   - Confirm which changes should be synced to Ark UI
   - Ask if any changes need framework-specific notes

5. Create a changeset file in `.changeset/`
   - Use the format from existing changesets (YAML frontmatter with package names and bump type)
   - Include all four frameworks: `@ark-ui/react`, `@ark-ui/solid`, `@ark-ui/svelte`, `@ark-ui/vue`
   - Use `patch` for bug fixes, `minor` for new features
   - Format entries with **Component Name** in bold followed by description
   - Do NOT modify the `CHANGELOG.md` files directly

6. Show me a summary of all changes made
   - List which components were updated
   - Highlight any differences between frameworks (if applicable)

## Important Notes

- Only sync changes that are relevant to Ark UI components
- Skip Zag.js internal changes (build system, documentation-only, core machine internals, etc.)
- Create changesets (`.changeset/*.md`) instead of editing CHANGELOG.md files directly
- Format: bold component name, then description (e.g., `**Toast**: Fix role attribute...`)
- Preserve code examples if they exist in the Zag changelog
