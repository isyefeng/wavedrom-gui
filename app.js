const state = {
  title: "Untitled Timing Diagram",
  selected: { signal: 0, cycle: 5 },
  config: { hscale: 1, skin: "default" },
  edge: [],
  foot: { text: "" },
  rawSource: null,
  signals: [
    { name: "clk", color: "#e05d3c", wave: ["p", "p", "p", "p", "p", "p"], data: ["", "", "", "", "", ""], period: 1, phase: 0, node: "" },
    { name: "data", color: "#176b87", wave: ["x", "=", ".", "=", "=", "x"], data: ["", "0x3A", "", "CMD", "ACK", ""], period: 1, phase: 0, node: "" },
    { name: "valid", color: "#188f67", wave: ["0", "0", "1", ".", "0", "."], data: ["", "", "", "", "", ""], period: 1, phase: 0, node: "" },
  ],
};

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
  els.hscaleInput = document.querySelector("#hscaleInput");
  els.skinSelect = document.querySelector("#skinSelect");
  els.footText = document.querySelector("#footText");
  els.importJsonInput = document.querySelector("#importJsonInput");
  els.donateDialog = document.querySelector("#donateDialog");

  tutorialExamples.forEach((example, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = example.title;
    els.exampleSelect.appendChild(option);
  });
}

function bindEvents() {
  document.querySelectorAll("[data-start]").forEach((button) => {
    button.addEventListener("click", () => setView("editor"));
  });

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  document.querySelectorAll("[data-donate]").forEach((button) => {
    button.addEventListener("click", () => els.donateDialog.showModal());
  });

  document.querySelector("#themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  document.querySelector("#loadExample").addEventListener("click", loadSelectedExample);
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
}

function setView(view) {
  const isEditor = view === "editor";
  els.homeView.classList.toggle("is-hidden", isEditor);
  els.editorView.classList.toggle("is-hidden", !isEditor);
}

function commit() {
  history.push(JSON.stringify(state));
  if (history.length > 80) history.shift();
  future.length = 0;
}

function restore(snapshot) {
  const parsed = JSON.parse(snapshot);
  state.title = parsed.title;
  state.selected = parsed.selected;
  state.signals = parsed.signals;
  state.config = parsed.config || { hscale: 1, skin: "default" };
  state.edge = parsed.edge || [];
  state.foot = parsed.foot || { text: "" };
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

    const name = document.createElement("input");
    name.className = "signal-name";
    name.value = signal.name;
    name.addEventListener("input", (event) => {
      commit();
      signal.name = event.target.value;
      renderPreview();
    });
    row.appendChild(name);

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
  renderWaveHelp(cycle.wave);
  renderEdgeList();
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

function renderWaveHelp(wave) {
  const info = waveInfo(wave);
  els.waveHelp.innerHTML = `
    <svg viewBox="0 0 96 34" aria-hidden="true">
      <path d="${info.path}" />
      ${info.bus ? '<polygon points="18 17 28 6 68 6 78 17 68 28 28 28" />' : ""}
    </svg>
    <div>
      <strong>${info.title}</strong>
      <span>${info.desc}</span>
    </div>
  `;
}

function waveInfo(wave) {
  const base = {
    "0": ["低电平 0", "稳定低电平", "M10 25H86"],
    "1": ["高电平 1", "稳定高电平", "M10 9H86"],
    l: ["低电平 l", "低电平，常用于和时钟混合", "M10 25H86"],
    h: ["高电平 h", "高电平，常用于和时钟混合", "M10 9H86"],
    L: ["低电平 L", "带箭头样式的低电平", "M10 25H86"],
    H: ["高电平 H", "带箭头样式的高电平", "M10 9H86"],
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
  if (/^[2-9]$/.test(wave)) return { title: `数据样式 ${wave}`, desc: "彩色/分组总线数据段", path: "M18 17H78", bus: true };
  const item = base[wave] || base.x;
  return { title: item[0], desc: item[1], path: item[2], bus: wave === "=" };
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

  const signal = state.signals.map((signal) => {
    const lane = {
      name: signal.name,
      wave: signal.wave.join(""),
    };
    const data = dataValuesForSignal(signal);
    if (data.length) lane.data = data;
    if (signal.period && signal.period !== 1) lane.period = signal.period;
    if (signal.phase) lane.phase = signal.phase;
    if (signal.node) lane.node = signal.node;
    return lane;
  });

  const source = {
    signal,
    head: {
      text: state.title,
      tick: 0,
      every: 1,
    },
  };

  if (state.edge?.length) source.edge = state.edge;
  if (state.foot?.text) source.foot = { text: state.foot.text };
  if (state.config?.hscale !== 1 || state.config?.skin !== "default") {
    source.config = {};
    if (state.config.hscale !== 1) source.config.hscale = state.config.hscale;
    if (state.config.skin !== "default") source.config.skin = state.config.skin;
  }

  return source;
}

function applySource(source, fallbackTitle = "WaveDrom Tutorial Example") {
  const copy = structuredClone(source);
  state.rawSource = hasComplexSource(copy) ? copy : null;
  state.title = copy.head?.text || fallbackTitle;
  state.config = {
    hscale: copy.config?.hscale || 1,
    skin: copy.config?.skin || "default",
  };
  state.edge = Array.isArray(copy.edge) ? copy.edge.slice() : [];
  state.foot = { text: copy.foot?.text || "" };
  state.signals = flattenEditableSignals(copy.signal);
  if (!state.signals.length) {
    state.signals = [{ name: "signal_1", color: "#2563eb", wave: ["0"], data: [""], period: 1, phase: 0, node: "" }];
  }
  state.selected = { signal: 0, cycle: Math.max(0, state.signals[0].wave.length - 1) };
}

function hasComplexSignal(signal) {
  return Array.isArray(signal) && signal.some((item) => Array.isArray(item) || !item.name || !item.wave);
}

function hasComplexSource(source) {
  return (
    hasComplexSignal(source.signal) ||
    Array.isArray(source.head?.text) ||
    Array.isArray(source.foot?.text) ||
    source.assign ||
    source.reg
  );
}

function flattenEditableSignals(signal) {
  const lanes = [];
  function walk(items) {
    if (!Array.isArray(items)) return;
    items.forEach((item) => {
      if (Array.isArray(item)) {
        walk(item.slice(1));
      } else if (item && item.name && item.wave) {
        lanes.push(toEditableSignal(item));
      }
    });
  }
  walk(signal);
  return lanes;
}

function toEditableSignal(lane) {
  const data = normalizeData(lane.data);
  return {
    name: lane.name,
    color: "#2563eb",
    wave: String(lane.wave).split(""),
    data: labelsByCycle(String(lane.wave), data),
    period: lane.period || 1,
    phase: lane.phase || 0,
    node: lane.node || "",
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
