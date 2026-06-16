const state = {
  title: "Untitled Timing Diagram",
  language: "zh",
  selected: { signal: 0, cycle: 5 },
  config: { hscale: 1, skin: "default" },
  edge: [],
  foot: { text: "" },
  footTock: "",
  richText: { head: [], foot: [] },
  rawSource: null,
  signals: [
    { name: "clk", color: "#e05d3c", wave: ["p", "p", "p", "p", "p", "p"], data: ["", "", "", "", "", ""], period: 1, phase: 0, node: "", groupPath: [] },
    { name: "data", color: "#176b87", wave: ["x", "=", ".", "=", "=", "x"], data: ["", "0x3A", "", "CMD", "ACK", ""], period: 1, phase: 0, node: "", groupPath: [] },
    { name: "valid", color: "#188f67", wave: ["0", "0", "1", ".", "0", "."], data: ["", "", "", "", "", ""], period: 1, phase: 0, node: "", groupPath: [] },
  ],
};

const DEFAULT_RICH_FONT_SIZE = 14;
const tutorialExamples = [
  {
    title: "Step 1: The Signal",
    source: { signal: [{ name: "Alfa", wave: "01.zx=ud.23.456789" }] },
  },
  {
    title: "Step 2: Adding Clock",
    source: {
      signal: [
        { name: "pclk", wave: "p......." },
        { name: "Pclk", wave: "P......." },
        { name: "nclk", wave: "n......." },
        { name: "Nclk", wave: "N......." },
        {},
        { name: "clk0", wave: "phnlPHNL" },
        { name: "clk1", wave: "xhlhLHl." },
        { name: "clk2", wave: "hpHplnLn" },
        { name: "clk3", wave: "nhNhplPl" },
        { name: "clk4", wave: "xlh.L.Hx" },
      ],
    },
  },
  {
    title: "Step 3: Putting All Together",
    source: {
      signal: [
        { name: "clk", wave: "P......" },
        { name: "bus", wave: "x.==.=x", data: ["head", "body", "tail", "data"] },
        { name: "wire", wave: "0.1..0." },
      ],
    },
  },
  {
    title: "Step 4: Spacers and Gaps",
    source: {
      signal: [
        { name: "clk", wave: "p.....|..." },
        { name: "Data", wave: "x.345x|=.x", data: ["head", "body", "tail", "data"] },
        { name: "Request", wave: "0.1..0|1.0" },
        {},
        { name: "Acknowledge", wave: "1.....|01." },
      ],
    },
  },
  {
    title: "Step 5: Groups",
    source: {
      signal: [
        { name: "clk", wave: "p..Pp..P" },
        ["Master", ["ctrl", { name: "write", wave: "01.0...." }, { name: "read", wave: "0...1..0" }], { name: "addr", wave: "x3.x4..x", data: "A1 A2" }, { name: "wdata", wave: "x3.x....", data: "D1" }],
        {},
        ["Slave", ["ctrl", { name: "ack", wave: "x01x0.1x" }], { name: "rdata", wave: "x.....4x", data: "Q2" }],
      ],
    },
  },
  {
    title: "Step 6: Period and Phase",
    source: {
      signal: [
        { name: "CK", wave: "P.......", period: 2 },
        { name: "CMD", wave: "x.3x=x4x=x=x=x=x", data: "RAS NOP CAS NOP NOP NOP NOP", phase: 0.5 },
        { name: "ADDR", wave: "x.=x..=x........", data: "ROW COL", phase: 0.5 },
        { name: "DQS", wave: "z.......0.1010z." },
        { name: "DQ", wave: "z.........5555z.", data: "D0 D1 D2 D3" },
      ],
    },
  },
  {
    title: "Step 7: config.hscale",
    source: {
      signal: [
        { name: "clk", wave: "p...." },
        { name: "Data", wave: "x345x", data: ["head", "body", "tail"] },
        { name: "Request", wave: "01..0" },
      ],
      config: { hscale: 2 },
    },
  },
  {
    title: "Head / Foot",
    source: {
      signal: [
        { name: "clk", wave: "p...." },
        { name: "bus", wave: "x345x", data: ["head", "body", "tail"] },
      ],
      head: { text: "WaveDrom Tutorial", tick: 0, every: 1 },
      foot: { text: "footnote", tock: 9 },
    },
  },
  {
    title: "Step 7: head/foot rich text",
    source: {
      signal: [
        { name: "clk", wave: "p.....PPPPp...." },
        { name: "dat", wave: "x....2345x.....", data: "a b c d" },
        { name: "req", wave: "0....1...0....." },
      ],
      head: {
        text: [
          "tspan",
          ["tspan", { class: "error h1" }, "error "],
          ["tspan", { class: "warning h2" }, "warning "],
          ["tspan", { class: "info h3" }, "info "],
          ["tspan", { class: "success h4" }, "success "],
          ["tspan", { class: "muted h5" }, "muted "],
          ["tspan", { class: "h6" }, "h6 "],
          "default ",
          ["tspan", { fill: "pink", "font-weight": "bold", "font-style": "italic" }, "pink-bold-italic"],
        ],
      },
      foot: {
        text: [
          "tspan",
          "E=mc",
          ["tspan", { dy: "-5" }, "2"],
          ["tspan", { dy: "5" }, ". "],
          ["tspan", { "font-size": "25" }, "B "],
          ["tspan", { "text-decoration": "overline" }, "over "],
          ["tspan", { "text-decoration": "underline" }, "under "],
          ["tspan", { "baseline-shift": "sub" }, "sub "],
          ["tspan", { "baseline-shift": "super" }, "super "],
        ],
        tock: -5,
      },
    },
  },
  {
    title: "Step 8: Arrows - Splines",
    source: {
      signal: [
        { name: "A", wave: "01........0....", node: ".a........j" },
        { name: "B", wave: "0.1.......0.1..", node: "..b.......i" },
        { name: "C", wave: "0..1....0...1..", node: "...c....h.." },
        { name: "D", wave: "0...1..0.....1.", node: "....d..g..." },
        { name: "E", wave: "0....10.......1", node: ".....ef...." },
      ],
      edge: ["a~b t1", "c-~a t2", "c-~>d time 3", "d~-e", "e~>f", "f->g", "g-~>h", "h~>i some text", "h~->j"],
    },
  },
  {
    title: "Step 8: Arrows - Sharp Lines",
    source: {
      signal: [
        { name: "A", wave: "01..0..", node: ".a..e.." },
        { name: "B", wave: "0.1..0.", node: "..b..d.", phase: 0.5 },
        { name: "C", wave: "0..1..0", node: "...c..f" },
        { node: "...g..h" },
        { node: "...I..J", phase: 0.5 },
        { name: "D", wave: "0..1..0", phase: 0.5 },
      ],
      edge: ["b-|a t1", "a-|c t2", "b-|-c t3", "c-|->e t4", "e-|>f more text", "e|->d t6", "c-g", "f-h", "g<->h 3 ms", "I+J 5 ms"],
    },
  },
  {
    title: "Step 9: Some code - Gray counter",
    source: grayCounterSource(5, 16),
  },
  {
    title: "Extra: Node and Edge",
    source: {
      signal: [
        { name: "clk", wave: "p...." },
        { name: "req", wave: "0.1..", node: "..a.." },
        { name: "ack", wave: "1...0", node: "....b" },
      ],
      edge: ["a->b request"],
    },
  },
  {
    title: "Skin: lowkey",
    source: {
      signal: [
        { name: "clk", wave: "p...." },
        { name: "Data", wave: "x345x", data: ["head", "body", "tail"] },
      ],
      config: { skin: "lowkey", hscale: 1 },
    },
  },
];

