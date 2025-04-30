// egadv - easy adventure game framework
// https://github.com/code4fukui/egadv/

import { create, style, div } from "https://js.sabae.cc/stdom.js";
import { GraphemeBreaker } from "https://js.sabae.cc/GraphemeBreaker.js";
import { sleep } from "https://js.sabae.cc/sleep.js";
import { waitClick } from "https://js.sabae.cc/waitClick.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { waitImageLoad } from "https://js.sabae.cc/waitImageLoad.js";
import { rnd } from "https://js.sabae.cc/rnd.js";
import { map } from "./map.js";
import { Geo3x3 } from "https://geo3x3.com/Geo3x3.js";
import { JAPAN_PREF } from "https://js.sabae.cc/JAPAN_PREF.js";
import { beep } from "https://code4fukui.github.io/beep/beep.js";

const inittextsleep = 80;

let textscreen = null;
const show = async (s, ...choices) => {
  const choice = (() => {
    if (choices.length == 0) {
      return null;
    }
    if (Array.isArray(choices[0])) {
      return choices[0];
    }
    return choices;
  })();

  if (!window.document) {
    if (!choice) {
      alert(s);
    } else {
      for (let i = 1; i <= choice.length; i++) {
        console.log(i + ". " + choice[i - 1]);
      }
      for (;;) {
        const n = parseInt(prompt("num"));
        if (!isNaN(n) && n >= 1 && n <= choice.length) {
          return choice[n - 1];
        }
      }
    }
    return;
  }
  document.body.style.margin = 0;
  let textsleep = inittextsleep;
  const f = () => {
    textsleep = 1;
  };
  document.body.addEventListener("click", f);
  if (!textscreen) {
    textscreen = div();
    textscreen.style.padding = ".5 .5 3em .5em";
    textscreen.style.position = "relative";
    textscreen.style.zIndex = 100;
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
  spanc.style.lineBreak = "anywhere";
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

const showCredit = (credit, url) => {
  const div = get("find47_bg_credit");
  if (credit) {
    div.style.position = "absolute";
    div.style.right = ".2em";
    div.style.bottom = ".2em";
    div.href = url;
    div.style.textDecoration = "none";
    div.textContent = credit;
    div.style.color = "white";
    div.style.fontSize = "70%";
    div.style.zIndex = 101;
  } else {
    div.textContent = "";
  }
};

let imglist = null;
const initImageList = async () => {
  if (!imglist) {
    imglist = CSV.toJSON(await CSV.fetch("https://code4fukui.github.io/find47/find47images.csv"));
    imglist.forEach(i => {
      const p = Geo3x3.decode(i.Geo3x3);
      i.lat = p.lat;
      i.lng = p.lng;
      i.level = p.level;
      i.id = parseInt(i.id);
    });
    console.log(imglist);
  }
};
const bg = async (no, nowait) => {
  if (!window.document) {
    console.log("bg", no);
    return;
  }
  document.body.style.margin = 0;
  document.body.style.background = "black";
  let data = null;
  
  // for map
  if (Array.isArray(no)) {
    return await map(no[0], no[1], no[2]);
  }
  if (typeof no == "string") {
    if (no[0] == "E" || no[0] == "W") {
      const p = Geo3x3.decode(no);
      return await map(p.lat, p.lng, p.level);
    } else if (no === "") {
      document.body.style.background = "black";
      return;
    } else if (JAPAN_PREF.indexOf(no) >= 0) {
      await initImageList();
      const list = imglist.filter(i => i.pref == no);
      data = list[rnd(list.length)];
    } else if (no.startsWith("https://")) {
      data = { url_image: no };
    } else {
      const param = `{"prompt":"${no}"}`;
      const url = "https://img-maker.fukuno.com/api/?" + encodeURIComponent(param);
      console.log(url)
      data = { url_image: url };
    }
  } else if (no == undefined || typeof no == "number") {
    await initImageList();
    if (no == undefined) {
      no = imglist[rnd(imglist.length)].id;
    }
    //console.log(no)
    data = imglist.find(i => i.id == no);
    if (!data) {
      return;
    }
  } else {
    document.body.style.background = "black";
    return;
  }
  const img = new Image();
  //img.src = data.url_image;
  //const url_image = data.url_image ?? "https://code4fukui.github.io/find47/photo/" + data.id + ".jpg";
  const url_image = data.url_image ?? "https://code4fukui.github.io/find47/photo/" + data.id + ".jpg";
  img.src = url_image;
  await waitImageLoad(img);
  //document.body.style.background = `fixed black url('${data.url_image}') no-repeat 0% 0% / 100% auto`;
  document.body.style.background = `fixed black url('${url_image}') no-repeat 0% 0% / 100% auto`;
  
  const div = get("find47_bg_credit");
  if (data.title && data.author) {
    const credit = `FIND/47 no.${data.id} ${data.title} © ${data.author} クリエイティブ・コモンズ・ライセンス（表示4.0 国際）`
    showCredit(credit, data.url);
  } else {
    showCredit();
  }
  if (!nowait) {
    await sleep(1000);
  }
  await map(null);
  return data;
};

// bg8 - bg_hachioji
let imglist8 = null;

const bg8 = async (no, ver = 1) => {
  if (!imglist8) {
    imglist8 = CSV.toJSON(await CSV.fetch("https://code4fukui.github.io/hachioji-keikan100/hachioji-keikan100.csv"));
  }
  if (!no) {
    no = rnd(100) + 1;
  }
  const res = imglist8.find(d => d.no == no);
  const img0 = res.image;
  const img = img0.substring(0, img0.length - 5) + ver + ".jpg";
  await bg(img);
  const url = "https://www.city.hachioji.tokyo.jp/shisei/001/006/001/004/p032712.html";
  showCredit(`八王子景観100選 No.${no}「${res.name}」、八王子市、クリエイティブ・コモンズ・ライセンス表示4.0`, url);
  return res;
};

const q = async (txt) => await show(txt, ["はい", "いいえ"]) == "はい";
const p = show;

// fg
let fgimg = null;
let initfg = false;
const animfadein = `@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
`;
const fg = async (name) => {
  if (!initfg) {
    const css = document.createElement("style");
    css.textContent = animfadein;
    document.body.appendChild(css);
    initfg = true;
  }
  if (fgimg) {
    document.body.removeChild(fgimg);
    fgimg = null;
  }
  if (name == null) {
    return;
  }
  const img = new Image();
  img.src = name;
  img.style.opacity = 0;
  img.style.position = "fixed";
  img.style.top = "10%";
  img.style.right = "5%";
  img.style.width = "30%";
  img.style.animation = ".5s ease-in-out 0s 1 normal forwards running fadein";
  document.body.appendChild(img);
  fgimg = img;

  //const s = document.body.style;
  //s.background = `fixed url("img_fg/${name}.png") no-repeat 90% 15% / 20% auto, ${s.background}`;
  //s.animation = "3s linear 1s fadein";
  //document.body.style.background = `fixed black url('${data.url_image}') no-repeat 0% 0% / 100% auto`;
};

const jump = (url) => {
  open(url, "_blank");
};

const navi = (n) => {
  if (typeof n == "string") {
    n = Geo3x3.decode(n);
  }
  const lat = n.lat;
  const lng = n.lng || n.lon;
  jump("https://www.google.co.jp/maps/dir//" + lat + "," + lng);
};

export { bg, show, rnd, q, p, map, bg8, fg, navi, jump, beep };
