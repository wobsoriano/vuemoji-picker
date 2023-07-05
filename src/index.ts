import VuemojiPicker from './components/VuemojiPicker'

export interface VuemojiPickerStyle {
  width?: string
  height?: string
  background?: string
  borderColor?: string
  borderSize?: string
  buttonActiveBackground?: string
  buttonHoverBackground?: string
  categoryEmojiPadding?: string
  categoryEmojiSize?: string
  categoryFontColor?: string
  categoryFontSize?: string
  emojiPadding?: string
  emojiSize?: string
  indicatorColor?: string
  indicatorHeight?: string
  inputBorderColor?: string
  inputBorderRadius?: string
  inputFontColor?: string
  inputFontSize?: string
  inputLineHeight?: string
  inputPadding?: string
  inputPlaceholderColor?: string
  numColumns?: string
  outlineColor?: string
  outlineSize?: string
  skintoneBorderRadius?: string
}

export type {
  SkinTone,
  NativeEmoji,
  EmojiSkin,
  DatabaseConstructorOptions,
  PickerConstructorOptions,
  I18n,
  I18nCategories,
  EmojiClickEventDetail,
  SkinToneChangeEventDetail,
  CustomEmoji,
} from 'emoji-picker-element/shared'

export {
  VuemojiPicker,
}

export * from './composables/useDatabase'