function grayCounterSource(bits, ticks) {
  const data = [];
  const arr = [];
  for (let i = 0; i < bits; i += 1) {
    arr.push({ name: String(i), wave: "" });
    let state = 1;
    for (let t = 0; t < ticks; t += 1) {
      if (i === 0) data.push(String(t));
      const gray = (((t >> 1) ^ t) >> i) & 1;
      arr[i].wave += gray === state ? "." : String(gray);
      state = gray;
    }
  }
  return {
    signal: [{ name: "bin", wave: "=".repeat(ticks), data }, ["gray", ...arr]],
  };
}

const history = [];
const future = [];

const els = {};

const i18n = {
  zh: {
    "nav.docs": "说明文档",
    "nav.start": "快速开始",
    "nav.support": "作者/支持",
    "nav.donate": "支持作者",
    "hero.eyebrow": "Online timing diagram editor",
    "hero.title": "WaveDrom 在线可视化编辑器",
    "hero.text": "用更直观的方式编辑 WaveDrom 时序图。表格化修改信号，官方渲染器实时预览，一键导出 WaveJSON、SVG 或 PNG。",
    "docs.title": "功能",
    "docs.text": "可视化编辑周期、信号分组、节点连线和富文本标题。",
    "license.title": "许可",
    "license.text": "基于 WaveDrom MIT License。你创建的图形内容归你所有。",
    "support.title": "支持",
    "support.text": "通过 Issues 反馈问题，或扫码支持项目维护。",
    "supportDialog.title": "支持与反馈",
    "supportDialog.text": "遇到问题或有建议，可以在 GitHub Issues 反馈。觉得项目有帮助，也可以扫码支持维护。",
    "supportDialog.issues": "提交问题",
    "supportDialog.source": "项目源码",
    "supportDialog.alipay": "支付宝",
    "supportDialog.wechat": "微信",
    "group.document": "文档",
    "group.examples": "示例",
    "group.cycle": "周期",
    "group.nodes": "节点与连线",
    "group.groups": "信号分组",
    "group.appearance": "外观",
    "group.text": "文字",
    "field.docTitle": "文档标题",
    "field.examples": "教程示例",
    "field.selectedCycle": "选中周期",
    "field.label": "标签文字",
    "field.period": "周期",
    "field.phase": "相位",
    "field.node": "当前周期节点",
    "field.edges": "节点连线",
    "field.groups": "Groups / 信号分组",
    "field.hscale": "横向缩放",
    "field.skin": "皮肤样式",
    "field.foot": "页脚文字",
    "field.rich": "标题/页脚富文本",
    "field.footTock": "页脚偏移",
    "button.undo": "撤销",
    "button.redo": "恢复",
    "button.loadExample": "载入示例",
    "button.addEdge": "添加连线",
    "button.addRich": "添加富文本",
    "button.home": "主页",
    "button.import": "导入",
    "button.export": "导出",
    "button.exportSvg": "导出 SVG",
    "button.exportPng": "导出 PNG",
    "button.addGroup": "+ 添加层级",
    "button.clear": "清空",
    "button.remove": "删除",
    "button.select": "选中",
    "option.current": "当前图形",
    "panel.preview": "实时预览",
    "panel.wavejson": "WaveJSON",
    "placeholder.label": "例如 ACK / 0x3A",
    "placeholder.node": "例如 a",
    "placeholder.group": "第 {n} 级分组",
    "group.help": "可以自由添加多级嵌套分组；导出时会生成 WaveDrom 官方嵌套 signal 数组。",
    "group.empty": "暂无信号分组",
  },
  en: {
    "nav.docs": "Docs",
    "nav.start": "Start",
    "nav.support": "Author / Support",
    "nav.donate": "Support",
    "hero.eyebrow": "Online timing diagram editor",
    "hero.title": "WaveDrom Visual Editor",
    "hero.text": "A visual WaveDrom editor for timing diagrams. Edit signals in a grid, preview with the official renderer, and export WaveJSON, SVG, or PNG.",
    "docs.title": "Features",
    "docs.text": "Edit cycles, group signals, connect nodes, and format rich text visually.",
    "license.title": "License",
    "license.text": "Built on WaveDrom under the MIT License. Your diagrams belong to you.",
    "support.title": "Support",
    "support.text": "Report issues on GitHub or support ongoing maintenance.",
    "supportDialog.title": "Support & Feedback",
    "supportDialog.text": "For bugs and ideas, use GitHub Issues. If the project helps you, a small donation supports maintenance.",
    "supportDialog.issues": "Report an Issue",
    "supportDialog.source": "Source Code",
    "supportDialog.alipay": "Alipay",
    "supportDialog.wechat": "WeChat",
    "group.document": "Document",
    "group.examples": "Examples",
    "group.cycle": "Cycle",
    "group.nodes": "Nodes & Edges",
    "group.groups": "Signal Groups",
    "group.appearance": "Appearance",
    "group.text": "Text",
    "field.docTitle": "Document Title",
    "field.examples": "Tutorial Examples",
    "field.selectedCycle": "Selected Cycle",
    "field.label": "Label Text",
    "field.period": "Period",
    "field.phase": "Phase",
    "field.node": "Cycle Node",
    "field.edges": "Node Edges",
    "field.groups": "Groups",
    "field.hscale": "Horizontal Scale",
    "field.skin": "Skin",
    "field.foot": "Footer Text",
    "field.rich": "Head / Foot Rich Text",
    "field.footTock": "Footer Offset",
    "button.undo": "Undo",
    "button.redo": "Recover",
    "button.loadExample": "Load Example",
    "button.addEdge": "Add Edge",
    "button.addRich": "Add Rich Text",
    "button.home": "Home",
    "button.import": "Import",
    "button.export": "Export",
    "button.exportSvg": "Export SVG",
    "button.exportPng": "Export PNG",
    "button.addGroup": "+ Add Level",
    "button.clear": "Clear",
    "button.remove": "Remove",
    "button.select": "Select",
    "option.current": "Current Diagram",
    "panel.preview": "Live Preview",
    "panel.wavejson": "WaveJSON",
    "placeholder.label": "e.g. ACK / 0x3A",
    "placeholder.node": "e.g. a",
    "placeholder.group": "Group level {n}",
    "group.help": "Add as many nested group levels as needed. Export keeps WaveDrom's official nested signal arrays.",
    "group.empty": "No signal groups",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  bindEvents();
  renderAll();
});

window.addEventListener("load", () => {
  if (window.WaveDrom) renderPreview();
});

