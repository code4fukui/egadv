# egadv - easy adventure game framework

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

egadv is an easy-to-use framework for creating visual novel-style adventure games. It supports features like background images, text display, choices, map display, and more, and uses open data sources like FIND/47 for backgrounds.

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
await show("Good morning!");
const a = await show("Where am I?", ["Fukui", "Tokyo"]);
if (a == "Fukui") {
  await show("Really!?");
}
await bg("E91624");
```

See the [README.md](https://github.com/code4fukui/egadv/blob/main/README.md) for more details on the available functions and usage.

## Data / API
This project uses the FIND/47 and Geo3x3 open data sources for background images and map functionality.

## License
MIT License — see [LICENSE](LICENSE).