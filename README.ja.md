# egadv - イージーアドベンチャーゲームフレームワーク

`egadv` は、ビジュアルノベル風のアドベンチャーゲームを作成するための軽量なJavaScriptフレームワークです。使いやすさを重視して設計されており、ゲーム開発を通じてJavaScriptの基礎を学ぶための優れたツールです。このフレームワークは、背景画像や地図などのリッチなコンテンツにオープンデータソースを活用しています。

## デモ

[**インタラクティブデモ**](http://code4fukui.github.io/egadv/?url=https://code4fukui.github.io/novel-fukui/越前市黄金伝説.md)

*(このデモは組み込みのMarkdownパーサーを使用し、外部のストーリーファイルを読み込んで動作しています。)*

## 特徴

- **シンプルなAPI:** わずか数個の `async` 関数でゲームロジックを作成できます。複雑な設定は必要ありません。
- **動的な背景:** [FIND/47](https://find47.com/) の写真をIDや都道府県名で指定したり、テキストプロンプトから画像を生成したり、任意の画像URLを指定したりできます。
- **インタラクティブなストーリーテリング:** タイプライター風のエフェクトでテキストを表示し、プレイヤーに選択肢を提示できます。
- **キャラクタースプライト:** 背景の上に前景となるキャラクター画像を重ねて表示できます。
- **地図表示:** Geo3x3コードを使用してインタラクティブな地図を表示できます。
- **Markdownベースのゲーム:** ゲームのシナリオ全体をシンプルなMarkdownファイルで記述できます。
- **外部リンク:** ナビゲーションアプリや外部のウェブページを開くことができます。
- **効果音:** `beep()` 関数でシンプルなビープ音を追加できます。

## クイックスタート

HTMLファイルを作成し、以下のコードを追加します。インストールやビルドの作業は必要ありません。

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>My egadv Game</title>
</head>
<body>
  <script type="module">
    import { bg, show } from "https://code4fukui.github.io/egadv/egadv.js";

    // 福井県のランダムな背景を表示
    await bg("福井県");
    await show("Hello from Fukui!");
    const choice = await show("Where do you want to go?", ["Tokyo", "Kyoto"]);

    if (choice === "Tokyo") {
      await bg("東京都");
      await show("Welcome to Tokyo!");
    } else {
      await bg("京都府");
      await show("Welcome to Kyoto!");
    }
    await show("The End.");
  </script>
</body>
</html>
```

## コア関数

- `show(message, [choices])`: `message` のテキストを表示します。`choices`（文字列の配列）が指定された場合、ユーザーが選択するまで待機し、選択された文字列を返します。
- `bg(source)`: 背景を設定します。`source` には以下を指定できます：
  - **数値**: FIND/47の写真ID（例: `2892`）。
  - **都道府県名（日本語）**: その都道府県のランダムな写真（例: `"福井県"`）。
  - **Geo3x3コード**: その場所のインタラクティブな地図（例: `"E91624"`）。
  - **画像URL**: 画像への直接リンク。
  - **テキストプロンプト**: AI生成画像（例: `"cat"`）。
  - `undefined`（未指定）: 日本全国からランダムな写真。
- `fg(path)`: 指定された画像 `path` から前景のキャラクタースプライトを表示します。引数なしで呼び出すとスプライトを非表示にします。
- `map(lat, lng, zoom)`: 指定された座標に地図を表示します。
- `beep(frequency, duration)`: シンプルな音を再生します。
- `rnd(max)`: `0` から `max - 1` までのランダムな整数を返します。

## Markdownからのゲーム作成

`.md` ファイルを構成し、`url` クエリパラメータ経由で読み込むことで、完全なゲームを作成できます。

**フォーマット:**
- `# Game Title`: ゲームのタイトルを設定します。
- `## Page Name`: シーンまたはページを定義します。
- `![alt text](image_url)`: シーンの背景画像を設定します。
- `[Choice Text](link)`: 選択肢を作成します。リンクには別のページへのハッシュ（`#Page Name`）または外部URLを指定できます。
- その他のテキストはすべてセリフ（ダイアログ）として表示されます。

**例 (`story.md`):**
```markdown
# My First Story
## Start

![bg](https://code4fukui.github.io/find47/photo/2892.jpg)

You find yourself in a beautiful place.
What do you do?
[Explore the mountain](#Mountain)
[Go to the river](#River)

## Mountain

![bg](https://code4fukui.github.io
```
