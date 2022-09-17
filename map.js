import { Geo3x3 } from "https://geo3x3.com/Geo3x3.js";

let _map = null;
let divmap = null;
let divpos = null;

export const map = async (lat, lng, zoom) => {
  const showPos = () => {
    const p = _map.getCenter();
    const fix = (n) => n.toFixed(5);
    const fixLng = (n) => {
      if (n > 180) {
        return fixLng(n - 360);
      } else if (n < - 180) {
        return fixLng(n + 360);
      }
      return n;
    };
    divpos.childNodes[1].textContent = Geo3x3.encode(p.lat, fixLng(p.lng), _map.getZoom());
    //divpos.textContent = `[${fix(p.lat)}, ${fix(p.lng)}, ${_map.getZoom()}]`;
    //console.log(p.lat, p.lng, _map.getZoom(), Geo3x3.encode(p.lat, fixLng(p.lng), _map.getZoom()));
  };
  if (!_map) {
    if (!lat) {
      return;
    }
    const { LeafletGSI } = await import("https://js.sabae.cc/LeafletGSI.js");
    divmap = document.createElement("div");
    divmap.style.width = "100vw";
    divmap.style.height = "100vh";
    divmap.style.position = "fixed";
    divmap.style.top = 0;
    divmap.style.left = 0;
    document.body.appendChild(divmap);
    _map = await LeafletGSI.initMap(divmap);
    divpos = document.createElement("div");
    document.body.appendChild(divpos);
    divpos.style.position = "fixed";
    divpos.style.bottom = 0;
    divpos.style.left = 0;
    divpos.style.backgroundColor = "white";
    divpos.style.padding = ".1em .5em";
    divpos.style.fontSize = "90%";
    const geo3x3 = document.createElement("span");
    geo3x3.textContent = "Geo3x3: ";
    divpos.appendChild(geo3x3);
    geo3x3.onclick = () => window.open("https://geo3x3.com/", "_blank");
    const spanpos = document.createElement("span");
    spanpos.style.fontWeight = "bold";
    divpos.appendChild(spanpos);
    spanpos.onclick = () => prompt("Geo3x3 (緯度経度ズーム)", spanpos.textContent);
    _map.on("moveend", showPos);
  }
  if (!lat) {
    divmap.style.display = "none";
    divpos.style.display = "none";
    return;
  }
  divmap.style.display = "block";
  divpos.style.display = "block";
  _map.setView([lat, lng], zoom);
  showPos();
};
