# 厂商技术路线：PPT 极简版

## 一页矩阵

| 厂商 | 3–4 个关键阶段 | 长期解决的主问题 | 当前可见方向 | 少量代表证据 |
|---|---|---|---|---|
| **ASML** | ① 宽谱斜入射与波长/偏振差分；② UVLS + capture/range/full-width；③ 阵列直采、主动标定、单体多通道；④ 不同 footprint 融合与大视场/relay 集成 | 膜栈表观高度误差、量程、通道密度、整机可校准性 | 传感融合、结构紧凑化、field splitting/reflective relay、高吞吐 map | [US8842293B2](https://patents.google.com/patent/US8842293B2/en)、[US10241425B2](https://patents.google.com/patent/US10241425B2/en)、[US11662669B2](https://patents.google.com/patent/US11662669B2/en) |
| **Nikon** | ① 远心/棱镜稳定的多点斜入射；② 反射率与空气光程补偿；③ 多波长×偏振补偿薄膜/GH 偏差；④ 像素级滤色/偏振与空间复用 | 把 process-dependent 相位/偏振偏差转化为可观测并可补偿的信号 | 公开高密度窗口主要在 2006–2014；2019 优先权分支显示架构仍有延续，但近年连续证据弱于 ASML/SMEE | [US10928187B2](https://patents.google.com/patent/US10928187B2/en)、[US9213227B2](https://patents.google.com/patent/US9213227B2/en)、[US9243901B2](https://patents.google.com/patent/US9243901B2/en) |
| **Canon** | ① 多点/多波长离轴表面检测与预扫描；② 双工位基准传递、漂移校正和多量程表面拟合；③ 大检测区域/邻场测量、采样点分配与扫描动态约束 | 将表面测量稳定地嵌入曝光设备节拍与 stage 控制 | 大视场并行测量、边曝光边测下一 shot、按曝光区域配置采样、由高度时序约束扫描 | [US12072638B2](https://patents.google.com/patent/US12072638B2/en)、[EP4361728A1](https://patents.google.com/patent/EP4361728A1/en)、[US20240361707A1](https://patents.google.com/patent/US20240361707A1/en) |
| **SMEE / 中国研发** | ① 宽谱反射式与粗/精测量；② 工艺适应、归一化、预扫描/边缘 map；③ 扫描镜监测、空间偏振差分、错位子光栅；④ 多路同步、探测器/数字解调及瞳面调制 | 从光学头、量程和工艺适应，扩展到多通道一致性、动态测量与国产系统集成 | 公开申请持续至 2024；多路同步、数字/阵列检测、校准和大面积/瞳面调制并行推进 | [CN100559278C](https://patents.google.com/patent/CN100559278C/zh)、[CN108106561B](https://patents.google.com/patent/CN108106561B/zh)、[CN110095944B](https://patents.google.com/patent/CN110095944B/zh) |

## 四家共性与差异

- 共性：均以斜入射/结构光或光栅式 Z 测量为基础，并逐步增加多点、工艺补偿、标定和扫描协同。
- ASML：最完整地把 process physics、光机电集成、量程和数据融合连成连续路线；UVLS 是其显著分支。
- Nikon：专利特征最集中在多波长×偏振、GH/薄膜误差及像素级光谱分离。
- Canon：相对更强调曝光装置中的工位基准、测量区域分配、扫描节拍和 surface map 的控制用途。
- SMEE：国内公开密度最高，覆盖基础光学头、信号处理、标定、偏振差分和多通道；数量优势不能直接等同于有效权利要求广度。

## PPT 取舍原则

- 每家公司最多显示 3–4 个阶段，不列完整 family 清单。
- 专利号只作为路线锚点；每家展示 1–3 个即可。
- 不用样本数量推导“技术领先”，只用于说明公开布局强度和持续性。

