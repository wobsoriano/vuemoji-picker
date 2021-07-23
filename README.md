# vuemoji-picker

A simple Vue 2 and 3 wrapper component for [emoji-picker-element](https://github.com/nolanlawson/emoji-picker-element).

## Install

```bash
yarn add vuemoji-picker
```

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

Documentation can be found [here](https://github.com/wobsoriano/vuemoji-picker/tree/master/packages/lib#readme)

## License
MIT - Copyright (c) 2021 [Robert Soriano](https://github.com/wobsoriano)