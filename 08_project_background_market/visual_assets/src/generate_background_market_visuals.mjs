// 08_project_background_market 可视化素材生成器
// 输入：BACKGROUND-MARKET-CONTENT-FROZEN-v1（ppt_content_plan.md / ls_background.md / market_analysis.md / market_data.csv）
// 输出：visual_assets/*.svg 五份内容素材 + layout/*.svg 三页排版示意图与净版预览
// 所有素材宽度统一为 1472，等于 1600x900 页面去掉左右各 64 页边距，便于 1:1 排版。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.resolve(HERE, '..');
const LAYOUT = path.resolve(ASSETS, '..', 'layout');

export const FONT = "'Noto Sans CJK SC','Source Han Sans SC','Microsoft YaHei','PingFang SC','WenQuanYi Zen Hei',sans-serif";

export const C = {
  ink: '#111827', body: '#334155', muted: '#64748B', faint: '#94A3B8',
  blue: '#2563EB', blueDeep: '#1D4ED8', blueFill: '#EFF5FF', blueLine: '#BFD4F5',
  teal: '#0D9488', tealFill: '#ECFDF7', tealLine: '#99E2D5',
  amber: '#B45309', amberText: '#92400E', amberFill: '#FFFBEB', amberLine: '#FCD9A0',
  line: '#E2E8F0', soft: '#F8FAFC', rule: '#CBD5E1', white: '#FFFFFF',
  anno: '#EA580C', annoFill: '#FFF3EA',
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function T(x, y, s, o = {}) {
  const { size = 16, fill = C.body, weight = 400, anchor = 'start', opacity } = o;
  return `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}"` +
    ` text-anchor="${anchor}"${opacity != null ? ` opacity="${opacity}"` : ''}>${esc(s)}</text>`;
}

// segs: [text, {fill,size,weight}]
export function TS(x, y, segs, o = {}) {
  const { size = 16, fill = C.body, weight = 400, anchor = 'start' } = o;
  const inner = segs.map(([s, a = {}]) =>
    `<tspan${a.fill ? ` fill="${a.fill}"` : ''}${a.size ? ` font-size="${a.size}"` : ''}` +
    `${a.weight ? ` font-weight="${a.weight}"` : ''}${a.dx ? ` dx="${a.dx}"` : ''}>${esc(s)}</tspan>`).join('');
  return `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}" text-anchor="${anchor}">${inner}</text>`;
}

export function R(x, y, w, h, o = {}) {
  const { fill = 'none', stroke = 'none', sw = 1, rx = 0, dash, opacity } = o;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"` +
    ` stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}` +
    `${opacity != null ? ` opacity="${opacity}"` : ''}/>`;
}

export function L(x1, y1, x2, y2, o = {}) {
  const { stroke = C.rule, sw = 1, dash, marker, cap } = o;
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}"` +
    `${dash ? ` stroke-dasharray="${dash}"` : ''}${marker ? ` marker-end="url(#${marker})"` : ''}` +
    `${cap ? ` stroke-linecap="${cap}"` : ''}/>`;
}

export function P(d, o = {}) {
  const { fill = 'none', stroke = 'none', sw = 1, dash, marker, cap, join } = o;
  return `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"` +
    `${dash ? ` stroke-dasharray="${dash}"` : ''}${marker ? ` marker-end="url(#${marker})"` : ''}` +
    `${cap ? ` stroke-linecap="${cap}"` : ''}${join ? ` stroke-linejoin="${join}"` : ''}/>`;
}

export function circ(cx, cy, r, o = {}) {
  const { fill = 'none', stroke = 'none', sw = 1 } = o;
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
}

export function badge(cx, cy, n, o = {}) {
  const { r = 15, fill = C.blue, color = '#FFFFFF', size = 15 } = o;
  return circ(cx, cy, r, { fill }) + T(cx, cy + size * 0.36, n, { size, fill: color, weight: 700, anchor: 'middle' });
}

export function markers(p) {
  return `<defs>
  <marker id="${p}arrB" markerWidth="9" markerHeight="9" refX="7.2" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="${C.blue}"/></marker>
  <marker id="${p}arrT" markerWidth="9" markerHeight="9" refX="7.2" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="${C.teal}"/></marker>
  <marker id="${p}arrG" markerWidth="9" markerHeight="9" refX="7.2" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="${C.faint}"/></marker>
  <marker id="${p}arrA" markerWidth="9" markerHeight="9" refX="7.2" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="${C.amber}"/></marker>
  <marker id="${p}arrO" markerWidth="9" markerHeight="9" refX="7.2" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="${C.anno}"/></marker>
  <marker id="${p}dotB" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5"><circle cx="3.5" cy="3.5" r="3" fill="${C.blue}"/></marker>
</defs>`;
}

