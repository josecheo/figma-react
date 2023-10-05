function capitalizeCamelCase(input) {
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}
function toCamelCase(input) {
  // Eliminar los guiones y dividir la cadena en palabras
  const words = input.split("-");

  // Capitalizar la primera letra de cada palabra y convertir el resto en minúsculas
  const camelCaseWords = words.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  });

  // Unir las palabras nuevamente en una sola cadena
  return camelCaseWords.join("");
}

function getButtonCode(node) {
  let { componentProperties } = node;
  let label = "";
  for (const key in componentProperties) {
    if (key.startsWith("label#") && componentProperties[key].type === "TEXT") {
      label = key;
      break;
    }
  }
  let { size, variant } = componentProperties;

  return `<Button variant="${variant.value}" size="${size.value}" label="${componentProperties[label].value}" />
`;
}

function getTypographiCode(node) {
  let { componentProperties } = node;
  let text = "";
  for (const key in componentProperties) {
    if (key.startsWith("Text#") && componentProperties[key].type === "TEXT") {
      text = key;
      break;
    }
  }
  let { size, weight, color } = componentProperties;

  return `<Typography size="${size.value}" weight="${weight.value}" text="${componentProperties[text].value}" color="${color.value}" />
`;
}

function getInputCode(node) {
  let placeholder = node.children[0].name;
  return `<Input placeholder="${placeholder}" />
`;
}

export function generateJSXFromJSON(node) {
  if (node.children) {
    if (node.type === "FRAME") {
      return `<div className={styles.${node.name.toLowerCase()}}>
${node.children.map((child) => generateJSXFromJSON(child)).join("")}
</div>`;
    }
    if (node.type === "INSTANCE") {
      if (node.name === "Button") {
        let code = getButtonCode(node);
        return code;
      } else if (node.name === "Typography") {
        let code = getTypographiCode(node);
        return code;
      } else if (node.name === "Input") {
        let code = getInputCode(node);
        return code;
      }
    }
  }
  return "";
}

function generateImportComponents(node) {
  const names = [];

  function recursiveFind(instance) {
    if (instance.type === "INSTANCE") {
      names.push(instance.name);
    }

    if (instance.children && instance.children.length > 0) {
      for (const child of instance.children) {
        recursiveFind(child);
      }
    }
  }

  recursiveFind(node);

  const uniqueNames = Array.from(new Set(names));
  return uniqueNames;
}

export default function generateBaseCodeJSX(node) {
  const baseCode = `import {${generateImportComponents(
    node
  )}} from '@/components';
import styles from './styles.module.css';

export default function ${capitalizeCamelCase(toCamelCase(node.name))}() {
return (
${generateJSXFromJSON(node)}
  )
  }`;
  return baseCode;
}
