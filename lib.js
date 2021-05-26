import { bg } from "https://js.sabae.cc/find47images.js";

import { create, add, style, div } from "https://js.sabae.cc/stdom.js";
import { GraphemeBreaker } from "https://js.sabae.cc/GraphemeBreaker.js";
import { sleep } from "https://js.sabae.cc/sleep.js";
import { waitClick } from "https://js.sabae.cc/waitClick.js";

const getStyleDecoText = (color, decolor) => {
  return {
    "color": color,
    "font-size": "5vw",
    "letter-spacing": ".5vw",
    "text-shadow": [
      " 2px  2px",
      "-2px  2px",
      " 2px -2px",
      "-2px -2px",
      " 2px  0px",
      " 0px  2px",
      "-2px  0px",
      " 0px -2px",
      ].map(a => a + " 1px " + decolor).join(",")
  };
};

let textscreen = null;
const show = async (s, choice) => {
  if (!textscreen) {
    textscreen = div();
    textscreen.style.padding = ".5em";
    textscreen.className = "textScreen";
    style({ ".textScreen": getStyleDecoText("white", "black")});
    style({
      "@keyframes move-y": {
        from: {
          transform: "translateY(-.05em)",
        },
        to: {
          transform: "translateY(0.05em)",
        }
      },
      ".prompt": {
        animation: "move-y .5s infinite alternate ease-in-out",
        display: "inline-block",
      }
    });
  }
  textscreen.innerHTML = "";
  const spanc = create("span");
  textscreen.appendChild(spanc);

  const addText = async (comp, s) => {
    const ss = GraphemeBreaker.break(s);
    for (const c of ss) {
      if (c == "\n") {
        comp.appendChild(create("br"));
      } else {
        const span = create("span");
        span.textContent = c;
        comp.appendChild(span);
      }
      await sleep(100);
    }
  };
  await addText(spanc, s);

  let res = 0;
  if (!choice) {
    spanc.appendChild(create("br"));
    const p = create("span");
    p.className = "prompt";
    p.textContent = "▶";
    spanc.appendChild(p);
    await waitClick();
  } else {
    const comps = [];
    for (const c of choice) {
      const span = create("div");
      spanc.appendChild(span);
      const p = create("span");
      p.className = "prompt";
      p.textContent = "▶";
      span.appendChild(p);
      await sleep(100);
      await addText(span, c);
      comps.push(span);
    }
    res = choice[await waitClick(comps)];
  }
  await sleep(100);
  textscreen.innerHTML = "";
  return res;
};

export { bg, show };
