<template>
  <VuemojiPicker @emojiClick="handleEmojiClick" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// @ts-ignore
import { VuemojiPicker } from 'vuemoji-picker'

export default defineComponent({
  components: { VuemojiPicker },
  setup() {
      const handleEmojiClick = (detail: any) => {
          console.log(detail)
      }

      return {
          handleEmojiClick
      }
  }
})
</script>