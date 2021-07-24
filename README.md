# vuemoji-picker

A simple Vue 2 and 3 wrapper component for [emoji-picker-element](https://github.com/nolanlawson/emoji-picker-element).

## Install

```bash
yarn add vuemoji-picker
```

## Usage

```html
<template>
    <VuemojiPicker :picker-style="style" @emojiClick="handleEmojiClick" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { VuemojiPicker, EmojiClickEventDetail, VuemojiPickerStyle } from 'vuemoji-picker'

export default defineComponent({
    components: { VuemojiPicker },
    setup() {
        const handleEmojiClick = (detail: EmojiClickEventDetail) => {
            // do something
        }

        const style = ref<VuemojiPickerStyle>({
          borderSize: '2px',
          buttonActiveBackground: '#e6e6e6'
        })

        return {
            handleEmojiClick,
            style
        }
    }
})
</script>
```

Documentation can be found [here](https://github.com/wobsoriano/vuemoji-picker/tree/master/packages/lib#readme)

## License
MIT - Copyright (c) 2021 [Robert Soriano](https://github.com/wobsoriano)