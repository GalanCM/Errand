const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

export function getDate(offset = 0) {
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
}