// 水平双向标注箭头
export function dim(x1, x2, y, p, o = {}) {
  const { stroke = C.blue, sw = 1.6 } = o;
  return L(x1, y, x2, y, { stroke, sw, marker: `${p}arrB` }) +
         L(x2, y, x1, y, { stroke, sw, marker: `${p}arrB` });
}
export function dimV(y1, y2, x, p, o = {}) {
  const { stroke = C.blue, sw = 1.6 } = o;
  return L(x, y1, x, y2, { stroke, sw, marker: `${p}arrB` }) +
         L(x, y2, x, y1, { stroke, sw, marker: `${p}arrB` });
}

export const W = 1472; // 所有素材统一宽度

/* ============================================================
   01｜LS 功能链 + 光学测高原理   1472 x 640
   依据 ppt_content_plan.md 背景第1页、ls_background.md §2
   ============================================================ */
export const G01 = { id: '01_ls_function_chain', w: W, h: 640 };
G01.body = (p = 'a') => {
  const s = [markers(p)];
  const steps = [
    ['1', '光学测高', ['斜入射图案投到晶圆', '接收反射信号']],
    ['2', '高度解算', ['信号变化经标定', '换算为高度值']],
    ['3', '晶圆面形重建', ['多测点拼接成', '整片高度图']],
    ['4', '平台调焦调平', ['生成平台高度与', '倾斜补偿量']],
    ['5', '曝光控制', ['残余离焦保持在', '允许范围内']],
  ];
  const bw = 250, gap = 42, x0 = 26, by = 18, bh = 140;
  steps.forEach(([n, name, lines], i) => {
    const x = x0 + i * (bw + gap);
    const last = i === steps.length - 1;
    s.push(R(x, by, bw, bh, {
      rx: 12, fill: last ? C.tealFill : C.blueFill,
      stroke: last ? C.teal : C.blueLine, sw: last ? 2.2 : 1.6,
    }));
    s.push(badge(x + 30, by + 32, n, { r: 14, fill: last ? C.teal : C.blue, size: 14 }));
    s.push(T(x + 54, by + 38, name, { size: 23, weight: 700, fill: last ? '#0F766E' : C.ink }));
    lines.forEach((ln, k) => s.push(T(x + 22, by + 80 + k * 25, ln, { size: 16, fill: C.muted })));
    if (!last) s.push(L(x + bw + 8, by + bh / 2, x + bw + gap - 8, by + bh / 2, { stroke: C.blue, sw: 2.2, marker: `${p}arrB` }));
  });

  // 辅助输入：挂在第 2 / 3 / 5 步下方
  const aux = [
    [1, '标定 / 工艺补偿'],
    [2, '平台坐标 · 采样时刻'],
    [4, '最佳焦面基准'],
  ];
  const ay = 184, ah = 52, aw = 234;
  aux.forEach(([i, label]) => {
    const cx = x0 + i * (bw + gap) + bw / 2;
    const ax = cx - aw / 2;
    s.push(L(cx, ay, cx, by + bh + 6, { stroke: C.amber, sw: 1.6, dash: '5 4', marker: `${p}arrA` }));
    s.push(R(ax, ay, aw, ah, { rx: 8, fill: C.amberFill, stroke: C.amberLine, sw: 1.4 }));
    s.push(T(cx, ay + 33, label, { size: 16, fill: C.amberText, anchor: 'middle' }));
  });
  s.push(T(26, 264, '辅助输入（橙色）不是测量结果：没有标定、坐标与焦面基准，测到的高度无法用于曝光控制。', { size: 15, fill: C.muted }));
  s.push(T(1446, 264, 'LS 提供测量与解算信息；平台动作由整机控制链执行。', { size: 15, fill: C.muted, anchor: 'end' }));
  s.push(L(26, 282, 1446, 282, { stroke: C.line, sw: 1 }));

  /* ---- 下半：第 1 步的光学原理放大 ---- */
  const py = 294, ph = 334;
  s.push(R(26, py, 1420, ph, { rx: 12, fill: C.soft, stroke: C.line, sw: 1.2 }));
  s.push(badge(52, py + 30, '1', { r: 13, fill: C.blue, size: 13 }));
  s.push(T(72, py + 36, '光学测高的基本原理（功能示意，不是具体机型的机械结构）', { size: 17, weight: 700, fill: C.ink }));

  // 投影单元 / 探测单元
  s.push(T(340, py + 62, '投影单元', { size: 17, weight: 700, fill: C.blueDeep }));
  s.push(R(340, py + 72, 284, 80, { rx: 8, fill: C.white, stroke: C.blueLine, sw: 1.6 }));
  s.push(T(482, py + 102, '光栅 / 狭缝图案', { size: 16, fill: C.body, anchor: 'middle' }));
  for (let i = 0; i < 9; i++) s.push(R(446 + i * 8, py + 118, 3.4, 18, { fill: C.blueLine }));

  s.push(T(950, py + 62, '探测单元', { size: 17, weight: 700, fill: C.blueDeep }));
  s.push(R(950, py + 72, 300, 90, { rx: 8, fill: C.white, stroke: C.blueLine, sw: 1.6 }));
  s.push(T(1100, py + 94, '接收位置 · 相位检测', { size: 16, fill: C.body, anchor: 'middle' }));
  s.push(L(966, 440, 1234, 440, { stroke: C.faint, sw: 1.2 }));

  // 几何：入射 (480,446) -> 参考面 (820,552)；表面抬高 24 时提前在 (743,528) 反射
  const TOP = 446, REF = 552, HI = 528, DET = 440;
  s.push(L(600, REF, 840, REF, { stroke: C.faint, sw: 1.4, dash: '6 5' }));
  s.push(L(600, HI, 790, HI, { stroke: C.blue, sw: 1.6, dash: '6 5' }));
  s.push(T(596, REF + 5, '参考面', { size: 14, fill: C.muted, anchor: 'end' }));
  s.push(T(596, HI + 5, '局部抬高', { size: 14, fill: C.blue, anchor: 'end' }));
  s.push(dimV(HI, REF, 620, p));
  s.push(T(630, REF - 8, 'Δh', { size: 17, weight: 700, fill: C.blue }));

  s.push(L(480, TOP, 820, REF, { stroke: C.blue, sw: 2.4, marker: `${p}arrB` }));
  s.push(L(820, REF, 1179, DET, { stroke: C.blue, sw: 2.4 }));
  s.push(L(743, HI, 1025, DET, { stroke: C.blue, sw: 2, dash: '7 5' }));
  s.push(L(985, 501, 1012, 493, { stroke: C.blue, sw: 2.4, marker: `${p}arrB` }));
  s.push(circ(820, REF, 5, { fill: C.blue }));
  s.push(circ(743, HI, 5, { fill: C.white, stroke: C.blue, sw: 2 }));
  s.push(circ(1179, DET, 5, { fill: C.blue }));
  s.push(circ(1025, DET, 5, { fill: C.white, stroke: C.blue, sw: 2 }));
  // Δx 尺寸线（带引出线）
  s.push(L(1025, DET - 4, 1025, 418, { stroke: C.blueLine, sw: 1.1 }));
  s.push(L(1179, DET - 4, 1179, 418, { stroke: C.blueLine, sw: 1.1 }));
  s.push(dim(1025, 1179, 424, p));
  s.push(T(1102, 414, 'Δx', { size: 17, weight: 700, fill: C.blue, anchor: 'middle' }));
  s.push(T(1262, 444, 'Δx：接收位置偏移', { size: 14, fill: C.blue }));

  // 晶圆（膜层 + 硅基）与工件台
  const filmD = 'M 660 568 C 730 546 780 570 820 552 C 900 516 1080 594 1300 560 L 1300 566 ' +
                'C 1080 600 900 522 820 558 C 780 576 730 552 660 574 Z';
  const bodyD = 'M 660 574 C 730 552 780 576 820 558 C 900 522 1080 600 1300 566 L 1300 578 ' +
                'C 1080 612 900 534 820 570 C 780 588 730 564 660 586 Z';
  s.push(P(bodyD, { fill: '#E2E8F0', stroke: '#94A3B8', sw: 1 }));
  s.push(P(filmD, { fill: C.blueLine, stroke: '#7EA6E0', sw: 0.9 }));
  s.push(R(640, 600, 680, 16, { rx: 3, fill: C.rule }));
  s.push(T(1312, 560, '膜层', { size: 14, fill: C.blueDeep }));
  s.push(T(1312, 578, '晶圆', { size: 14, fill: C.muted }));
  s.push(T(1312, 613, '工件台', { size: 14, fill: C.muted }));

  // 左下说明
  [
    '斜入射：投影图案以大角度照射晶圆表面',
    '晶圆存在翘曲与局部起伏，表面还有膜层',
    'Δh 使接收位置或相位变化 Δx，再经标定换算为高度',
  ].forEach((ln, i) => s.push(T(48, 520 + i * 28, ln, { size: 15, fill: C.body })));
  return s.join('\n');
};

