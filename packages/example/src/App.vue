<template>
  <section aria-label="GitHub link">
    <a class="github-banner" href="https://github.com/wobsoriano/vuemoji-picker">
      <img width="149" height="149"
          src="https://github.blog/wp-content/uploads/2008/12/forkme_right_gray_6d6d6d.png?resize=149%2C149"
          class="attachment-full size-full" alt="Fork me on GitHub"
          data-recalc-dims="1">
    </a>
  </section>
  <main>
    <h1>vuemoji-picker</h1>
    <p>
      <code>vuemoji-picker</code> is a simple Vue 2 and 3 wrapper component for <code>emoji-picker-element</code>.
    </p>
    <div class="flex">
      <div>
        <VuemojiPicker :is-dark="isDark" :custom-emoji="customEmoji" @emojiClick="onEmojiClick" @skinToneChange="onSkinToneChange" />
      </div>
      <div>
        <div class="p-20px">
          <div style="margin-bottom: 10px;">Dark mode:</div>
          <label>
            <input type="radio" value="auto" v-model="darkMode">
            Auto
          </label>
          <label>
            <input type="radio" value="dark" v-model="darkMode">
            Dark
          </label>
          <label>
            <input type="radio" value="light" v-model="darkMode">
            Light
          </label>
        </div>
        <div class="p-20px">
          <label>
          <input type="checkbox" v-model="useCustomEmoji"> Custom emoji
          </label>
        </div>
        <div class="p-20px" role="alert" aria-live="polite">
          <pre v-if="eventDetail" v-text="eventDetail"></pre>
        </div>
        <div class="private-browsing-warning"
          style="padding: 20px; display: none; border: 2px dashed crimson;"
          role="alert">
          Note that <code>emoji-picker-element</code> does not support environments without IndexedDB. For polyfills
          and workarounds, see
          <a href="https://github.com/nolanlawson/emoji-picker-element/blob/master/README.md#environments-without-indexeddb">
          the README
          </a>.
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type {
  SkinToneChangeEventDetail,
  EmojiClickEventDetail,
  CustomEmoji
} from 'vuemoji-picker'
import { VuemojiPicker } from 'vuemoji-picker'

interface Result {
  Symbols: string[]
  "Technical and software": string[]
  "Film and Photography": string[]
  Arrows: string[]
  Time: string[]
  Business: string[]
  "People and activities": string[]
  "": string[]
  Academic: string[]
}

const baseUrl = 'https://raw.githubusercontent.com/nolanlawson/emoji-picker-element/master/docs'
const customEmojiData: CustomEmoji[] = [];

async function loadCustomEmoji (): Promise<any> {
  if (customEmojiData.length) {
    // data loaded already
    return customEmojiData
  }

  const categoriesToCustomEmoji = (await (await fetch(`${baseUrl}/custom.json`)).json() as Result)
  for (const [ category, names ] of Object.entries(categoriesToCustomEmoji)) {
    for (const name of names) {
      customEmojiData.push({
        category: category || undefined,
        name,
        shortcodes: [name],
        url: `${baseUrl}/custom/${name}.svg`
      })
    }
  }
  return customEmojiData
}

const useCustomEmoji = ref(false)
const customEmoji = ref<CustomEmoji[]>([])
const darkMode = ref('auto')
const eventDetail = ref()

const isDark = computed(() => {
  if (darkMode.value === 'auto') return
  return darkMode.value === 'dark'
})

watch(useCustomEmoji, async (checked) => {
  if (checked) {
    customEmoji.value = await loadCustomEmoji()
  } else {
    customEmoji.value = []
  }
})

const onEmojiClick = (detail: EmojiClickEventDetail) => {
  eventDetail.value = `Event: @emojiClick\n\nData:\n\n${JSON.stringify(detail, null, 2)}`
}

const onSkinToneChange = (detail: SkinToneChangeEventDetail) => {
  eventDetail.value = `Event: @skinToneChange\n\nData:\n\n${JSON.stringify(detail, null, 2)}`
}
</script>

<style>
.p-20px {
  padding: 20px;
}

emoji-picker {
  margin: 0 auto;
}

/* iPhone 6/7/8/X */
@media screen and (max-width: 375px) {
    h1 {
        font-size: 1.125rem;
    }
}

/* iPhone 6/7/8/X */
@media screen and (max-width: 375px) {
    emoji-picker.has-custom {
        --num-columns: 6;
        --emoji-padding: 0.25rem;
        --input-padding: 0.125rem;
    }
}

/* Nexus 5 */
@media screen and (max-width: 360px) {
    emoji-picker {
        --num-columns: 6;
        --emoji-padding: 0.25rem;
        --input-padding: 0.125rem;
    }
}

/* JioPhone 2 */
@media screen and (max-width: 240px) {
    emoji-picker {
        height: 80vh;
    }
}
</style>