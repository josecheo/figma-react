export function getFlexWrap(layoutWrap) {
  const LAYOUT_WRAP = {
    NO_WRAP: null,
    WRAP: "wrap",
  };

  return LAYOUT_WRAP[layoutWrap];
}

export function getJustifyContent(primaryAxisAlignItems) {
  const JUSTIFY_CONTENT = {
    MIN: null,
    CENTER: "center",
    MAX: "flex-end",
    SPACE_BETWEEN: "space-between",
  };
  return JUSTIFY_CONTENT[primaryAxisAlignItems];
}

export function getAlignItems(primaryAxisAlignItems) {
  const JUSTIFY_CONTENT = {
    MIN: null,
    CENTER: "center",
    MAX: "flex-end",
    SPACE_BETWEEN: "space-between",
  };
  return JUSTIFY_CONTENT[primaryAxisAlignItems];
}