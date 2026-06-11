# WaveDrom GUI SaaS Prototype

这是一个零构建依赖的静态原型，用于验证 WaveDrom 在线可视化编辑器的主页、打赏入口和基础编辑器交互。

## 使用方式

直接用浏览器打开 `index.html`。

## 已实现

- 主页导航：说明文档、快速开始、作者/支持
- 打赏入口：顶部、主页按钮、编辑器按钮，弹窗展示支付宝/微信占位二维码与 PayPal/Stripe 链接
- 编辑器：文档标题、信号行、周期新增、周期类型编辑、标签编辑、period/phase、node/edge、hscale、skin、foot.text
- 周期编辑：每个信号行尾部 `+` 在当前选中周期后插入，`-` 删除当前选中周期
- 信号行编辑：信号表底部 `+ 新增信号行` 新增信号，每行尾部 `×` 删除当前信号行
- 侧边栏高级选项带鼠标悬停说明
- 教程示例：内置 `tutorial.html` 的 14 个 WaveDrom 示例入口，覆盖 signal、clock、bus、gap、group、period/phase、hscale、skin、head/foot、node/edge、代码生成
- 撤销/重做
- 导出 WaveJSON（官网教程同款 JavaScript 对象语法）
- 导出 SVG
- 导出 PNG
- WaveDrom CDN 渲染，失败时使用内置 SVG 预览兜底
- 白色/深色主题切换

## 预览说明

实时预览区域右上角会显示当前渲染器：

- `WaveDrom 官方渲染`：使用项目内置的官方 `vendor/wavedrom/skins/default.js` 和 `vendor/wavedrom/wavedrom.min.js`，视觉效果以官方 WaveDrom 为准。
- `本地近似预览`：官方脚本未加载成功时启用，只用于避免空白，不保证和 WaveDrom 完全一致。

## WaveJSON 与 JSON

WaveDrom 官网教程里的写法是 WaveJSON/JavaScript 对象字面量，例如：

```js
{
  signal: [
    { name: 'clk', wave: 'p.....|...' },
  ],
  head: {
    tick: 0,
    every: 1
  },
}
```

它不是严格 JSON。严格 JSON 必须写成 `"signal"`、`"name"` 这种双引号 key。官方编辑器内部使用 `eval("(" + text + ")")` 解析，因此官网教程写法、单引号、尾逗号都能工作。本原型默认展示和导出官网教程同款 WaveJSON。

## 官方资源

`vendor/wavedrom` 中的 `wavedrom.min.js` 和 `skins/*.js` 来自官方 `wavedrom-editor-v3.5.0-win-x64` 包，避免 CDN 版本和网络加载差异。

## 教程示例 UI 覆盖方式

侧边栏的“教程示例”可以一键载入官网教程中的全部渲染示例。普通信号行会映射到图形化周期编辑 UI；分组、富文本 head/foot、复杂 arrow、代码生成这类高级示例会保留官方 source 原样渲染，同时尽量把普通 lane 展平到 UI 中查看和继续编辑。编辑任意周期或高级字段后，会切换回当前 UI 可表达的数据结构。

## 后续可接入

- 真实收款二维码或支付链接
- 账号系统和云端保存
- PNG 导出
- 拖拽调整行顺序和周期位置
- 更完整的 WaveDrom 语法配置
