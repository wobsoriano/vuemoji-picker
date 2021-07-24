import { defineComponent, PropType } from 'vue-demi'
import type {
    EmojiClickEvent,
    SkinToneChangeEvent,
    PickerConstructorOptions,
} from 'emoji-picker-element/shared'
import type { Picker } from 'emoji-picker-element'
import 'emoji-picker-element/picker'
import h from '../utils/h-demi'
import isDarkMode from '../utils/dark-mode'
import toDashes from '../utils/to-dashes'
import { VuemojiPickerStyle } from '../'

export default defineComponent({
    props: {
        isDark: {
            type: Boolean,
            required: false,
            default: isDarkMode()
        },
        skinToneEmoji: String,
        customEmoji: Array as PropType<PickerConstructorOptions['customEmoji']>,
        dataSource: String,
        locale: String,
        customCategorySorting: Function as PropType<(a: string, b: string) => number>,
        i18n: Object as PropType<PickerConstructorOptions['i18n']>,
        pickerStyle: Object as PropType<VuemojiPickerStyle>
    },
    emits: ['emojiClick', 'skinToneChange'],
    methods: {
        handleClick(event: EmojiClickEvent) {
            this.$emit('emojiClick', event.detail)
        },
        handleSkinToneChange(event: SkinToneChangeEvent) {
            this.$emit('skinToneChange', event.detail)
        }
    },
    mounted() {
        const picker = this.$refs.picker as Picker
        picker.addEventListener('emoji-click', this.handleClick)
        picker.addEventListener('skin-tone-change', this.handleSkinToneChange)
    },
    beforeUnmount() {
        const picker = this.$refs.picker as Picker
        picker.removeEventListener('emoji-click', this.handleClick)
        picker.removeEventListener('skin-tone-change', this.handleSkinToneChange)
    },
    computed: {
        computedStyle() {
            if (this.pickerStyle && typeof this.pickerStyle === 'object') {
                const style: Record<any, any> = {}
                Object.keys(this.pickerStyle).forEach((key) => {
                    if (key === 'height' || key === 'width') {
                        style[key] = this.pickerStyle?.[key]
                    } else {
                        // @ts-ignore
                        style[`--${toDashes(key)}`] = this.pickerStyle[key]
                    }
                    
                })
                return style
            }

            return {}
        }
    },
    watch: {
        customEmoji: {
            immediate: true,
            handler(newValue) {
                if (this.$refs.picker && newValue) {
                    (this.$refs.picker as Picker).customEmoji = newValue;
                }
            }
        },
        i18n: {
            immediate: true,
            handler(newValue) {
                if (this.$refs.picker && newValue) {
                    (this.$refs.picker as Picker).i18n = newValue;
                }
            }
        },
        customCategorySorting: {
            immediate: true,
            handler(newValue) {
                if (this.$refs.picker && newValue) {
                    (this.$refs.picker as Picker).customCategorySorting = newValue;
                }
            }
        }
    },
    render() {
        const {
            skinToneEmoji,
            dataSource,
            locale,
            isDark
        } = this
        const props: Record<string, string> = {}
        if (skinToneEmoji) {
            props['skin-tone-emoji'] = skinToneEmoji
        }
        if (dataSource) {
            props['data-source'] = dataSource
        }
        if (locale) {
            props.locale = locale
        }
        return h('emoji-picker', {
            ref: 'picker',
            class: isDark ? 'dark' : 'light',
            style: this.computedStyle,
            ...props
        })
    }
})