/* ============================================================
   02｜五类约束收敛到"可信面形"   1472 x 640
   依据 ppt_content_plan.md 背景第2页、ls_background.md §4
   ============================================================ */
export const G02 = { id: '02_ls_core_challenges', w: W, h: 640 };
G02.body = (p = 'b') => {
  const s = [markers(p)];
  const rows = [
    ['1', '表面与膜层复杂', '要覆盖翘曲起伏，又要抑制膜层虚假高度', '波段与偏振选择、工艺补偿'],
    ['2', '精度与量程', '大起伏要捕获得到，小变化要分辨得清', '粗精结合、量程切换与交叉标定'],
    ['3', '分辨率与测量效率', '测量区域要小、信息要密，整片时间不能拖长', '多点并行测量、合理光预算'],
    ['4', '多通道长期稳定', '多通道之间有差异，温度与光路还会漂移', '共同基准、通道校准与漂移监测'],
    ['5', '高速运动与控制协同', '平台高速扫描，采样时刻与坐标必须对应', '时间同步、动态误差预算'],
  ];
  const rx0 = 26, rw = 764, rh = 100, rgap = 9, ry0 = 24;
  rows.forEach(([n, name, tension, cap], i) => {
    const y = ry0 + i * (rh + rgap);
    s.push(R(rx0, y, rw, rh, { rx: 10, fill: C.soft, stroke: C.line, sw: 1.2 }));
    s.push(R(rx0, y, 5, rh, { rx: 2.5, fill: C.blue }));
    s.push(badge(rx0 + 36, y + rh / 2 - 12, n, { r: 15, fill: C.blue, size: 15 }));
    s.push(T(rx0 + 66, y + 42, name, { size: 24, weight: 700, fill: C.ink }));
    s.push(T(rx0 + 66, y + 76, tension, { size: 19, fill: C.body }));
    s.push(R(rx0 + 479, y + 26, 270, 48, { rx: 8, fill: C.blueFill, stroke: C.blueLine, sw: 1.2 }));
    s.push(T(rx0 + 614, y + 56, cap, { size: 16, fill: C.blueDeep, anchor: 'middle' }));
  });

  // 收敛曲线：5 行右端 -> 输出目标左端
  const cx0 = rx0 + rw, cx1 = 880, cy = (ry0 + (ry0 + 5 * rh + 4 * rgap)) / 2;
  rows.forEach((_, i) => {
    const y = ry0 + i * (rh + rgap) + rh / 2;
    const mid = (cx0 + cx1) / 2;
    s.push(P(`M ${cx0 + 4} ${y} C ${mid} ${y} ${mid} ${cy} ${cx1 - 10} ${cy}`,
      { stroke: C.teal, sw: 1.8, marker: `${p}arrT` }));
  });

  // 输出目标
  const ox = 880, ow = 566, oy = cy - 120, oh = 240;
  s.push(R(ox, oy, ow, oh, { rx: 14, fill: C.tealFill, stroke: C.teal, sw: 2.4 }));
  s.push(T(ox + 32, oy + 38, '输出目标', { size: 15, weight: 700, fill: C.teal }));
  s.push(T(ox + 32, oy + 86, '可信、稳定的晶圆面形', { size: 32, weight: 700, fill: '#0F766E' }));
  s.push(T(ox + 32, oy + 120, '并且能够直接用于曝光控制', { size: 21, fill: C.body }));
  s.push(L(ox + 32, oy + 144, ox + ow - 32, oy + 144, { stroke: C.tealLine, sw: 1.4 }));
  s.push(T(ox + 32, oy + 178, '难点不在于“能不能测到高度”，', { size: 18, fill: C.ink }));
  s.push(T(ox + 32, oy + 206, '而在于能否持续输出这样的面形。', { size: 18, fill: C.ink }));

  // 底部：有条件的节拍参照
  const sy = 578;
  s.push(R(26, sy, 1420, 54, { rx: 8, fill: C.amberFill, stroke: C.amberLine, sw: 1.2 }));
  s.push(R(26, sy, 5, 54, { rx: 2.5, fill: C.amber }));
  s.push(T(48, sy + 24, '节拍参照：Canon FPA-6300ES6a 标称整机生产率 >200 片/小时（300 mm 晶圆、每片 98 个曝光场、含选件）。', { size: 16, weight: 700, fill: C.amberText }));
  s.push(T(48, sy + 45, '这是整机生产率示例，不是 LS 采样速度，也不是本项目验收指标。[S06]', { size: 14, fill: C.amber }));
  return s.join('\n');
};

