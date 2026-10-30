/** Rehype plugin: wraps [[PLACEHOLDER…]] tokens in MDX text in <span class="ph"> so they stay visible. */
type Node = {
  type: string;
  value?: string;
  children?: Node[];
  tagName?: string;
  properties?: Record<string, unknown>;
};

const SPLIT = /(\[\[[^\]]+\]\])/g;
const IS_TOKEN = /^\[\[[^\]]+\]\]$/;

export function rehypePlaceholders() {
  const walk = (node: Node) => {
    if (!node.children) return;
    node.children = node.children.flatMap((child) => {
      if (child.type === 'text' && child.value?.includes('[[')) {
        return child.value
          .split(SPLIT)
          .filter(Boolean)
          .map((part): Node =>
            IS_TOKEN.test(part)
              ? {
                  type: 'element',
                  tagName: 'span',
                  properties: { className: ['ph'], dataPlaceholder: '' },
                  children: [{ type: 'text', value: part }],
                }
              : { type: 'text', value: part },
          );
      }
      walk(child);
      return [child];
    });
  };
  return (tree: Node) => walk(tree);
}
