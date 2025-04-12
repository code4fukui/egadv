# egadv - easy adventure game framework

## ノベルゲームづくりからのJavaScript入門

1. [HTMLはじめのいっぽ](step1.html) [demo](http://code4fukui.github.io/egadv/step1.html)
2. [JavaScriptはじめのいっぽ](step2.html) [demo](http://code4fukui.github.io/egadv/step2.html)
3. [繰り返しとライブラリ](step3.html) [demo](http://code4fukui.github.io/egadv/step3.html)
4. [変数と定数](step4.html) [demo](http://code4fukui.github.io/egadv/step4.html)
5. [条件判断と分岐](step5.html) [demo](http://code4fukui.github.io/egadv/step5.html)
6. [乱数を使った応用](step6.html) [demo](http://code4fukui.github.io/egadv/step6.html)
7. [地図表示](step7.html) [demo](http://code4fukui.github.io/egadv/step7.html)

## デモ

8. [立ち絵](demo8.html) [demo](http://code4fukui.github.io/egadv/demo8.html)
9. [ナビへのリンク](demo9.html) [demo](http://code4fukui.github.io/egadv/demo9.html)

## ノベルゲームツール

http://code4fukui.github.io/egadv/?url=https://code4fukui.github.io/novel-fukui/越前市黄金伝説.md

## 使い方

基本的な使い方
```javascript
import { bg, show } from "https://js.sabae.cc/egadv.js";
await bg();
await show("おはよう！");
const a = await show("ここはどこ？", ["福井", "東京"]);
if (a == "福井") {
  await show("ほんと！？");
}
await bg("E91624");
```

### bg
- 背景を表示する（無指定でFIND/47からランダムに表示、番号指定でFIND/47の画像、URL指定でその画像、[Geo3x3](https://geo3x3.com/)指定で地図表示、都道府県名指定でその県内でランダムに表示）
```javascript
function bg(num)
```

### show
- テキスト表示（第二パラメータ以降または第ニパラメータに配列で文字列を指定することで選択肢を表示、選択した文字列が返る）
```typescript
function show(message, option1, option2 ...)
```

### fg
- 立ち絵を表示する（現在、yuimihime のみ対応、無指定で非表示）
```typescript
function fg(name)
```

### jump
- URL開く
```typescript
function jump(url)
```

### navi
- その場所へのナビ用リンク（GoogleMaps）を開く
```typescript
function navi(pos)
```

## ブログ

- [ノベルゲームづくりで学ぶ、はじめてのウェブアプリ開発、Code for FUKUI x 仁愛大学生編](https://fukuno.jig.jp/3380)
- [ノベルゲームづくりからのJavaScirpt入門、FIND47写真オープンデータで簡単に美しく](https://fukuno.jig.jp/3211)
- [オープンデータアイドルが案内する長野県](https://fukuno.jig.jp/4231)
