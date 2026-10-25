const AREAS=[
 {n:1,name:'병원',e:'🩺',adj:[2,6,7],x:11.6,y:17.2,c:'#21503f'},
 {n:2,name:'공항',e:'✈️',adj:[1,3,7],x:37.5,y:.7,c:'#1f4278'},
 {n:3,name:'월스트리트',e:'💰',adj:[2,4,7],x:63.4,y:17.2,c:'#5f3b16'},
 {n:4,name:'도서관',e:'✒️',adj:[3,5,7],x:63.4,y:50.2,c:'#2f4a1c'},
 {n:5,name:'항구',e:'🚢',adj:[4,6,7],x:37.5,y:66.9,c:'#474844'},
 {n:6,name:'브로드웨이',e:'🎭',adj:[1,5,7],x:11.6,y:50.2,c:'#6b3020'},
 {n:7,name:'광장',e:'🏞️',adj:[1,2,3,4,5,6],x:37.5,y:33.7,c:'#3d3187'}
];
const CH=[
 {k:'surgeon',name:'외과의사',en:'Surgeon',sh:'외',pos:'관리자',diff:0.5,san:7,act:3,area:1,
  t:'의료진 — 이 추적자가 있는 지역에서는 균열 유무와 관계없이 모든 추적자가 지원 및 휴식을 할 수 있습니다.',
  a:'응급 치료 — ACT를 소모하지 않고 본인 또는 같은 지역 추적자의 SAN을 1 회복시킵니다.',
  p:'헌신 — 휴식으로 SAN을 회복할 수 없습니다.',
  x:'사명감 — 같은 지역 추적자 1명의 SAN을 2 회복시킵니다. 해당 추적자는 다음 턴 ACT가 2 감소합니다.'},
 {k:'actress',name:'영화배우',en:'Actress',sh:'배',pos:'공급가',diff:3.0,san:4,act:3,area:6,
  t:'팬 서비스 — 스포트라이트를 받은 다른 추적자가 다음 판정에서 보통 성공하면 SAN을 1 회복하며, 대성공하면 SAN을 2 회복합니다.',
  a:'스포트라이트 — 영화배우의 턴이 돌아오기 전까지, 같은 지역에 있는 모든 추적자의 다음 판정 1회에 +2 보너스를 제공합니다.',
  p:'백스테이지 — 자신의 턴 종료 시 지역에 혼자 있으면 SAN이 1 감소합니다.',
  x:'스크린 속의 나 — 같은 지역 추적자를 인접 지역으로 강제 이동시킵니다. 해당 추적자는 ACT가 1 감소합니다.'},
 {k:'killer',name:'킬러',en:'Killer',sh:'킬',pos:'해결사',diff:1.0,san:8,act:4,area:5,
  t:'전장 파악 — 균열이 있는 지역으로 이동할 때 필요한 ACT가 1 감소합니다 (최소 0).',
  a:'즉시 제거 — 다음 균열 소멸의 ACT 소모가 1 늘어나는 대신(최소 2) 해당 균열이 판정 없이 즉시 소멸됩니다.',
  p:'임무 완수 — 능력으로 균열을 소멸시키면 SAN이 1 감소합니다.',
  x:'충동 — 균열이 있는 지역으로 자동 이동하고 즉시 제거를 사용합니다.'},
 {k:'investor',name:'투자자',en:'Investor',sh:'투',pos:'공급가',diff:1.0,san:8,act:3,area:3,
  t:'공격적인 투자 — 물자 보급을 받은 추적자가 다음 판정에서 대성공하면 본인의 다음 턴 ACT가 1 증가합니다.',
  a:'물자 보급 — 같은 지역과 인접 지역의 모든 추적자의 ACT를 1 증가시킵니다.',
  p:'리스크 분담 — 물자 보급을 받은 추적자가 소멸에 실패하면 본인의 다음 턴 ACT가 1 감소합니다.',
  x:'추심 — 같은 지역의 모든 추적자의 ACT를 2 감소시키며, 인접 지역의 모든 추적자의 ACT를 1 감소시킵니다.'},
 {k:'pilot',name:'파일럿',en:'Pilot',sh:'파',pos:'공급가',diff:2.0,san:6,act:4,area:2,
  t:'없음',
  a:'공중 지원 — 다른 지역의 균열 소멸 판정을 진행하거나 추적자를 지원할 수 있습니다. 인접 지역은 1 ACT, 비인접 지역은 2 ACT가 소모됩니다. 공항에 있어야 AREA 보너스.',
  p:'역마살 — 같은 지역에 3라운드 이상 머물면 3라운드부터 판정이 1 감소합니다 (라운드 종료 시 위치 기준).',
  x:'망상 비행 — 주사위 눈만큼 번호 차이가 나는 지역으로 이동한 뒤, 균열이 있으면 소멸 판정을 1회 진행하고, 균열이 없으면 SAN이 1 감소합니다.'},
 {k:'writer',name:'작가',en:'Writer',sh:'작',pos:'전략가',diff:3.0,san:4,act:2,area:4,
  t:'플롯 비틀기 — 라운드가 시작할 때마다 위기 카드 2장을 공개하며, 그 중 1장을 골라 효과롤 발동시킵니다.',
  a:'데우스 엑스 마키나 — 판정에 실패하면 SAN 감소를 무효화하고 다음 번호 지역으로 즉시 이동합니다.',
  p:'관찰자 — 다른 추적제에게 지원을 하거나 다른 추적자에게서 지원을 받을 때 ACT가 1 추가 소모됩니다.',
  x:'원고 파기 — 즉시 도서관으로 이동하며, 다음 턴까지 위기 카드·균열 확산 피해를 무시합니다. 대신 라운드 종료 시 붕괴도가 추가로 1 증가합니다.'}
];
const SIDE=n=>AREAS[n-1].name;
const CARDS=[
 {name:'뒤틀린 도로',desc:'이동에 2 ACT가 소모됩니다.',set(){G.fx.moveCost=2}},
 {name:'단절된 공기',desc:'추적자 간 지원이 제한됩니다.',set(){G.fx.noSupport=true}},
 {name:'불안한 밤',desc:'휴식으로 SAN을 회복할 수 없습니다.',set(){G.fx.noRestHeal=true}},
 {name:'혼자서는 안 된다',desc:'지역에 추적자가 2명 이상 있어야 균열 소멸 판정을 시도할 수 있습니다.',set(){G.fx.needTwo=true}},
 {name:'느린 시간',desc:'모든 추적자의 ACT가 1 감소한 채로 시작합니다.',set(){G.fx.actMinus=1;G.players.forEach(p=>{p.act=Math.max(0,p.act0-1)});log('느린 시간: 모든 추적자 ACT -1')}},
 {name:'끊어진 길',draw:true,desc:'광장을 제외한 지역 1개를 추첨합니다. 해당 지역과 광장 사이의 이동이 제한됩니다.',set(){const n=rnd(6);G.fx.cut=n;G.fx.note=`${SIDE(n)} ↔ 광장 이동 통제`;log('끊어진 길: '+G.fx.note)}},
 {name:'삼켜진 지역',draw:true,desc:'지역 1개를 추첨합니다. 이번 라운드에 해당 지역으로의 이동이 제한됩니다.',set(){const n=rnd(7);G.fx.sealed=n;G.fx.note=`${SIDE(n)}(으)로 이동 불가`;log('삼켜진 지역: '+G.fx.note)}},
 {name:'메아리치는 상처',desc:'균열이 있는 지역에 있는 추적자의 SAN이 즉시 1 감소합니다. 이 카드의 영향으로 SAN이 0이 된 추적자는 즉시 이상 상태에 빠집니다.',set(){G.players.forEach(p=>{if(A(p.loc).cracks.length)cardSan(p,1)})}},
 {name:'불안한 군중',desc:'지역에 혼자 있는 추적자의 SAN이 즉시 1 감소합니다. 이 카드의 영향으로 SAN이 0이 된 추적자는 즉시 이상 상태에 빠집니다.',set(){G.players.forEach(p=>{if(G.players.filter(q=>q.loc===p.loc).length===1)cardSan(p,1)})}},
 {name:'시간이 다 됐다',draw:true,desc:'균열이 가장 많은 지역에 균열이 1개 더 발생합니다. 가장 많은 지역이 2개 이상이면 그중 1개를 추첨합니다.',set(){
  let mx=0;G.areas.forEach(a=>{mx=Math.max(mx,a.cracks.length)});
  if(!mx){log('시간이 다 됐다: 균열이 없어 효과 없음');return}
  const c=[];G.areas.forEach((a,i)=>{if(a.cracks.length===mx)c.push(i+1)});
  const n=c[rnd(c.length)-1];log(`시간이 다 됐다: 균열이 가장 많은 지역은 ${SIDE(n)}${c.length>1?' (동률 추첨)':''}`);addCrack(n)}},
 {name:'도시가 숨을 쉰다',desc:'모든 약화된 균열이 즉시 일반 균열로 회복됩니다.',set(){let k=0;G.areas.forEach(a=>a.cracks.forEach(c=>{if(c.weak){c.weak=false;k++}}));log(`도시가 숨을 쉰다: 약화된 균열 ${k}개가 일반 균열로 회복`)}},
 {name:'기억하는 방',desc:'AREA가 있는 추적자는 자신이 AREA 보너스를 받는 지역으로, AREA가 없는 추적자는 광장으로 ACT 소모 없이 즉시 이동합니다.',set(){G.players.forEach(p=>{p.loc=p.area||7});log('기억하는 방: 모든 추적자가 AREA 지역으로 이동')}},
 {name:'불시착',draw:true,desc:'모든 추적자가 지역을 추첨한 뒤 해당 지역으로 ACT 소모 없이 즉시 이동합니다.',set(){G.players.forEach(p=>{const n=rnd(7);p.loc=n;log(`${p.name} → ${SIDE(n)}`)})}},
 {name:'강제 교환',draw:true,desc:'추적자 2명을 추첨합니다. 두 추적자는 ACT 소모 없이 즉시 서로의 위치를 바꿉니다.',set(){
  const a=rnd(G.players.length)-1;let b;do{b=rnd(G.players.length)-1}while(b===a);
  const P=G.players[a],Q=G.players[b],pl=P.loc,ql=Q.loc;P.loc=ql;Q.loc=pl;
  log(`${P.name}: ${SIDE(pl)} → ${SIDE(ql)}`);log(`${Q.name}: ${SIDE(ql)} → ${SIDE(pl)}`)}},
 {name:'뒤바뀐 균열',draw:true,desc:'균열이 있는 지역 중 2곳을 추첨합니다. 약화된 균열을 포함하여 두 지역의 균열 현황이 서로 바뀝니다.',set(){
  const c=[];G.areas.forEach((a,i)=>{if(a.cracks.length)c.push(i+1)});
  if(c.length<2){log('균열이 있는 지역이 2곳 미만이라 효과 없음');return}
  const x=c.splice(rnd(c.length)-1,1)[0],y=c[rnd(c.length)-1],t=A(x).cracks;A(x).cracks=A(y).cracks;A(y).cracks=t;
  log(`${SIDE(x)} ↔ ${SIDE(y)} 균열 현황 교환`)}},
 {name:'거울 속의 남자',desc:'이번 라운드에 일반 균열의 판정 범위가 4~6 실패 / 2·3 보통 성공 / 1 대성공으로, 약화된 균열의 판정 범위가 5·6 실패 / 1~4 성공으로 바뀝니다. 판정 결과 효과는 그대로이며, AREA 보너스는 더 낮은 수를 적용합니다.',set(){G.fx.mirror=true}},
 {name:'저항하는 균열',draw:true,desc:'균열이 있는 지역 1개를 추첨합니다. 이번 라운드에 해당 지역에서 균열 소멸을 시도하면 주사위를 두 번 굴려 더 낮은 결과로 판정합니다. 협력 보너스와 AREA 보너스는 주사위를 굴린 뒤 그대로 적용합니다.',set(){
  const c=[];G.areas.forEach((a,i)=>{if(a.cracks.length)c.push(i+1)});
  if(!c.length){log('저항하는 균열: 균열이 없어 효과 없음');return}
  const n=c[rnd(c.length)-1];G.fx.resist=n;G.fx.note=`${SIDE(n)}에서 판정 시 주사위 2번, 낮은 값 적용`;log('저항하는 균열: '+G.fx.note)}},
 {name:'잘못된 군중',desc:'이번 라운드에 모든 지역의 협력 보너스가 본인을 제외하고 지역에 있는 추적자 수에 상관없이 +1로 고정됩니다.',set(){G.fx.crowd=true}},
 {name:'불신의 공기',draw:true,desc:'지역 1개를 추첨합니다. 이번 라운드에 해당 지역의 협력 보너스가 본인을 제외하고 지역에 함께 있는 추적자 1명당 판정 -1로 바뀝니다.',set(){const n=rnd(7);G.fx.distrust=n;G.fx.note=`${SIDE(n)}: 협력 보너스가 추적자 1명당 -1로 변경`;log('불신의 공기: '+G.fx.note)}},
 {name:'환각의 잔영',desc:'이번 라운드에 대성공으로 균열을 소멸시켜도 대성공 보너스인 SAN +1 회복 효과가 무시됩니다.',set(){G.fx.noGreatHeal=true}}
];
let G=null,SEL=null,cid=0;
const rnd=n=>1+Math.floor(Math.random()*n);
const A=n=>G.areas[n-1],cur=()=>G.players[Math.min(G.turn,G.players.length-1)],nextNo=n=>n===7?1:n+1;
const adjOf=n=>AREAS[n-1].adj;
const heal=(q,n)=>{q.san=Math.min(q.max,q.san+n)};
const loseS=(p,n)=>{p.san=p.abnormal?p.san-n:Math.max(0,p.san-n)};
const sanH=q=>q.san<=q.max/2?`<span class='low'>${q.san}</span>`:q.san;
function log(t){G.log.unshift(t);if(G.log.length>40)G.log.pop();if(G.col)G.col.push(t)}
function pop(o){G.pop.push(o)}
function applyCard(c){if(c.set)c.set()}
function cardSan(p,n){
 if(p.immune){log(`${p.name}: 원고 파기로 카드 효과를 무시`);return}
 loseS(p,n);log(`${p.name}: SAN -${n} (현재 ${p.san})`);
 if(p.san<=0&&!p.abnormal){p.abnormal=true;log(`${p.name}: 즉시 이상 상태 진입`)}
}
function moveCost(p,n){return Math.max(0,(G.fx.moveCost||1)-(p.k==='killer'&&A(n).cracks.length?1:0))}
function canMove(p,n){
 if(!adjOf(p.loc).includes(n))return false;
 const f=G.fx;
 if(f.sealed===n)return false;
 if(f.cut&&((p.loc===f.cut&&n===7)||(p.loc===7&&n===f.cut)))return false;
 return p.act>=moveCost(p,n);
}
function canJudge(no){return !G.fx.needTwo||G.players.filter(q=>q.loc===no).length>=2}
function dbgHtml(){
 if(typeof location==='undefined'||location.hash!=='#debug')return '';
 return `<select onchange='dbgCard(this.value)'><option value=''>[테스트] 다음 카드 지정</option>${CARDS.map((c,i)=>`<option value='${i}'>${c.name}</option>`).join('')}</select>`;
}
function dbgCard(i){if(i==='')return;const c=CARDS[+i];G.deck=G.deck.filter(x=>x!==c);G.deck.unshift(c);log(`[테스트] 다음 라운드 카드: ${c.name}`);render()}
function crackPop(){
 const E=G.evd;
 pop({k:'ev',title:`${G.round}라운드 · 사건 단계`,spin:[`개수: ${E.spins.reduce((a,b)=>a+b,0)}개`],
  areas:Object.keys(E.placed).map(Number).sort((a,b)=>a-b).map(n=>`${SIDE(n)}: ${E.placed[n]}`),
  rest:Object.keys(E.rest).map(Number).sort((a,b)=>a-b).map(n=>`${SIDE(n)}: 약화된 균열 회복 ${E.rest[n]}`),
  lost:E.lost});
 G.evd=null;
}
function cardPop(c){pop({k:'card',title:`${G.round}라운드 · 사건 단계`,card:c,lines:c.draw?(G.col||[]):[]});G.col=null}
function colPop(secs){pop({k:'col',title:`${G.round}라운드 · 붕괴 단계`,gauge:G.collapse,secs})}
const surgeonAt=n=>G.players.some(q=>q.k==='surgeon'&&q.loc===n);
const canSR=n=>!A(n).cracks.length||surgeonAt(n);

