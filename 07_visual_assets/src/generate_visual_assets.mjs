#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const OUT = path.join(ROOT, '07_visual_assets', 'exports');
fs.mkdirSync(OUT, { recursive: true });

const C = {
  navy: '#102A43', text: '#243B53', muted: '#627D98', grid: '#D9E2EC',
  light: '#F5F7FA', blue: '#1769AA', blue2: '#5B9ABD', paleBlue: '#EAF3F8',
  teal: '#168AAD', paleTeal: '#E9F5F5', amber: '#B7791F', paleAmber: '#FFF7E6',
  slate: '#52606D', paleSlate: '#EEF2F6', orange: '#C65D18', red: '#B42318',
  paleRisk: '#FFF1E8', white: '#FFFFFF',
};
const FONT = `'Noto Sans SC','Noto LS Base','Noto LS Static','Noto LS Living','Noto LS Clocks','Noto LS Rail','Noto LS Zipper','Noto LS Open','Noto LS Light','Source Han Sans SC','Microsoft YaHei','Noto Sans',Arial,sans-serif`;

function esc(s) {
  return String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function text(x, y, s, size = 28, opts = {}) {
  const { fill = C.text, weight = 400, anchor = 'start', baseline = 'middle', opacity = 1,
    cls = '', transform = '', letterSpacing = 0 } = opts;
  return `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" dominant-baseline="${baseline}" opacity="${opacity}" class="${cls}"${transform ? ` transform="${transform}"` : ''}${letterSpacing ? ` letter-spacing="${letterSpacing}"` : ''}>${esc(s)}</text>`;
}

function multiline(x, y, lines, size = 28, opts = {}) {
  const { fill = C.text, weight = 400, anchor = 'start', lineHeight = Math.round(size * 1.35), opacity = 1 } = opts;
  const spans = lines.map((s, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : lineHeight}">${esc(s)}</tspan>`).join('');
  return `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" dominant-baseline="hanging" opacity="${opacity}">${spans}</text>`;
}

function rect(x, y, w, h, opts = {}) {
  const { fill = 'none', stroke = 'none', strokeWidth = 0, rx = 0, opacity = 1, dash = '' } = opts;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function line(x1, y1, x2, y2, opts = {}) {
  const { stroke = C.grid, strokeWidth = 2, dash = '', markerEnd = '', opacity = 1 } = opts;
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${strokeWidth}"${dash ? ` stroke-dasharray="${dash}"` : ''}${markerEnd ? ` marker-end="url(#${markerEnd})"` : ''} opacity="${opacity}"/>`;
}

function circle(cx, cy, r, opts = {}) {
  const { fill = C.white, stroke = 'none', strokeWidth = 0 } = opts;
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;
}

function baseSvg({ width, height, title: titleText, desc, body }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">${esc(titleText)}</title><desc id="desc">${esc(desc)}</desc>
  <defs><style>text { font-family: ${FONT}; } .en { font-family: 'Noto Sans', Arial, sans-serif; }</style>
    <marker id="arrow-blue" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth"><path d="M 0 0 L 10 5 L 0 10 z" fill="${C.blue}"/></marker>
    <marker id="arrow-muted" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth"><path d="M 0 0 L 10 5 L 0 10 z" fill="${C.muted}"/></marker>
  </defs>${rect(0, 0, width, height, { fill: C.white })}${body}</svg>`;
}

function header(titleText, subtitle, width) {
  return [text(72, 64, titleText, 42, { fill: C.navy, weight: 700 }),
    text(72, 116, subtitle, 24, { fill: C.muted }),
    line(72, 145, width - 72, 145, { stroke: C.grid, strokeWidth: 2 })].join('\n');
}

function write(name, svg) { fs.writeFileSync(path.join(OUT, `${name}.svg`), svg, 'utf8'); }

function figure01() {
  const width = 1600, height = 900;
  const years = Array.from({ length: 19 }, (_, i) => 2006 + i);
  const values = [12, 13, 13, 14, 6, 11, 21, 14, 12, 11, 11, 3, 7, 4, 7, 6, 10, 10, 10];
  const plot = { x: 118, y: 188, w: 1398, h: 470 }, max = 25, slot = plot.w / years.length, barW = 42;
  const p = [header('LS 专利布局持续约 20 年，近年仍有公开研发活动', '2006–2024 · earliest priority · PPT-DATA-FROZEN-v1', width)];
  for (const tick of [0, 5, 10, 15, 20, 25]) {
    const y = plot.y + plot.h - (tick / max) * plot.h;
    p.push(line(plot.x, y, plot.x + plot.w, y, { stroke: tick === 0 ? C.muted : C.grid, strokeWidth: tick === 0 ? 2.5 : 1.5 }));
    p.push(text(plot.x - 18, y, tick, 22, { fill: C.muted, anchor: 'end' }));
  }
  p.push(text(35, plot.y + plot.h / 2, 'Family / invention-branch count', 22, { fill: C.muted, anchor: 'middle', transform: `rotate(-90 35 ${plot.y + plot.h / 2})`, cls: 'en' }));
  years.forEach((year, i) => {
    const val = values[i], x = plot.x + i * slot + (slot - barW) / 2, h = (val / max) * plot.h, y = plot.y + plot.h - h;
    const fill = year >= 2021 ? C.blue : (year === 2012 ? C.teal : C.blue2);
    p.push(rect(x, y, barW, h, { fill, rx: 4 }));
    p.push(text(x + barW / 2, y - 18, val, 22, { weight: 700, anchor: 'middle' }));
    p.push(text(x + barW / 2, plot.y + plot.h + 34, year, 20, { fill: C.muted, anchor: 'middle', cls: 'en' }));
  });
  const stages = [[2006, 2009, '基础测高'], [2010, 2015, 'Process-aware / 能力扩展'], [2016, 2020, '阵列化 / 数字化'], [2021, 2024, '高吞吐 / map 协同']];
  stages.forEach(([a, b, label], idx) => {
    const x = plot.x + (a - 2006) * slot + 6, w = (b - a + 1) * slot - 12;
    p.push(rect(x, 735, w, 48, { fill: idx === 3 ? C.paleBlue : C.light, rx: 8 }));
    p.push(text(x + w / 2, 760, label, 20, { fill: idx === 3 ? C.blue : C.muted, weight: 600, anchor: 'middle' }));
  });
  p.push(text(72, 850, '统一检索口径下相关 Patent Family / invention-branch 样本；按 earliest priority 统计。', 22, { fill: C.muted }));
  return baseSvg({ width, height, title: 'LS 专利年度活跃趋势', desc: '2006 至 2024 年冻结样本年度柱状图。', body: p.join('\n') });
}

function figure02() {
  const width = 1600, height = 900;
  const data = [['SMEE', 100], ['ASML', 36], ['Canon', 23], ['Nikon', 17], ['Others', 12], ['CAS-related institutes', 7]];
  const p = [header('统一检索样本中的主要申请人', '公开专利布局强度 · Patent Family / invention-branch count', width)];
  const x0 = 390, maxW = 1020, max = 105;
  data.forEach(([name, value], i) => {
    const y = 215 + i * 92, w = (value / max) * maxW;
    const fill = name === 'Others' ? C.slate : (name === 'SMEE' ? C.blue : C.blue2);
    p.push(text(x0 - 30, y + 28, name, 29, { weight: name === 'SMEE' ? 700 : 600, anchor: 'end', cls: 'en' }));
    p.push(rect(x0, y, maxW, 56, { fill: C.light, rx: 6 }), rect(x0, y, w, 56, { fill, rx: 6 }));
    p.push(text(Math.min(x0 + w + 18, 1490), y + 29, value, 28, { fill: C.navy, weight: 700, cls: 'en' }));
  });
  p.push(line(x0, 190, x0, 775, { stroke: C.muted, strokeWidth: 2 }));
  p.push(text(72, 835, '数量代表公开专利布局强度，不等同于技术领先性、有效权利要求数量或市场份额。', 22, { fill: C.muted }));
  return baseSvg({ width, height, title: '主要申请人公开布局', desc: '冻结样本中主要申请人的横向条形图。', body: p.join('\n') });
}

function interpHex(a, b, t) {
  const pa = a.match(/\w\w/g).map((v) => parseInt(v, 16)), pb = b.match(/\w\w/g).map((v) => parseInt(v, 16));
  return `#${pa.map((v, i) => Math.round(v + (pb[i] - v) * t).toString(16).padStart(2, '0')).join('')}`;
}

function figure03() {
  const width = 1600, height = 900, periods = ['2006–2010', '2011–2015', '2016–2020', '2021–2024'];
  const rows = [['SMEE', [26, 48, 18, 8]], ['ASML', [7, 5, 9, 15]], ['Canon', [14, 3, 2, 4]], ['Nikon', [9, 7, 1, 0]], ['CAS', [0, 4, 1, 2]]];
  const p = [header('主要厂商在什么时期持续布局？', 'Applicant × earliest-priority period · 单元格为冻结样本记录数', width)];
  const x0 = 430, y0 = 238, cw = 248, ch = 104;
  periods.forEach((s, i) => p.push(text(x0 + i * cw + cw / 2, 194, s, 27, { fill: C.navy, weight: 700, anchor: 'middle', cls: 'en' })));
  rows.forEach(([name, vals], r) => {
    p.push(text(x0 - 38, y0 + r * ch + ch / 2, name, 30, { weight: 700, anchor: 'end', cls: 'en' }));
    vals.forEach((v, c) => {
      const fill = v === 0 ? C.light : interpHex(C.paleBlue, C.blue, Math.pow(v / 48, 0.68)), fg = v >= 22 ? C.white : C.navy;
      p.push(rect(x0 + c * cw + 5, y0 + r * ch + 5, cw - 10, ch - 10, { fill, rx: 10, stroke: C.white, strokeWidth: 2 }));
      p.push(text(x0 + c * cw + cw / 2, y0 + r * ch + ch / 2, v, 34, { fill: fg, weight: 700, anchor: 'middle', cls: 'en' }));
    });
  });
  p.push(text(72, 815, '数字直接显示；色深仅帮助定位高密度时期，不替代数值读取。CAS = 中国科学院相关机构。', 22, { fill: C.muted }));
  return baseSvg({ width, height, title: '主要厂商布局时间分布', desc: '主要申请人在四个时间段的冻结样本记录数矩阵。', body: p.join('\n') });
}

function routeNode(x, y, w, h, lines, accent) {
  return [rect(x, y, w, h, { fill: C.white, stroke: C.grid, strokeWidth: 2, rx: 12 }),
    rect(x, y, 8, h, { fill: accent, rx: 4 }),
    multiline(x + 24, y + 25, lines, 24, { weight: 650, lineHeight: 36 })].join('\n');
}

function figure04() {
  const width = 1800, height = 980;
  const lanes = [
    { company: 'ASML', focus: '工艺物理 → 整机集成', accent: C.blue,
      nodes: [['宽谱 / 偏振差分'], ['UVLS / process', 'selectivity'], ['阵列直采 + 动态量程', '+ 多通道'], ['sensor fusion /', '大视场 relay']] },
    { company: 'Nikon', focus: '膜栈误差可观测、可补偿', accent: C.teal,
      nodes: [['多点斜入射'], ['反射率 / 环境补偿'], ['多波长 × 偏振 /', 'GH 补偿'], ['pixel filtering /', 'spatial multiplex']] },
    { company: 'Canon', focus: '测量 → stage / scanning control', accent: C.amber,
      nodes: [['多点 / 多波长测量'], ['双工位基准', '+ 多量程'], ['大区域 / 邻场测量', '+ scanning control']] },
    { company: 'SMEE / 中国研发', focus: '光学头 → 多路系统集成', accent: C.slate,
      nodes: [['宽谱 / 粗精测量'], ['工艺适应 / 归一化'], ['偏振差分 / 子光栅', '/ 漂移监测'], ['多路同步 /', '数字解调']] },
  ];
  const p = [header('四家主要厂商：同源基础，不同长期技术重心', '每条路线仅保留冻结结论中的 3–4 个主阶段', width)];
  const laneY = [190, 382, 574, 766], laneX = 430, laneW = 1290, laneH = 150;
  lanes.forEach((lane, i) => {
    const y = laneY[i];
    p.push(rect(72, y, width - 144, laneH, { fill: i % 2 === 0 ? C.light : C.white, rx: 12 }));
    p.push(rect(72, y, 8, laneH, { fill: lane.accent, rx: 4 }));
    p.push(text(102, y + 48, lane.company, 33, { fill: C.navy, weight: 750, cls: 'en' }));
    p.push(text(102, y + 99, lane.focus, 21, { fill: C.muted, weight: 500 }));
    const n = lane.nodes.length, gap = 58, nodeW = (laneW - gap * (n - 1)) / n, nodeY = y + 24, nodeH = 102;
    lane.nodes.forEach((nodeLines, j) => {
      const x = laneX + j * (nodeW + gap);
      p.push(routeNode(x, nodeY, nodeW, nodeH, nodeLines, lane.accent));
      if (j < n - 1) p.push(line(x + nodeW + 12, y + laneH / 2, x + nodeW + gap - 12, y + laneH / 2, { stroke: lane.accent, strokeWidth: 3, markerEnd: 'arrow-muted' }));
    });
  });
  p.push(text(72, 948, '路线阶段相互重叠；数量不用于推导技术领先性。', 21, { fill: C.muted }));
  return baseSvg({ width, height, title: '四家技术路线对比', desc: 'ASML、Nikon、Canon 与 SMEE 或中国研发的四条技术路线。', body: p.join('\n') });
}

function figure05() {
  const width = 1800, height = 780;
  const stages = [
    { range: '2006–2009', title: ['基础斜入射', '/ 光栅测高'], solve: ['建立稳定 Z 测量、', 'capture 与多点覆盖'] },
    { range: '2009–2013', title: ['Process-aware：', '光谱 / 偏振 / UV'], solve: ['降低膜栈与亚表面反射', '造成的表观高度偏差'] },
    { range: '2011–2018', title: ['多点 / 多量程', '/ footprint'], solve: ['扩展空间覆盖、量程', '与局部分辨率'] },
    { range: '2016–2021', title: ['阵列化 / 数字解调', '/ 在线校准'], solve: ['提升速度、通道密度', '与长期一致性'] },
    { range: '2021–2024', title: ['大视场 / 高吞吐', 'wafer map / 曝光协同'], solve: ['把可靠高度图嵌入', '扫描节拍与曝光控制'] },
  ];
  const p = [header('LS 20 年主线：技术矛盾推动测高走向曝光可用', '阶段相互重叠，不表示后一阶段完全替代前一阶段', width)];
  const x0 = 68, y = 205, w = 300, h = 382, gap = 56;
  stages.forEach((s, i) => {
    const x = x0 + i * (w + gap);
    p.push(rect(x, y, w, h, { fill: i === 4 ? C.paleBlue : C.white, stroke: i === 4 ? C.blue : C.grid, strokeWidth: 2, rx: 16 }));
    p.push(circle(x + 46, y + 48, 24, { fill: i === 4 ? C.blue : C.paleBlue, stroke: C.blue, strokeWidth: 2 }));
    p.push(text(x + 46, y + 49, i + 1, 24, { fill: i === 4 ? C.white : C.blue, weight: 750, anchor: 'middle', cls: 'en' }));
    p.push(text(x + 82, y + 49, s.range, 21, { fill: C.muted, weight: 600, cls: 'en' }));
    p.push(multiline(x + 28, y + 106, s.title, 29, { fill: C.navy, weight: 750, lineHeight: 43 }));
    p.push(line(x + 28, y + 209, x + w - 28, y + 209, { stroke: C.grid, strokeWidth: 2 }));
    p.push(text(x + 28, y + 242, '主要解决', 20, { fill: C.blue, weight: 700 }));
    p.push(multiline(x + 28, y + 274, s.solve, 24, { weight: 500, lineHeight: 36 }));
    if (i < stages.length - 1) p.push(line(x + w + 10, y + h / 2, x + w + gap - 12, y + h / 2, { stroke: C.blue, strokeWidth: 3, markerEnd: 'arrow-blue' }));
  });
  p.push(text(width / 2, 666, '几何可测  →  工艺可信  →  覆盖与量程  →  集成与校准  →  曝光控制可用', 28, { fill: C.navy, weight: 700, anchor: 'middle' }));
  p.push(text(72, 739, '技术主线来自冻结 patent-family 证据的归并；不是按单件专利排列的时间轴。', 21, { fill: C.muted }));
  return baseSvg({ width, height, title: 'LS 二十年技术演进主线', desc: '从基础测高到大视场高吞吐 wafer 高度图和曝光协同的五阶段时间轴。', body: p.join('\n') });
}

function challengeCard(x, y, w, h, d) {
  return [rect(x, y, w, h, { fill: C.white, stroke: C.grid, strokeWidth: 2, rx: 16 }),
    rect(x, y, 8, h, { fill: d.accent, rx: 4 }),
    circle(x + 50, y + 48, 23, { fill: d.pale, stroke: d.accent, strokeWidth: 2 }),
    text(x + 50, y + 49, d.n, 22, { fill: d.accent, weight: 750, anchor: 'middle', cls: 'en' }),
    text(x + 84, y + 42, d.en, 27, { fill: C.navy, weight: 750, baseline: 'alphabetic', cls: 'en' }),
    text(x + 84, y + 72, d.zh, 20, { fill: C.muted, weight: 600 }),
    text(x + 30, y + 121, '为什么难', 19, { fill: C.muted, weight: 700 }),
    multiline(x + 30, y + 151, d.why, 23, { weight: 500, lineHeight: 33 }),
    rect(x + 30, y + 224, 92, 31, { fill: d.pale, rx: 7 }),
    text(x + 76, y + 240, '主流方向', 18, { fill: d.accent, weight: 700, anchor: 'middle' }),
    multiline(x + 30, y + 274, d.direction, 23, { weight: 600, lineHeight: 33 })].join('\n');
}

function figure06() {
  const width = 1800, height = 1040;
  const data = [
    { n: 1, en: 'Process dependency', zh: '工艺依赖', why: ['多层膜混合反射把工艺变化', '转化为表观高度误差'], direction: ['光谱 / 偏振补偿', '+ UV / DUV 表面选择性'], accent: C.blue, pale: C.paleBlue },
    { n: 2, en: 'Resolution / SNR / Throughput', zh: '分辨率、信噪比与吞吐', why: ['小 footprint 减少光子数，', '高密度 map 又受节拍限制'], direction: ['多点 / 线扫 / 阵列', '+ 大视场邻场测量'], accent: C.teal, pale: C.paleTeal },
    { n: 3, en: 'Sensitivity / Dynamic Range', zh: '灵敏度与动态量程', why: ['纳米灵敏度与 wafer bow、边缘、', '大高度变化的 capture range 相冲突'], direction: ['粗精双支路 + capture', '/ 可变 footprint'], accent: C.amber, pale: C.paleAmber },
    { n: 4, en: 'Multichannel Consistency', zh: '多通道一致性与标定', why: ['gain、phase、zero、几何位置', '与热漂移难以长期一致'], direction: ['参考通道、归一化、', '主动校准与单体化'], accent: C.slate, pale: C.paleSlate },
    { n: 5, en: 'Environment / Stage Dynamics', zh: '环境与运动动态', why: ['空气光程、热、振动与同步', '把静态误差变成动态误差'], direction: ['差分 / 温压补偿', '+ 同步采样 / 运动监测'], accent: C.blue, pale: C.paleBlue },
    { n: 6, en: 'Wafer Map System Integration', zh: '高度图与曝光系统集成', why: ['单点 Z 必须变成低延迟、可信、', '可供曝光使用的 wafer map'], direction: ['预扫描 / 逐场拟合', '+ 传感融合 / 自适应布点'], accent: C.teal, pale: C.paleTeal },
  ];
  const p = [header('LS 的六个核心技术矛盾', '真正难点不在单一精度，而在六组系统级权衡', width)];
  const xs = [70, 634, 1198], ys = [185, 579];
  data.forEach((d, i) => p.push(challengeCard(xs[i % 3], ys[Math.floor(i / 3)], 532, 365, d)));
  p.push(text(72, 1007, '来源：06_presentation/ppt_challenges_trends.md；为立项评审压缩表达，不含专利号。', 20, { fill: C.muted }));
  return baseSvg({ width, height, title: 'LS 六个核心技术矛盾', desc: '六个系统级技术矛盾的二乘三信息卡片矩阵。', body: p.join('\n') });
}

function riskChip(x, y, w, h, titleLines, owners, level) {
  const high = level === 'high', stroke = high ? C.orange : C.amber, fill = high ? C.paleRisk : C.white;
  return [rect(x, y, w, h, { fill, stroke, strokeWidth: high ? 2.5 : 2, rx: 12, dash: high ? '' : '8 6' }),
    rect(x, y, 7, h, { fill: stroke, rx: 3 }),
    multiline(x + 22, y + 20, titleLines, 23, { fill: C.navy, weight: 700, lineHeight: 31 }),
    text(x + 22, y + h - 22, owners, 18, { fill: C.muted, weight: 600, baseline: 'alphabetic' })].join('\n');
}

function figure07() {
  const width = 1800, height = 620;
  const p = [header('重点专利关注区域', '关注度反映后续 claim chart 优先级，不表示具体方案已构成侵权', width)];
  p.push(text(72, 245, '高关注', 27, { fill: C.orange, weight: 750 }));
  const x0 = 210, gap = 16, cw = 300;
  const high = [
    [['UV / resist-sensitive', 'wavelength'], 'ASML'], [['多波长 × 偏振', '膜栈补偿'], 'Nikon / ASML'],
    [['投影 / 检测光栅', '+ detector array'], 'ASML / SMEE / CAS'], [['动态量程', '/ footprint fusion'], 'ASML / Canon / SMEE'],
    [['中国有效', 'SMEE / CAS 路线'], 'SMEE / CAS（中国）'],
  ];
  high.forEach(([titleLines, owners], i) => p.push(riskChip(x0 + i * (cw + gap), 185, cw, 145, titleLines, owners, 'high')));
  p.push(text(72, 423, '中高关注', 27, { fill: C.amber, weight: 750 }));
  p.push(riskChip(x0, 365, 620, 125, ['多通道集成 / calibration'], 'ASML / SMEE', 'medium'));
  p.push(riskChip(x0 + 636, 365, 620, 125, ['大视场 / relay'], 'ASML / Canon', 'medium'));
  p.push(text(72, 570, '具体方案阶段需按目标司法区域进行 independent-claim chart 与正式 FTO。', 22, { fill: C.muted, weight: 600 }));
  return baseSvg({ width, height, title: '重点专利关注区域', desc: '五个高关注和两个中高关注专利技术区域。', body: p.join('\n') });
}

write('01_patent_activity_2006_2024', figure01());
write('02_top_applicants', figure02());
write('03_applicant_time_matrix', figure03());
write('04_company_technology_routes', figure04());
write('05_ls_technology_evolution', figure05());
write('06_core_challenges', figure06());
write('07_patent_risk_regions', figure07());
console.log(`Generated 7 SVG assets in ${OUT}`);
