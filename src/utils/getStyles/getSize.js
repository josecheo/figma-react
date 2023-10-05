export function getSize(type, size) {
  const TYPE_WIDTH = {
    FIXED: `${size}px`,
    HUG: null,
    FILL: "100%",
  };
  return TYPE_WIDTH[type];
}

export function getMinMax(size) {
  if (size) {
    return `${size}px`;
  }
  return null;
}
