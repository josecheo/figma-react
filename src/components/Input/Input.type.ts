export interface InputProps {
  size:
    | "headline"
    | "subheadline"
    | "title"
    | "heading"
    | "subheading"
    | "body"
    | "caption"
    | "small"
    | "tiny"
    | "micro";
  weight: "bold" | "semibold" | "medium" | "regular" | "light" | "extraLight";
  text: string;
}
