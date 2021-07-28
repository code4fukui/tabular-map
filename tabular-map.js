import { style } from "https://js.sabae.cc/css.js";

// from CC0 TabularMaps カラム地図
// https://hackmd.io/7m2A33zJSWq6DA9lYbvtpQ

const JAPAN = `
日本	日本	鳥取	石川	富山	青森	北海道
山口	島根	岡山	福井	新潟	秋田	岩手
長崎	福岡	広島	滋賀	長野	山形	宮城
佐賀	大分	兵庫	京都	山梨	群馬	福島
熊本	宮崎	大阪	奈良	岐阜	埼玉	栃木
鹿児島	愛媛	香川	和歌山	静岡	東京	茨城
沖縄	高知	徳島	三重	愛知	神奈川	千葉`;

class TabularMap extends HTMLElement {
  constructor() {
    super();

    const japan = JAPAN.trim().split("\n").map((j) => j.split("\t"));
    this.className = "tabularmap";
    style({
      ".tabularmap": {
        display: "grid",
        "grid-template-rows": "1fr ".repeat(japan[0].length),
        "grid-template-columns": "1fr ".repeat(japan[0].length),
        "font-size": "min(2vw, 30px)",
      },
      ".tabularmap .tabularmapitem": {
        border: "1px solid black",
        "border-radius": ".3vw",
        "text-align": "center",
        margin: "min(.2vw, 30px)",
        padding: "min(.2vw, 30px)",
      },
    });
    for (const jr of japan) {
      for (let i = 0; i < jr.length; i++) {
        const j = jr[i];
        const c = document.createElement("div");
        c.className = "tabularmapitem " + j;
        const div1 = document.createElement("div");
        div1.textContent = j;
        div1.className = "name";
        const div2 = document.createElement("div");
        div2.className = "content";
        c.appendChild(div1);
        c.appendChild(div2);
        this.appendChild(c);

        // 横一緒のみ対応
        let nrow = 1;
        for (let j = i + 1; j < jr.length; j++) {
          if (jr[i] != jr[j]) {
            break;
          }
          nrow++;
        }
        if (nrow > 1) {
          c.style.gridColumn = (i + 1) + " / " + (i + 1 + nrow);
          i += nrow - 1;
        }
      }
    }
  }
};

customElements.define("tabular-map", TabularMap);

export { TabularMap };
