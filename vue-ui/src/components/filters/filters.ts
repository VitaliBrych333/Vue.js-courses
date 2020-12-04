export default function getYear(value: string): string {
  if (!value) return ''
  return new Date(value).getFullYear().toString()
}
