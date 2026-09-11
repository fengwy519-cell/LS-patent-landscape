"""Build the project index from existing repository evidence only; no network access."""
import csv
import hashlib
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
def read(path):
    return list(csv.DictReader((ROOT / path).open(encoding='utf-8-sig')))
def patents(text):
    return set(re.findall(r'\b(?:US|WO|EP|JP|CN|KR|TW|SG)\d{5,13}[ABC]\d?\b', text))
def join(values):
    return '|'.join(sorted(set(filter(None, values))))

land = read('06_presentation/ppt_data.csv')
core = read('02_data/patent_families.csv')
claims = read('04_claims/claim_risk_matrix.csv')
frozen_hash = hashlib.sha256((ROOT/'06_presentation/ppt_data.csv').read_bytes()).hexdigest()
assert frozen_hash == '6fd040d990aa5219ae26fddb2327711c5add0098d4f91fade91fe408dc26e917'

focus_text = '''将晶圆高度转换为稳定的差分光强信号。
通过投影与检测光栅提高测高灵敏度及共模抑制能力。
降低宽谱斜入射测量中的镀膜和光路误差。
通过不同波长或偏振测量差异区分工艺误差与真实高度。
通过光刻胶敏感波段降低下层反射造成的表观高度偏差。
通过选择探测子区平衡空间分辨率、噪声与吞吐量。
采用探测阵列直接采样周期图像，减少独立检测光栅的装调负担。
主动调整投影或探测元件以补偿成像与零位漂移。
调整参考高度以兼顾高灵敏度与大捕获量程。
将检测光栅与后续光学件集成以减小体积和多通道漂移。
归一化并融合不同测量光斑尺寸传感器的高度数据。
通过多光导管和投影单元控制紧凑照明的均匀性。
用光纤芯阵列传输条纹不同相位部分，使探测器远离受限空间。
通过子视场分割与反射中继扩展测量覆盖宽度。
通过错位双反射中继扩大可测视场。
通过反射件和棱镜配置抑制斜入射多点成像的偏振位移。
扫描狭缝像并利用强度分布降低反射率及图像畸变影响。
利用狭缝区域反射率信息补偿表面位置测量。
联合多波长与多偏振信号补偿薄膜反射相位及 GH 误差。
将光谱或偏振滤光集成到像素以减少光路差与错位。
在同一探测器上空间复用多个条纹测量通道。
通过彩色 TDI 条纹探测支持高速扫描和光谱分离。
匹配波长与光栅周期以抑制空气光程变化引起的测高误差。
通过多波长加权降低薄膜干涉造成的表面位置偏差。
通过针孔阵列及扫描实现多点表面位置测量。
通过宽谱多点和线阵探测支持快速高度与倾斜测量。
校正测量工位与曝光工位之间的基准传递误差。
利用不同量程的表面数据及拟合控制适应翘曲和已曝光区域。
结合可变孔径与差分莫尔测量适应不同光斑和边缘条件。
通过全反射光路与阶梯镜降低宽谱多点成像误差。
通过粗测与精测双支路兼顾捕获范围和精测灵敏度。
通过非对称共轭抑制下层图形对表面测量的影响。
通过模拟反馈归一化减小反射率与光强变化的影响。
通过四通道空间差分莫尔比值抑制光源及反射率扰动。
通过光学监测补偿扫描镜的位置及振幅漂移。
通过同步偏振差分、参考图形和阵列探测降低周期内光强波动影响。
通过错位子检测光栅实现同步差分输出。
通过可编码像素构造数字光栅并解算位移与高度。'''.splitlines()
assert len(focus_text)==len(core)==38
core_focus={r['family_key']:f for r,f in zip(core,focus_text)}
cluster_focus={
 'Oblique/grating height sensing':'涉及光刻调焦调平与表面位置测量；现有记录未细分具体问题。',
 'Calibration & drift':'涉及调焦调平标定及漂移补偿；具体措施以现有标题为限。',
 'Multipoint/array & throughput':'涉及多点或阵列测高及测量吞吐量。',
 'Detector array & digital demodulation':'涉及阵列探测或调焦调平信号数字解调。',
 'Spectral/polarization & process correction':'涉及光谱、偏振或工艺相关测高误差补偿。',
 'Large-field & optical integration':'涉及大视场测高或光学系统集成。',
 'Wafer map & sensor fusion':'涉及晶圆高度图重建或测量数据融合。',
 'Dynamic range':'涉及扩大测高量程或协调粗测与精测。',
 'UV/DUV surface selectivity':'涉及短波段测量与表面选择性。',
}
def normalize(a):
    if a=='ASML Netherlands B.V.': return 'ASML'
    if a=='Nikon Corporation': return 'Nikon'
    if a=='Canon Inc.': return 'Canon'
    if a.startswith('Shanghai Micro Electronics Equipment'): return 'SMEE'
    if a in ('Institute of Optics and Electronics CAS','Institute of Microelectronics CAS'): return 'CAS-related institutes'
    return a

out=[]
for r in land:
    t=r['title']
    focus=('涉及'+t.removeprefix('一种')+'。') if re.search('[\u4e00-\u9fff]',t) else cluster_focus[r['technology_category']]
    out.append(dict(applicant_normalized=r['applicant'],earliest_priority=r['earliest_priority'],family_key=r['family_id'],family_id=r['family_id'],representative_patent=r['representative_patent'],family_members=join(patents(r['representative_patent']+' '+r['note'])),title=t,technical_cluster=r['technology_category'],brief_focus=focus,jurisdictions=r['representative_patent'][:2],status_snapshot='未记录；不由公布/授权后缀推断当前有效性',project_role='Landscape',risk_screen='NOT_SCREENED',evidence_url=r['evidence_url'],source_records='06_presentation/ppt_data.csv#'+r['family_id'],applicant_detail=r['applicant'],focus_basis='现有标题/技术分类摘要；未新增技术分析',claim_review_scope='',index_notes=r['note']))