function startGame(picks){
 const players=picks.map((k,i)=>{const c=CH.find(x=>x.k===k);
  return {id:i,k,name:c.name,sh:c.sh,max:c.san,san:c.san,act0:c.act,act:c.act,area:c.area,loc:c.area,last:c.area,stay:0,abnormal:false,mod:0,used:false,arm:false,armD:false,spot:0,spotBy:null,supplied:false}});
 G={players,areas:AREAS.map(()=>({cracks:[]})),collapse:15,round:0,turn:0,card:null,choice:null,pop:[],col:null,fx:{},judged:new Set(),log:[],over:null,extra:0,
  deck:[...CARDS].sort(()=>Math.random()-.5)};
 startRound();
}
function addCrack(no){
 const cand=[...new Set([no,nextNo(no),...adjOf(no).slice().sort((a,b)=>a-b)])];
 for(const c of cand){
  const a=A(c),w=a.cracks.find(x=>x.weak);
  if(w){w.weak=false;if(G.evd)G.evd.rest[c]=(G.evd.rest[c]||0)+1;log(`${AREAS[c-1].name}: 약화된 균열이 일반 균열로 회복`);return}
  if(a.cracks.length<3){a.cracks.push({id:++cid,weak:false});if(G.evd)G.evd.placed[c]=(G.evd.placed[c]||0)+1;log(`${AREAS[c-1].name}에 균열 발생`+(c!==no?` (${AREAS[no-1].name}에서 분산)`:''));return}
 }
 G.collapse+=.5;if(G.evd)G.evd.lost++;log(`${AREAS[no-1].name}: 분산할 곳이 없어 균열 소멸, 붕괴도 +0.5`);
}
function startRound(){
 G.round++;G.turn=0;G.fx={};G.players.forEach(p=>{p.act=p.act0});
 const np=G.players.length,spins=np<=2?1:2,mx=np<=4?2:3;
 log(`── ${G.round}라운드 시작 ──`);G.col=null;G.evd={spins:[],placed:{},rest:{},lost:0};
 for(let s=0;s<spins;s++){const k=rnd(mx);G.evd.spins.push(k);log(`개수: ${k}개`);for(let i=0;i<k;i++)addCrack(rnd(7))}
 crackPop();
 if(G.players.some(p=>p.k==='writer')&&G.deck.length>=2){G.choice=G.deck.splice(0,2);G.card=null;return}
 const c=G.deck.shift();G.deck.push(c);G.card=c;G.col=[];applyCard(c);cardPop(c);log(`위기 카드: ${c.name}`);
 finishStart();
}
function finishStart(){checkEnd();if(!G.over)startTurn()}
function pickCard(i){
 const keep=G.choice[i],drop=G.choice[1-i];
 G.deck.push(drop,keep);G.card=keep;G.choice=null;log(`플롯 비틀기: ${drop.name} 카드는 덱 맨 아래로`);G.col=[];applyCard(keep);cardPop(keep);log(`위기 카드: ${keep.name} 발동`);
 finishStart();render();
}
function startTurn(){
 const p=cur();
 p.act=Math.max(0,p.act0+p.mod-(G.fx.actMinus||0));p.mod=0;p.used=false;p.arm=false;p.armD=false;p.immune=false;G.judged=new Set();
 G.players.forEach(q=>{if(q.spotBy===p.id){q.spot=0;q.spotBy=null}});
 if(p.abnormal){abnormal(p);endTurn();return}
 if(p.act<=0){log(`${p.name}: ACT가 0이라 턴을 넘긴다`);endTurn()}
}
function endTurn(){
 const p=cur();
 if(p.k==='actress'&&G.players.filter(q=>q.loc===p.loc).length===1){loseS(p,1);log('백스테이지: 영화배우 SAN -1')}
 p.arm=false;p.armD=false;G.turn++;
 if(G.turn>=G.players.length)collapsePhase();else startTurn();
}
function collapsePhase(){
 G.col=null;
 const S1=[],S2=[],S3=[];
 const total=G.areas.reduce((s,a)=>s+a.cracks.length,0);
 const d=total===0?-2:total===1?-1:total===2?0:total===3?1:2,ex=G.extra;
 G.collapse=Math.max(0,G.collapse+d+ex);G.extra=0;
 S1.push(`균열 ${total}개 → 붕괴도 ${d>0?'+':''}${d}${ex?`, 원고 파기 +${ex}`:''} (현재 ${G.collapse})`);
 log(`붕괴 단계: ${S1[0]}`);
 G.players.forEach(p=>{if(p.loc===p.last)p.stay++;else{p.stay=1;p.last=p.loc}});
 if(G.collapse<=0){G.over='win';colPop([['도시 붕괴도 조정',S1]]);return}
 const src=[];G.areas.forEach((a,i)=>{if(a.cracks.length&&!a.cracks.some(c=>c.weak))src.push(i+1)});
 const got=new Set();
 src.forEach(no=>{
  const t=nextNo(no),nm=`${SIDE(no)} → ${SIDE(t)}`;
  if(got.has(t)){S2.push(`${nm}: 이미 확산을 받아 확산 없음`);return}
  const a=A(t),w=a.cracks.find(x=>x.weak);
  if(w){w.weak=false;got.add(t);S2.push(`${nm}: 약화된 균열이 일반 균열로 회복`)}
  else if(a.cracks.length<3){a.cracks.push({id:++cid,weak:false});got.add(t);S2.push(`${nm}: 균열 추가`)}
  else S2.push(`${nm}: 균열이 가득 차 확산 없음`);
 });
 if(!src.length)S2.push('확산할 균열 없음');
 S2.forEach(t=>log('균열 확산: '+t));
 G.players.forEach(p=>{const was=p.abnormal;p.abnormal=p.san<=0;const r=p.abnormal?(was?'이상 상태 유지':'이상 상태 진입'):(was?'이상 상태 해제':'정상');S3.push(`${p.name}: SAN ${sanH(p)} → ${r}`);log(`${p.name}: SAN ${p.san} → ${r}`)});
 colPop([['도시 붕괴도 조정',S1],['균열 확산',S2],['이상 상태 점검',S3]]);
 checkEnd();if(!G.over)startRound();
}
function checkEnd(){
 if(G.collapse>=30)G.over='lose';
 else if(G.collapse<=0)G.over='win';
 else if(G.players.every(p=>p.abnormal))G.over='lose';
}
function after(){if(!G.over&&cur().act<=0)endTurn();render()}