/* ============================================================
   03｜需求传导链   1472 x 160
   依据 market_analysis.md §1
   ============================================================ */
export const G03 = { id: '03_market_demand_chain', w: W, h: 160 };
G03.body = (p = 'c') => {
  const s = [markers(p)];
  const items = [
    ['半导体制造需求', '产能与工艺升级'],
    ['晶圆厂设备投资', '资本开支与采购周期'],
    ['光刻设备采购 / 升级', '新机与存量改造'],
    ['LS 测高与调焦调平需求', '本项目所处环节'],
  ];
  const bw = 320, gap = 46, x0 = 26, by = 16, bh = 82;
  items.forEach(([title, sub], i) => {
    const x = x0 + i * (bw + gap);
    const last = i === items.length - 1;
    s.push(R(x, by, bw, bh, {
      rx: 10, fill: last ? C.tealFill : C.blueFill,
      stroke: last ? C.teal : C.blueLine, sw: last ? 2.2 : 1.5,
    }));
    s.push(T(x + bw / 2, by + 36, title, { size: 20, weight: 700, fill: last ? '#0F766E' : C.ink, anchor: 'middle' }));
    s.push(T(x + bw / 2, by + 62, sub, { size: 15, fill: C.muted, anchor: 'middle' }));
    if (!last) s.push(L(x + bw + 8, by + bh / 2, x + bw + gap - 8, by + bh / 2, { stroke: C.blue, sw: 2.2, marker: `${p}arrB` }));
  });
  s.push(T(26, 132, '需求自上而下传导，不是固定比例换算：不能由设备投资金额或整机台数直接折算 LS 市场规模。', { size: 15, fill: C.muted }));
  return s.join('\n');
};

