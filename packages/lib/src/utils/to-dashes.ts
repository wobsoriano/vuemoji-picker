export default function toDashes(key: string) {
  return key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)
}
