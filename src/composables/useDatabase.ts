import Database from 'emoji-picker-element/database'
import type { Emoji, NativeEmoji } from 'emoji-picker-element/shared'
import { type Ref, ref, unref, watchPostEffect } from 'vue-demi'

type MaybeRef<T> = Ref<T> | T

export function useDatabase() {
  return new Database()
}

/**
 * Returns all emoji matching the given search query, ordered by order.
 */
export function useEmojiBySearchQuery(query: MaybeRef<string>) {
  const db = useDatabase()
  const result = ref<Emoji[]>([])
  const loading = ref(false)

  watchPostEffect(async () => {
    loading.value = true
    result.value = []
    try {
      result.value = await db.getEmojiBySearchQuery(unref(query))
    }
    catch {}
    loading.value = false
  })

  return {
    result,
    loading,
  }
}

/**
 * Returns all emoji belonging to a group, ordered by order. Only returns native emoji; custom emoji don't belong to a group.
 */
export function useEmojiByGroup(group: MaybeRef<number>) {
  const db = useDatabase()
  const result = ref<NativeEmoji[]>([])
  const loading = ref(false)

  watchPostEffect(async () => {
    loading.value = true
    result.value = []
    try {
      result.value = await db.getEmojiByGroup(unref(group))
    }
    catch {}
    loading.value = false
  })

  return {
    result,
    loading,
  }
}

/**
 * Return a single emoji matching the shortcode, or null if not found.
 */
export function useEmojiByShortcode(shortcode: MaybeRef<string>) {
  const db = useDatabase()
  const result = ref<Emoji | null>(null)
  const loading = ref(false)

  watchPostEffect(async () => {
    loading.value = true
    result.value = null
    try {
      result.value = await db.getEmojiByShortcode(unref(shortcode))
    }
    catch {}
    loading.value = false
  })

  return {
    result,
    loading,
  }
}

/**
 * Return a single native emoji matching the unicode string, or a custom emoji matching the name, or null if not found.
 */
export function useEmojiByUnicodeOrName(unicodeOrName: MaybeRef<string>) {
  const db = useDatabase()
  const result = ref<Emoji | null>(null)
  const loading = ref(false)

  watchPostEffect(async () => {
    loading.value = true
    result.value = null
    try {
      result.value = await db.getEmojiByUnicodeOrName(unref(unicodeOrName))
    }
    catch {}
    loading.value = false
  })

  return {
    result,
    loading,
  }
}
