import type { LessonBlock } from "../types";
import MathText from "./MathText";
import VennDiagram from "./VennDiagram";

export default function LessonBlocks({ blocks }: { blocks: LessonBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </div>
  );
}

function Block({ block }: { block: LessonBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h3 className="mt-2 text-xl font-bold text-brand-700 dark:text-brand-300">
          {block.value}
        </h3>
      );
    case "text":
      return (
        <p className="leading-relaxed text-ink-700 dark:text-ink-200">
          {block.value}
        </p>
      );
    case "formula":
      return (
        <div className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-4 text-center dark:border-brand-800 dark:bg-brand-900/20">
          <MathText block className="text-brand-700 dark:text-brand-200">
            {block.value}
          </MathText>
          {block.caption && (
            <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
              {block.caption}
            </p>
          )}
        </div>
      );
    case "example":
      return (
        <div className="rounded-xl border-l-4 border-accent-400 bg-accent-50 p-4 dark:bg-accent-900/15">
          <p className="mb-1 text-sm font-bold text-accent-700 dark:text-accent-300">
            💡 {block.title}
          </p>
          <p className="text-sm text-ink-700 dark:text-ink-200">{block.body}</p>
        </div>
      );
    case "tip":
      return (
        <div className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50 p-4 text-sm dark:bg-emerald-900/15">
          <span className="font-bold text-emerald-700 dark:text-emerald-300">
            ✅ Maslahat:{" "}
          </span>
          <span className="text-ink-700 dark:text-ink-200">{block.value}</span>
        </div>
      );
    case "warning":
      return (
        <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50 p-4 text-sm dark:bg-amber-900/15">
          <span className="font-bold text-amber-700 dark:text-amber-300">
            ⚠️ Diqqat:{" "}
          </span>
          <span className="text-ink-700 dark:text-ink-200">{block.value}</span>
        </div>
      );
    case "venn":
      return (
        <figure className="flex flex-col items-center rounded-xl bg-ink-50 py-4 dark:bg-ink-800/40">
          <VennDiagram preset={block.preset} />
          {block.caption && (
            <figcaption className="mt-2 text-sm text-ink-500 dark:text-ink-400">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag
          className={`ml-5 space-y-1.5 text-ink-700 dark:text-ink-200 ${
            block.ordered ? "list-decimal" : "list-disc"
          }`}
        >
          {block.items.map((it, i) => (
            <li key={i} className="leading-relaxed">
              <MathText>{it}</MathText>
            </li>
          ))}
        </Tag>
      );
    }
    default:
      return null;
  }
}
