# vuemoji-picker

A simple Vue 2 and 3 wrapper component for [emoji-picker-element](https://github.com/nolanlawson/emoji-picker-element).

[Live Demo](https://wobsoriano.github.io/vuemoji-picker/)

![Demo of vuemoji-picker](https://i.imgur.com/6CcJxLW.gif)

## Install

```bash
yarn add vuemoji-picker
```

## Usage

Options API

```html
<template>
  <div id="app">
    <VuemojiPicker @emojiClick="handleEmojiClick" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { VuemojiPicker, EmojiClickEventDetail } from 'vuemoji-picker'

export default Vue.extend({
  components: {
    VuemojiPicker
  },
  methods: {
    handleEmojiClick(detail: EmojiClickEventDetail) {}
  }
});
</script>
```

Composition API

```html
<template>
    <VuemojiPicker @emojiClick="handleEmojiClick" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { VuemojiPicker, EmojiClickEventDetail } from 'vuemoji-picker'

export default defineComponent({
    components: { VuemojiPicker },
    setup() {
        const handleEmojiClick = (detail: EmojiClickEventDetail) => {}

        return {
            handleEmojiClick
        }
    }
})
</script>
```

## Props

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`isDark` | `Boolean` | system | Set picker theme  |
`customCategorySorting` | `Function` | - | Function to sort custom category strings (sorted alphabetically by default)  |
`customEmoji` | `CustomEmoji[]` | - | Array of custom emoji |
`dataSource` | `String` | "https://cdn.jsdelivr.net/npm/emoji-picker-element-data@^1/en/emojibase/data.json" | URL to fetch the emoji data from |
`i18n` | `I18n` | - | i18n object ([see details](https://github.com/nolanlawson/emoji-picker-element#i18n-structure)) |
`locale` | `String` | "en" | Locale string |
`skinToneEmoji` | `String` | "🖐️" | The emoji to use for the skin tone picker |
`pickerStyle` | `VuemojiPickerStyle` | - | [style object](https://github.com/nolanlawson/emoji-picker-element#styling) ([see available options](https://github.com/wobsoriano/vuemoji-picker/blob/master/packages/lib/src/index.ts#L4)) |

## Events

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`emojiClick` | `Function` | - | Fired when an emoji is selected  |
`skinToneChange` | `Function` | - | Fired when a new skin tone is selected  |

## Database API Composable

Use the [Database API](https://github.com/nolanlawson/emoji-picker-element#database) as a composable.

```js
import { defineComponent } from 'vue' // @vue/composition-api for Vue 2
import { useDatabase } from 'vuemoji-picker'

export default defineComponent({
    setup() {
        const database = useDatabase()
        
        const searchEmoji = async () => {
            const result = await database.getEmojiBySearchQuery('elephant')
            // [{unicode: "🐘", ...}]
        }

        return {
            searchEmoji
        }
    }
})
```

For more information about available styling and offline config, please read [emoji-picker-element's docs](https://github.com/nolanlawson/emoji-picker-element).

## License
MIT - Copyright (c) 2021 [Robert Soriano](https://github.com/wobsoriano)