function cacheElements() {
  els.homeView = document.querySelector("#homeView");
  els.editorView = document.querySelector("#editorView");
  els.signalTable = document.querySelector("#signalTable");
  els.wavePreview = document.querySelector("#wavePreview");
  els.jsonOutput = document.querySelector("#jsonOutput");
  els.docTitle = document.querySelector("#docTitle");
  els.exampleSelect = document.querySelector("#exampleSelect");
  els.waveType = document.querySelector("#waveType");
  els.waveHelp = document.querySelector("#waveHelp");
  els.cycleLabel = document.querySelector("#cycleLabel");
  els.signalPeriod = document.querySelector("#signalPeriod");
  els.signalPhase = document.querySelector("#signalPhase");
  els.cycleNode = document.querySelector("#cycleNode");
  els.edgeFrom = document.querySelector("#edgeFrom");
  els.edgeShape = document.querySelector("#edgeShape");
  els.edgeTo = document.querySelector("#edgeTo");
  els.edgeLabel = document.querySelector("#edgeLabel");
  els.edgeList = document.querySelector("#edgeList");
  ensureGroupEditor();
  els.groupLevels = document.querySelector("#groupLevels");
  els.addGroupLevel = document.querySelector("#addGroupLevel");
  els.clearGroup = document.querySelector("#clearGroup");
  els.groupList = document.querySelector("#groupList");
  els.langToggle = document.querySelector("#langToggle");
  els.hscaleInput = document.querySelector("#hscaleInput");
  els.skinSelect = document.querySelector("#skinSelect");
  els.footText = document.querySelector("#footText");
  els.footTock = document.querySelector("#footTock");
  els.richTarget = document.querySelector("#richTarget");
  els.richStyle = document.querySelector("#richStyle");
  els.richText = document.querySelector("#richText");
  els.richFill = document.querySelector("#richFill");
  els.richFontSize = document.querySelector("#richFontSize");
  els.richDy = document.querySelector("#richDy");
  els.richBaseline = document.querySelector("#richBaseline");
  els.richDecoration = document.querySelector("#richDecoration");
  els.richBold = document.querySelector("#richBold");
  els.richItalic = document.querySelector("#richItalic");
  els.richTextList = document.querySelector("#richTextList");
  els.importJsonInput = document.querySelector("#importJsonInput");
  els.donateDialog = document.querySelector("#donateDialog");

  tutorialExamples.forEach((example, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = example.title;
    els.exampleSelect.appendChild(option);
  });
}

function ensureGroupEditor() {
  if (document.querySelector("#groupLevels")) return;
  const panel = document.createElement("div");
  panel.className = "group-builder";
  panel.title =
    "WaveDrom Step 5 Groups. Add nested group levels for the selected signal. Export will generate official nested signal arrays.";
  panel.innerHTML = `
    <span class="field-title" data-i18n="field.groups">Groups / 信号分组</span>
    <div class="group-levels" id="groupLevels"></div>
    <div class="group-actions">
      <button class="secondary" id="addGroupLevel" type="button" data-i18n="button.addGroup">+ 添加层级</button>
      <button class="secondary" id="clearGroup" type="button" data-i18n="button.clear">清空</button>
    </div>
    <datalist id="groupLevelOptions"></datalist>
    <small data-i18n="group.help">可以自由添加多级嵌套分组；导出时会生成 WaveDrom 官方嵌套 signal 数组。</small>
    <div class="edge-list" id="groupList"></div>
  `;
  const mount = document.querySelector("#groupEditorMount");
  if (mount) {
    mount.appendChild(panel);
    return;
  }
  const edgePanel = document.querySelector("#edgeList")?.parentElement;
  edgePanel?.insertAdjacentElement("afterend", panel);
}

function bindEvents() {
  document.querySelectorAll("[data-start]").forEach((button) => {
    button.addEventListener("click", () => setView("editor"));
  });

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      setView(button.dataset.view);
      if (button.dataset.anchor) {
        requestAnimationFrame(() => document.querySelector(`#${button.dataset.anchor}`)?.scrollIntoView({ behavior: "smooth" }));
      }
    });
  });

  document.querySelectorAll("[data-donate]").forEach((button) => {
    button.addEventListener("click", () => els.donateDialog.showModal());
  });

  document.querySelector("#themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
  els.langToggle.addEventListener("click", toggleLanguage);

  document.querySelector("#loadExample").addEventListener("click", loadSelectedExample);
  document.querySelector("#addRichText").addEventListener("click", addRichText);
  document.querySelector("#undoBtn").addEventListener("click", undo);
  document.querySelector("#redoBtn").addEventListener("click", redo);
  document.querySelector("#importJson").addEventListener("click", () => els.importJsonInput.click());
  els.importJsonInput.addEventListener("change", importWaveJson);
  document.querySelector("#exportJson").addEventListener("click", exportJson);
  document.querySelector("#exportSvg").addEventListener("click", exportSvg);
  document.querySelector("#exportPng").addEventListener("click", exportPng);

  els.docTitle.addEventListener("input", (event) => {
    commit();
    state.title = event.target.value;
    state.rawSource = null;
    renderPreview();
  });

  els.waveType.addEventListener("change", (event) => {
    updateSelectedCycle({ wave: event.target.value });
  });

  els.cycleLabel.addEventListener("input", (event) => {
    updateSelectedCycle({ label: event.target.value });
  });

  els.signalPeriod.addEventListener("input", (event) => {
    commit();
    selectedSignal().period = Number(event.target.value) || 1;
    state.rawSource = null;
    renderAll();
  });

  els.signalPhase.addEventListener("input", (event) => {
    commit();
    selectedSignal().phase = Number(event.target.value) || 0;
    state.rawSource = null;
    renderAll();
  });

  els.cycleNode.addEventListener("input", (event) => {
    commit();
    setNodeAt(selectedSignal(), state.selected.cycle, event.target.value.trim().slice(0, 1));
    state.rawSource = null;
    renderAll();
  });

  document.querySelector("#addEdge").addEventListener("click", addEdgeFromForm);
  bindRichToolbar();

  els.groupLevels.addEventListener("input", updateSelectedGroupFromForm);
  els.groupLevels.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-group-level]");
    if (!removeButton) return;
    commit();
    selectedSignal().groupPath.splice(Number(removeButton.dataset.removeGroupLevel), 1);
    state.rawSource = null;
    renderAll();
  });
  els.addGroupLevel.addEventListener("click", () => {
    commit();
    selectedSignal().groupPath = [...(selectedSignal().groupPath || []), ""];
    state.rawSource = null;
    renderAll();
  });
  els.clearGroup.addEventListener("click", () => {
    commit();
    selectedSignal().groupPath = [];
    state.rawSource = null;
    renderAll();
  });

  els.hscaleInput.addEventListener("input", (event) => {
    commit();
    state.config.hscale = Math.max(1, Number(event.target.value) || 1);
    state.rawSource = null;
    renderAll();
  });

  els.skinSelect.addEventListener("change", (event) => {
    commit();
    state.config.skin = event.target.value;
    state.rawSource = null;
    renderAll();
  });

  els.footText.addEventListener("input", (event) => {
    commit();
    state.foot.text = event.target.value;
    state.rawSource = null;
    renderAll();
  });

  els.footTock.addEventListener("input", (event) => {
    commit();
    state.footTock = event.target.value;
    state.rawSource = null;
    renderAll();
  });
}

function bindRichToolbar() {
  els.richBold.addEventListener("click", () => toggleRichButton(els.richBold));
  els.richItalic.addEventListener("click", () => toggleRichButton(els.richItalic));

  document.querySelectorAll("[data-rich-decoration]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextValue = els.richDecoration.value === button.dataset.richDecoration ? "" : button.dataset.richDecoration;
      els.richDecoration.value = nextValue;
      document.querySelectorAll("[data-rich-decoration]").forEach((item) => {
        const active = item.dataset.richDecoration === nextValue;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
    });
  });
}

function toggleRichButton(button) {
  const active = button.getAttribute("aria-pressed") !== "true";
  button.classList.toggle("is-active", active);
  button.setAttribute("aria-pressed", String(active));
}

