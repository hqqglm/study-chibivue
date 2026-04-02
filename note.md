# 📝 学習中に気になったこと

claude code といっしょに勉強中🫶

## [パッケージの設計](https://book.chibivue.land/ja/10-minimum-example/015-package-architecture.html#vue-js-%E3%81%AE%E8%A8%AD%E8%A8%88)

- runtime-core と runtime-dom をなぜ分けるの？

  > 実は Vue.js はブラウザだけでなく，サーバーサイドレンダリング（SSR）やネイティブアプリ（Vue Native）など，様々な環境で動作できるように設計されています．  
  > そのために，DOM に依存しない「純粋なロジック」と「DOM 操作」を分離しているのです．  
  > <https://book.chibivue.land/ja/10-minimum-example/015-package-architecture.html#runtime-core-%E3%81%A8-runtime-dom>
  - Vue Native なんてものがあるんや
  - SSR では DOM に触らないの？

    > 結論から言うと、書きますが、意味が少し違います。  
    > SSR の流れを具体的に見ると > サーバー側（Node.js）

    ```js
    import { renderToString } from "vue/server-renderer";

    const html = await renderToString(app);
    // → '<div id="app"><h1>Hello</h1></div>' という文字列が生成される
    ```

    > ブラウザに送る HTML

    ```html
    <div id="app"><h1>Hello</h1></div>
    ```

    > サーバーはこの HTML 文字列を作るだけで、DOM は一切触りません。  
    > SSR（サーバーサイドレンダリング）はその名の通り、サーバー（Node.js など）上で HTML を生成する仕組みです。  
    > 流れを比較すると：
    >
    > - CSR: ブラウザが JS を実行 → DOM を操作 → 画面に表示
    > - SSR: サーバーが JS を実行 → HTML 文字列を生成 → ブラウザに送る → 画面に表示
    >
    > サーバー上には document も window も存在しません。なので DOM を操作する代わりに、HTML 文字列を組み立てるだけです。
    - ？？？  
      でも SSR の場合もこっちで`<div id="app">`みたいな書き方するんじゃないの？
      > SSR では「サーバーが作った HTML」と「Vue のコンポーネント」をつなぎ合わせる処理が走ります。これを ハイドレーション（Hydration） と言います。  
      > このとき `<div id="app">` はハイドレーションの起点として使われます。CSR のときは「ここに描画して」という意味でしたが、SSR のときは「ここから乗っ取って管理する」という意味に変わります。

- RenderOptions とかの interface って runtime-dom じゃなくて runtime-core に実装するんだ
  > そうです。依存関係の方向を思い出してください：  
  > runtime-dom は runtime-core を知っていますが、runtime-core は runtime-dom を知ってはいけません。  
  > もし RenderOptions を runtime-dom に置いたら、runtime-core がそれを import するために runtime-dom に依存することになってしまいます。
