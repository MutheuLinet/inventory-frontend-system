export function markDeleted(product) {
  return { ...product, deleted: true };
}