function resetRichToolbar() {
  [els.richBold, els.richItalic, ...document.querySelectorAll("[data-rich-decoration]")].forEach((button) => {
    button.classList.remove("is-active");
    button.setAttribute("aria-pressed", "false");
  });
  els.richDecoration.value = "";
}

function setView(view) {
  const isEditor = view === "editor";
  document.body.classList.toggle("is-editor-page", isEditor);
  document.body.classList.toggle("is-home-page", !isEditor);
  els.homeView.classList.toggle("is-hidden", isEditor);
  els.editorView.classList.toggle("is-hidden", !isEditor);
}

function t(key, params = {}) {
  let text = i18n[state.language]?.[key] || i18n.zh[key] || key;
  Object.entries(params).forEach(([name, value]) => {
    text = text.replace(`{${name}}`, value);
  });
  return text;
}

function toggleLanguage() {
  state.language = state.language === "zh" ? "en" : "zh";
  renderAll();
}

function applyLanguage() {
  document.documentElement.lang = state.language === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    const title = t(element.dataset.i18nTitle);
    element.title = title;
    element.setAttribute("aria-label", title);
  });
  if (els.langToggle) {
    els.langToggle.textContent = state.language === "zh" ? "EN" : "中";
    els.langToggle.title = state.language === "zh" ? "Switch to English" : "切换到中文";
  }
}

function commit() {
  history.push(JSON.stringify(state));
  if (history.length > 80) history.shift();
  future.length = 0;
}

function restore(snapshot) {
  const parsed = JSON.parse(snapshot);
  state.title = parsed.title;
  state.language = parsed.language || state.language || "zh";
  state.selected = parsed.selected;
  state.signals = normalizeEditableSignals(parsed.signals);
  state.config = parsed.config || { hscale: 1, skin: "default" };
  state.edge = parsed.edge || [];
  state.foot = parsed.foot || { text: "" };
  state.richText = parsed.richText || { head: [], foot: [] };
  state.rawSource = parsed.rawSource || null;
  renderAll();
}

function undo() {
  if (!history.length) return;
  future.push(JSON.stringify(state));
  restore(history.pop());
}

function redo() {
  if (!future.length) return;
  history.push(JSON.stringify(state));
  restore(future.pop());
}

function renderAll() {
  els.docTitle.value = state.title;
  renderSignalTable();
  syncInspector();
  renderPreview();
}

function renderSignalTable() {
  els.signalTable.innerHTML = "";

  state.signals.forEach((signal, signalIndex) => {
    const row = document.createElement("div");
    row.className = "signal-row";

    const nameCell = document.createElement("div");
    nameCell.className = "signal-name-cell";

    const name = document.createElement("input");
    name.className = "signal-name";
    name.value = signal.name;
    name.addEventListener("input", (event) => {
      commit();
      signal.name = event.target.value;
      renderPreview();
    });
    nameCell.appendChild(name);

    if (signal.groupPath?.length) {
      const groupBadge = document.createElement("div");
      groupBadge.className = "group-badge";
      groupBadge.textContent = formatGroupPath(signal.groupPath);
      nameCell.appendChild(groupBadge);
    }
    row.appendChild(nameCell);

    const cycles = document.createElement("div");
    cycles.className = "cycle-list";
    signal.wave.forEach((wave, cycleIndex) => {
      const cycle = document.createElement("button");
      cycle.className = "cycle";
      cycle.textContent = signal.data[cycleIndex] || wave.toUpperCase();
      cycle.style.borderTop = `4px solid ${signal.color}`;
      cycle.title = `周期 ${cycleIndex + 1}`;
      const node = getNodeAt(signal, cycleIndex);
      if (node) cycle.dataset.node = node;
      cycle.classList.toggle(
        "is-selected",
        state.selected.signal === signalIndex && state.selected.cycle === cycleIndex,
      );
      cycle.addEventListener("click", () => {
        state.selected = { signal: signalIndex, cycle: cycleIndex };
        renderAll();
      });
      cycles.appendChild(cycle);
    });
    row.appendChild(cycles);

    const addCycle = document.createElement("button");
    addCycle.className = "row-action";
    addCycle.textContent = "+";
    addCycle.title = "在选中周期后插入";
    addCycle.addEventListener("click", () => {
      if (state.selected.signal !== signalIndex) {
        state.selected = { signal: signalIndex, cycle: Math.max(0, signal.wave.length - 1) };
      }
      insertCycleAfterSelection();
    });
    row.appendChild(addCycle);

    const removeCycle = document.createElement("button");
    removeCycle.className = "row-action";
    removeCycle.textContent = "−";
    removeCycle.title = "删除选中周期";
    removeCycle.addEventListener("click", () => {
      if (state.selected.signal !== signalIndex) {
        state.selected = { signal: signalIndex, cycle: Math.max(0, signal.wave.length - 1) };
      }
      removeSelectedCycle();
    });
    row.appendChild(removeCycle);

    const removeSignal = document.createElement("button");
    removeSignal.className = "row-action row-action-danger";
    removeSignal.textContent = "×";
    removeSignal.title = "删除当前信号行";
    removeSignal.addEventListener("click", () => {
      removeSignalAt(signalIndex);
    });
    row.appendChild(removeSignal);

    els.signalTable.appendChild(row);
  });

  const addRow = document.createElement("button");
  addRow.className = "add-signal-row";
  addRow.textContent = "+ 新增信号行";
  addRow.title = "在波形表格末尾新增一条信号";
  addRow.addEventListener("click", addSignal);
  els.signalTable.appendChild(addRow);
}

function syncInspector() {
  const signal = selectedSignal();
  const cycle = selectedCycle();
  els.waveType.value = cycle.wave;
  els.cycleLabel.value = cycle.label;
  els.signalPeriod.value = signal.period || 1;
  els.signalPhase.value = signal.phase || 0;
  els.cycleNode.value = getNodeAt(signal, state.selected.cycle);
  els.hscaleInput.value = state.config?.hscale || 1;
  els.skinSelect.value = state.config?.skin || "default";
  els.footText.value = state.foot?.text || "";
  els.footTock.value = state.footTock ?? "";
  renderWaveHelp(cycle.wave);
  renderEdgeList();
  renderGroupControls();
  renderGroupList();
  renderGroupOptions();
  renderRichTextList();
  applyLanguage();
}

function selectedSignal() {
  return state.signals[state.selected.signal] || state.signals[0];
}

function selectedCycle() {
  const signal = selectedSignal();
  const index = Math.min(state.selected.cycle, signal.wave.length - 1);
  return {
    wave: signal.wave[index],
    label: signal.data[index] || "",
  };
}

function updateSelectedCycle(next) {
  commit();
  const signal = selectedSignal();
  const index = state.selected.cycle;
  if (next.wave !== undefined) signal.wave[index] = next.wave;
  if (next.label !== undefined) signal.data[index] = next.label;
  state.rawSource = null;
  renderAll();
}

function insertCycleAfterSelection() {
  commit();
  const signal = selectedSignal();
  const index = Math.min(state.selected.cycle + 1, signal.wave.length);
  const previous = signal.wave[Math.max(0, state.selected.cycle)] || ".";
  signal.wave.splice(index, 0, previous === "|" ? "." : ".");
  signal.data.splice(index, 0, "");
  state.selected.cycle = index;
  state.rawSource = null;
  renderAll();
}

