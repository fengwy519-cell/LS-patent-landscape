// Deterministic editable PPTX + SVG builder. Run with Node.js, no dependencies.
const fs = require('fs'), path = require('path');
const O = process.argv[2] || path.join(__dirname,'../exports');
fs.mkdirSync(O,{recursive:true});
const W=1600,H=900, navy='15324F', blue='2166A5', ink='243746', gray='586B7A', pale='F2F5F8', line='D7E0E8', orange='A54719', amber='956522';
const slides=[]; let s;
function rect(x,y,w,h,fill,stroke=null){s.push({k:'r',x,y,w,h,fill,stroke});}
function txt(x,y,w,h,text,size=24,color=ink,bold=false){s.push({k:'t',x,y,w,h,text,size,color,bold});}
function base(title,sub,page){s=[];slides.push(s);rect(0,0,W,H,'FFFFFF');rect(64,55,8,45,blue);txt(92,48,1440,62,title,38,navy,true);txt(64,119,1472,52,sub,24,gray);txt(1470,849,65,28,page,18,gray);}
base('LS 需求随光刻整机产生，价值在系统集成与准入','商业机会由光刻设备需求、整机集成能力和客户验证共同决定。','01');
txt(64,191,500,36,'需求传导',26,navy,true);
const labels=['半导体制造需求','晶圆厂设备投资','光刻设备采购 / 升级','LS 测高与调焦调平'];
labels.forEach((t,i)=>{const x=64+i*378;rect(x,241,338,66,i===3?'E8F0F8':pale);txt(x+16,257,308,34,t,25,navy,true);if(i<3)txt(x+345,257,28,34,'→',26,blue);});
txt(64,322,1472,32,'需求传导，并非固定比例换算。',21,gray);
txt(64,390,850,38,'主要参与者｜按角色与应用区分',26,navy,true);
const players=[
['国际整机','ASML：EUV / DUV；Nikon：投影光刻；Canon：KrF / i-line等'],
['国内整机','SMEE：公开 SSX600 调焦调平能力'],
['上游光学','ZEISS：光刻光学能力；未确认整套 LS 供货关系'],
['国内研发','中科院相关机构、高校：科研与联合研发角色']
];
players.forEach((r,i)=>{const y=450+i*70;rect(64,y+59,848,1,line);txt(64,y,125,42,r[0],23,navy,true);txt(195,y,715,50,r[1],22);});
txt(64,741,850,48,'不代表能力或份额对等；SMEE 销量与先进节点量产未披露。',20,gray);
rect(950,390,2,395,line);
txt(990,390,546,35,'公开需求代理｜不是 LS 市场规模',24,navy,true);
txt(990,440,546,30,'ASML 新光刻系统销量',23,ink,true);
txt(990,486,200,60,'380',48,blue,true);txt(1248,486,200,60,'300',48,blue,true);
txt(990,551,205,30,'2024 年 · 台',21,gray);txt(1248,551,230,30,'2025 年 · 台',21,gray);
txt(990,591,546,32,'单一厂商年度波动，不代表行业下滑。',20,gray);
rect(990,637,546,1,line);
txt(990,659,546,30,'全球半导体设备销售额 billings',22,ink,true);
txt(990,700,310,56,'405.3 亿美元',36,blue,true);
txt(1310,706,226,43,'同比 +23%',27,blue,true);
txt(990,758,546,31,'2026 Q2 · 全部设备 · 单季度，不年化',20,gray);
rect(64,812,1472,1,line);
txt(64,830,1380,49,'来源：ASML FY2025 [S01]；SEMI 2026Q2 [S02]；参与者 [S04–S11]。\n光刻与 LS 未单列为该统计口径，不估算独立 LS TAM。',18,gray);
base('关键采购风险集中在紫外照明、精密光学与定制光栅','稳定交付取决于定制精度、批次一致性、迭代周期，以及换源后的系统重验证。','02');
txt(64,181,1472,33,'功能类别汇总；候选不是已认证供应商，具体器件按架构选用。',21,gray);
const xs=[64,259,499,819,1049,1419,1536], headers=['类别','核心要求','代表候选','当前供应状态','主要风险','风险'];
rect(64,231,1472,50,navy);
headers.forEach((h,i)=>txt(xs[i]+12,242,xs[i+1]-xs[i]-24,32,h,22,'FFFFFF',true));
const rows=[
['UV/DUV 照明','有效光谱亮度\n稳定性、耦合、寿命','Energetiq / Hamamatsu\n卓立汉光：系统候选','商用品存在\n系统适配待验证','光预算、长期漂移\n换源重标定','高','高亮度分支'],
['精密光学\n+ UV 镀膜','面形、散射、基准\n镀后及装配稳定','ZYGO / CASTECH\n等定制候选','国内外有候选\n组合精度待验证','加工—镀膜—检测—装调\n返工影响研发排期','高','定制组合'],
['多区域\n精密光栅','周期、占空比、位置\n缺陷与全幅一致性','APPLIED IMAGE / 清溢\n功能首件尚待确认','有加工路线\n功能验收待完成','母版、全幅与批次响应\n换厂后重新标定','高','多区域定制'],
['UV 探测\n与电子学','UV响应、低噪声\n多通道同步','Hamamatsu / TI / ADI\nGpixel：阵列技术候选','通用电子成熟\nUV专用供货待核','封装与专用品适配\n阵列仅在选定架构使用','中–高','通用中 / 阵列高'],
['特殊分光 / 偏振\n光纤 / 精密结构','波段、偏振、杂光\n热稳与机械稳定','CASTECH / Thorlabs等\n结构件按图纸评审','有加工基础\n组合性能待验证','多参数组合降低替代性\n精密基准需装机复验','中–高','光纤中 / 定制高']
];
rows.forEach((r,i)=>{const y=281+i*88;rect(64,y,1472,88,i%2===0?'F4F7FA':'FFFFFF');rect(64,y,5,88,i<3?orange:amber);for(let j=0;j<5;j++)txt(xs[j]+12,y+15,xs[j+1]-xs[j]-24,64,r[j],j===2?20:21,j===0?navy:ink,j===0);txt(1430,y+12,96,31,r[5],23,i<3?orange:amber,true);txt(1425,y+49,106,38,r[6].replace(' / ','\n'),16,gray);rect(64,y+87,1472,1,line);});
txt(64,744,1472,34,'采购动作',23,navy,true);
txt(204,746,360,33,'光源：提前借样验证',22,blue,true);
txt(570,746,490,33,'光学件：加工 / 镀膜 / 检测联合评审',22,blue,true);
txt(1070,746,466,33,'光栅：关键样片 → 全尺寸首件',22,blue,true);
txt(64,801,1472,62,'工程预筛：实际价格、交期、第二来源及量产能力，需通过询价（RFQ）、首件与供应商审核确认。\n高亮度UV路线为高；氘灯系统为中。来源：component_risk_matrix.md；官方证据 [C01–C24]。',18,gray);
const esc=t=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
function svg(scene){return '<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900"><style>text{font-family:"Noto Sans CJK SC","Microsoft YaHei","Source Han Sans SC",sans-serif}</style>'+scene.map(o=>o.k==='r'?'<rect x="'+o.x+'" y="'+o.y+'" width="'+o.w+'" height="'+o.h+'" fill="#'+o.fill+'"'+(o.stroke?' stroke="#'+o.stroke+'"':'')+'/>':'<text x="'+o.x+'" y="'+(o.y+o.size)+'" font-size="'+o.size+'" font-weight="'+(o.bold?700:400)+'" fill="#'+o.color+'">'+o.text.split('\n').map((t,i)=>'<tspan x="'+o.x+'" dy="'+(i?o.size*1.28:0)+'">'+esc(t)+'</tspan>').join('')+'</text>').join('')+'</svg>';}
slides.forEach((s,i)=>fs.writeFileSync(path.join(O,'0'+(i+1)+'_'+['market','procurement'][i]+'.svg'),svg(s)));
// ZIP (stored entries), OOXML with editable native DrawingML rectangles and text.
const enc=t=>new TextEncoder().encode(t);
function crc(a){let c=0xffffffff;for(const b of a){c^=b;for(let i=0;i<8;i++)c=(c>>>1)^((c&1)?0xedb88320:0);}return (c^0xffffffff)>>>0;}
function zip(entries){let pos=0,ls=[],cs=[];function hdr(n){let a=new Uint8Array(n);return [a,new DataView(a.buffer)];}for(const [name,body]of Object.entries(entries)){const n=enc(name),b=enc(body),c=crc(b);let[a,v]=hdr(30);v.setUint32(0,0x04034b50,true);v.setUint16(4,20,true);v.setUint32(14,c,true);v.setUint32(18,b.length,true);v.setUint32(22,b.length,true);v.setUint16(26,n.length,true);ls.push(a,n,b);let[d,w]=hdr(46);w.setUint32(0,0x02014b50,true);w.setUint16(4,20,true);w.setUint16(6,20,true);w.setUint32(16,c,true);w.setUint32(20,b.length,true);w.setUint32(24,b.length,true);w.setUint16(28,n.length,true);w.setUint32(42,pos,true);cs.push(d,n);pos+=30+n.length+b.length;}
let[z,v]=hdr(22);v.setUint32(0,0x06054b50,true);v.setUint16(8,Object.keys(entries).length,true);v.setUint16(10,Object.keys(entries).length,true);v.setUint32(12,cs.reduce((a,b)=>a+b.length,0),true);v.setUint32(16,pos,true);const all=[...ls,...cs,z],out=new Uint8Array(all.reduce((a,b)=>a+b.length,0));let k=0;for(const b of all){out.set(b,k);k+=b.length;}return out;}
const ns='xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"';
const rel=(arr)=>'<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+arr.map(([id,type,target])=>'<Relationship Id="'+id+'" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/'+type+'" Target="'+target+'"/>').join('')+'</Relationships>';
const group='<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>';
const u=n=>Math.round(n*7620);
function shape(o,i){let t='<p:sp><p:nvSpPr><p:cNvPr id="'+(i+2)+'" name="Object '+(i+2)+'"/><p:cNvSpPr'+(o.k==='t'?' txBox="1"':'')+'/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="'+u(o.x)+'" y="'+u(o.y)+'"/><a:ext cx="'+u(o.w)+'" cy="'+u(o.h)+'"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom>'+(o.k==='r'?'<a:solidFill><a:srgbClr val="'+o.fill+'"/></a:solidFill>':'<a:noFill/>')+'<a:ln><a:noFill/></a:ln></p:spPr>';
if(o.k==='t')t+='<p:txBody><a:bodyPr wrap="none" lIns="0" tIns="0" rIns="0" bIns="0" anchor="t"/><a:lstStyle/>'+o.text.split('\n').map(v=>'<a:p><a:pPr><a:lnSpc><a:spcPct val="128000"/></a:lnSpc><a:spcAft><a:spcPts val="0"/></a:spcAft></a:pPr><a:r><a:rPr lang="zh-CN" sz="'+Math.round(o.size*60)+'" b="'+(o.bold?1:0)+'"><a:solidFill><a:srgbClr val="'+o.color+'"/></a:solidFill><a:latin typeface="Microsoft YaHei"/><a:ea typeface="Microsoft YaHei"/></a:rPr><a:t>'+esc(v)+'</a:t></a:r><a:endParaRPr lang="zh-CN"/></a:p>').join('')+'</p:txBody>';
return t+'</p:sp>';}
const E={};
E['[Content_Types].xml']='<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>'+[['/ppt/presentation.xml','presentation'],['/ppt/slideMasters/slideMaster1.xml','slideMaster'],['/ppt/slideLayouts/slideLayout1.xml','slideLayout'],...slides.map((_,i)=>['/ppt/slides/slide'+(i+1)+'.xml','slide'])].map(([p,t])=>'<Override PartName="'+p+'" ContentType="application/vnd.openxmlformats-officedocument.presentationml.'+t+'+xml"/>').join('')+'</Types>';
E['_rels/.rels']=rel([['rId1','officeDocument','ppt/presentation.xml']]);
E['ppt/presentation.xml']='<p:presentation '+ns+'><p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId3"/></p:sldMasterIdLst><p:sldIdLst><p:sldId id="256" r:id="rId1"/><p:sldId id="257" r:id="rId2"/></p:sldIdLst><p:sldSz cx="12192000" cy="6858000" type="screen16x9"/><p:notesSz cx="6858000" cy="9144000"/></p:presentation>';
E['ppt/_rels/presentation.xml.rels']=rel([['rId1','slide','slides/slide1.xml'],['rId2','slide','slides/slide2.xml'],['rId3','slideMaster','slideMasters/slideMaster1.xml']]);
E['ppt/slideMasters/slideMaster1.xml']='<p:sldMaster '+ns+'><p:cSld><p:spTree>'+group+'</p:spTree></p:cSld><p:clrMap accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" bg1="lt1" bg2="lt2" folHlink="folHlink" hlink="hlink" tx1="dk1" tx2="dk2"/><p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst><p:txStyles><p:titleStyle/><p:bodyStyle/><p:otherStyle/></p:txStyles></p:sldMaster>';
E['ppt/slideMasters/_rels/slideMaster1.xml.rels']=rel([['rId1','slideLayout','../slideLayouts/slideLayout1.xml']]);
E['ppt/slideLayouts/slideLayout1.xml']='<p:sldLayout '+ns+' type="blank" preserve="1"><p:cSld name="Blank"><p:spTree>'+group+'</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>';
E['ppt/slideLayouts/_rels/slideLayout1.xml.rels']=rel([['rId1','slideMaster','../slideMasters/slideMaster1.xml']]);
slides.forEach((s,i)=>{E['ppt/slides/slide'+(i+1)+'.xml']='<p:sld '+ns+'><p:cSld><p:spTree>'+group+s.map(shape).join('')+'</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>';E['ppt/slides/_rels/slide'+(i+1)+'.xml.rels']=rel([['rId1','slideLayout','../slideLayouts/slideLayout1.xml']]);});
fs.writeFileSync(path.join(O,'LS_market_procurement.pptx'),zip(E));
fs.writeFileSync(path.join(O,'scene.json'),JSON.stringify(slides,null,2));