function abnormal(p){
 const here=G.players.filter(q=>q.loc===p.loc),pre=`⚠ ${p.name} 이상 행동 `;
 if(p.k==='surgeon'){const t=here.slice().sort((a,b)=>a.san-b.san)[0];heal(t,2);t.mod-=2;log(`${pre}사명감: ${t.name} SAN +2, 다음 턴 ACT -2`)}
 else if(p.k==='actress'){const t=here.find(q=>q!==p);if(!t)log(`${pre}스크린 속의 나: 대상 없음`);else{const ad=adjOf(p.loc),n=ad[rnd(ad.length)-1];t.loc=n;t.mod-=1;log(`${pre}스크린 속의 나: ${t.name} → ${AREAS[n-1].name}, ACT -1`)}}
 else if(p.k==='killer'){
  let best=0,tgt=0;G.areas.forEach((a,i)=>{if(a.cracks.length>best){best=a.cracks.length;tgt=i+1}});
  if(!tgt)log(`${pre}충동: 균열이 없어 아무 일도 없다`);
  else{p.loc=tgt;A(tgt).cracks.shift();loseS(p,1);log(`${pre}충동: ${AREAS[tgt-1].name} 이동, 균열 즉시 제거, SAN -1`)}}
 else if(p.k==='investor'){G.players.forEach(q=>{if(q===p)return;if(q.loc===p.loc)q.mod-=2;else if(adjOf(p.loc).includes(q.loc))q.mod-=1});log(`${pre}추심: 같은 지역 ACT -2, 인접 지역 ACT -1`)}
 else if(p.k==='pilot'){
  const d=rnd(6),c=[p.loc+d,p.loc-d].filter(n=>n>=1&&n<=7);
  if(!c.length){log(`${pre}망상 비행: 주사위 ${d}, 이동할 곳이 없다`);return}
  p.loc=c[rnd(c.length)-1];log(`${pre}망상 비행: 주사위 ${d} → ${AREAS[p.loc-1].name}`);
  const cr=A(p.loc).cracks[0];
  if(cr)judgeCore(p,p.loc,cr.id,0,true);else{loseS(p,1);log('균열이 없어 SAN -1')}}
 else if(p.k==='writer'){p.loc=4;p.immune=true;G.extra++;log(`${pre}원고 파기: 도서관으로 이동, 라운드 종료 시 붕괴도 +1`)}
}