function removeSelectedCycle() {
  const signal = selectedSignal();
  if (!signal || signal.wave.length <= 1) return;
  commit();
  signal.wave.splice(state.selected.cycle, 1);
  signal.data.splice(state.selected.cycle, 1);
  state.selected.cycle = Math.max(0, Math.min(state.selected.cycle, signal.wave.length - 1));
  state.rawSource = null;
  renderAll();
}

function addSignal() {
  commit();
  state.signals.push({
    name: `signal_${state.signals.length + 1}`,
    color: "#2563eb",
    wave: ["0", "1", "0", "1"],
    data: ["", "", "", ""],
    period: 1,
    phase: 0,
    node: "",
    groupPath: [],
  });
  state.rawSource = null;
  state.selected = { signal: state.signals.length - 1, cycle: 3 };
  renderAll();
}

function removeSignalAt(signalIndex) {
  if (state.signals.length <= 1) return;
  commit();
  state.signals.splice(signalIndex, 1);
  state.selected.signal = Math.max(0, Math.min(state.selected.signal, state.signals.length - 1));
  state.selected.cycle = Math.max(0, selectedSignal().wave.length - 1);
  state.rawSource = null;
  renderAll();
}

function getNodeAt(signal, index) {
  return String(signal.node || "").charAt(index) === "." ? "" : String(signal.node || "").charAt(index);
}

function setNodeAt(signal, index, value) {
  const length = Math.max(signal.wave.length, index + 1);
  const chars = String(signal.node || "").padEnd(length, ".").split("");
  chars[index] = value || ".";
  signal.node = chars.join("").replace(/\.+$/, "");
}

function addEdgeFromForm() {
  const from = els.edgeFrom.value.trim();
  const to = els.edgeTo.value.trim();
  if (!from || !to) {
    alert("请填写连线的起点和终点节点字母。");
    return;
  }
  commit();
  const label = els.edgeLabel.value.trim();
  state.edge.push(`${from}${els.edgeShape.value}${to}${label ? ` ${label}` : ""}`);
  els.edgeFrom.value = "";
  els.edgeTo.value = "";
  els.edgeLabel.value = "";
  state.rawSource = null;
  renderAll();
}

function removeEdgeAt(index) {
  commit();
  state.edge.splice(index, 1);
  state.rawSource = null;
  renderAll();
}

function addRichText() {
  const text = els.richText.value.trim();
  if (!text) {
    alert("请先填写要添加的文字。");
    return;
  }
  commit();
  const target = els.richTarget.value === "foot" ? "foot" : "head";
  const attrs = richTextAttrsFromForm();
  state.richText[target].push({ text, attrs });
  els.richText.value = "";
  els.richFontSize.value = String(DEFAULT_RICH_FONT_SIZE);
  els.richDy.value = "";
  els.richBaseline.value = "";
  resetRichToolbar();
  state.rawSource = null;
  renderAll();
}

function richTextAttrsFromForm() {
  const attrs = {};
  const className = els.richStyle.value.trim();
  const fill = els.richFill.value;
  const fontSize = Number(els.richFontSize.value);
  const dy = Number(els.richDy.value);

  if (className) attrs.class = className;
  if (fill && fill.toLowerCase() !== "#000000") attrs.fill = fill;
  if (Number.isFinite(fontSize) && fontSize > 0 && fontSize !== DEFAULT_RICH_FONT_SIZE) attrs["font-size"] = String(fontSize);
  if (Number.isFinite(dy) && dy !== 0) attrs.dy = String(dy);
  if (els.richBaseline.value) attrs["baseline-shift"] = els.richBaseline.value;
  if (els.richDecoration.value) attrs["text-decoration"] = els.richDecoration.value;
  if (els.richBold.getAttribute("aria-pressed") === "true") attrs["font-weight"] = "bold";
  if (els.richItalic.getAttribute("aria-pressed") === "true") attrs["font-style"] = "italic";

  return attrs;
}

function removeRichTextAt(target, index) {
  commit();
  state.richText[target].splice(index, 1);
  state.rawSource = null;
  renderAll();
}

function renderRichTextList() {
  els.richTextList.innerHTML = "";
  const items = [
    ...state.richText.head.map((item, index) => ({ ...item, target: "head", index })),
    ...state.richText.foot.map((item, index) => ({ ...item, target: "foot", index })),
  ];

  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "edge-empty";
    empty.textContent = "暂无富文本";
    els.richTextList.appendChild(empty);
    return;
  }

  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "edge-item";
    const label = document.createElement("span");
    label.textContent = `${item.target}.${richTextAttrsLabel(item.attrs || (item.className ? { class: item.className } : {}))}: ${item.text}`;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "删除";
    button.addEventListener("click", () => removeRichTextAt(item.target, item.index));
    row.append(label, button);
    els.richTextList.appendChild(row);
  });
}

function richTextAttrsLabel(attrs = {}) {
  const parts = [];
  if (attrs.class) parts.push(attrs.class);
  if (attrs.fill) parts.push(attrs.fill);
  if (attrs["font-size"]) parts.push(`${attrs["font-size"]}px`);
  if (attrs.dy) parts.push(`dy ${attrs.dy}`);
  if (attrs["baseline-shift"]) parts.push(attrs["baseline-shift"]);
  if (attrs["text-decoration"]) parts.push(attrs["text-decoration"]);
  if (attrs["font-weight"]) parts.push(attrs["font-weight"]);
  if (attrs["font-style"]) parts.push(attrs["font-style"]);
  return parts.join(", ") || "default";
}

function renderEdgeList() {
  els.edgeList.innerHTML = "";
  if (!state.edge?.length) {
    const empty = document.createElement("div");
    empty.className = "edge-empty";
    empty.textContent = "暂无连线";
    els.edgeList.appendChild(empty);
    return;
  }

  state.edge.forEach((edge, index) => {
    const item = document.createElement("div");
    item.className = "edge-item";
    const text = document.createElement("span");
    text.textContent = edge;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "删除";
    button.title = "删除这条连线";
    button.addEventListener("click", () => removeEdgeAt(index));
    item.append(text, button);
    els.edgeList.appendChild(item);
  });
}

function renderGroupList() {
  els.groupList.innerHTML = "";
  const grouped = state.signals
    .map((signal, index) => ({ index, name: signal.name, path: formatGroupPath(signal.groupPath) }))
    .filter((item) => item.path);

  if (!grouped.length) {
    const empty = document.createElement("div");
    empty.className = "edge-empty";
    empty.textContent = t("group.empty");
    els.groupList.appendChild(empty);
    return;
  }

  grouped.forEach((item) => {
    const row = document.createElement("div");
    row.className = "edge-item";
    const label = document.createElement("span");
    label.textContent = `${item.name}: ${item.path}`;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = t("button.select");
    button.addEventListener("click", () => {
      state.selected = { signal: item.index, cycle: Math.min(state.selected.cycle, state.signals[item.index].wave.length - 1) };
      renderAll();
    });
    row.append(label, button);
    els.groupList.appendChild(row);
  });
}

function renderGroupControls() {
  const signal = selectedSignal();
  const levels = signal.groupPath?.length ? signal.groupPath : [""];
  els.groupLevels.innerHTML = "";

  levels.forEach((value, index) => {
    const row = document.createElement("div");
    row.className = "group-level-row";
    const input = document.createElement("input");
    input.value = value || "";
    input.dataset.groupLevel = String(index);
    input.setAttribute("list", "groupLevelOptions");
    input.placeholder = t("placeholder.group", { n: index + 1 });
    row.appendChild(input);

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "secondary";
    remove.dataset.removeGroupLevel = String(index);
    remove.textContent = t("button.remove");
    remove.disabled = levels.length === 1 && !value;
    row.appendChild(remove);
    els.groupLevels.appendChild(row);
  });
}