/* ============================================================
   04｜参与者角色 + 3 道进入壁垒   1472 x 320
   依据 market_analysis.md §2 与 §4：国际/国内整机分层，不表示份额
   ============================================================ */
export const G04 = { id: '04_market_ecosystem', w: W, h: 320 };
G04.body = (p = 'd') => {
  const s = [markers(p)];
  s.push(T(26, 30, '谁在参与 · 按公开可确认的角色划分', { size: 17, weight: 700, fill: C.ink }));
  const roles = [
    ['整机 / 系统集成', '（国际）', 'ASML · Nikon · Canon', 'DUV / EUV 等整机承载测高与曝光控制需求', C.blue],
    ['整机 / 系统集成', '（国内）', 'SMEE', '公开披露 SSX600 工艺自适应调焦调平能力；销量与先进节点量产未披露', C.blue],
    ['上游光学器件', '', 'ZEISS', '公开的光刻光学与光学系统能力；未确认整套 LS 供货关系', C.muted],
    ['国内研究力量', '', '中科院相关机构 · 高校等', '科研与联合研发角色，不等于成熟商业供应商', C.muted],
  ];
  const cx = 26, cw = 214, tx = 254, rh = 58, gap = 7, y0 = 46;
  roles.forEach(([r1, r2, names, note, tone], i) => {
    const y = y0 + i * (rh + gap);
    s.push(R(cx, y, cw, rh, { rx: 8, fill: tone === C.blue ? C.blueFill : C.soft, stroke: tone === C.blue ? C.blueLine : C.line, sw: 1.2 }));
    if (r2) {
      s.push(T(cx + cw / 2, y + 25, r1, { size: 15, weight: 700, fill: tone === C.blue ? C.blueDeep : C.body, anchor: 'middle' }));
      s.push(T(cx + cw / 2, y + 45, r2, { size: 14, fill: tone === C.blue ? C.blueDeep : C.muted, anchor: 'middle' }));
    } else {
      s.push(T(cx + cw / 2, y + 36, r1, { size: 15, weight: 700, fill: tone === C.blue ? C.blueDeep : C.body, anchor: 'middle' }));
    }
    s.push(T(tx, y + 26, names, { size: 20, weight: 700, fill: C.ink }));
    s.push(T(tx, y + 48, note, { size: 14, fill: C.muted }));
  });

  s.push(L(838, 14, 838, 300, { stroke: C.line, sw: 1.2 }));
  s.push(T(866, 30, '为什么难进入 · 3 道壁垒', { size: 17, weight: 700, fill: C.ink }));
  const bars = [
    ['1', '工艺适应', '不同膜系与图形下都要给出可信高度'],
    ['2', '长期稳定与标定', '多通道一致性与漂移必须长期可控'],
    ['3', '平台控制与整机验证', '进入整机控制闭环并通过客户验证'],
  ];
  bars.forEach(([n, title, desc], i) => {
    const y = 46 + i * (76 + 12);
    s.push(R(866, y, 580, 76, { rx: 8, fill: C.soft, stroke: C.line, sw: 1.2 }));
    s.push(R(866, y, 5, 76, { rx: 2.5, fill: C.teal }));
    s.push(badge(906, y + 38, n, { r: 15, fill: C.teal, size: 15 }));
    s.push(T(936, y + 32, title, { size: 19, weight: 700, fill: C.ink }));
    s.push(T(936, y + 58, desc, { size: 14, fill: C.muted }));
  });
  s.push(T(26, 314, '按公开可确认角色分类；不表示市场份额，不表示已确认供应关系，也不以专利数量代替份额。', { size: 13, fill: C.faint }));
  return s.join('\n');
};

