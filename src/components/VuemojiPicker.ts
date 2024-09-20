import type {
  EmojiClickEvent,
  PickerConstructorOptions,
  SkinToneChangeEvent,
} from 'emoji-picker-element/shared'
import type { PropType } from 'vue-demi'
import type { VuemojiPickerStyle } from '../'
import Picker from 'emoji-picker-element/picker'

import { defineComponent, isVue2, Vue2 } from 'vue-demi'
import isDarkMode from '../utils/dark-mode'
import h from '../utils/h-demi'
import toDashes from '../utils/to-dashes'

if (isVue2)
  Vue2.config.ignoredElements.push('emoji-picker')

export default defineComponent({
  props: {
    isDark: {
      type: Boolean,
      required: false,
      default: isDarkMode(),
    },
    skinToneEmoji: String,
    customEmoji: Array as PropType<PickerConstructorOptions['customEmoji']>,
    dataSource: String,
    locale: String,
    customCategorySorting: Function as PropType<(a: string, b: string) => number>,
    i18n: Object as PropType<PickerConstructorOptions['i18n']>,
    pickerStyle: Object as PropType<VuemojiPickerStyle>,
  },
  emits: ['emojiClick', 'skinToneChange'],
  data: () => ({
    picker: new Picker(),
  }),
  watch: {
    $props: {
      handler() {
        this.updatePickerProps()
      },
      deep: true,
    },
  },
  mounted() {
    const root = this.$refs.root as HTMLDivElement
    this.updatePickerProps()
    root.appendChild(this.picker)
    this.picker.addEventListener('emoji-click', this.handleClick)
    this.picker.addEventListener('skin-tone-change', this.handleSkinToneChange)
  },
  beforeUnmount() {
    this.picker.removeEventListener('emoji-click', this.handleClick)
    this.picker.removeEventListener('skin-tone-change', this.handleSkinToneChange)
  },
  methods: {
    handleClick(event: EmojiClickEvent) {
      this.$emit('emojiClick', event.detail)
    },
    handleSkinToneChange(event: SkinToneChangeEvent) {
      this.$emit('skinToneChange', event.detail)
    },
    updatePickerProps() {
      const {
        skinToneEmoji,
        dataSource,
        locale,
        customEmoji,
        i18n,
        customCategorySorting,
        isDark,
      } = this.$props
      if (skinToneEmoji)
        this.picker.skinToneEmoji = skinToneEmoji

      if (dataSource)
        this.picker.dataSource = dataSource

      if (locale)
        this.picker.locale = locale

      if (customEmoji)
        this.picker.customEmoji = customEmoji

      if (i18n)
        this.picker.i18n = i18n

      if (customCategorySorting)
        this.picker.customCategorySorting = customCategorySorting

      this.picker.classList.toggle('dark', isDark)
      this.picker.classList.toggle('light', !isDark)
      this.updatePickerStyle()
    },
    updatePickerStyle() {
      if (this.pickerStyle && typeof this.pickerStyle === 'object') {
        Object.keys(this.pickerStyle).forEach((key) => {
          if (key === 'height' && this.pickerStyle?.height)
            this.picker.style.setProperty('height', this.pickerStyle.height)

          else if (key === 'width' && this.pickerStyle?.width)
            this.picker.style.setProperty('width', this.pickerStyle.width)

          else
            // @ts-expect-error: type
            this.picker.style.setProperty(`--${toDashes(key)}`, this.pickerStyle[key])
        })
      }
    },
  },
  render() {
    return h('div', {
      ref: 'root',
    })
  },
})
