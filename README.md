# WaveDrom GUI

WaveDrom GUI 是一个面向时序图绘制的在线可视化编辑器。它基于 [WaveDrom](https://wavedrom.com/) 官方渲染器，把 WaveJSON 语法转换成更容易上手的图形化界面：编辑信号行、修改周期、添加数据标签、创建分组和节点连线，然后实时预览并导出结果。

在线访问：[https://isyefeng.github.io/wavedrom-gui/](https://isyefeng.github.io/wavedrom-gui/)

## 适合谁使用

- 数字电路、FPGA、芯片验证、嵌入式和通信协议相关开发者。
- 需要快速绘制时钟、数据总线、valid/ready、握手时序图的人。
- 想使用 WaveDrom 官方语法，但不想纯手写 WaveJSON 的用户。

## 主要功能

- 可视化编辑信号行和每个时钟周期。
- 支持 WaveDrom 常用 wave 字符：电平、时钟、数据总线、未知态、高阻、上拉、下拉、断点。
- 支持数据标签，例如 `ACK`、`0x3A`、`CMD`。
- 支持多级信号分组，对应 WaveDrom 官方嵌套 `signal` 数组。
- 支持节点和连线，对应 `node` 与 `edge`。
- 支持标题、页脚和富文本，包括颜色、字号、粗体、斜体、上下标、装饰线和位置偏移。
- 支持 `period`、`phase`、`config.hscale`、`config.skin`。
- 内置 WaveDrom 官网教程示例，可一键载入学习。
- 提供独立教程页，包含基础编辑、节点连线、信号分组、外观和富文本等 GIF 演示。
- 支持导入 WaveJSON，导出 WaveJSON、SVG、PNG。
- 支持中文/英文界面和浅色/深色主题。

## 快速使用

1. 打开网站，点击“快速开始”进入编辑器。
2. 在上方表格中点击一个周期。
3. 在左侧“周期”面板选择波形类型，并按需要填写标签文字。
4. 在“信号分组”“节点与连线”“文字”“外观”等面板补充高级配置。
5. 在“实时预览”查看官方 WaveDrom 渲染效果。
6. 用预览窗口导出 SVG/PNG，或用 WaveJSON 窗口导入/导出源文件。

## WaveDrom 语法对应关系

| WaveDrom 字段 | 本工具中的位置 |
| --- | --- |
| `signal[].name` | 表格左侧信号名称 |
| `signal[].wave` | 左侧“周期”面板的波形类型 |
| `signal[].data` | “标签文字”输入框 |
| `signal[].period` | “周期”输入框 |
| `signal[].phase` | “相位”输入框 |
| 嵌套 `signal` 数组 | “信号分组”面板 |
| `node` / `edge` | “节点与连线”面板 |
| `head.text` / `foot.text` | “文档”和“文字”面板 |
| `foot.tock` | “页脚偏移”输入框 |
| `config.hscale` | “外观”面板的“横向缩放” |
| `config.skin` | “外观”面板的“皮肤样式” |

## WaveJSON 示例

WaveDrom 官网教程使用的是 JavaScript 对象风格的 WaveJSON，不是严格 JSON。因此未加引号的 key、单引号字符串和尾逗号都可以被官方编辑器接受。本工具也支持这种写法。

```js
{
  signal: [
    { name: 'clk', wave: 'Pp........Pp' },
    { name: 'data', wave: 'x=.=x', data: ['0x3A', 'ACK'] },
    { name: 'valid', wave: '0.1.0' },
  ],
  head: {
    tick: 0,
    every: 1,
  },
}
```

## 本地运行

这个项目是纯静态页面，不需要后端服务。直接用浏览器打开 `index.html` 即可。

如果浏览器限制本地文件脚本，也可以用任意静态服务器运行，例如：

```bash
python -m http.server 8080
```

然后访问 `http://127.0.0.1:8080/`。

## 许可

本项目使用 WaveDrom JS，WaveDrom 遵循 MIT License。用户创建和导出的时序图内容归用户所有。

项目反馈与建议请使用 GitHub Issues：

[https://github.com/isyefeng/wavedrom-gui/issues](https://github.com/isyefeng/wavedrom-gui/issues)
