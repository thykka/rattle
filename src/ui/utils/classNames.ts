export function classNames<T>(list: Array<T>): string {
  return list.filter(Boolean).join(' ');
}
