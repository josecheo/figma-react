export default function getFills(fills) {
  if (!Array.isArray(fills) || fills.length === 0) {
    return null;
  }
  const cssRules = fills
    .map((fill) => {
      const { type } = fill;
      const TYPE_FILL = {
        SOLID: () => generateSolidFillCSS(fill),
        GRADIENT_LINEAR: () => generateLinearGradientCSS(fill),
        GRADIENT_RADIAL: () => generateRadialGradientCSS(fill),
        GRADIENT_ANGULAR: () => generateAngularGradientCSS(fill),
        GRADIENT_DIAMOND: () => generateDiamondGradientCSS(fill),
      };
      return TYPE_FILL[type]() || null;
    })
    .reverse();
  return cssRules.join(",\n");
}

function generateSolidFillCSS(fill) {
  if (!fill || fill.type !== "SOLID" || !fill.color) {
    return "";
  }

  const color = fill.color;
  const opacity = fill.opacity?.toFixed(2) || 1;
  const rgbaColor = `rgba(${Math.round(color.r * 255)}, ${Math.round(
    color.g * 255
  )}, ${Math.round(color.b * 255)}, ${opacity})`;

  return `${rgbaColor}`;
}

function generateLinearGradientCSS(fill) {
  const gradientDirection = calculateGradientDirection(
    fill.gradientHandlePositions
  );

  const gradientStops = fill.gradientStops.map((stop) => {
    const color = stop.color;
    const formattedAlpha = formatNumberWithTwoDecimals(
      stop.color.a * (fill.opacity || 1)
    );

    return `rgba(${Math.round(color.r * 255)}, ${Math.round(
      color.g * 255
    )}, ${Math.round(color.b * 255)}, ${formattedAlpha}) ${Math.round(
      stop.position * 100
    )}%`;
  });

  return `linear-gradient(${gradientDirection}, ${gradientStops.join(", ")})`;
}

function generateRadialGradientCSS(fill) {
  const gradientStops = fill.gradientStops.map((stop) => {
    const color = stop.color;
    const formattedColor = `rgba(${Math.round(color.r * 255)}, ${Math.round(
      color.g * 255
    )}, ${Math.round(color.b * 255)}, ${color.a.toFixed(2)})`;
    const positionPercentage = (stop.position * 100).toFixed(2);
    return `${formattedColor} ${positionPercentage}%`;
  });

  const radialGradient = `radial-gradient(50% 50% at 50% 50%, ${gradientStops.join(
    ", "
  )})`;

  return radialGradient;
}

function generateAngularGradientCSS(fill) {
  const numStops = fill.gradientStops.length;
  const colors = [];
  for (let i = 0; i < numStops; i++) {
    const stop = fill.gradientStops[i];
    const color = stop.color;
    const formattedAlpha = (stop.color.a * (fill.opacity || 1)).toFixed(2);
    const position = Math.round(stop.position * 100);
    colors.push(
      `rgba(${Math.round(color.r * 255)}, ${Math.round(
        color.g * 255
      )}, ${Math.round(color.b * 255)}, ${formattedAlpha}) ${position}%`
    );
  }

  const gradientDirection = `from ${Math.random() * 360}deg at ${
    fill.gradientHandlePositions[0].x * 100
  }% ${fill.gradientHandlePositions[0].y * 100}%`;

  return `conic-gradient(${gradientDirection}, ${colors.join(", ")})`;
}

function generateDiamondGradientCSS(fill) {
  const numStops = fill.gradientStops.length;
  const colors = [];
  for (let i = 0; i < numStops; i++) {
    const stop = fill.gradientStops[i];
    const color = stop.color;
    const formattedAlpha = (stop.color.a * fill.opacity).toFixed(2);
    const position = Math.round(stop.position * 50);
    colors.push(
      `rgba(${Math.round(color.r * 255)}, ${Math.round(
        color.g * 255
      )}, ${Math.round(color.b * 255)}, ${formattedAlpha}) ${position}%`
    );
  }

  const linearGradients = [
    "bottom right",
    "bottom left",
    "top left",
    "top right",
  ].map(
    (direction) =>
      `linear-gradient(to ${direction}, ${colors.join(
        ", "
      )}) ${direction} / 50% 50% no-repeat`
  );

  return linearGradients.join(", ");
}

function calculateGradientDirection(handlePositions) {
  const deltaX = handlePositions[1].x - handlePositions[0].x;
  const deltaY = handlePositions[1].y - handlePositions[0].y;
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
  return `${angle}deg`;
}

function formatNumberWithTwoDecimals(number) {
  if (number % 1 !== 0) {
    return number.toFixed(2);
  } else {
    return Number(number).toString();
  }
}