/* ============================================================
   05｜需求代理数字锚点 M1 / M2   1472 x 140
   仅取 market_data.csv 中 final_market_anchor 非空记录
   ============================================================ */
export const G05 = { id: '05_market_data_anchor', w: W, h: 140 };
G05.body = (p = 'e') => {
  const s = [markers(p)];
  s.push(R(26, 8, 1420, 120, { rx: 10, fill: C.soft, stroke: C.line, sw: 1.2 }));
  s.push(L(736, 20, 736, 116, { stroke: C.line, sw: 1.2 }));

  s.push(T(52, 34, 'M1 · ASML 新光刻系统销量（全球 · 年度）', { size: 15, weight: 700, fill: C.blueDeep }));
  s.push(TS(52, 80, [
    ['380', { size: 32, weight: 700, fill: C.ink }],
    ['台（2024）', { size: 16, fill: C.muted, dx: 6 }],
    ['300', { size: 32, weight: 700, fill: C.ink, dx: 46 }],
    ['台（2025）', { size: 16, fill: C.muted, dx: 6 }],
  ]));
  s.push(T(52, 108, '单一整机厂商新机数量；年度波动不代表行业趋势，也不等于 LS 套数。[S01]', { size: 13, fill: C.muted }));

  s.push(T(762, 34, 'M2 · 全球半导体设备销售额 billings（全部设备 · 单季度）', { size: 15, weight: 700, fill: C.blueDeep }));
  s.push(TS(762, 80, [
    ['405.3', { size: 32, weight: 700, fill: C.ink }],
    ['亿美元', { size: 16, fill: C.muted, dx: 6 }],
    ['2026 Q2 · 同比 +23%', { size: 16, fill: C.body, dx: 46 }],
  ]));
  s.push(T(762, 108, '涵盖全部半导体设备，不是光刻或 LS 市场规模；季度数据不年化。[S02]', { size: 13, fill: C.muted }));
  return s.join('\n');
};

export const GRAPHICS = [G01, G02, G03, G04, G05];

/* ============================================================
   三页页面定义（16:9 / 1600 x 900，左右页边距 64）
   ============================================================ */
const PW = 1600, PH = 900, MX = 64;

export const PAGES = [
  {
    n: 1, file: 'p1_ls_what_and_how', tag: '背景 · 1 / 3',
    title: 'LS 是什么、如何工作',
    lead: 'LS 测量晶圆表面高度，经高度解算与面形重建生成补偿量，使曝光离焦保持在允许范围内。',
    foot: '功能示意，非具体机型结构；测量可预先进行，也可与曝光并行。LS 测高不等于光学最佳焦面测定；对准看平面位置，套刻看层间图形误差。[S03, S09]',
    blocks: [{ g: G01, y: 188, badge: '3', zone: '主图区 · 功能链 + 原理放大' }],
  },
  {
    n: 2, file: 'p2_why_ls_is_hard', tag: '背景 · 2 / 3',
    title: 'LS 为什么难',
    lead: '难点不是“能不能测到高度”，而是在复杂工艺与高速曝光下，持续输出可信、稳定、可用于曝光控制的晶圆面形。',
    foot: '约束归纳依据现有冻结研究，不代表本项目已选定实现路线；图中节拍数字为整机生产率示例，不是 LS 指标。[S04, S06, S07, S09]',
    blocks: [{ g: G02, y: 188, badge: '3', zone: '主图区 · 五约束收敛' }],
  },
  {
    n: 3, file: 'p3_market_and_demand', tag: '市场 · 3 / 3',
    title: '市场与需求',
    lead: 'LS 需求随光刻整机产生；公开资料没有可核验的独立 LS 市场规模，商业机会取决于工艺适应、长期稳定与整机验证。',
    foot: '公开资料未提供可核验的独立 LS 市场规模，本页采用整机销量与行业设备景气作为需求代理。M1、M2 口径不同，不相加、不共用坐标轴。[S01, S02]',
    blocks: [
      { g: G03, y: 176, badge: '3', zone: '需求传导区' },
      { g: G04, y: 354, badge: '4', zone: '参与者 / 壁垒区' },
      { g: G05, y: 692, badge: '5', zone: '数据锚点区' },
    ],
  },
];

