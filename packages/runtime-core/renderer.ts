// render のロジックのみを持つオブジェクトを生成するためのファクトリ関数を実装
// Node を扱うオブジェクトは、ファクトリ関数の引数として受け取る

export interface RendererOptions<HostNode = RendererNode> {
  setElementText(node: HostNode, text: string): void;
}

export interface RendererNode {
  [key: string]: any;
}

export interface RendererElement extends RendererNode {}

export type RootRendererFunction<HostElement = RendererElement> = (
  container: HostElement,
  message: string,
) => void;

export const createRenderer = (options: RendererOptions) => {
  const { setElementText: hostSetElementText } = options;

  const render: RootRendererFunction = (container, message) => {
    hostSetElementText(container, message);
  };

  return { render };
};