function renderGroupOptions() {
  const datalist = document.querySelector("#groupLevelOptions");
  if (!datalist) return;
  const values = new Set();
  state.signals.forEach((signal) => {
    (signal.groupPath || []).forEach((level) => {
      if (level) values.add(level);
    });
  });
  datalist.innerHTML = [...values].map((value) => `<option value="${escapeHtml(value)}"></option>`).join("");
}

function updateSelectedGroupFromForm() {
  commit();
  const levels = [...els.groupLevels.querySelectorAll("[data-group-level]")]
    .map((input) => input.value.trim())
    .filter(Boolean);
  selectedSignal().groupPath = levels;
  state.rawSource = null;
  renderAll();
}

function parseGroupPath(value) {
  return String(value || "")
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);
}

function formatGroupPath(groupPath) {
  return Array.isArray(groupPath) ? groupPath.filter(Boolean).join("/") : "";
}

function renderWaveHelp(wave) {
  const info = waveInfo(wave);
  const paths = (info.paths || [{ d: info.path }])
    .map((path) => `<path${path.dash ? ' class="dash"' : ""} d="${path.d}" />`)
    .join("");
  els.waveHelp.innerHTML = `
    <svg viewBox="0 0 96 34" aria-hidden="true">
      ${paths}
      ${info.bus ? `<polygon style="fill:${info.color}" points="18 17 28 6 68 6 78 17 68 28 28 28" />` : ""}
    </svg>
    <div>
      <strong>${info.title}</strong>
      <span>${info.desc}</span>
    </div>
  `;
}

function waveInfo(wave) {
  const base = {
    "0": ["低电平 0", "下降沿后保持低电平", "M10 9H24V25H86"],
    "1": ["高电平 1", "上升沿后保持高电平", "M10 25H24V9H86"],
    l: ["低电平 l", "下降沿后保持低电平", "M10 9H24V25H86"],
    h: ["高电平 h", "上升沿后保持高电平", "M10 25H24V9H86"],
    L: ["低电平 L", "带边沿标记的低电平", "M10 9H24V25H86"],
    H: ["高电平 H", "带边沿标记的高电平", "M10 25H24V9H86"],
    p: ["上升沿时钟 p", "低到高再回低的时钟周期", "M10 25H30V9H58V25H86"],
    n: ["下降沿时钟 n", "高到低再回高的时钟周期", "M10 9H30V25H58V9H86"],
    P: ["上升沿箭头 P", "上升沿带工作边沿标记", "M10 25H30V9H58V25H86"],
    N: ["下降沿箭头 N", "下降沿带工作边沿标记", "M10 9H30V25H58V9H86"],
    "=": ["数据段 =", "显示 data 标签的总线段", "M18 17H78"],
    x: ["未知 x", "未知或无效状态", "M10 25L86 9M10 9L86 25"],
    z: ["高阻 z", "高阻态", "M10 17H86"],
    u: ["上拉 u", "弱上拉状态", "M10 25L48 9L86 25"],
    d: ["下拉 d", "弱下拉状态", "M10 9L48 25L86 9"],
    ".": ["保持 .", "延续前一个状态", "M10 17H86"],
    "|": ["断点 |", "在波形中插入视觉间隔", "M48 6V28"],
  };
  const busColors = {
    2: "#ffffff",
    3: "#ffffb4",
    4: "#ffe0b9",
    5: "#b9e0ff",
    6: "#ccfdfe",
    7: "#cdfdc5",
    8: "#f0c1fb",
    9: "#f5c2c0",
  };
  if (/^[2-9]$/.test(wave)) {
    return { title: `数据样式 ${wave}`, desc: "彩色/分组总线数据段", path: "M18 17H78", bus: true, color: busColors[wave] || "#ffffff" };
  }
  const helperPaths = {
    "0": [{ d: "M10 9H24C34 9 36 25 50 25H86" }],
    "1": [{ d: "M10 25H24C34 25 36 9 50 9H86" }],
    l: [{ d: "M10 9H24C34 9 36 25 50 25H86" }],
    h: [{ d: "M10 25H24C34 25 36 9 50 9H86" }],
    L: [{ d: "M10 9H24C34 9 36 25 50 25H86" }],
    H: [{ d: "M10 25H24C34 25 36 9 50 9H86" }],
    x: [
      { d: "M10 25H86" },
      { d: "M10 9H86" },
      { d: "M10 14L24 9M10 20L36 9M18 25L52 9M38 25L72 9M58 25L86 11M76 25L86 20" },
    ],
    z: [{ d: "M10 9H24C38 17 52 17 86 17" }],
    u: [
      { d: "M10 25H24C38 25 36 9 54 9" },
      { d: "M54 9H86", dash: true },
    ],
    d: [
      { d: "M10 9H24C38 9 36 25 54 25" },
      { d: "M54 25H86", dash: true },
    ],
    "|": [
      { d: "M39 29C50 29 48 5 59 5" },
      { d: "M35 29C46 29 44 5 55 5" },
    ],
  };
  const item = base[wave] || base.x;
  if (helperPaths[wave]) {
    return { title: item[0], desc: item[1], path: "", paths: helperPaths[wave], bus: false, color: "#ffffff" };
  }
  return { title: item[0], desc: item[1], path: item[2], bus: wave === "=", color: "#ffffff" };
}

function loadSelectedExample() {
  if (els.exampleSelect.value === "") return;
  const index = Number(els.exampleSelect.value);
  if (!Number.isInteger(index) || !tutorialExamples[index]) return;
  commit();
  applySource(tutorialExamples[index].source, tutorialExamples[index].title);
  renderAll();
}

function importWaveJson(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const source = parseWaveJson(String(reader.result || ""));
      commit();
      applySource(source, file.name.replace(/\.[^.]+$/, "") || "Imported WaveJSON");
      els.exampleSelect.value = "";
      renderAll();
    } catch (error) {
      alert(`导入失败：${error.message}`);
    } finally {
      els.importJsonInput.value = "";
    }
  };
  reader.readAsText(file, "utf-8");
}

function parseWaveJson(text) {
  const source = Function(`"use strict"; return (${text});`)();
  if (!source || typeof source !== "object" || Array.isArray(source)) {
    throw new Error("根节点必须是对象，例如 { signal: [...] }");
  }
  if (!Array.isArray(source.signal) && !Array.isArray(source.assign) && !source.reg) {
    throw new Error("缺少 signal、assign 或 reg 字段");
  }
  return source;
}

function toWaveDromSource() {
  if (state.rawSource) return structuredClone(state.rawSource);

  const lanes = state.signals.map((signal) => {
    const lane = {
      name: signal.name,
      wave: signal.wave.join(""),
    };
    const data = dataValuesForSignal(signal);
    if (data.length) lane.data = data;
    if (signal.period && signal.period !== 1) lane.period = signal.period;
    if (signal.phase) lane.phase = signal.phase;
    if (signal.node) lane.node = signal.node;
    return { lane, groupPath: signal.groupPath || [] };
  });
  const signal = buildGroupedSignals(lanes);

  const source = {
    signal,
    head: {
      tick: 0,
      every: 1,
    },
  };
  source.head.text = richTextValue("head", state.title);

  if (state.edge?.length) source.edge = state.edge;
  const footTock = numericOrBlank(state.footTock);
  if (state.foot?.text || state.richText.foot.length || footTock !== "") {
    source.foot = { text: richTextValue("foot", state.foot.text) };
    if (footTock !== "") source.foot.tock = footTock;
  }
  if (state.config?.hscale !== 1 || state.config?.skin !== "default") {
    source.config = {};
    if (state.config.hscale !== 1) source.config.hscale = state.config.hscale;
    if (state.config.skin !== "default") source.config.skin = state.config.skin;
  }

  return source;
}