function judgeCore(p,no,id,cost,free){
 const a=A(no),c=a.cracks.find(x=>x.id===id);
 if(!c||G.judged.has(id)||(!free&&p.act<cost))return false;
 if(!canJudge(no)){if(free)log('혼자서는 안 된다: 지역에 추적자가 2명 미만이라 판정을 시도하지 못했다');return false}
 if(!free)p.act-=cost;G.judged.add(id);
 const f=G.fx,cnt=no===p.loc?G.players.filter(q=>q!==p&&q.loc===p.loc).length:0;
 const coop=f.crowd?(cnt>0?1:0):(f.distrust===no?-cnt:cnt);
 const pen=p.k==='pilot'&&p.stay>=2&&p.loc===p.last?1:0;
 const bonus=coop+p.spot-pen,wasWeak=c.weak,mirror=!!f.mirror,notes=[];
 const fails=r=>c.weak?(mirror?r>=5:r<=2):(mirror?r>=4:r<=3);
 const roll=()=>{if(f.resist===no){const a1=rnd(6),a2=rnd(6);notes.push(`저항하는 균열: 주사위 ${a1}, ${a2} 중 낮은 값 적용`);return Math.min(a1,a2)}return rnd(6)};
 if(mirror)notes.push('거울 속의 남자: 판정 범위 반전');
 if(f.crowd)notes.push('잘못된 군중: 같은 지역에 다른 추적자가 있으면 협력 보너스 +1 고정');
 if(f.distrust===no)notes.push('불신의 공기: 같은 지역 추적자 1명당 판정 -1');
 const raw=roll(),spotV=p.spot;let rr=null,mir=false;let r=Math.max(1,Math.min(6,raw+bonus)),txt=`🎲 ${raw}${bonus?(bonus>0?' +':' ')+bonus:''}`;
 if(fails(r)&&p.area===p.loc){const rr0=roll(),r2=Math.max(1,Math.min(6,rr0+bonus));rr=rr0;mir=mirror;r=mir?Math.min(r,r2):Math.max(r,r2);txt+=` / AREA 재굴림 ${r2}`}
 const fail=fails(r),great=!c.weak&&(mirror?r<=1:r>=6);let res;
 if(fail){
  if(c.weak)res='실패: 약화된 균열 유지';
  else{c.weak=true;res='실패: 균열 약화';
   if(p.arm){p.arm=false;p.loc=nextNo(p.loc);res+=`, 데우스 엑스 마키나로 SAN 감소 무효 → ${AREAS[p.loc-1].name} 이동`}
   else{loseS(p,1);res+=', SAN -1'}}
 }else{
  a.cracks=a.cracks.filter(x=>x!==c);
  if(great){if(f.noGreatHeal)res='대성공: 균열 소멸 (환각의 잔영: SAN 회복 무시)';else{heal(p,1);res='대성공: 균열 소멸, SAN +1'}}else res='성공: 균열 소멸';
 }
 if(p.spot&&p.k!=='actress'&&!fail)G.players.filter(q=>q.k==='actress').forEach(q=>heal(q,great?2:1));
 p.spot=0;p.spotBy=null;
 if(p.supplied){const inv=G.players.find(q=>q.k==='investor');if(inv){if(great)inv.mod+=1;if(fail)inv.mod-=1}p.supplied=false}
 log(`${p.name} 판정 ${txt} = ${r} · ${res}`);pop({k:'dice',who:p.name,where:AREAS[no-1].name,wasWeak,raw,rr,mir,coop,spot:spotV,pen,r,res,notes,cap:raw+bonus>6||(rr!==null&&rr+bonus>6),low:raw+bonus<1||(rr!==null&&rr+bonus<1)});return true;
}
const remoteCost=(p,n)=>adjOf(p.loc).includes(n)?1:2;
function doJudge(no,id){const p=cur();if(judgeCore(p,no,id,no===p.loc?1:remoteCost(p,no),false))after()}
function doInstant(id){
 const p=cur(),a=A(p.loc);
 if(!p.armD||p.act<2||!a.cracks.some(c=>c.id===id))return;
 p.act-=2;p.armD=false;a.cracks=a.cracks.filter(c=>c.id!==id);loseS(p,1);log('킬러: 즉시 제거 (SAN -1)');after();
}
function doMove(n){
 const p=cur(),cost=moveCost(p,n);
 if(!canMove(p,n))return;
 p.act-=cost;p.loc=n;log(`${p.name} → ${AREAS[n-1].name} 이동`);after();
}
function costSup(p,q){let c=1;if(p.k==='pilot'&&q.loc!==p.loc)c=remoteCost(p,q.loc);if(p.k==='writer'||q.k==='writer')c++;return c}
function doSup(i){
 const p=cur(),q=G.players[i];
 if(G.fx.noSupport||q.san>=q.max||q===p||!canSR(q.loc)||(q.loc!==p.loc&&p.k!=='pilot'))return;
 const c=costSup(p,q);if(p.act<c)return;
 p.act-=c;heal(q,1);log(`${p.name}이(가) ${q.name} 지원 (SAN +1)`);after();
}
function doRest(){const p=cur();if(p.k==='surgeon'||!canSR(p.loc)||p.san>=p.max)return;if(G.fx.noRestHeal)log(`${p.name} 휴식 (불안한 밤: SAN 회복 불가)`);else{heal(p,1);log(`${p.name} 휴식 (SAN +1)`)}endTurn();render()}
function doEnd(){log(`${cur().name} 턴 종료`);endTurn();render()}
function doAbility(i){
 const p=cur();if(p.used)return;
 if(p.k==='surgeon'){heal(G.players[i],1);log(`응급 치료: ${G.players[i].name} SAN +1`)}
 else if(p.k==='actress'){G.players.filter(q=>q.loc===p.loc).forEach(q=>{q.spot=2;q.spotBy=p.id});log('스포트라이트: 같은 지역 추적자 다음 판정 +2')}
 else if(p.k==='killer'){if(!A(p.loc).cracks.length)return;p.armD=true;log('즉시 제거 준비 (균열 소멸 2 ACT, 판정 없음)')}
 else if(p.k==='investor'){G.players.forEach(q=>{if(q.loc===p.loc||adjOf(p.loc).includes(q.loc)){q.supplied=true;if(q===p)p.act++;else q.mod++}});log('물자 보급: 주변 추적자 ACT +1')}
 else if(p.k==='writer'){p.arm=true;log('데우스 엑스 마키나 준비')}
 else return;
 p.used=true;render();
}