// 页面正文（真实版面，不含标注层）
function pageBody(page, pfx) {
  const s = [];
  s.push(R(0, 0, PW, PH, { fill: C.white }));
  // 标题区
  s.push(R(MX, 44, 5, 40, { rx: 2.5, fill: C.blue }));
  s.push(T(MX + 20, 78, page.title, { size: 40, weight: 700, fill: C.ink }));
  s.push(T(PW - MX, 76, page.tag, { size: 16, fill: C.faint, anchor: 'end' }));
  s.push(L(MX, 100, PW - MX, 100, { stroke: C.line, sw: 1.4 }));
  // 核心结论
  s.push(T(MX, 152, page.lead, { size: 22, weight: 700, fill: C.blueDeep }));
  // 主体图形
  page.blocks.forEach((b, i) => {
    s.push(`<svg x="${MX}" y="${b.y}" width="${b.g.w}" height="${b.g.h}" viewBox="0 0 ${b.g.w} ${b.g.h}">` +
      b.g.body(`${pfx}${i}`) + `</svg>`);
  });
  // 脚注
  const last = page.blocks[page.blocks.length - 1];
  const fy = Math.max(last.y + last.g.h + 40, PH - 44);
  s.push(L(MX, fy - 22, PW - MX, fy - 22, { stroke: C.line, sw: 1 }));
  s.push(T(MX, fy, page.foot, { size: 14, fill: C.faint }));
  page._footY = fy;
  return s.join('\n');
}

// 标注层：区域划分（页内虚线框）与页外标尺 / 区域名 / 阅读顺序
function zonesOf(page) {
  const z = [];
  z.push({ y: 40, h: 64, label: '标题区', badge: '1' });
  z.push({ y: 120, h: 48, label: '核心结论区（一句话）', badge: '2' });
  page.blocks.forEach((b) => z.push({ y: b.y - 4, h: b.g.h + 8, label: b.zone, badge: b.badge }));
  z.push({ y: page._footY - 26, h: 40, label: '脚注 / 边界区', badge: String(page.blocks.length + 3) });
  return z;
}

// 页内：仅画区域虚线框与安全边距，保证版面本身不被标注遮挡
function annoOnPage(page) {
  const s = [], A = C.anno;
  zonesOf(page).forEach((z) => s.push(R(MX - 10, z.y, PW - 2 * MX + 20, z.h, { rx: 6, stroke: A, sw: 1.6, dash: '8 6' })));
  s.push(L(MX, 30, MX, PH - 18, { stroke: A, sw: 1, dash: '3 5', opacity: 0.32 }));
  s.push(L(PW - MX, 30, PW - MX, PH - 18, { stroke: A, sw: 1, dash: '3 5', opacity: 0.32 }));
  return s.join('\n');
}

