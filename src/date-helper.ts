const today = new Date();

export function getDate(offset = 0) {
  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + offset
  );
}
