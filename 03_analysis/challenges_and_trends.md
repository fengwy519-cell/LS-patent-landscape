# 技术难点、成熟度与趋势

## 1. 难点聚类

| 技术难点 | 代表 families | 主要办法 | 优点 | 局限/未解决 | 成熟度 |
|---|---|---|---|---|---|
| 光刻胶/多层膜表观高度偏差 | ASML-2004-DIFFPROP; ASML-2009-UVLS; NIKON-2009-GH; SMEE-2014-PROCESS | 波长/偏振差分；actinic UV；GH 回归；使下层图形离焦 | 可直接减少或估计 process dependency | 胶种/膜厚/入射角变化仍需 recipe；UV 有剂量和材料代价 | 高，但不存在通用零误差方案 |
| surface/subsurface mixed reflection | ASML-2009-UVLS; SMEE-2014-PROCESS | 增强表面吸收；改变投影/探测共轭 | 从物理或空间频率上压制下层 | 高粗糙度/复杂图形与残余反射仍存在 | 中高 |
| wavelength/polarization dependence | NIKON-2009-GH; NIKON-2011-PIXELFILTER; NIKON-2012-AIRTEMP | 多色×偏振；像素级滤光；光栅周期配平 | 可同时估计误差并提高鲁棒性 | 光学和标定维度增加，模型可辨识性有限 | 高 |
| 空间分辨率 vs 光子噪声 | ASML-2011-RESOLUTION; ASML-2019-FUSION | 可选 detector subarea；不同 footprint 融合 | 同一系统适配局部/全局 | 融合核、采样时序和偏置匹配复杂 | 中高 |
| 灵敏度 vs 动态范围 | ASML-2016-RANGE; SMEE-HUST-2008-COARSEFINE; CANON-2021-MULTIRANGE | 可变参考高度；粗精支路；双量程面拟合 | 覆盖翘曲、边缘和大台阶 | 通道切换、交叉标定可能产生不连续 | 中高 |
| wafer edge / 大翘曲 | ASML-2016-RANGE; SMEE-2005-APERTURE; CANON-2021-MULTIRANGE | 变 footprint、量程、阈值和历史区域信息 | 提高捕获率 | 边缘低反射、部分光斑和 chuck 影响仍难 | 中 |
| 热漂移/空气光程 | NIKON-2011-PIXELFILTER; NIKON-2012-AIRTEMP; CANON-2013-TWINSTATION | 缩短分离气路、共光路、波长配平、跨工位基准校正 | 可将慢漂移变成可观测参数 | 大视场系统的空间温度梯度仍难 | 中高 |
| 光路/零位漂移 | ASML-2016-ACTIVEALIGN; ASML-2018-MONOLITHIC; SMEE-2016-MIRRORMON | 主动执行器；单体件；扫描镜监测 | 稳定长期 repeatability | 执行器自身迟滞/老化、reference drift 仍需冗余 | 中高 |
| 杂散光和探测噪声 | NIKON-2007-REFLECTANCE; IOE-2015-SPATIALDIFF; SMEE-2016-LINESCAN | 反射率补偿；空间同时差分；归一化标记 | 避免时间调制中的快速源波动 | speckle、shot noise、pixel PRNU 仍需处理 | 高 |
| 多通道一致性 | ASML-2018-MONOLITHIC; ASML-2024-FIBERDETECT; SMEE-2016-LINESCAN | 一体化件；光纤芯分组；共同 reference | 支持通道密度和远置电子学 | core/pixel gain、相位、串扰需在线校准 | 中 |
| 高速扫描与 wafer map 重建 | ASML-2024-FIELDSPLIT; ASML-2024-DUALRELAY; NIKON-2012-COLORTDI; CANON-2013-TWINSTATION | 全宽子场、双 relay、TDI、双工位并行 | throughput 显著提高 | stage 动态、采样延迟、拼接边界和模型误差耦合 | 中 |
| 数字解调与可重构检测 | ASML-2014-DIRECTARRAY; IMECAS-2021-DIGITALMOIRE | detector array 直接采样；像素编码形成数字光栅 | 降低胶合件/机械检测光栅复杂度 | 像素尺寸、fill factor、rolling/shutter、算法延迟 | 中高 |

成熟度是基于公开专利连续性和工程问题是否转入集成/校准阶段的技术判断，不代表量产验证。

## 2. 约 20 年演进（2006–2026）

