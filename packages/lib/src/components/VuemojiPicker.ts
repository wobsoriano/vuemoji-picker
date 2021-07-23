import { defineComponent, PropType } from 'vue-demi'
import type {
    PickerConstructorOptions,
} from 'emoji-picker-element/shared'
import 'emoji-picker-element/picker'
import h from '../utils/h-demi'
import isDarkMode from '../utils/dark-mode'

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
        height: String,
        width: String
    }
})