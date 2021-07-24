import { defineComponent, PropType } from 'vue-demi'
import type {
    EmojiClickEvent,
    SkinToneChangeEvent,
    PickerConstructorOptions,
} from 'emoji-picker-element/shared'
import Picker from 'emoji-picker-element/picker'
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
        },
        updatePickerProps() {
            const {
                skinToneEmoji,
                dataSource,
                locale,
                customEmoji,
                i18n,
                customCategorySorting,
                isDark
            } = this.$props
            if (skinToneEmoji) {
                this.picker.skinToneEmoji = skinToneEmoji
            }
            if (dataSource) {
                this.picker.dataSource = dataSource
            }
            if (locale) {
                this.picker.locale = locale
            }
            if (customEmoji) {
                this.picker.customEmoji = customEmoji
            }
            if (i18n) {
                this.picker.i18n = i18n
            }
            if (customCategorySorting) {
                this.picker.customCategorySorting = customCategorySorting
            }
            this.picker.classList.toggle('dark', isDark)
            this.picker.classList.toggle('light', !isDark)
        }
    },
    data: () => ({
        picker: new Picker()
    }),
    mounted() {
        const root = this.$refs.root as HTMLDivElement
        this.updatePickerProps()
        root.appendChild(this.picker as Node)
        this.picker.addEventListener('emoji-click', this.handleClick)
        this.picker.addEventListener('skin-tone-change', this.handleSkinToneChange)
    },
    beforeUnmount() {
        this.picker.removeEventListener('emoji-click', this.handleClick)
        this.picker.removeEventListener('skin-tone-change', this.handleSkinToneChange)
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
        $props: {
            handler() {
                this.updatePickerProps()
            },
            deep: true
        }
    },
    render() {
        return h('div', {
            ref: 'root'
        })
    }
})