function applySource(source, fallbackTitle = "WaveDrom Tutorial Example") {
  const copy = structuredClone(source);
  const headRich = parseRichTextValue(copy.head?.text, fallbackTitle);
  const footRich = parseRichTextValue(copy.foot?.text, "");
  state.rawSource = hasComplexSource(copy) ? copy : null;
  state.title = headRich.baseText;
  state.config = {
    hscale: copy.config?.hscale || 1,
    skin: copy.config?.skin || "default",
  };
  state.edge = Array.isArray(copy.edge) ? copy.edge.slice() : [];
  state.foot = { text: footRich.baseText };
  state.footTock = copy.foot?.tock ?? "";
  state.richText = { head: headRich.items, foot: footRich.items };
  state.signals = flattenEditableSignals(copy.signal);
  if (!state.signals.length) {
    state.signals = [{ name: "signal_1", color: "#2563eb", wave: ["0"], data: [""], period: 1, phase: 0, node: "", groupPath: [] }];
  }
  state.selected = { signal: 0, cycle: Math.max(0, state.signals[0].wave.length - 1) };
}

function hasComplexSignal(signal) {
  if (!Array.isArray(signal)) return false;
  return signal.some((item) => {
    if (Array.isArray(item)) return false;
    if (!item || Object.keys(item).length === 0) return false;
    return !item.name || !item.wave;
  });
}

function hasComplexSource(source) {
  return (
    hasComplexSignal(source.signal) ||
    source.assign ||
    source.reg
  );
}

function parseRichTextValue(value, fallback = "") {
  if (typeof value === "string") return { baseText: value, items: [] };
  if (!Array.isArray(value) || value[0] !== "tspan") return { baseText: fallback, items: [] };

  const result = { baseText: "", items: [] };
  value.slice(1).forEach((part) => {
    if (typeof part === "string") {
      result.baseText += part;
      return;
    }
    if (!Array.isArray(part) || part[0] !== "tspan") return;

    let attrs = {};
    let text = "";
    if (part[1] && typeof part[1] === "object" && !Array.isArray(part[1])) {
      attrs = { ...part[1] };
      text = String(part[2] ?? "");
    } else {
      text = String(part[1] ?? "");
    }
    result.items.push({ text: text.trimEnd(), attrs });
  });

  result.baseText = result.baseText.trimEnd() || fallback;
  return result;
}

function flattenEditableSignals(signal) {
  const lanes = [];
  function walk(items, groupPath = []) {
    if (!Array.isArray(items)) return;
    items.forEach((item) => {
      if (Array.isArray(item)) {
        const [groupName, ...children] = item;
        const nextPath = typeof groupName === "string" ? [...groupPath, groupName] : groupPath;
        walk(children, nextPath);
      } else if (item && item.name && item.wave) {
        lanes.push(toEditableSignal(item, groupPath));
      }
    });
  }
  walk(signal);
  return lanes;
}

function toEditableSignal(lane, groupPath = []) {
  const data = normalizeData(lane.data);
  return {
    name: lane.name,
    color: "#2563eb",
    wave: String(lane.wave).split(""),
    data: labelsByCycle(String(lane.wave), data),
    period: lane.period || 1,
    phase: lane.phase || 0,
    node: lane.node || "",
    groupPath: groupPath.slice(),
  };
}

function normalizeData(data) {
  if (Array.isArray(data)) return data.map(String);
  if (typeof data === "string") return data.trim() ? data.trim().split(/\s+/) : [];
  return [];
}

function labelsByCycle(wave, data) {
  let dataIndex = 0;
  return wave.split("").map((char) => {
    if (char === "=" || /^[2-9]$/.test(char)) {
      const label = data[dataIndex] || "";
      dataIndex += 1;
      return label;
    }
    return "";
  });
}

function normalizeEditableSignals(signals) {
  return (Array.isArray(signals) ? signals : []).map((signal) => ({
    ...signal,
    groupPath: Array.isArray(signal.groupPath) ? signal.groupPath : [],
  }));
}

function buildGroupedSignals(items) {
  const root = [];

  items.forEach(({ lane, groupPath }) => {
    let level = root;
    parseGroupPath(formatGroupPath(groupPath)).forEach((groupName) => {
      const last = level[level.length - 1];
      if (Array.isArray(last) && last[0] === groupName) {
        level = last;
        return;
      }
      const group = [groupName];
      level.push(group);
      level = group;
    });
    level.push(lane);
  });

  return root;
}

/*
function toWaveDromSourceOld() {
  return {
    signal: [
      ...state.signals.map((signal) => ({
        name: signal.name,
        wave: signal.wave.join(""),
        data: dataValuesForSignal(signal),
      })),
    ],
    head: {
      text: state.title,
      tick: 0,
      every: 1,
    },
  };
}
*/

function dataValuesForSignal(signal) {
  return signal.wave.reduce((values, wave, index) => {
    const isDataSegment = wave === "=" || /^[2-9]$/.test(wave);
    if (isDataSegment) values.push(signal.data[index] || " ");
    return values;
  }, []);
}

function numericOrBlank(value) {
  if (value === "" || value === null || value === undefined) return "";
  const number = Number(value);
  return Number.isFinite(number) ? number : "";
}

function richTextValue(target, fallback) {
  const items = state.richText[target] || [];
  if (!items.length) return fallback || "";
  return [
    "tspan",
    ...(fallback ? [fallback.endsWith(" ") ? fallback : `${fallback} `] : []),
    ...items.map((item) => {
      const text = item.text.endsWith(" ") ? item.text : `${item.text} `;
      const attrs = item.attrs || (item.className ? { class: item.className } : {});
      return Object.keys(attrs).length ? ["tspan", attrs, text] : ["tspan", text];
    }),
  ];
}

function renderPreview() {
  const source = toWaveDromSource();
  els.jsonOutput.textContent = formatWaveJson(source);

  if (window.WaveDrom) {
    renderWithWaveDrom(source);
    return;
  }

  renderWaveDromLikeSvg();
}

function renderWithWaveDrom(source) {
  els.wavePreview.innerHTML = '<div id="WaveDrom_Display_0"></div>';

  try {
    if (window.WaveDrom.RenderWaveForm) {
      window.WaveDrom.RenderWaveForm(0, source, "WaveDrom_Display_");
      return;
    }
  } catch {
    renderWaveDromLikeSvg();
  }

  renderWaveDromLikeSvg();
}

