// Pure set-operation utilities used across interactive components and the AI tutor.

export type SetEl = number | string;

export const union = <T extends SetEl>(a: T[], b: T[]): T[] =>
  Array.from(new Set([...a, ...b]));

export const intersection = <T extends SetEl>(a: T[], b: T[]): T[] =>
  a.filter((x) => b.includes(x));

export const difference = <T extends SetEl>(a: T[], b: T[]): T[] =>
  a.filter((x) => !b.includes(x));

export const symmetricDifference = <T extends SetEl>(a: T[], b: T[]): T[] => [
  ...difference(a, b),
  ...difference(b, a),
];

export const complement = <T extends SetEl>(universe: T[], a: T[]): T[] =>
  universe.filter((x) => !a.includes(x));

export const isSubset = <T extends SetEl>(a: T[], b: T[]): boolean =>
  a.every((x) => b.includes(x));

export const isProperSubset = <T extends SetEl>(a: T[], b: T[]): boolean =>
  isSubset(a, b) && a.length < b.length;

export const isEqual = <T extends SetEl>(a: T[], b: T[]): boolean =>
  isSubset(a, b) && isSubset(b, a);

export const isDisjoint = <T extends SetEl>(a: T[], b: T[]): boolean =>
  intersection(a, b).length === 0;

export const powerSet = <T extends SetEl>(a: T[]): T[][] => {
  const result: T[][] = [[]];
  for (const el of a) {
    const len = result.length;
    for (let i = 0; i < len; i++) {
      result.push([...result[i], el]);
    }
  }
  return result;
};

export const cardinality = <T extends SetEl>(a: T[]): number =>
  new Set(a).size;

/** Format a set for display: {1, 2, 3} */
export const fmt = (a: SetEl[]): string =>
  a.length === 0 ? "∅" : `{${Array.from(new Set(a)).join(", ")}}`;

/** Parse a comma / space separated user input into a numeric or string set. */
export const parseSet = (input: string): SetEl[] => {
  const cleaned = input.replace(/[{}]/g, "").trim();
  if (!cleaned) return [];
  return cleaned
    .split(/[,\s]+/)
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => (/^-?\d+$/.test(t) ? Number(t) : t));
};

/** Compare two sets ignoring order/duplicates. */
export const sameSet = (a: SetEl[], b: SetEl[]): boolean => {
  const sa = new Set(a.map(String));
  const sb = new Set(b.map(String));
  if (sa.size !== sb.size) return false;
  for (const x of sa) if (!sb.has(x)) return false;
  return true;
};