1. **2006–2010：光学头和 process dependency 成为显性问题。** 多点斜入射、宽谱、棱镜折转和粗精通道成熟；ASML/Nikon 开始把膜堆误差分别转化为波长/偏振差分与 GH 物理问题，ASML 提出 actinic UVLS。
2. **2011–2016：从单一强度到光谱、偏振和阵列。** Nikon 把颜色/偏振滤光集成到像素，处理空气 OPD；ASML 发展可变空间分辨率和无独立检测光栅的 detector array；SMEE/中科院推进非对称共轭、归一化和空间差分。
3. **2017–2021：系统集成和控制。** 单体检测光学、动态量程、扫描镜监测、线扫描多波长加权、不同 footprint 传感器融合以及双工位基准传递成为核心。
4. **2022–2026：大视场/高通量和可封装架构。** ASML 的光管照明、fiber-core remote detection、sub-field splitting、dual reflective relay 表明通道数、临界体积、全宽覆盖和 field stitching 已进入权利要求核心。

## 3. 最近 10 年（约 2016–2026）

有充分专利证据支持的趋势：

- 检测光栅从独立机械件向 detector-array 直接采样、单体件和数字光栅演进；
- 多通道不再只是多点，而是光谱、偏振、footprint、量程和不同传感器的联合数据；
- 校准对象从单一零位扩展到扫描镜、通道 gain、跨工位 reference 和数据融合核；
- wafer map 的 throughput 通过 line scan、field split、TDI/阵列和双工位并行提高。

初步信号：反射式大视场 relay 与光纤阵列探测正在成为新平台，这很可能同时服务宽谱和短波 LS，但新 PCT 尚未经历主要国家实审。

## 4. 最近 5 年（约 2021–2026）

- Canon 2021 priority family 把不同 measurement range/accuracy 和已有曝光区域信息写入表面拟合控制；
- 中科院微电子所 2021 priority family 用软件定义的数字检测光栅替代粘接/硬连 detector pattern；
- ASML 2021 priority 投影模块关注多 light-pipe 的均匀强度；2024 priority 的三组 PCT 分别处理远置 detector、大视场子场拼接和双反射 relay。

这说明近期竞争重点从“能不能测到纳米 Z”转向“能否在 300 mm、复杂工艺、有限空间和双工位节拍下稳定地产生可用 height map”。

## 5. 下一阶段可能演进

下列为基于证据的推测，不能当成已发生事实：

1. **工艺自适应的多光谱 LS：** 根据 resist/stack recipe 实时选波段、偏振、角度和 footprint，而不是固定 UV 或固定宽谱。
2. **物理模型 + 数据驱动残差：** 用 Fresnel/薄膜模型保证可解释性，再用受约束模型补偿未知 stack 和通道 drift；单纯黑箱模型难以覆盖工艺外推。
3. **更多异构传感融合：** 光学 LS 与气动、电容、干涉或曝光后 focus metrology 共同估计 wafer map 与不确定度。
4. **在线自校准：** 把 reference、通道 gain/phase、fiber core、detector PRNU 和 stage dynamic response 纳入连续状态估计。
5. **全宽稀疏采样 + 自适应重建：** 大视场先定位高曲率/边缘异常，再用小 footprint 精测，以减轻数据量和剂量。

## 6. 专利密集区与布局空间

### 壁垒较密集

- 斜入射投影/检测光栅与多点阵列的基础结构；
- 多波长×偏振的膜堆/GH 校正；
- resist-sensitive actinic UV 表面测量；
- detector array/像素滤光/数字光栅的条纹解调；
- 动态量程、双 footprint 融合和双工位基准关系；
- 同时空间差分和错位子检测光栅；
- 单体多通道、fiber-core 检测和大视场镜面 relay。

### 仍有明显空间

- 对具体 EUV/DUV resist stack 的可解释在线光谱选择与不确定度输出；
- 不依赖既有检测光栅/像素滤光组合的相位编码或偏振无关探测；
- wafer edge/partial-spot 的物理建模和主动 illumination shaping；
- 把剂量预算、光谱老化和污染状态纳入 UVLS 闭环；
- 通道/relay 拼接误差的自校准 reference artifact；
- 与具体 stage 动态约束共同优化的 compressed wafer-map sampling；
- 对已失效四通道空间差分 prior art 的新型非侵权实现，但需避开 SMEE 仍有效的 line-scan、sub-grating 和归一化 claims。
