---
description: Sync changelog updates from chakra-ui/zag repo to all Ark UI framework changelogs
---

## Steps

1. Fetch the latest CHANGELOG.md from the chakra-ui/zag repository
   - Use GitHub API or web fetch to get the changelog content
   - Focus on the version that matches the latest zag.js version we have locally

2. Parse the unreleased changes from Zag.js changelog
   - Extract all entries under `## <VERSION>`
   - Identify component-specific changes and general improvements
   - Filter out any Zag.js internal changes that don't affect Ark UI

3. Review the changes with me before applying
   - Show me the extracted changes
   - Confirm which changes should be synced to Ark UI
   - Ask if any changes need framework-specific notes

4. Update all framework changelogs in the `## [Unreleased]` section
   - `@/packages/react/CHANGELOG.md`
   - `@/packages/solid/CHANGELOG.md`
   - `@/packages/svelte/CHANGELOG.md`
   - `@/packages/vue/CHANGELOG.md`

5. Format the entries consistently
   - Follow existing changelog format (component name in bold, description)
   - Maintain consistent categorization: Added, Fixed, Changed, etc.
   - Preserve code examples if they exist in the Zag changelog

6. Show me a summary of all changes made
   - List which components were updated
   - Highlight any differences between frameworks (if applicable)

## Important Notes

- Only sync changes that are relevant to Ark UI components
- Skip Zag.js internal changes (build system, documentation-only, etc.)
- Ensure the changelog format matches the existing style in each file
- Don't modify any sections other than `## [Unreleased]`
- If `## [Unreleased]` is empty in the framework changelogs, add the changes there
- If it already has content, prepend the new changes