function renderWaveDromLikeSvg() {
  const width = Math.max(720, 150 + maxCycles() * 64);
  const rowHeight = 46;
  const height = 48 + state.signals.length * rowHeight;
  const rows = state.signals
    .map((signal, index) => renderWaveDromLikeRow(signal, index, rowHeight))
    .join("");
  const grid = Array.from({ length: maxCycles() + 1 }, (_, index) => {
    const x = 130 + index * 64;
    return `<line class="wd-grid" x1="${x}" y1="24" x2="${x}" y2="${height - 14}" />`;
  }).join("");

  els.wavePreview.innerHTML = `
    <svg class="wd-fallback" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${escapeHtml(state.title)}">
      <style>
        .wd-fallback { background: #fff; color: #000; }
        .wd-name { font: 14px Arial, Helvetica, sans-serif; fill: #000; }
        .wd-label { font: 12px Arial, Helvetica, sans-serif; fill: #000; text-anchor: middle; dominant-baseline: central; }
        .wd-wave { fill: none; stroke: #000; stroke-width: 1.5; stroke-linejoin: round; stroke-linecap: square; }
        .wd-bus { fill: #fff; stroke: #000; stroke-width: 1.5; }
        .wd-grid { stroke: #ddd; stroke-width: 1; }
        .wd-note { font: 11px Arial, Helvetica, sans-serif; fill: #777; }
      </style>
      <rect x="0" y="0" width="${width}" height="${height}" fill="#fff" />
      ${grid}
      ${rows}
      <text class="wd-note" x="18" y="${height - 8}">WaveDrom CDN 未加载，当前显示接近 WaveDrom 的本地预览</text>
    </svg>
  `;
}

function renderWaveDromLikeRow(signal, index, rowHeight) {
  const y = 34 + index * rowHeight;
  const startX = 130;
  const step = 64;
  const highY = y;
  const lowY = y + 28;
  const midY = y + 14;
  const parts = signal.wave
    .map((wave, cycleIndex) => {
      const x = startX + cycleIndex * step;
      const label = signal.data[cycleIndex];
      if (label) return busSegment(label, x, highY, lowY, step);
      return `<path class="wd-wave" d="${segmentPath(wave, x, highY, lowY, step)}" />`;
    })
    .join("");
  const labels = signal.data
    .map((label, cycleIndex) =>
      label
        ? `<text class="wd-label" x="${startX + cycleIndex * step + step / 2}" y="${midY}">${escapeHtml(label)}</text>`
        : "",
    )
    .join("");

  return `
    <text class="wd-name" x="18" y="${midY + 5}">${escapeHtml(signal.name)}</text>
    ${parts}
    ${labels}
  `;
}

function busSegment(label, x, highY, lowY, step) {
  const midY = (highY + lowY) / 2;
  const points = [
    `${x} ${midY}`,
    `${x + 10} ${highY}`,
    `${x + step - 10} ${highY}`,
    `${x + step} ${midY}`,
    `${x + step - 10} ${lowY}`,
    `${x + 10} ${lowY}`,
  ].join(" ");
  return `<polygon class="wd-bus" points="${points}" data-label="${escapeHtml(label)}" />`;
}

function segmentPath(wave, x, highY, lowY, step) {
  if (wave === "1") return `M${x} ${highY}H${x + step}`;
  if (wave === "0") return `M${x} ${lowY}H${x + step}`;
  if (wave === "h") return `M${x} ${highY}H${x + step}`;
  if (wave === "l") return `M${x} ${lowY}H${x + step}`;
  if (wave === "=") return `M${x} ${highY}L${x + 10} ${lowY}H${x + step - 10}L${x + step} ${highY}`;
  if (/^[2-9]$/.test(wave)) return `M${x} ${highY}L${x + 10} ${lowY}H${x + step - 10}L${x + step} ${highY}`;
  if (wave === "p") return `M${x} ${lowY}H${x + step * 0.25}V${highY}H${x + step * 0.65}V${lowY}H${x + step}`;
  if (wave === "n") return `M${x} ${highY}H${x + step * 0.25}V${lowY}H${x + step * 0.65}V${highY}H${x + step}`;
  if (wave === "P") return `M${x} ${lowY}H${x + step * 0.25}V${highY}H${x + step * 0.65}V${lowY}H${x + step}m${-step * 0.35} -28l6 6m-6 -6l-6 6`;
  if (wave === "N") return `M${x} ${highY}H${x + step * 0.25}V${lowY}H${x + step * 0.65}V${highY}H${x + step}m${-step * 0.35} 28l6 -6m-6 6l-6 -6`;
  if (wave === "x") return `M${x} ${lowY}L${x + step} ${highY}M${x} ${highY}L${x + step} ${lowY}`;
  if (wave === "z") return `M${x} ${(highY + lowY) / 2}H${x + step}`;
  if (wave === "u") return `M${x} ${lowY}L${x + step / 2} ${highY}L${x + step} ${lowY}`;
  if (wave === "d") return `M${x} ${highY}L${x + step / 2} ${lowY}L${x + step} ${highY}`;
  return `M${x} ${(highY + lowY) / 2}H${x + step}`;
}

function maxCycles() {
  return Math.max(...state.signals.map((signal) => signal.wave.length));
}

function exportJson() {
  download("wavedrom-diagram.js", formatWaveJson(toWaveDromSource()), "text/javascript");
}

function exportSvg() {
  const svg = els.wavePreview.querySelector("svg");
  if (!svg) return;
  download("wavedrom-diagram.svg", serializeSvg(svg), "image/svg+xml");
}

function exportPng() {
  const svg = els.wavePreview.querySelector("svg");
  if (!svg) return;

  const svgBlob = new Blob([serializeSvg(svg)], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);
  const image = new Image();

  image.onload = () => {
    const canvas = document.createElement("canvas");
    const width = Number(svg.getAttribute("width")) || svg.viewBox.baseVal.width || image.width;
    const height = Number(svg.getAttribute("height")) || svg.viewBox.baseVal.height || image.height;
    canvas.width = Math.ceil(width);
    canvas.height = Math.ceil(height);
    const context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0);
    URL.revokeObjectURL(url);
    canvas.toBlob((blob) => {
      if (!blob) return;
      downloadBlob("wavedrom-diagram.png", blob);
    }, "image/png");
  };

  image.onerror = () => URL.revokeObjectURL(url);
  image.src = url;
}

function download(filename, content, type) {
  const blob = new Blob([content], { type });
  downloadBlob(filename, blob);
}

function downloadBlob(filename, blob) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function serializeSvg(svg) {
  const clone = svg.cloneNode(true);
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  return [
    '<?xml version="1.0" standalone="no"?>',
    '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">',
    "<!-- Created with WaveDrom GUI -->",
    new XMLSerializer().serializeToString(clone),
  ].join("\n");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return entities[char];
  });
}

function formatWaveJson(source) {
  return formatValue(source, 0);
}

function formatValue(value, indent) {
  const pad = " ".repeat(indent);
  const childPad = " ".repeat(indent + 2);

  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    const lines = ["["];
    value.forEach((item, index) => {
      lines.push(`${childPad}${formatValue(item, indent + 2)}${index === value.length - 1 ? "" : ","}`);
    });
    lines.push(`${pad}]`);
    return lines.join("\n");
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value).filter(([, entryValue]) => entryValue !== undefined && entryValue !== null);
    if (!entries.length) return "{}";
    const lines = ["{"];
    entries.forEach(([key, entryValue], index) => {
      lines.push(`${childPad}${formatKey(key)}: ${formatValue(entryValue, indent + 2)}${index === entries.length - 1 ? "" : ","}`);
    });
    lines.push(`${pad}}`);
    return lines.join("\n");
  }

  if (typeof value === "string") return quoteJs(value);
  return String(value);
}

function quoteJs(value) {
  return `'${String(value).replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
}

function formatKey(key) {
  return /^[A-Za-z_$][\w$]*$/.test(key) ? key : quoteJs(key);
}
