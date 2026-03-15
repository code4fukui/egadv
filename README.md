# egadv - easy adventure game framework

## Demo
[Interactive demo page](http://code4fukui.github.io/egadv/?url=https://code4fukui.github.io/novel-fukui/越前市黄金伝説.md)

## Features
- Easily create visual novel-style adventure games
- Supports background images, text display, choices, map display, and more
- Uses open data sources like FIND/47 for backgrounds
- Includes samples for learning JavaScript through game creation

## Requirements
Requires a modern web browser that supports ES6 modules.

## Usage
Import the necessary functions from the `egadv.js` module:

```javascript
import { bg, show } from "https://js.sabae.cc/egadv.js";
```

Then use the functions to create your game:

```javascript
await bg();
await show("おはよう！");
const a = await show("ここはどこ？", ["福井", "東京"]);
if (a == "福井") {
  await show("ほんと！？");
}
await bg("E91624");
```

See the [README.md](https://github.com/code4fukui/egadv/blob/main/README.md) for more details on the available functions and usage.

## Data / API
This project uses the FIND/47 and Geo3x3 open data sources for background images and map functionality.

## License
This project is licensed under the MIT License.