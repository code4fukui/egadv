# egadv - easy adventure game framework

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

`egadv` is a lightweight JavaScript framework for creating visual novel-style adventure games. It's designed to be easy to use, making it an excellent tool for learning JavaScript fundamentals through game development. The framework leverages open data sources for rich content like background images and maps.

## Demo

[**Interactive Demo**](http://code4fukui.github.io/egadv/?url=https://code4fukui.github.io/novel-fukui/越前市黄金伝説.md)

*(This demo is powered by the built-in Markdown parser, loading an external story file.)*

## Features

-   **Simple API:** Create game logic with just a few `async` functions. No complex setup required.
-   **Dynamic Backgrounds:** Use photos from [FIND/47](https://find47.com/) by ID or prefecture, generate images from text prompts, or provide any image URL.
-   **Interactive Storytelling:** Display text with a typewriter effect and present multiple-choice options to the player.
-   **Character Sprites:** Overlay foreground character images on top of backgrounds.
-   **Mapping:** Display interactive maps using Geo3x3 coordinates.
-   **Markdown-based Games:** Write your entire game scenario in a simple Markdown file.
-   **External Linking:** Open navigation apps or external web pages.
-   **Sound Effects:** Add simple tones with a `beep()` function.

## Quick Start

Create an HTML file and add the following code. No installation or build step is needed.

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

    // Show a random background from Fukui Prefecture
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

## Core Functions

-   `show(message, [choices])`: Displays `message` text. If `choices` (an array of strings) is provided, it waits for the user to select one and returns the selected string.
-   `bg(source)`: Sets the background. `source` can be:
    -   A **number**: A FIND/47 photo ID (e.g., `2892`).
    -   A **Japanese prefecture name**: A random photo from that prefecture (e.g., `"福井県"`).
    -   A **Geo3x3 code**: An interactive map of that location (e.g., `"E91624"`).
    -   An **image URL**: Any direct image link.
    -   A **text prompt**: An AI-generated image (e.g., `"cat"`).
    -   `undefined`: A random photo from anywhere in Japan.
-   `fg(path)`: Displays a foreground character sprite from the given image `path`. Call with no arguments to hide the sprite.
-   `map(lat, lng, zoom)`: Displays a map at the given coordinates.
-   `beep(frequency, duration)`: Plays a simple sound.
-   `rnd(max)`: Returns a random integer between 0 and `max - 1`.

## Creating a Game from Markdown

You can create a full game by structuring a `.md` file and loading it via the `url` query parameter.

**Format:**
-   `# Game Title`: Sets the title of the game.
-   `## Page Name`: Defines a scene or page.
-   `
![alt text](image_url)
`: Sets the background image for the scene.
-   `[Choice Text](link)`: Creates a choice. The link can be a hash to another page (`#Page Name`) or an external URL.
-   Any other text is displayed as dialogue.

**Example (`story.md`):**
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