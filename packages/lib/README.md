## Usage

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
        const handleEmojiClick = (detail: EmojiClickEventDetail) => {
            // do something
        }

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
`isDark` | Boolean | system | Set picker theme  |
`height` | String | "400px" | Set picker height  |
`width` | String | "344px" | Set picker width  |
`customCategorySorting` | Function | - | Function to sort custom category strings (sorted alphabetically by default)  |
`customEmoji` | CustomEmoji[] | - | Array of custom emoji |
`dataSource` | String | "https://cdn.jsdelivr.net/npm/emoji-picker-element-data@^1/en/emojibase/data.json" | URL to fetch the emoji data from |
`i18n` | I18n | - | i18n object ([see details](https://github.com/nolanlawson/emoji-picker-element#i18n-structure)) |
`locale` | String | "en" | Locale string |
`skinToneEmoji` | String | "🖐️" | The emoji to use for the skin tone picker |

## Events

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`emojiClick` | Function | - | Fired when an emoji is selected  |
`skinToneChange` | Function | - | Fired when a new skin tone is selected  |

## Database API Composable

Wraps the [Database API](https://github.com/nolanlawson/emoji-picker-element#database) into a composable.

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