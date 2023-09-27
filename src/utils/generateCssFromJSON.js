function mapFigmaStylesToFigma(selection) {
  console.log("selection", selection);
  const styles = {
    display: "flex",
    "flex-direction": selection.layoutMode === "HORIZONTAL" ? "row" : "column",
    width:
      selection.layoutSizingHorizontal === "FIXED"
        ? `${selection.absoluteBoundingBox.width}px`
        : mapFigmaSize(selection.width),
    height:
      selection.layoutSizingVertical === "FIXED"
        ? `${selection.absoluteBoundingBox.height}px`
        : mapFigmaSize(selection.height),
    "min-width": mapFigmaSize(selection.minWidth),
    "min-height": mapFigmaSize(selection.minHeight),
    flex: selection.layoutGrow ? selection.layoutGrow : "0 1 auto",
    padding: mapFigmaPadding(
      selection.paddingTop,
      selection.paddingRight,
      selection.paddingBottom,
      selection.paddingLeft
    ),
    "border-radius": getBorderRadius(selection),
    background: getColorRGBA(selection.background),
    gap: selection.itemSpacing ? `${selection.itemSpacing}px` : "0px",
    "justify-content": mapFigmaJustifyContent(selection.primaryAxisAlignItems),
    "align-items": mapFigmaAlignItems(selection.counterAxisAlignItems),
    "align-content": mapFigmaAlignContent(selection.counterAxisAlignContent),
    "flex-wrap": selection.layoutMode === "HORIZONTAL" ? "wrap" : "nowrap",
  };

  for (const key in styles) {
    if (styles[key] === null || styles[key] === undefined) {
      delete styles[key];
    }
  }
  return styles;
}

const getBorderRadius = (selection) => {
  if (selection.cornerRadius) {
    return `${selection.cornerRadius}px`;
  } else if (selection.rectangleCornerRadii) {
    const [topLeft, topRight, bottomRight, bottomLeft] =
      selection.rectangleCornerRadii;
    return `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;
  }else {
    return undefined;
  }
};

const getColorRGBA = (background) => {
  if (background.length) {
    const color = background[0].color;
    return `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, ${
      color.a
    })`;
  }
};

function mapFigmaSize(size) {
  let sizePx = size ? `${size}px` : "auto";

  return sizePx;
}

function mapFigmaPadding(paddingTop, paddingRight, paddingBottom, paddingLeft) {
  let top = paddingTop ? `${paddingTop}px` : "0px";
  let right = paddingRight ? `${paddingRight}px` : "0px";
  let bottom = paddingBottom ? `${paddingBottom}px` : "0px";
  let left = paddingLeft ? `${paddingLeft}px` : "0px";
  return `${top} ${right} ${bottom} ${left}`;
}

function mapFigmaJustifyContent(align) {
  switch (align) {
    case "MIN":
      return "flex-start";
    case "CENTER":
      return "center";
    case "MAX":
      return "flex-end";
    default:
      return "flex-start";
  }
}

function mapFigmaAlignItems(align) {
  // Mapea las alineaciones transversales de Figma a align-items de CSS
  switch (align) {
    case "MIN":
      return "flex-start";
    case "CENTER":
      return "center";
    case "MAX":
      return "flex-end";
    default:
      return "stretch";
  }
}

function mapFigmaAlignContent(align) {
  // Mapea las alineaciones de contenido de Figma a align-content de CSS
  switch (align) {
    case "MIN":
      return "flex-start";
    case "CENTER":
      return "center";
    case "MAX":
      return "flex-end";
    default:
      return "stretch";
  }
}

function generateClassByJson(node) {
  const classes = [];
  function recursiveFind(instance) {
    if (instance.type === "FRAME") {
      const styles = mapFigmaStylesToFigma(instance);
      const stylesString = Object.entries(styles)
        .map(([key, value]) => `${key}: ${value};`)
        .join("\n        ");

      classes.push(`.${instance.name.toLowerCase()} {
        ${stylesString}
      }`);
    }

    if (instance.children && instance.children.length > 0) {
      for (const child of instance.children) {
        recursiveFind(child);
      }
    }
  }
  recursiveFind(node);
  return classes;
}

export default function generateCssFromJSON(node) {
  const baseCode = generateClassByJson(node).join("\n\n");
  return baseCode;
}