for c in core:
    members=patents(c['family_members']+' '+c['representative'])
    hits=[r for r in out if patents(r['family_members']) & members]
    assert len(hits)<=1, ('would merge frozen branches',c['family_key'])
    if hits:
        r=hits[0]
        assert not c['earliest_priority'] or c['earliest_priority']==r['earliest_priority'], c['family_key']
    else:
        r=dict.fromkeys(out[0],'')
        r.update(applicant_normalized=normalize(c['applicant_normalized']),earliest_priority=c['earliest_priority'],representative_patent=c['representative'],status_snapshot='',risk_screen='NOT_SCREENED')
        out.append(r)
    r.update(family_key=c['family_key'],family_members=join(patents(r['family_members'])|members),technical_cluster=c['technical_cluster'],brief_focus=core_focus[c['family_key']],focus_basis='核心库 problem/solution 的中文摘要',applicant_detail=c['applicant_normalized'])
    r['jurisdictions']=join(r['jurisdictions'].split('|')+c['jurisdictions'].split('|')+[m[:2] for m in members])
    r['status_snapshot']=c['status_snapshot']+' [来源：核心库既有 GP/论文快照，非本次核验]'
    r['risk_screen']=c['risk_screen']
    r['project_role']=join(r['project_role'].split('|')+['Core']+(['Background'] if c['risk_screen']=='BACKGROUND' else []))
    r['evidence_url']=join(r['evidence_url'].split('|')+[c['evidence_url']])
    r['source_records']=join(r['source_records'].split('|')+['02_data/patent_families.csv#'+c['family_key']])
    r['index_notes']=join([r['index_notes'],c['notes']]+(['原标题未记录；technical_cluster 为项目主题标签'] if not r['title'] else []))

for c in claims:
    r=next(r for r in out if r['family_key']==c['family_key'])
    if r['risk_screen']!=c['risk']:
        r['index_notes']=join([r['index_notes'],'风险冲突：核心库 '+r['risk_screen']+'；采用 Claim 矩阵 '+c['risk']])
    r['risk_screen']=c['risk']
    r['project_role']=join(r['project_role'].split('|')+['Claim/FTO'])
    r['claim_review_scope']=c['independent_claims_reviewed']
    r['family_members']=join(patents(r['family_members'])|{c['representative']})
    r['status_snapshot']+=' | Claim矩阵：'+c['jurisdiction_status_snapshot']
    r['evidence_url']=join(r['evidence_url'].split('|')+[c['evidence_url']])
    r['source_records']=join(r['source_records'].split('|')+['04_claims/claim_risk_matrix.csv#'+c['family_key']])

# These pairs have matching applicant/date/topic but NO explicit family mapping in the repository.
# Do not turn a candidate relationship into a confirmed family member.
pending=[('ASML-2018-MONOLITHIC','CN111936937A'),('ASML-2021-LIGHTPIPE','CN118435129A'),('SMEE-2016-MIRRORMON','US10394142B2')]
for key,rep in pending:
    a=next(r for r in out if r['family_key']==key)
    b=next(r for r in out if r['representative_patent']==rep)
    for r,other in [(a,b),(b,a)]:
        r['index_notes']=join([r['index_notes'],'候选同族（未确认，暂分列）：'+other['family_key']+'；仅申请人/日期/主题对应，仓库缺少显式同族映射'])

for r in out:
    r['jurisdictions']=join(r['jurisdictions'].split('|')+[p[:2] for p in patents(r['family_members'])])
    if not r['earliest_priority']: r['index_notes']=join([r['index_notes'],'最早优先权未记录；同厂商内排最后'])
out.sort(key=lambda r:(r['applicant_normalized'].casefold(),r['earliest_priority'] or '9999-99-99',r['family_key']))
fields=list(out[0])
with (ROOT/'02_data/all_patent_index.csv').open('w',encoding='utf-8-sig',newline='') as f:
    w=csv.DictWriter(f,fieldnames=fields); w.writeheader(); w.writerows(out)

# Coverage uses complete publication identifiers, including kind codes.
member_owner={}
for r in out:
    assert r['representative_patent'] in patents(r['family_members'])
    assert not r['earliest_priority'] or re.fullmatch(r'\d{4}-\d{2}-\d{2}',r['earliest_priority'])
    for p in patents(r['family_members']):
        assert p not in member_owner, ('duplicate member',p)
        member_owner[p]=r['family_key']
assert len({r['family_key'] for r in out})==len(out)
for c in claims:
    r=next(r for r in out if r['family_key']==c['family_key'])
    assert r['risk_screen']==c['risk']
source_paths=[ROOT/'README.md',*[p for p in ROOT.glob('[0-6]*_*/*') if p.suffix in ('.md','.csv') and p.name!='all_patent_index.csv']]
all_ids=set().union(*(patents(p.read_text(encoding='utf-8-sig')) for p in source_paths))
assert all_ids<=member_owner.keys(), sorted(all_ids-member_owner.keys())
assert len([r for r in out if 'Landscape' in r['project_role'].split('|')])==195
assert hashlib.sha256((ROOT/'06_presentation/ppt_data.csv').read_bytes()).hexdigest()==frozen_hash
print({'index_rows':len(out),'publication_identifiers':len(member_owner),'source_identifiers':len(all_ids),'landscape_rows':195,'core_rows':len(core),'claim_rows':len(claims),'unknown_priority':sum(not r['earliest_priority'] for r in out),'unresolved_candidate_pairs':len(pending),'coverage':'PASS','frozen_sha256':frozen_hash})