// 页外：左侧纵向占比标尺 + 右侧阅读顺序与区域名
function annoGutter(page, ox, oy, pfx) {
  const s = [markers(pfx + 'x')], A = C.anno;
  const rx = ox - 54;
  s.push(L(rx, oy + 34, rx, oy + PH - 20, { stroke: A, sw: 1.1, opacity: 0.45 }));
  zonesOf(page).forEach((z) => {
    const y1 = oy + z.y, y2 = oy + z.y + z.h, cy = (y1 + y2) / 2;
    const pct = Math.round((z.h / PH) * 100);
    s.push(L(rx - 7, y1, rx + 7, y1, { stroke: A, sw: 1.3 }));
    s.push(L(rx - 7, y2, rx + 7, y2, { stroke: A, sw: 1.3 }));
    s.push(dimV(y1 + 2, y2 - 2, rx, pfx + 'x', { stroke: A, sw: 1.1 }));
    s.push(`<g transform="translate(${rx - 13},${cy}) rotate(-90)">` +
      T(0, 0, `${pct}%`, { size: 13, fill: A, weight: 700, anchor: 'middle' }) + `</g>`);
    // 右侧：引出线 + 序号 + 区域名
    s.push(L(ox + PW + 2, cy, ox + PW + 26, cy, { stroke: A, sw: 1.2, dash: '4 3' }));
    s.push(badge(ox + PW + 42, cy, z.badge, { r: 13, fill: A, size: 13 }));
    s.push(T(ox + PW + 62, cy + 5, z.label, { size: 13, fill: A, weight: 700 }));
  });
  return s.join('\n');
}

/* ============================================================
   输出
   ============================================================ */
function wrap(w, h, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" font-family="${FONT}">\n` +
    R(0, 0, w, h, { fill: C.white }) + '\n' + body + '\n</svg>\n';
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  console.log('  ' + path.relative(path.resolve(ASSETS, '..'), file));
}

// 1) 五份内容素材
console.log('visual_assets/');
for (const g of GRAPHICS) write(path.join(ASSETS, g.id + '.svg'), wrap(g.w, g.h, g.body(g.id.slice(0, 2))));

// 2) 净版页面预览（正式 PPT 的目标效果）
console.log('layout/ (净版页面预览)');
for (const pg of PAGES) {
  const body = pageBody(pg, `pv${pg.n}`);
  write(path.join(LAYOUT, `page_preview_${pg.file}.svg`), wrap(PW, PH, body));
}

// 3) 排版示意图（带标注层）：页面外留出说明与标尺空间
console.log('layout/ (排版示意图)');
const MW = 2030, MH = 1170, OX = 132, OY = 110;
for (const pg of PAGES) {
  const body = pageBody(pg, `mk${pg.n}`);   // 先算出 _footY
  const s = [];
  s.push(R(0, 0, MW, MH, { fill: '#F1F5F9' }));
  s.push(T(OX, 50, `Page ${pg.n} ｜ ${pg.title}`, { size: 28, weight: 700, fill: C.ink }));
  s.push(T(OX, 82, `PPT 排版示意 · 16:9 · 1600 × 900 px · ${pg.tag} · BACKGROUND-MARKET-CONTENT-FROZEN-v1`, { size: 15, fill: C.muted }));
  s.push(R(OX + 5, OY + 6, PW, PH, { rx: 3, fill: '#CBD5E1', opacity: 0.55 }));
  s.push(`<svg x="${OX}" y="${OY}" width="${PW}" height="${PH}" viewBox="0 0 ${PW} ${PH}">${body}\n${annoOnPage(pg)}</svg>`);
  s.push(R(OX, OY, PW, PH, { stroke: C.rule, sw: 1.4 }));
  s.push(annoGutter(pg, OX, OY, `mk${pg.n}`));
  s.push(T(OX, OY + PH + 26, `左右安全边距 ${MX} px（约 4%）· 内容宽度 ${PW - 2 * MX} px · 竖向虚线为安全边距参考`, { size: 13, fill: C.anno }));
  const ly = OY + PH + 46;
  s.push(R(OX, ly, PW, 62, { rx: 8, fill: C.white, stroke: C.line, sw: 1.2 }));
  s.push(R(OX + 24, ly + 20, 22, 22, { rx: 4, stroke: C.anno, sw: 1.6, dash: '6 4' }));
  s.push(T(OX + 56, ly + 36, '版面区域范围', { size: 14, fill: C.body }));
  s.push(badge(OX + 208, ly + 31, '1', { r: 11, fill: C.anno, size: 12 }));
  s.push(T(OX + 226, ly + 36, '阅读顺序（右侧）', { size: 14, fill: C.body }));
  s.push(T(OX + 372, ly + 36, '左侧标尺 = 该区域纵向占比', { size: 14, fill: C.body }));
  s.push(T(OX + 620, ly + 36, '页内正文与图形为实际内容，可按此比例直接落到 PPT 母版', { size: 14, fill: C.body }));
  s.push(T(OX + PW - 24, ly + 36, '橙色标注仅用于制作，不进入正式页面', { size: 13, fill: C.anno, anchor: 'end' }));
  write(path.join(LAYOUT, `ppt_layout_mockup_${pg.file}.svg`), wrap(MW, MH, s.join('\n')));
}
console.log('done.');
