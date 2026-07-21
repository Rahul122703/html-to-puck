const counters = new Map<string, number>();

export function getUniqueName(base: string) {
  const count = counters.get(base) ?? 0;

  counters.set(base, count + 1);

  return count === 0 ? base : `${base}${count + 1}`;
}
