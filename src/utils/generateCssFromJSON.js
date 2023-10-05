import getFill from "./getStyles/getFill";
import { getSize, getMinMax } from "./getStyles/getSize";
import {
  getFlexWrap,
  getJustifyContent,
  getAlignItems,
} from "./getStyles/getLayout";

function mapFigmaStylesToFigma(selection) {
  const {
    fills,
    layoutSizingHorizontal,
    layoutSizingVertical,
    absoluteBoundingBox,
    clipsContent,
    minWidth,
    minHeight,
    maxHeight,
    maxWidth,
    layoutMode,
    layoutGrow,
    layoutWrap,
    primaryAxisAlignItems,
    counterAxisAlignItems,
  } = selection;
  const { width, height } = absoluteBoundingBox;

  console.log("selection", selection);
  const styles = {
    display: "flex",
    background: getFill(fills),
    width: getSize(layoutSizingHorizontal, width),
    height: getSize(layoutSizingVertical, height),
    overflow: clipsContent ? "hidden" : null,
    "min-width": getMinMax(minWidth),
    "min-height": getMinMax(minHeight),
    "max-width": getMinMax(maxWidth),
    "max-height": getMinMax(maxHeight),
    "flex-direction": layoutMode === "VERTICAL" ? "column" : null,
    "justify-content": getJustifyContent(primaryAxisAlignItems),
    "align-items": getAlignItems(counterAxisAlignItems),
    // flex: layoutGrow ? layoutGrow : "0 1 auto",
    "flex-wrap": getFlexWrap(layoutWrap),
    // flex: selection.layoutGrow ? selection.layoutGrow : "0 1 auto",
    // padding: mapFigmaPadding(
    //   selection.paddingTop,
    //   selection.paddingRight,
    //   selection.paddingBottom,
    //   selection.paddingLeft
    // ),
    // "border-radius": getBorderRadius(selection),

    // gap: selection.itemSpacing ? `${selection.itemSpacing}px` : "0px",
    // "justify-content": mapFigmaJustifyContent(selection.primaryAxisAlignItems),
    // "align-items": mapFigmaAlignItems(selection.counterAxisAlignItems),
    // "align-content": mapFigmaAlignContent(selection.counterAxisAlignContent),
    // "flex-wrap": selection.layoutMode === "HORIZONTAL" ? "wrap" : "nowrap",
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
  } else {
    return undefined;
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
