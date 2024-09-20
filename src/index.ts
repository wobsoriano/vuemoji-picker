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

export * from './composables/useDatabase'

export {
  VuemojiPicker,
}

export type {
  CustomEmoji,
  DatabaseConstructorOptions,
  EmojiClickEventDetail,
  EmojiSkin,
  I18n,
  I18nCategories,
  NativeEmoji,
  PickerConstructorOptions,
  SkinTone,
  SkinToneChangeEventDetail,
} from 'emoji-picker-element/shared'
