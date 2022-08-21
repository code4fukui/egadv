# egadv - easy adventure game framework

## ノベルゲームづくりからのJavaScript入門

1. [HTMLはじめのいっぽ](step1.html) [demo](http://code4fukui.github.io/egadv/step1.html)
2. [JavaScriptはじめのいっぽ](step2.html) [demo](http://code4fukui.github.io/egadv/step2.html)
3. [繰り返しとライブラリ](step3.html) [demo](http://code4fukui.github.io/egadv/step3.html)
4. [変数と定数](step4.html) [demo](http://code4fukui.github.io/egadv/step4.html)
5. [条件判断と分岐](step5.html) [demo](http://code4fukui.github.io/egadv/step5.html)
6. [乱数を使った応用](step6.html) [demo](http://code4fukui.github.io/egadv/step6.html)

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
```

- bg
- 背景を表示する（無指定でFIND/47からランダムに表示、番号指定でFIND/47の画像、URLまたはファイル名指定でその画像）
```typescript
declare function bg(num?: number | string): Promise<void>;
```

- show
- テキスト表示（第ニパラメータに配列で文字列を指定することで選択肢を表示、選択した文字列が返る）
```typescript
declare function show(message: string, option?: string[]): Promise<string>;
```

## ブログ

- [ノベルゲームづくりで学ぶ、はじめてのウェブアプリ開発、Code for FUKUI x 仁愛大学生編](https://fukuno.jig.jp/3380)
- [ノベルゲームづくりからのJavaScirpt入門、FIND47写真オープンデータで簡単に美しく](https://fukuno.jig.jp/3211)
