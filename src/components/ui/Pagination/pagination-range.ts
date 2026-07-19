export type PageItem = number | "ellipsis";

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/**
 * Compute the visible page items for a pagination control, inserting "ellipsis"
 * where pages are collapsed. Always shows first + last; keeps `siblingCount`
 * pages either side of `current`. E.g. current=5 total=10 -> [1,…,4,5,6,…,10].
 */
export function getPaginationRange(current: number, total: number, siblingCount = 1): PageItem[] {
  if (total <= 0) return [];
  const totalNumbers = siblingCount * 2 + 5; // first, last, current, 2 ellipsis
  if (total <= totalNumbers) return range(1, total);

  const left = Math.max(current - siblingCount, 1);
  const right = Math.min(current + siblingCount, total);
  const showLeftEllipsis = left > 2;
  const showRightEllipsis = right < total - 1;

  const items: PageItem[] = [1];
  if (showLeftEllipsis) items.push("ellipsis");
  for (let page = Math.max(left, 2); page <= Math.min(right, total - 1); page++) {
    items.push(page);
  }
  if (showRightEllipsis) items.push("ellipsis");
  items.push(total);
  return items;
}
