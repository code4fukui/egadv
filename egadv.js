import { create, style, div } from "https://js.sabae.cc/stdom.js";
import { GraphemeBreaker } from "https://js.sabae.cc/GraphemeBreaker.js";
import { sleep } from "https://js.sabae.cc/sleep.js";
import { waitClick } from "https://js.sabae.cc/waitClick.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { waitImageLoad } from "https://js.sabae.cc/waitImageLoad.js";
import { rnd } from "https://js.sabae.cc/rnd.js";

const inittextsleep = 80;

let textscreen = null;
const show = async (s, choice) => {
  let textsleep = inittextsleep;
  const f = () => {
    textsleep = 1;
  };
  document.body.addEventListener("click", f);
  if (!textscreen) {
    textscreen = div();
    textscreen.style.padding = ".5 .5 3em .5em";
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
  spanc.style.paddingBottom = "1em";
  spanc.style.wordBreak = "break-all";
  textscreen.appendChild(spanc);

  //const scroll = (c) => c.scrollIntoView({ behavior: "smooth", block: "end" });
  const scroll = (c) => {
    /*
    const e = document.documentElement;
    const btm = e.scrollHeight - e.clientHeight;
    if (screenY < btm) {
    }
    */
    document.body.scrollIntoView({ behavior: "smooth", block: "end" });
    //textscreen.scrollIntoView({ behavior: "smooth", block: "end" });
  };

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
      scroll(comp);
      await sleep(textsleep);
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
    scroll(spanc);
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
      await sleep(textsleep);
      await addText(span, c);
      comps.push(span);
    }
    res = choice[await waitClick(comps)];
  }
  await sleep(textsleep);
  textscreen.innerHTML = "";
  document.body.removeEventListener("click", f);
  return res;
};

const getStyleDecoText = (color, decolor) => {
  const fontSize = "180%;"
  return {
    "color": color,
    "font-size": fontSize,
    "letter-spacing": ".1em",
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

//import { bg } from "https://js.sabae.cc/find47images.js";
let imglist = null;
const bg = async (no, nowait) => {
	document.body.style.backgroundColor = "black";
  let data = null;
  console.log(no)
  if (no == undefined || typeof no == "number") {
    if (!imglist) {
      imglist = CSV.toJSON(await CSV.fetch("https://code4fukui.github.io/find47/find47images.csv"));
      //console.log(imglist);
    }
    if (no == undefined) {
      no = imglist[rnd(imglist.length)].id;
    }
    console.log(no)
    data = imglist.find(i => i.id == no);
    if (!data) {
      return;
    }
  } else {
    data = { url_image: no };
  }
	const img = new Image();
	img.src = data.url_image;
	await waitImageLoad(img);
	document.body.style.backgroundImage = `url('${data.url_image}')`;
	document.body.style.backgroundRepeat = "no-repeat";
	document.body.style.backgroundSize = "100% auto";
  document.body.style.backgroundAttachment = "fixed";

	const get = (id) => {
		const c = document.getElementById(id);
		if (c) {
			return c;
		}
		const c2 = document.createElement("a");
		c2.id = id;
		document.body.appendChild(c2);
		return c2;
	};
	const div = get("find47_bg_credit");
  if (data.title && data.author) {
    div.style.position = "absolute";
    div.style.right = ".2em";
    div.style.bottom = ".2em";
    div.href = data.url;
    div.style.textDecoration = "none";
    div.textContent = `FIND/47 no.${no} ${data.title} © ${data.author} クリエイティブ・コモンズ・ライセンス（表示4.0 国際）`;
    div.style.color = "white";
    div.style.fontSize = "70%";
  } else {
    div.textContent = "";
  }
	if (!nowait) {
		await sleep(1000);
	}
  return data;
};

const q = async (txt) => await show(txt, ["はい", "いいえ"]) == "はい";
const p = show;

export { bg, show, rnd, q, p };
