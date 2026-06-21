interface MathTextProps {
  children: string;
  className?: string;
  block?: boolean;
}

/**
 * Lightweight math renderer. We don't ship a full LaTeX engine; instead we use a
 * math-friendly serif font and normalise a few common notations so expressions
 * read cleanly (e.g. set-builder, subscripts written as A_1).
 */
export default function MathText({ children, className = "", block }: MathTextProps) {
  const rendered = children
    .replace(/\\cup/g, "∪")
    .replace(/\\cap/g, "∩")
    .replace(/\\subseteq/g, "⊆")
    .replace(/\\subsetneq/g, "⊊")
    .replace(/\\subset/g, "⊂")
    .replace(/\\supseteq/g, "⊇")
    .replace(/\\in/g, "∈")
    .replace(/\\notin/g, "∉")
    .replace(/\\emptyset/g, "∅")
    .replace(/\\setminus/g, "∖")
    .replace(/\\triangle/g, "△")
    .replace(/\\times/g, "×")
    .replace(/\\cdot/g, "·")
    .replace(/\\neq/g, "≠")
    .replace(/\\leq/g, "≤")
    .replace(/\\geq/g, "≥")
    .replace(/\\Rightarrow/g, "⇒")
    .replace(/\\iff/g, "⇔")
    .replace(/\\forall/g, "∀")
    .replace(/\\exists/g, "∃")
    .replace(/\\mathbb\{N\}/g, "ℕ")
    .replace(/\\mathbb\{Z\}/g, "ℤ")
    .replace(/\\mathbb\{Q\}/g, "ℚ")
    .replace(/\\mathbb\{R\}/g, "ℝ");

  const Tag = block ? "div" : "span";
  return (
    <Tag
      className={`font-math ${block ? "text-center text-lg sm:text-xl" : ""} ${className}`}
    >
      {rendered}
    </Tag>
  );
}