const FACES=['⚀','⚁','⚂','⚃','⚄','⚅'];
function popNext(){G.pop.shift();render()}
function popHtml(o){
 if(o.k==='dice'){
  const det=`<div class="pl"><div>${o.who} · ${o.where} · ${o.wasWeak?'약화된 균열':'일반 균열'}</div><div>주사위 ${o.raw}${o.coop?` ${o.coop>0?'+':'−'} 협력 ${Math.abs(o.coop)}`:''}${o.spot?` + 스포트라이트 ${o.spot}`:''}${o.pen?` − 역마살 ${o.pen}`:''}</div>${o.rr!==null?`<div>AREA 보너스 재굴림: ${o.rr} → ${o.mir?'낮은':'높은'} 수 적용</div>`:''}${(o.notes||[]).map(t=>`<div class="muted">${t}</div>`).join('')}<div><b>최종 ${o.r}</b>${o.cap&&o.r===6?' (최대 6으로 조정)':''}${o.low&&o.r===1?' (최소 1로 조정)':''} · ${o.res}</div></div>`;
  return `<div class="over"><div class="card"><div class="dice ${o.done?'':'roll'}" id="dice">${o.done?FACES[o.r-1]:'🎲'}</div><div id="dres" style="${o.done?'':'visibility:hidden'}">${det}</div><button class="pri" id="pok" ${o.done?'':'disabled'} onclick="popNext()">확인</button></div></div>`;
 }
 const L=a=>a.map(t=>`<div>${t}</div>`).join('');
 if(o.k==='ev')return `<div class="over"><div class="card ctr"><h3>${o.title}</h3><p class="muted">균열 발생</p><div class="pl">${L(o.spin)}</div><div class="pl">${o.areas.length||o.rest.length||o.lost?L(o.areas)+L(o.rest)+(o.lost?`<div>분산 불가로 소멸: ${o.lost}개 (붕괴도 +${o.lost*.5})</div>`:''):'<div>발생한 균열 없음</div>'}</div><button class="pri" onclick="popNext()">확인</button></div></div>`;
 if(o.k==='card')return `<div class="over"><div class="card ctr"><h3>${o.title}</h3><p class="muted">위기 카드</p><p style="font-size:20px;margin:6px 0">🃏 <b>${o.card.name}</b></p><p>${o.card.desc}</p>${o.lines.length?`<div class="pl"><div class="muted">결과</div>${L(o.lines)}</div>`:''}<button class="pri" onclick="popNext()">확인</button></div></div>`;
 return `<div class="over"><div class="card"><h3>${o.title}</h3><div class="gauge"><i style="width:${Math.min(100,o.gauge/30*100)}%"></i></div><p class="muted">도시 붕괴도 ${o.gauge} / 30</p>${o.secs.map(([h,ls])=>`<div class="sec"><b>${h}</b>${L(ls)}</div>`).join('')}<button class="pri" onclick="popNext()">확인</button></div></div>`;
}
function rollAnim(){
 const o=G.pop[0];if(!o||o.k!=='dice'||o.done)return;
 const d=document.getElementById('dice');let n=0;
 const iv=setInterval(()=>{d.textContent=FACES[rnd(6)-1];if(++n>=9){clearInterval(iv);o.done=true;d.textContent=FACES[o.r-1];d.classList.remove('roll');document.getElementById('dres').style.visibility='visible';document.getElementById('pok').disabled=false}},110);
}
function sideHtml(){
 const cp=cur();
 return `<div class='card side'><b>추적자 현황</b>`+G.players.map(q=>`<div class='pr${q===cp?' on':''}'><div class='bar'><span class='nm'>${q===cp?'▶ ':''}${q.name}</span><span>${q.abnormal?'⚠ 이상':''}<button class='ib' onclick='showInfo(${q.id})'>ⓘ 능력</button></span></div><div class='bar'><span class='muted'>${AREAS[q.loc-1].name}</span><span>SAN ${sanH(q)}/${q.max} · ACT ${q.act}/${q.act0}</span></div><div class='gauge sg'><i style='width:${Math.max(0,q.san)/q.max*100}%'></i></div></div>`).join('')+`</div>`;
}
function overHtml(){
 const win=G.over==='win';
 const why=win?'도시 붕괴도 0 달성':G.collapse>=30?'도시 붕괴도 30 도달':'모든 추적자가 이상 상태';
 const tr=G.players.map(p=>`<div><b>${p.name}</b> · SAN ${sanH(p)}/${p.max} · ${p.abnormal?'이상 상태':'정상'} · ${AREAS[p.loc-1].name}</div>`).join('');
 const cr=AREAS.map(a=>{const c=A(a.n).cracks,w=c.filter(x=>x.weak).length;return `<div>${a.name}: ${c.length?`일반 ${c.length-w}개 / 약화 ${w}개`:'균열 없음'}</div>`}).join('');
 const tot=G.areas.reduce((s,a)=>s+a.cracks.length,0);
 return `<div class='over'><div class='card'><h2>게임 종료 · <span style='color:#e5484d'>${win?'승리':'패배'}</span></h2><p>${win?'도시를 구했다':'도시가 무너졌다'}</p><p class='muted'>${why}</p><div class='pl'><div>진행한 라운드: <b>${G.round}라운드</b> · 도시 붕괴도 <b>${G.collapse}</b> / 30</div></div><h4>추적자 현황</h4><div class='pl'>${tr}</div><button class='pri' onclick='G=null;render()'>다시 시작</button></div></div>`;
}
function showInfo(i){
 const q=G.players[i],c=CH.find(x=>x.k===q.k);
 document.getElementById('modal').innerHTML=`<div class='over'><div class='card wide rules'><h3 style='text-align:center;margin:0'>${c.name} <span class='muted'>${c.en}</span></h3><div class='muted' style='text-align:center'>${c.pos} · 운용 난이도 ${c.diff} · SAN ${c.san} / ACT ${c.act} / AREA ${AREAS[c.area-1].name}</div><h4>특성</h4><p style='margin:0'>${c.t}</p><h4>능력</h4><p style='margin:0'>${c.a}</p><h4>페널티</h4><p style='margin:0'>${c.p}</p><h4>이상 행동</h4><p style='margin:0'>${c.x}</p><div style='text-align:center;margin-top:12px'><button class='pri' onclick='hideRules()'>닫기</button></div></div></div>`;
}
function askReset(){document.getElementById('modal').innerHTML=`<div class='over'><div class='card' style='max-width:420px'><h3>게임 초기화</h3><p class='muted'>현재 게임은 포기 처리되고 추적자 인원 선택 화면으로 돌아갑니다.</p><div class='row' style='justify-content:center'><button class='pri' onclick='doReset()'>초기화</button><button onclick='hideRules()'>취소</button></div></div></div>`}
function doReset(){hideRules();G=null;SEL=null;render()}
function hideRules(){document.getElementById('modal').innerHTML=''}
function showRules(){document.getElementById('modal').innerHTML=`<div class='over'><div class='card wide rules'><h3 style='text-align:center;margin:0'>규칙 요약</h3>
<h4>승리 · 패배</h4><ul><li>도시 붕괴도는 15에서 시작합니다.</li><li>도시 붕괴도가 0에 도달하면 승리하며, 30에 도달하거나 모든 추적자가 이상 상태가 되면 패배합니다.</li></ul>
<h4>라운드 흐름</h4><ul><li>① 사건 단계 → ② 행동 단계(추적자 순서대로 턴) → ③ 붕괴 단계 순으로 반복합니다.</li></ul>
<h4>① 사건 단계</h4><ul><li>개수 돌림판을 돌린 뒤, 나온 개수만큼 장소 돌림판을 돌립니다. 돌림판을 돌려 나온 결과대로 균열이 발생합니다. 2인은 1~2 중 1번, 3~4인은 1~2 중 2번, 5~6인은 1~3 중 2번 돌립니다.</li><li>한 지역에 발생할 수 있는 균열은 최대 3개입니다. 이미 균열이 3개 있는 지역에 균열이 또 발생한다면 다음 번호 지역에 발생하며, 해당 지역도 이미 균열이 3개 있다면 인접 지역 중 번호가 낮은 지역에 발생합니다. 모든 지역에 균열이 3개 있다면 해당 균열은 발생하지 않는 대신 붕괴도가 즉시 0.5 오릅니다.</li><li>약화된 균열이 있는 지역에 균열이 추가될 때는 일반 균열이 새로 발생하지 않고, 약화된 균열이 일반 균열로 회복됩니다.</li><li>위기 카드는 인원수와 관계없이 1장을 뽑습니다. 위기 카드의 효과는 해당 라운드에만 적용되며, 라운드가 넘어가면 소멸됩니다.</li></ul>
<h4>② 행동 단계</h4><ul><li>추적자는 SAN(정신력), ACT(행동력), AREA(지역 보정) 스탯을 가집니다. ACT가 0이 되면 자동으로 턴이 종료됩니다.</li><li>이동(1 ACT): 인접 지역으로 이동합니다.</li><li>균열 소멸 판정(1 ACT): 현재 지역의 균열을 대상으로 주사위를 굴립니다. 같은 균열은 한 턴에 한 번만 시도할 수 있습니다.</li><li>지원(1 ACT): 균열이 없는 지역에서 같은 지역 추적자 1명의 SAN을 1 회복합니다.</li><li>능력 사용(ACT 소모 없음): 추적자 고유 능력이며 턴당 1회입니다.</li><li>휴식: 균열이 없는 지역에서 ACT 소모 없이 SAN을 1 회복하고 턴이 끝납니다.</li></ul>
<h4>판정</h4><ul><li>일반 균열: 1~3 실패(약화 균열로 변하고 SAN -1), 4~5 성공(소멸), 6 대성공(소멸, SAN +1).</li><li>약화된 균열: 1~2 실패(유지), 3~6 성공(소멸).</li><li>AREA 보너스: 해당 추적자의 AREA 지역에서 균열 소멸 판정에 실패하면 주사위를 한 번 더 굴려 더 높은 수를 적용합니다. (예외로 위기 카드 '거울 속의 남자' 의 효과가 적용되고 있을 때는 더 낮은 수를 적용합니다.)</li><li>협력 보너스: 본인을 제외하고 같은 지역에 있는 다른 추적자 1명당 주사위 값에 1이 더해집니다.</li></ul>
<h4>③ 붕괴 단계</h4><ul><li>균열 전체 개수에 따라 붕괴도가 변합니다. 0개 -2 / 1개 -1 / 2개 변화 없음 / 3개 +1 / 4개 이상 +2.</li><li>일반 균열이 있는 지역의 다음 번호 지역에 일반 균열이 1개 확산됩니다. 약화된 균열은 확산하지 않으며, 확산의 영향을 받는 지역에 약화된 균열이 있으면 약화된 균열이 일반 균열로 회복됩니다.</li><li>라운드 종료 시 SAN이 0 이하인 추적자는 다음 라운드부터 이상 상태가 되어 고유한 이상 행동만 합니다. SAN이 1 이상으로 회복되면 이상 상태에서 벗어납니다.</li></ul>
<div style='text-align:center;margin-top:12px'><button class='pri' onclick='hideRules()'>닫기</button></div></div></div>`}
const UPDATES=[
 {t:'기능 추가',l:['게임에 참여할 추적자를 모두 선택한 뒤 게임 시작 여부를 묻는 확인 팝업을 추가했습니다.','추적자 선택 화면 상단에 선택한 추적자 이름이 표시되도록 추가했습니다.']},
 {t:'표시 개선',l:['사건 단계의 균열 발생 팝업에서 균열 개수를 합산해 표시하도록 수정했습니다.','메인 화면에 업데이트 내역을 추가했습니다.','추적자의 SAN이 0 미만으로 감소하면 음수로 표기되도록 수정했습니다.','추적자의 SAN이 최대치의 절반 이하이면 숫자가 빨간색으로 표시되도록 수정했습니다.']},
 {t:'신 컨텐츠 추가',l:['위기 카드 메아리치는 상처, 불안한 군중, 시간이 다 됐다, 도시가 숨을 쉰다, 기억하는 방, 불시착, 강제 교환, 뒤바뀐 균열이 추가되었습니다.','위기 카드 거울 속의 남자, 저항하는 균열, 잘못된 군중, 불신의 공기, 환각의 잔영이 추가되었습니다.']},
 {t:'규칙·밸런스 조정',l:['참여 인원별 개수 돌림판을 조정했습니다 (2인 1~2 1번 / 3~4인 1~2 2번 / 5~6인 1~3 2번).','판정 최종 결과는 1~6 범위로 고정됩니다.','킬러의 이상 행동 충동을 수정했습니다. 이제 킬러는 더이상 인접 지역에 균열 1개를 발생시키지 않습니다.']},
];
function updHtml(){return `<div class="card"><b>업데이트 내역</b><div class="upd">${UPDATES.map(u=>`<h5>${u.t}</h5>${u.l.map(t=>`<div>· ${t}</div>`).join('')}`).join('')}</div></div>`}
function selPick(k){if(SEL.picks.length>=SEL.count)return;SEL.picks.push(k);render()}
function confirmSel(){const pk=SEL.picks;SEL=null;startGame(pk);render()}
function confirmHtml(){
 return `<div class="over"><div class="card"><h3>게임 시작</h3><p class="muted">선택한 추적자로 게임을 진행할까요?</p><div class="pl">${SEL.picks.map((k,i)=>`<div>추적자 ${i+1}: <b>${CH.find(c=>c.k===k).name}</b></div>`).join('')}</div><div class="row" style="justify-content:center;margin-top:10px"><button class="pri" onclick="confirmSel()">확인</button><button onclick="SEL.picks=[];render()">다시 선택</button></div></div></div>`;
}
function renderSel(){
 const n=SEL.picks.length;
 return `<div class="card"><div class="bar"><b>${n>=SEL.count?'선택 완료':`추적자 ${n+1} / ${SEL.count} 선택`}</b><button onclick="SEL=null;render()">처음으로</button></div>${SEL.picks.length?`<div class="muted" style="margin-top:6px">${SEL.picks.map((k,i)=>`추적자 ${i+1}: ${CH.find(c=>c.k===k).name}`).join(' · ')}</div>`:''}</div>`+
 CH.map(c=>`<div class="card"><div class="bar"><b>${c.name} <span class="muted">${c.en}</span></b><button class="pri" ${SEL.picks.includes(c.k)?'disabled':''} onclick="selPick('${c.k}')">선택</button></div>
 <div class="muted">${c.pos} · 운용 난이도 ${c.diff} · SAN ${c.san} / ACT ${c.act} / AREA ${AREAS[c.area-1].name}</div>
 <details><summary>추적자 정보</summary><p><b>특성</b> ${c.t}</p><p><b>능력</b> ${c.a}</p><p><b>페널티</b> ${c.p}</p><p><b>이상 행동</b> ${c.x}</p></details></div>`).join('')+(n>=SEL.count?confirmHtml():'');
}
function render(){
 const app=document.getElementById('app');
 const rbtn=document.getElementById('rb');if(rbtn)rbtn.style.display=G?'':'none';
 if(!G){
  app.innerHTML=SEL?renderSel():`<div class="card"><p class='muted' style='text-align:center'>추적자 인원을 선택하세요</p><div class='row' style='justify-content:center'>${[2,3,4,5,6].map(n=>`<button onclick="SEL={count:${n},picks:[]};render()">${n}인</button>`).join('')}</div></div>${updHtml()}`;
  return;
 }
 const p=cur(),pct=Math.min(100,G.collapse/30*100),here=A(p.loc);
 let h=`<div class="card"><div class="bar"><span>${G.round}라운드</span><span>도시 붕괴도 <b>${G.collapse}</b> / 30</span></div><div class="gauge"><i style="width:${pct}%"></i></div>
 <div class="muted">🃏 ${G.card?`${G.card.name} — ${G.card.desc}${G.fx.note?` → <b>${G.fx.note}</b>`:''}`:'선택 중'}</div>${dbgHtml()}</div><div class='wrap'><div class='map'>`;
 AREAS.forEach(ar=>{
  const a=A(ar.n),isHere=p.loc===ar.n,adj=!G.over&&!G.choice&&canMove(p,ar.n);
  const cr=a.cracks.length?a.cracks.map(c=>c.weak?'🟡':'🔴').join(''):'';
  const toks=G.players.filter(q=>q.loc===ar.n).map(q=>`<span class="tok${q===p?' cur':''}${q.abnormal?' ab':''}">${q.name}</span>`).join('');
  h+=`<div class="hw${isHere?' here':''}${adj?' adj':''}" style="left:${ar.x}%;top:${ar.y}%"><button class="hx" ${adj?`onclick="doMove(${ar.n})"`:'disabled'}><i style="background:${ar.c}"><b>${ar.e}<br>${ar.name}</b><span>${cr}${G.fx.sealed===ar.n?'🚫':''}${G.fx.cut&&(G.fx.cut===ar.n||ar.n===7)?'✂️':''}${G.fx.resist===ar.n?'🪨':''}${G.fx.distrust===ar.n?'🌫️':''}</span><span>${toks}</span></i></button></div>`;
 });
 h+=`</div>${sideHtml()}</div><div class='card'><div class='bar'><b style='font-size:17px'>${p.name}</b><span style='font-size:15px'>${AREAS[p.loc-1].e} ${AREAS[p.loc-1].name}</span></div>
 <div class="bar"><span>🧠 SAN ${sanH(p)}/${p.max}${p.abnormal?' (이상)':''}</span><span>⚡ ACT ${p.act}/${p.act0}</span></div>
 <div class="muted" style="margin:4px 0 8px">${p.spot?'🔦스포트라이트 ':''}${p.armD?'🎯즉시 제거 대기 ':''}${p.arm?'🪄데우스 엑스 마키나 대기 ':''}${p.supplied?'📦보급 ':''}${p.k==='pilot'&&p.stay>=2&&p.loc===p.last?'⏳역마살 -1 ':''}· 테두리가 초록인 지역을 눌러 이동</div><div class="row">`;
 here.cracks.forEach(c=>{
  if(p.armD)h+=`<button class="pri" ${p.act<2?'disabled':''} onclick="doInstant(${c.id})">🎯 ${c.weak?'약화':'일반'} 즉시 제거 (2 ACT)</button>`;
  else h+=`<button class="pri" ${p.act<1||G.judged.has(c.id)||!canJudge(p.loc)?'disabled':''} onclick="doJudge(${p.loc},${c.id})">${c.weak?'🟡 약화':'🔴 일반'} 균열 소멸 판정</button>`;
 });
 if(p.k==='pilot')AREAS.forEach(ar=>{if(ar.n!==p.loc)A(ar.n).cracks.forEach(c=>{const k=remoteCost(p,ar.n);h+=`<button ${p.act<k||G.judged.has(c.id)||!canJudge(ar.n)?'disabled':''} onclick="doJudge(${ar.n},${c.id})">✈️ ${ar.name} ${c.weak?'🟡':'🔴'} 판정 (${k} ACT)</button>`})});
 G.players.forEach(q=>{
  if(q===p||!canSR(q.loc)||(q.loc!==p.loc&&p.k!=='pilot'))return;
  const k=costSup(p,q);h+=`<button ${G.fx.noSupport||p.act<k||q.san>=q.max?'disabled':''} onclick="doSup(${q.id})">${q.name} 지원 (${k} ACT)</button>`;
 });
 if(!p.used){
  if(p.k==='surgeon')G.players.filter(q=>q.loc===p.loc).forEach(q=>{h+=`<button onclick="doAbility(${q.id})">🩺 응급 치료: ${q.id===p.id?'본인':q.name}</button>`});
  else if(p.k!=='pilot')h+=`<button ${p.k==='killer'&&!here.cracks.length?'disabled':''} onclick="doAbility(0)">✨ ${{actress:'스포트라이트',killer:'즉시 제거',investor:'물자 보급',writer:'데우스 엑스 마키나'}[p.k]}</button>`;
 }
 if(p.k!=='surgeon'&&canSR(p.loc))h+=`<button ${p.san>=p.max?'disabled':''} onclick='doRest()'>${G.fx.noRestHeal?'휴식 (SAN 회복 불가, 턴 종료)':'휴식 (턴 종료)'}</button>`;
 h+=`<button onclick="doEnd()">턴 종료</button></div></div>`;
 h+=`<div class="card"><div class="log">${G.log.slice(0,12).map(t=>`<div>${t}</div>`).join('')}</div></div>`;
 if(G.pop.length)h+=popHtml(G.pop[0]);else if(G.choice)h+=`<div class="over"><div class="card"><h3>플롯 비틀기</h3><p class="muted">이번 라운드에서 발동할 위기 카드를 선택해주세요</p>${G.choice.map((c,i)=>`<p><button class="pri" onclick="pickCard(${i})">${c.name}</button><br><span class="muted">${c.desc}</span></p>`).join('')}</div></div>`;
 if(!G.pop.length&&G.over)h+=overHtml();
 if(!G.pop.length&&!G.choice&&!G.over){const key=G.round+':'+G.turn;if(G.shown!==key){G.shown=key;h+=`<div class='toast' id='toast'><div><small>${G.round}라운드</small><br><b>${p.name}</b>의 턴</div></div>`;setTimeout(()=>{const t=document.getElementById('toast');if(t)t.remove()},1500)}}
 app.innerHTML=h;rollAnim();
}
render();
