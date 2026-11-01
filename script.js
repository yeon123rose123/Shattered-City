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
  t:'의료진 — 외과의사가 있는 지역에서는 균열 유무와 관계없이 모든 추적자가 지원 및 휴식을 할 수 있습니다.',
  a:'응급 치료 — ACT를 소모하지 않고 본인 또는 같은 지역 추적자의 SAN을 1 회복시킵니다.',
  p:'헌신 — 휴식으로 SAN을 회복할 수 없습니다.',
  x:'사명감 — 같은 지역 추적자 1명의 SAN을 2 회복시킵니다. 해당 추적자는 다음 턴 ACT가 2 감소합니다.'},
 {k:'actress',name:'영화배우',en:'Actress',sh:'배',pos:'공급가',diff:3.0,san:4,act:3,area:6,
  t:'팬 서비스 — \'스포트라이트\'를 받은 다른 추적자가 다음 판정에서 보통 성공하면 SAN을 1 회복하며, 대성공하면 SAN을 2 회복합니다.',
  a:'스포트라이트 — 영화배우의 턴이 돌아오기 전까지, 같은 지역에 있는 모든 추적자의 다음 판정 1회에 +2 보너스를 제공합니다.',
  p:'백스테이지 — 영화배우의 턴 종료 시 지역에 혼자 있으면 SAN이 1 감소합니다.',
  x:'스크린 속의 나 — 영화배우와 같은 지역에 있는 추적자를 인접 지역으로 강제 이동시킵니다. 해당 추적자는 ACT가 1 감소합니다.'},
 {k:'killer',name:'킬러',en:'Killer',sh:'킬',pos:'해결사',diff:1.0,san:8,act:4,area:5,
  t:'전장 파악 — 균열이 있는 지역으로 이동할 때 필요한 ACT가 1 감소합니다 (최소 0).',
  a:'즉시 제거 — 다음 균열 소멸의 ACT 소모가 1 늘어나는 대신(최소 2) 해당 균열이 판정 없이 즉시 소멸됩니다.',
  p:'임무 완수 — \'즉시 제거\'로 균열을 소멸시키면 SAN이 1 감소합니다.',
  x:'충동 — 균열이 있는 지역으로 즉시 이동하고 \'즉시 제거\'를 사용합니다.'},
 {k:'investor',name:'투자자',en:'Investor',sh:'투',pos:'공급가',diff:1.0,san:8,act:3,area:3,
  t:'공격적인 투자 — \'물자 보급\'을 받은 추적자가 다음 판정에서 대성공하면 본인의 다음 턴 ACT가 1 증가합니다.',
  a:'물자 보급 — 같은 지역과 인접 지역의 모든 추적자의 ACT를 1 증가시킵니다.',
  p:'리스크 분담 — \'물자 보급\'을 받은 추적자가 소멸에 실패하면 본인의 다음 턴 ACT가 1 감소합니다.',
  x:'추심 — 같은 지역의 모든 추적자의 ACT를 2 감소시키며, 인접 지역의 모든 추적자의 ACT를 1 감소시킵니다.'},
 {k:'pilot',name:'파일럿',en:'Pilot',sh:'파',pos:'공급가',diff:2.0,san:6,act:4,area:2,
  t:'없음',
  a:'공중 지원 — 다른 지역의 균열 소멸 판정을 진행하거나 추적자를 지원할 수 있습니다. 인접 지역은 1 ACT, 비인접 지역은 2 ACT가 소모됩니다. 이때 파일럿이 공항에 있어야 AREA 보너스가 적용됩니다.',
  p:'역마살 — 같은 지역에 3라운드 이상 머물면 3라운드부터 판정이 1 감소합니다. 라운드 종료 시 파일럿의 위치를 기준으로 합니다.',
  x:'망상 비행 — 주사위 눈만큼 번호 차이가 나는 지역으로 이동한 뒤, 균열이 있으면 소멸 판정을 1회 진행하고, 균열이 없으면 SAN이 1 감소합니다.'},
 {k:'writer',name:'작가',en:'Writer',sh:'작',pos:'전략가',diff:3.0,san:4,act:2,area:4,
  t:'플롯 비틀기 — 라운드가 시작할 때마다 위기 카드 2장을 공개하며, 그 중 1장을 골라 효과롤 발동시킵니다.',
  a:'데우스 엑스 마키나 — 판정에 실패하면 SAN 감소를 무효화하고 다음 번호 지역으로 즉시 이동합니다.',
  p:'관찰자 — 다른 추적제에게 지원을 하거나 다른 추적자에게서 지원을 받을 때 ACT가 1 추가 소모됩니다.',
  x:'원고 파기 — 즉시 도서관으로 이동하며, 다음 턴까지 위기 카드·균열 확산 피해를 무시합니다. 대신 라운드 종료 시 붕괴도가 추가로 1 증가합니다.'},
 {k:'detective',name:'탐정',en:'Detective',sh:'탐',pos:'해결사',diff:1.5,san:9,act:3,area:null,
  t:'없음',
  a:'탐정의 직감 — 다음 균열 소멸 판정 시 주사위 2개를 굴려 합산한 결과로 판정합니다. 합산한 결과가 10 이상이면 해당 균열뿐만 아니라 탐정이 고른 지역의 균열 1개가 같이 소멸되며, 7 이상 9 이하면 해당 균열만 소멸됩니다. 6 이하면 균열이 약화되며(약화된 균열일 시 약화 상태 유지) 탐정의 SAN이 2 감소합니다.',
  p:'그림자 — 판정 시 협력 보너스를 적용할 수 없으며, 탐정 본인은 협력 보너스의 대상이 되지 않습니다.',
  x:'전장의 환영 — 균열이 있는 지역으로 ACT 소모 없이 즉시 이동한 후 \'탐정의 직감\' 판정을 수행합니다. 균열이 있는 지역이 여러 개면 하나를 무작위로 추첨해 이동합니다.'}
];
const IMGS = {
  surgeon:  'images/surgeon.png',
  actress:  'images/actress.png',
  killer:   'images/killer.png',
  investor: 'images/investor.png',
  pilot:    'images/pilot.png',
  writer:   'images/writer.png',
  detective:'images/detective.png'
};
const SIDE=n=>AREAS[((G&&G.map)?G.map[n-1]:n)-1].name;
const EMO=n=>AREAS[((G&&G.map)?G.map[n-1]:n)-1].e;
const idOf=n=>(G&&G.map)?G.map[n-1]:n;
const slotOf=i=>(G&&G.map)?G.map.indexOf(i)+1:i;
const ab=p=>p.ab||p.k;
const canAbil=p=>G.fx.noAbil!==p.id;
const rem=p=>ab(p)==='pilot'&&canAbil(p)&&!!p.armP;
const aMod=(q,n)=>{if(G.fx.lock)return;q.mod+=n};
const ABN={surgeon:'응급 치료',actress:'스포트라이트',killer:'즉시 제거',investor:'물자 보급',pilot:'공중 지원',writer:'데우스 엑스 마키나',detective:'탐정의 직감'};
const CARDS=[
 {name:'뒤틀린 도로',desc:'이동에 2 ACT가 소모됩니다.',set(){G.fx.moveCost=2}},
 {name:'단절된 공기',desc:'추적자 간 지원이 제한됩니다.',set(){G.fx.noSupport=true}},
 {name:'불안한 밤',desc:'휴식으로 SAN을 회복할 수 없습니다.',set(){G.fx.noRestHeal=true}},
 {name:'혼자서는 안 돼',desc:'지역에 추적자가 2명 이상 있어야 균열 소멸 판정을 시도할 수 있습니다.',set(){G.fx.needTwo=true}},
 {name:'느려진 시간',desc:'모든 추적자의 ACT가 1 감소한 채로 시작합니다.',set(){G.fx.actMinus=1;G.players.forEach(p=>{p.act=Math.max(0,p.act0-1)});log('느려진 시간: 모든 추적자 ACT -1')}},
 {name:'끊어진 길',draw:true,desc:'광장을 제외한 지역 1개를 추첨합니다. 해당 지역과 광장 사이의 이동이 제한됩니다.',set(){const n=rnd(6);G.fx.cut=n;G.fx.note=`${SIDE(n)} ↔ 광장 이동 통제`;log('끊어진 길: '+G.fx.note)}},
 {name:'삼켜진 지역',draw:true,desc:'지역 1개를 추첨합니다. 해당 지역으로의 이동이 제한됩니다.',set(){const n=rnd(7);G.fx.sealed=n;G.fx.note=`${SIDE(n)}(으)로 이동 불가`;log('삼켜진 지역: '+G.fx.note)}},
 {name:'메아리치는 상처',desc:'균열이 있는 지역에 있는 추적자의 SAN이 즉시 1 감소합니다. 이 카드의 영향으로 SAN이 0이 된 추적자는 즉시 이상 상태에 빠집니다.',set(){G.players.forEach(p=>{if(A(p.loc).cracks.length)cardSan(p,1)})}},
 {name:'불안한 군중',desc:'지역에 혼자 있는 추적자의 SAN이 즉시 1 감소합니다. 이 카드의 영향으로 SAN이 0이 된 추적자는 즉시 이상 상태에 빠집니다.',set(){G.players.forEach(p=>{if(G.players.filter(q=>q.loc===p.loc).length===1)cardSan(p,1)})}},
 {name:'시간이 다 됐어',draw:true,desc:'균열이 가장 많은 지역에 일반 균열이 1개 더 발생합니다. 가장 많은 지역이 2개 이상이면 그중 1개를 추첨합니다.',set(){
  let mx=0;G.areas.forEach(a=>{mx=Math.max(mx,a.cracks.length)});
  if(!mx){log('시간이 다 됐어: 균열이 없어 효과 없음');return}
  const c=[];G.areas.forEach((a,i)=>{if(a.cracks.length===mx)c.push(i+1)});
  const n=c[rnd(c.length)-1];log(`시간이 다 됐어: 균열이 가장 많은 지역은 ${SIDE(n)}${c.length>1?' (동률 추첨)':''}`);addCrack(n)}},
 {name:'도시가 숨을 쉰다',desc:'모든 약화된 균열이 즉시 일반 균열로 회복됩니다.',set(){let k=0;G.areas.forEach(a=>a.cracks.forEach(c=>{if(c.weak){c.weak=false;k++}}));log(`도시가 숨을 쉰다: 약화된 균열 ${k}개가 일반 균열로 회복`)}},
 {name:'기억하는 방',desc:'AREA가 있는 추적자는 자신이 AREA 보너스를 받는 지역으로, AREA가 없는 추적자는 광장으로 ACT 소모 없이 즉시 이동합니다.',set(){G.players.forEach(p=>{p.loc=slotOf(p.area||7)});log('기억하는 방: 모든 추적자가 AREA 지역으로 이동')}},
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
 {name:'거울 속의 남자',desc:'일반 균열의 판정 범위가 4~6 실패 / 2·3 보통 성공 / 1 대성공으로, 약화된 균열의 판정 범위가 5·6 실패 / 1~4 성공으로 바뀝니다. 판정 결과 효과는 그대로이며, AREA 보너스는 더 낮은 수를 적용합니다.',set(){G.fx.mirror=true}},
 {name:'저항하는 균열',draw:true,desc:'균열이 있는 지역 1개를 추첨합니다. 해당 지역에서 균열 소멸을 시도하면 주사위를 두 번 굴려 더 낮은 결과로 판정합니다. 협력 보너스와 AREA 보너스는 주사위를 굴린 뒤 적용합니다.',set(){
  const c=[];G.areas.forEach((a,i)=>{if(a.cracks.length)c.push(i+1)});
  if(!c.length){log('저항하는 균열: 균열이 없어 효과 없음');return}
  const n=c[rnd(c.length)-1];G.fx.resist=n;G.fx.note=`${SIDE(n)}에서 판정 시 주사위 2번, 낮은 값 적용`;log('저항하는 균열: '+G.fx.note)}},
 {name:'잘못된 군중',desc:'모든 지역의 협력 보너스가 본인을 제외하고 지역에 있는 추적자 수에 상관없이 +1로 고정됩니다.',set(){G.fx.crowd=true}},
 {name:'불신의 공기',draw:true,desc:'지역 1개를 추첨합니다. 해당 지역의 협력 보너스가 본인을 제외하고 지역에 함께 있는 추적자 1명당 판정 -1로 바뀝니다.',set(){const n=rnd(7);G.fx.distrust=n;G.fx.note=`${SIDE(n)}: 협력 보너스가 추적자 1명당 -1로 변경`;log('불신의 공기: '+G.fx.note)}},
 {name:'전염되는 광기',desc:'균열 소멸 판정에서 실패할 경우 적용되는 SAN 감소량이 1 증가합니다. 약화된 균열 소멸 판정의 실패 패널티에 SAN 1 감소가 추가됩니다.',set(){G.fx.contagion=true}},
 {name:'공명하는 악몽',desc:'어느 지역에서든 균열 소멸 판정에 실패할 때마다 보드 위의 모든 추적자의 SAN이 1 감소합니다.',set(){G.fx.resonance=true}},
 {name:'동조',draw:true,desc:'추적자 1명을 추첨합니다. 해당 추적자가 SAN을 잃을 때마다 해당 추적자와 같은 지역에 있는 모든 추적자도 SAN이 1 감소합니다.',set(){const q=G.players[rnd(G.players.length)-1];G.fx.sync=q.id;G.fx.note=`대상: ${q.name}`;log('동조: 추첨 대상은 '+q.name)}},
 {name:'불완전한 봉인',desc:'균열을 소멸시킬 때마다(일반 균열은 보통 성공·대성공, 약화된 균열은 성공) 주사위를 한 번 더 굴리며, 1 또는 2가 나오면 다음 번호의 지역에 일반 균열이 1개 발생합니다.',set(){G.fx.seal=true}},
 {name:'빌려온 시간',desc:'라운드가 끝난 후 도시 붕괴도 조정 결과에 2를 추가합니다. 이 카드의 영향으로 도시 붕괴도가 30에 도달하면 즉시 패배합니다.',set(){G.fx.borrow=2}},
 {name:'기록되지 않은 희생',desc:'라운드 종료 시 도시 붕괴도가 상승할 경우, 추적자들이 SAN을 지불해 상승량을 상쇄할 수 있습니다. 추적자 1명당 1 SAN을 지불하며, SAN이 0 이하(이상 상태)인 추적자는 선택할 수 없습니다. 지불하지 않은 상승량은 그대로 적용되고, SAN이 0이 된 추적자는 이상 상태에 빠집니다.',set(){G.fx.sacrifice=true}},
 {name:'잘못된 얼굴',draw:true,desc:'추적자 1명을 추첨합니다. 해당 추적자는 능력을 사용할 수 없습니다.',set(){const q=G.players[rnd(G.players.length)-1];G.fx.noAbil=q.id;G.fx.note=`대상: ${q.name}`;log('잘못된 얼굴: 추첨 대상은 '+q.name+' (능력 사용 불가)')}},
 {name:'정체성 분열',draw:true,desc:'추적자 2명을 추첨합니다. 두 추적자는 능력을 서로 바꿔서 사용해야 합니다.',set(){
  const n=G.players.length,a=rnd(n)-1;let b;do{b=rnd(n)-1}while(b===a);
  const P=G.players[a],Q=G.players[b],ap=ab(P),aq=ab(Q);P.ab=aq;Q.ab=ap;
  G.fx.note=`${P.name} ↔ ${Q.name}`;log(`정체성 분열: ${P.name}과(와) ${Q.name}의 능력 교환`);log(`${P.name}: ${ABN[aq]} 사용`);log(`${Q.name}: ${ABN[ap]} 사용`)}},
 {name:'엇갈린 신호',desc:'다른 추적자의 ACT 수치에 직접 관여하는 모든 추적자 특성·능력·패널티·이상 행동의 효과가 무효화됩니다.',set(){G.fx.lock=true}},
 {name:'뒤바뀐 지도',draw:true,desc:'광장을 제외한 지역 중 2개를 추첨합니다. 두 지역의 위치가 서로 바뀌며, 지역 번호는 그대로 유지된 채 지역 이름·균열·추적자가 함께 이동합니다.',set(){
  const a=rnd(6),b=[1,2,3,4,5,6].filter(x=>x!==a)[rnd(5)-1],na=SIDE(a),nb=SIDE(b);
  swapMap(a,b);G.fx.swapMap=[a,b];G.fx.note=`${na} ${a}번→${b}번, ${nb} ${b}번→${a}번`;log(`뒤바뀐 지도: ${na}(${a}번)과(와) ${nb}(${b}번)의 위치 교환`)}},
 {name:'환각의 잔영',desc:'균열 소멸 판정을 대성공해도 SAN이 회복되지 않습니다.',set(){G.fx.noGreatHeal=true}}
];
let G=null,SEL=null,cid=0;
const rnd=n=>1+Math.floor(Math.random()*n);
const A=n=>G.areas[n-1],cur=()=>G.players[Math.min(G.turn,G.players.length-1)],nextNo=n=>n===7?1:n+1;
const adjOf=n=>AREAS[n-1].adj;
const heal=(q,n)=>{q.san=Math.min(q.max,q.san+n)};
function loseS(p,n){
 const b=p.san;p.san=p.abnormal?p.san-n:Math.max(0,p.san-n);
 if(b-p.san>0&&G.fx&&G.fx.sync===p.id&&!G.syncing){
  G.syncing=true;
  const who=G.players.filter(q=>q!==p&&q.loc===p.loc);
  who.forEach(q=>loseS(q,1));
  if(who.length){log(`동조: ${p.name}의 SAN 감소로 ${who.map(q=>q.name).join(', ')} SAN -1`);if(G.nt)G.nt.push(`동조: ${who.map(q=>q.name).join(', ')} SAN -1`)}
  G.syncing=false;
 }
}
const sanH=q=>q.san<=q.max/2?`<span class='low'>${q.san}</span>`:q.san;
function log(t){G.log.unshift(t);if(G.log.length>40)G.log.pop();if(G.col)G.col.push(t)}
function pop(o){G.pop.push(o)}
function applyCard(c){if(c.set)c.set()}
function swapMap(a,b){
 [G.map[a-1],G.map[b-1]]=[G.map[b-1],G.map[a-1]];
 [G.areas[a-1].cracks,G.areas[b-1].cracks]=[G.areas[b-1].cracks,G.areas[a-1].cracks];
 G.players.forEach(q=>{if(q.loc===a)q.loc=b;else if(q.loc===b)q.loc=a});
}
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
 pop({k:'ev',note:G.rnote||'',title:`${G.round}라운드 · 사건 단계`,spin:[`개수: ${E.spins.reduce((a,b)=>a+b,0)}개`],
  areas:Object.keys(E.placed).map(Number).sort((a,b)=>a-b).map(n=>`${SIDE(n)}: ${E.placed[n]}`),
  rest:Object.keys(E.rest).map(Number).sort((a,b)=>a-b).map(n=>`${SIDE(n)}: 약화된 균열 회복 ${E.rest[n]}`),
  lost:E.lost});
 G.evd=null;
}
function cardPop(c, onConfirm) {
  pop({
    k:'card',
    title:`${G.round}라운드 · 사건 단계`,
    card:c,
    lines:c.draw?(G.col||[]):[]
  });
  G.col=null;
}
function colPop(secs){pop({k:'col',title:`${G.round}라운드 · 붕괴 단계`,gauge:G.collapse,secs})}
const surgeonAt=n=>G.players.some(q=>q.k==='surgeon'&&q.loc===n);
const canSR=n=>!A(n).cracks.length||surgeonAt(n);

function startGame(picks){
 const players=picks.map((k,i)=>{const c=CH.find(x=>x.k===k);
  return {id:i,k,name:c.name,sh:c.sh,max:c.san,san:c.san,act0:c.act,act:c.act,area:c.area,loc:c.area||7,last:c.area||7,stay:0,abnormal:false,mod:0,used:false,arm:false,armD:false,spot:0,spotBy:null,supplied:false}});
 G={players,areas:AREAS.map(()=>({cracks:[]})),collapse:15,round:0,turn:0,card:null,choice:null,pop:[],col:null,fx:{},map:[1,2,3,4,5,6,7],judged:new Set(),log:[],over:null,extra:0,
  deck: (() => {
  const deck = [...CARDS];

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
})()};
 startRound();
}
function addCrack(no){
 const cand=[...new Set([no,nextNo(no),...adjOf(no).slice().sort((a,b)=>a-b)])];
 for(const c of cand){
  const a=A(c),w=a.cracks.find(x=>x.weak);
  if(w){w.weak=false;if(G.evd)G.evd.rest[c]=(G.evd.rest[c]||0)+1;log(`${SIDE(c)}: 약화된 균열이 일반 균열로 회복`);return}
  if(a.cracks.length<3){a.cracks.push({id:++cid,weak:false});if(G.evd)G.evd.placed[c]=(G.evd.placed[c]||0)+1;log(`${SIDE(c)}에 균열 발생`+(c!==no?` (${SIDE(no)}에서 분산)`:''));return}
 }
 G.collapse+=.5;if(G.evd)G.evd.lost++;log(`${SIDE(no)}: 분산할 곳이 없어 균열 소멸, 붕괴도 +0.5`);
}
function startRound(){
 G.round++;G.turn=0;G.rnote='';
 if(G.fx&&G.fx.swapMap){const sw=G.fx.swapMap;swapMap(sw[0],sw[1]);G.rnote=`뒤바뀐 지도: ${SIDE(sw[0])}, ${SIDE(sw[1])}의 위치가 원래대로 돌아왔습니다`;log(G.rnote)}
 G.fx={};G.players.forEach(p=>{p.act=p.act0;p.ab=null});
  const np = G.players.length;

  const spins = {
    2: 1,
    3: 2,
    4: 3,
    5: 3,
    6: 6
  }[np] || 1;
 log(`── ${G.round}라운드 시작 ──`);
 G.col=null;
 G.evd={spins:[],placed:{},rest:{},lost:0};
 
  for (let s = 0; s < spins; s++) {
    const r = Math.random() * 100;
    let k;

    if (np === 3) {
    // 3인: 1개 60%, 2개 40%
      k = r < 60 ? 1 : 2;
    } else if (np === 5) {
    // 5인: 1개 17%, 2개 50%, 3개 33%
      if (r < 17) {
        k = 1;
      } else if (r < 67) {
        k = 2;
      } else {
        k = 3;
      }
    } else {
    // 2인, 4인, 6인: 1개 50%, 2개 50%
      k = r < 50 ? 1 : 2;
    }

  G.evd.spins.push(k);
  log(`개수: ${k}개`);

  for (let i = 0; i < k; i++) {
    addCrack(rnd(7));
  }
}
 crackPop();
 if(G.players.some(p=>p.k==='writer')&&G.deck.length>=2){G.choice=G.deck.splice(0,2);G.card=null;return}
const c = G.deck.shift();
  G.card = c;
  G.deck.push(c);

  G.col = [];
  applyCard(c);                 // 효과 먼저 적용
  cardPop(c);                   // 결과 로그가 담긴 상태로 팝업 표시
  log(`위기 카드: ${c.name}`);

  finishStart();
  return;
}
function finishStart(){checkEnd();if(!G.over)startTurn()}
function pickCard(i) {
  const keep = G.choice[i];
  const drop = G.choice[1 - i];

  // 선택하지 않은 카드부터 덱 맨 아래로 이동
  G.deck.push(drop);
  log(`플롯 비틀기: ${drop.name} 카드는 덱 맨 아래로`);

  // 선택한 카드의 효과 발동
  G.card = keep;
  G.choice = null;
  G.col = [];
  applyCard(keep);

  // 효과 발동 후 선택한 카드도 덱 맨 아래로 이동
  G.deck.push(keep);

  cardPop(keep);
  log(`위기 카드: ${keep.name} 발동`);

  finishStart();
  render();
}
function startTurn(){
 const p=cur();
 p.act=Math.max(0,p.act0+(G.fx.lock?0:p.mod)-(G.fx.actMinus||0));p.mod=0;p.used=false;p.arm=false;p.armD=false;p.armP=false;p.armT=false;p.immune=false;G.judged=new Set();
 G.players.forEach(q=>{if(q.spotBy===p.id){q.spot=0;q.spotBy=null}});
 if(p.abnormal){abnormal(p);endTurn();return}
 if(p.act<=0){log(`${p.name}: ACT가 0이라 턴을 넘긴다`);endTurn()}
}
function endTurn(){
 const p=cur();
 if(p.k==='actress'&&G.players.filter(q=>q.loc===p.loc).length===1){loseS(p,1);log('백스테이지: 영화배우 SAN -1')}
 p.arm=false;p.armD=false;p.armP=false;p.armT=false;G.turn++;
 if(G.turn>=G.players.length)collapsePhase();else startTurn();
}
function collapsePhase(){
 G.col=null;
 const total=G.areas.reduce((s,a)=>s+a.cracks.length,0);
 const d=total===0?-2:total===1?-1:total===2?0:total===3?1:2,ex=G.extra,bw=G.fx.borrow||0;
 G.extra=0;G.cp={total,d,ex,bw};
 const delta=d+ex+bw,el=G.players.filter(q=>!q.abnormal&&q.san>0);
 if(G.fx.sacrifice&&delta>0&&el.length){G.sac={delta,sel:[]};log(`기록되지 않은 희생: 붕괴도 +${delta} 상승 예정, 지불할 추적자 선택 대기`);return}
 collapseApply([]);
}
function toggleSac(i){
 const q=G.players[i],sel=G.sac.sel,k=sel.indexOf(i);
 if(q.abnormal||q.san<=0)return;
 if(k>=0)sel.splice(k,1);else if(sel.length<G.sac.delta)sel.push(i);
 render();
}
function confirmSac(){const sel=G.sac.sel.slice();G.sac=null;collapseApply(sel);render()}
function sacHtml(){
 const S=G.sac;
 return `<div class="over"><div class="card"><h3>${G.round}라운드 · 붕괴 단계</h3><p><b>기록되지 않은 희생</b></p><p class="muted">도시 붕괴도가 ${S.delta} 상승할 예정입니다.<br>SAN 1을 지불해 상승량을 1씩 줄일 추적자를 선택하세요. (최대 ${S.delta}명)</p><div class="row" style="justify-content:center">${G.players.map(q=>{const ok=!q.abnormal&&q.san>0,on=S.sel.includes(q.id);return `<button ${ok&&(on||S.sel.length<S.delta)?'':'disabled'} class="${on?'pri':''}" onclick="toggleSac(${q.id})">${q.name} (SAN ${sanH(q)}/${q.max})${ok?'':' · 선택 불가'}</button>`}).join('')}</div><p>붕괴도 상승량: ${S.delta} → <b>${S.delta-S.sel.length}</b></p><button class="pri" onclick="confirmSac()">확인</button></div></div>`;
}
function collapseApply(payIds){
 const {total,d,ex,bw}=G.cp,S1=[],S2=[],S3=[];
 const payers=payIds.map(i=>G.players[i]);
 payers.forEach(q=>loseS(q,1));
 G.collapse=Math.max(0,G.collapse+d+ex+bw-payers.length);
 let t=`균열 ${total}개 → 붕괴도 ${d>0?'+':''}${d}`;
 if(ex)t+=`, 원고 파기 +${ex}`;
 if(bw)t+=`, 빌려온 시간 +${bw}`;
 if(payers.length)t+=`, 기록되지 않은 희생 -${payers.length} (${payers.map(q=>q.name).join(', ')} SAN -1)`;
 S1.push(`${t} (현재 ${G.collapse})`);
 log(`붕괴 단계: ${S1[0]}`);
 G.players.forEach(p=>{if(p.loc===p.last)p.stay++;else{p.stay=1;p.last=p.loc}});
 if(G.collapse<=0){G.over='win';colPop([['도시 붕괴도 조정',S1]]);return}
 if(G.collapse>=30){G.over='lose';colPop([['도시 붕괴도 조정',S1]]);return}
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
 if(p.k==='surgeon'){const t=here.slice().sort((a,b)=>a.san-b.san)[0];heal(t,2);aMod(t,-2);log(`${pre}사명감: ${t.name} SAN +2, ${G.fx.lock?'다음 턴 ACT -2는 엇갈린 신호로 무효':'다음 턴 ACT -2'}`)}
 else if(p.k==='actress'){const t=here.find(q=>q!==p);if(!t)log(`${pre}스크린 속의 나: 대상 없음`);else{const ad=adjOf(p.loc),n=ad[rnd(ad.length)-1];t.loc=n;aMod(t,-1);log(`${pre}스크린 속의 나: ${t.name} → ${SIDE(n)}${G.fx.lock?' (ACT -1은 엇갈린 신호로 무효)':', ACT -1'}`)}}
 else if(p.k==='killer'){
  let best=0,tgt=0;G.areas.forEach((a,i)=>{if(a.cracks.length>best){best=a.cracks.length;tgt=i+1}});
  if(!tgt)log(`${pre}충동: 균열이 없어 아무 일도 없다`);
  else{p.loc=tgt;A(tgt).cracks.shift();loseS(p,1);log(`${pre}충동: ${SIDE(tgt)} 이동, 균열 즉시 제거, SAN -1`)}}
 else if(p.k==='investor'){G.players.forEach(q=>{if(q===p)return;if(q.loc===p.loc)aMod(q,-2);else if(adjOf(p.loc).includes(q.loc))aMod(q,-1)});log(`${pre}추심: ${G.fx.lock?'엇갈린 신호로 ACT 변화 무효':'같은 지역 ACT -2, 인접 지역 ACT -1'}`)}
 else if(p.k==='pilot'){
  const d=rnd(6),c=[p.loc+d,p.loc-d].filter(n=>n>=1&&n<=7);
  if(!c.length){log(`${pre}망상 비행: 주사위 ${d}, 이동할 곳이 없다`);return}
  p.loc=c[rnd(c.length)-1];log(`${pre}망상 비행: 주사위 ${d} → ${SIDE(p.loc)}`);
  const cr=A(p.loc).cracks[0];
  if(cr)judgeCore(p,p.loc,cr.id,0,true);else{loseS(p,1);log('균열이 없어 SAN -1')}}
 else if(p.k==='writer'){p.loc=slotOf(4);p.immune=true;G.extra++;log(`${pre}원고 파기: 도서관으로 이동, 라운드 종료 시 붕괴도 +1`)}
 else if(p.k==='detective'){
  const c=[];G.areas.forEach((a,i)=>{if(a.cracks.length)c.push(i+1)});
  if(!c.length){log(`${pre}전장의 환영: 균열이 없어 아무 일도 없다`);return}
  const n=c[rnd(c.length)-1];p.loc=n;log(`${pre}전장의 환영: ${SIDE(n)} 이동 후 탐정의 직감 판정`);
  p.armT=true;judgeCore(p,n,A(n).cracks[0].id,0,true);p.armT=false}
}

function judgeCore(p, no, id, cost, free, onComplete) {
  const a = A(no);
  const c = a.cracks.find(x => x.id === id);

  if (!c || G.judged.has(id) || (!free && p.act < cost)) {
    return false;
  }

  if (!canJudge(no)) {
    if (free) {
      log('혼자서는 안 돼: 지역에 추적자가 2명 미만이라 판정을 시도하지 못했다');
    }
    return false;
  }

  const f = G.fx;
  const cnt = no === p.loc
    ? G.players.filter(q => q !== p && q.loc === p.loc && q.k !== 'detective').length
    : 0;

  const coop = p.k === 'detective' || f.mirror
    ? 0
    : f.crowd
      ? (cnt > 0 ? 1 : 0)
      : (f.distrust === no ? -cnt : cnt);

  const pen = p.k === 'pilot' && p.stay >= 2 && p.loc === p.last ? 1 : 0;
  const bonus = coop + p.spot - pen;
  const wasWeak = c.weak;
  const mirror = !!f.mirror;
  const notes = [];

  const fails = r => c.weak
    ? (mirror ? r >= 5 : r <= 2)
    : (mirror ? r >= 4 : r <= 3);

  const roll = () => {
    if (f.resist === no) {
      const a1 = rnd(6);
      const a2 = rnd(6);
      notes.push(`저항하는 균열: 주사위 ${a1}, ${a2} 중 낮은 값 적용`);
      return Math.min(a1, a2);
    }
    return rnd(6);
  };

  if (mirror) {
    notes.push('거울 속의 남자: 판정 범위 반전, 협력 보너스 미적용');
  }

  if (f.crowd) {
    notes.push('잘못된 군중: 같은 지역에 다른 추적자가 있으면 협력 보너스 +1 고정');
  }

  if (f.distrust === no) {
    notes.push('불신의 공기: 같은 지역 추적자 1명당 판정 -1');
  }

  const det = !!p.armT;
  const spotV = p.spot;

  let rr = null;
  let mir = false;
  let raw, r, txt, fail, great, dice = null;

  // 1단계: 주사위를 굴리고 결과만 계산한다.
  // 이 단계에서는 SAN이나 균열 상태를 변경하지 않는다.
  if (det) {
    const d1 = roll();
    const d2 = roll();
    const sum = d1 + d2 + bonus;
    const eff = mirror ? 14 - sum : sum;

    dice = [d1, d2];
    raw = d1;
    r = sum;

    txt = `🎲 ${d1}+${d2}${bonus ? (bonus > 0 ? ' +' : ' ') + bonus : ''}`;

    fail = eff <= 6;
    great = eff >= 10;

    notes.push(
      '탐정의 직감: 주사위 2개 합계로 판정 (10 이상 대성공 / 7~9 성공 / 6 이하 실패)'
    );
  } else {
    raw = roll();
    r = Math.max(1, Math.min(6, raw + bonus));

    txt = `🎲 ${raw}${bonus ? (bonus > 0 ? ' +' : ' ') + bonus : ''}`;

    if (fails(r) && p.area === idOf(p.loc)) {
      const rr0 = roll();
      const r2 = Math.max(1, Math.min(6, rr0 + bonus));

      rr = rr0;
      mir = mirror;
      r = mir ? Math.min(r, r2) : Math.max(r, r2);

      txt += ` / AREA 재굴림 ${r2}`;
    }

    fail = fails(r);
    great = !c.weak && (mirror ? r <= 1 : r >= 6);
  }

  // 팝업에 표시할 예상 결과
  const previewLoss = fail
    ? (
        (det ? 2 : (wasWeak ? 0 : 1))
        - (p.arm ? (det ? 2 : (wasWeak ? 0 : 1)) : 0)
        + (f.contagion ? 1 : 0)
      )
    : 0;

  const previewRes = fail
    ? (
        (wasWeak ? '실패: 약화된 균열 유지' : '실패: 균열 약화')
        + (previewLoss > 0 ? `, SAN -${previewLoss}` : '')
        + (f.resonance ? ' · 모든 추적자 SAN -1' : '')
        + (p.arm ? ', 데우스 엑스 마키나 발동' : '')
      )
    : great
      ? (
          f.noGreatHeal
            ? '대성공: 균열 소멸 (SAN 회복 무시)'
            : wasWeak
              ? '대성공: 균열 소멸'
              : '대성공: 균열 소멸, SAN +1'
        )
      : '성공: 균열 소멸';

  const result = {
    k: 'dice',
    who: p.name,
    where: SIDE(no),
    wasWeak,
    raw,
    rr,
    mir,
    coop,
    spot: spotV,
    pen,
    r,
    res: previewRes,
    notes,
    dice,
    cap: !det && (
      raw + bonus > 6 ||
      (rr !== null && rr + bonus > 6)
    ),
    low: !det && (
      raw + bonus < 1 ||
      (rr !== null && rr + bonus < 1)
    ),
    done: false
  };

  // 2단계: 팝업에서 확인 버튼을 눌렀을 때만 실제 효과를 적용한다.
  result.onConfirm = () => {
    if (!free) {
      p.act -= cost;
    }

    G.judged.add(id);

    if (det) {
      p.armT = false;
    }

    let res;

    if (fail) {
      let loss = det ? 2 : (c.weak ? 0 : 1);

      res = c.weak
        ? '실패: 약화된 균열 유지'
        : '실패: 균열 약화';

      c.weak = true;

      // 데우스 엑스 마키나
      const deus = p.arm;

      if (deus) {
        p.arm = false;
        loss = 0;
      }

      // 전염되는 광기
      if (f.contagion) {
        loss += 1;
        notes.push('전염되는 광기: SAN 감소량 +1');
      }

      G.nt = notes;

      if (loss > 0) {
        loseS(p, loss);
        res += `, SAN -${loss}`;
      }

      // 공명하는 악몽
      if (f.resonance) {
        G.players.forEach(q => loseS(q, 1));

        notes.push('공명하는 악몽: 모든 추적자 SAN -1');
        res += ' · 모든 추적자 SAN -1';
      }

      G.nt = null;

      if (deus) {
        p.loc = nextNo(p.loc);
        res += `, 데우스 엑스 마키나로 SAN 감소 무효 → ${SIDE(p.loc)} 이동`;
      }
    } else {
      // 성공: 균열 제거
      a.cracks = a.cracks.filter(x => x !== c);

      if (great) {
        if (f.noGreatHeal) {
          res = '대성공: 균열 소멸 (환각의 잔영: SAN 회복 무시)';
        } else if (wasWeak) {
          res = '대성공: 균열 소멸';
        } else {
          heal(p, 1);
          res = '대성공: 균열 소멸, SAN +1';
        }
      } else {
        res = '성공: 균열 소멸';
      }

      // 탐정의 직감: 대성공 시 추가 균열 선택
      if (det && great) {
        const seen = new Set();
        const opts = [];

        G.areas.forEach((ar, i) => {
          ar.cracks.forEach(x => {
            const k = (i + 1) + ':' + x.weak;

            if (!seen.has(k)) {
              seen.add(k);
              opts.push({
                no: i + 1,
                id: x.id,
                weak: x.weak
              });
            }
          });
        });

        if (!opts.length) {
          notes.push('탐정의 직감 대성공: 함께 소멸시킬 균열이 없음');
        } else if (free) {
          const o = opts[rnd(opts.length) - 1];

          removeCrackById(o.no, o.id);

          const t =
            `탐정의 직감 대성공: ${SIDE(o.no)}의 ` +
            `${o.weak ? '약화된' : '일반'} 균열도 함께 소멸`;

          notes.push(t);
          res += ' · ' + t;
        } else {
          G.det = {
            who: p.id,
            opts
          };

          notes.push('탐정의 직감 대성공: 함께 소멸시킬 균열을 선택');
        }
      }

      // 불완전한 봉인
      if (f.seal) {
        const d = rnd(6);
        const n2 = nextNo(no);

        let t = `불완전한 봉인: 추가 주사위 ${d}`;

        if (d <= 2) {
          addCrack(n2);
          t += ` → ${SIDE(n2)}에 균열 발생`;
        } else {
          t += ' → 변화 없음';
        }

        notes.push(t);
        res += ' · ' + t;
      }
    }

    // 배우의 스포트라이트
    if (p.spot && p.k !== 'actress' && !fail) {
      G.players
        .filter(q => q.k === 'actress')
        .forEach(q => heal(q, great ? 2 : 1));
    }

    p.spot = 0;
    p.spotBy = null;

    // 투자자의 보급 효과
    if (p.supplied) {
      const inv = G.players.find(q => q.k === 'investor');

      if (inv && !f.lock) {
        if (great) inv.mod += 1;
        if (fail) inv.mod -= 1;
      }

      p.supplied = false;
    }

    result.res = res;

    log(`${p.name} 판정 ${txt} = ${r} · ${res}`);

    // 모든 판정 효과를 적용한 다음에만 다음 단계로 진행한다.
    if (onComplete) {
      onComplete();
    }
  };

  // 주사위 팝업을 먼저 표시한다.
  pop(result);

  return true;
}
const remoteCost=(p,n)=>adjOf(p.loc).includes(n)?1:2;
function doJudge(no, id) {
  const p = cur();
  const remote = no !== p.loc;

  if (remote && !rem(p)) {
    return;
  }

  judgeCore(
    p,
    no,
    id,
    remote ? remoteCost(p, no) : 1,
    false,
    () => {
      if (remote) {
        p.armP = false;
      }

      // 탐정의 직감 대성공으로 추가 선택이 필요한 경우
      // 턴을 종료하지 않고 선택 화면을 표시한다.
      if (G.det) {
        render();
        return;
      }

      after();
    }
  );

  render();
}
function removeCrackById(no,id){A(no).cracks=A(no).cracks.filter(x=>x.id!==id)}
function pickDet(i){
 const o=G.det.opts[i];G.det=null;removeCrackById(o.no,o.id);
 const t=`${SIDE(o.no)}의 ${o.weak?'약화된':'일반'} 균열도 함께 소멸`;log('탐정의 직감: '+t);pop({k:'msg',title:'탐정의 직감 · 대성공',lines:[t]});after();
}
function detHtml(){
 return `<div class="over"><div class="card"><h3>탐정의 직감 · 대성공</h3><p class="muted">해당 균열과 함께 소멸시킬 균열을 선택하세요.</p><div class="row" style="justify-content:center">${G.det.opts.map((o,i)=>`<button onclick="pickDet(${i})">${EMO(o.no)} ${SIDE(o.no)} · ${o.weak?'🟡 약화':'🔴 일반'}</button>`).join('')}</div></div></div>`;
}
function doInstant(id){
 const p=cur(),a=A(p.loc);
 if(!p.armD||p.act<2||!a.cracks.some(c=>c.id===id))return;
 p.act-=2;p.armD=false;a.cracks=a.cracks.filter(c=>c.id!==id);if(p.k==='killer')loseS(p,1);log(p.k==='killer'?'킬러: 즉시 제거 (SAN -1)':`${p.name}: 즉시 제거`);after();
}
function doMove(n){
 const p=cur(),cost=moveCost(p,n);
 if(!canMove(p,n))return;
 p.act-=cost;p.loc=n;log(`${p.name} → ${SIDE(n)} 이동`);after();
}
function costSup(p,q){let c=1;if(rem(p)&&q.loc!==p.loc)c=remoteCost(p,q.loc);if(p.k==='writer'||q.k==='writer')c++;return c}
function doSup(i){
 const p=cur(),q=G.players[i];
 if(G.fx.noSupport||q.san>=q.max||q===p||!canSR(q.loc)||(q.loc!==p.loc&&!rem(p)))return;
 const c=costSup(p,q);if(p.act<c)return;
 p.act-=c;heal(q,1);if(q.loc!==p.loc)p.armP=false;log(`${p.name}이(가) ${q.name} 지원 (SAN +1)`);after();
}
function doRest(){const p=cur();if(p.k==='surgeon'||!canSR(p.loc)||p.san>=p.max||G.fx.noRestHeal)return;heal(p,1);log(`${p.name} 휴식 (SAN +1)`);endTurn();render()}
function doEnd(){log(`${cur().name} 턴 종료`);endTurn();render()}
function doAbility(i){
 const p=cur(),a=ab(p);if(p.used||!canAbil(p))return;
 if(a==='surgeon'){if(G.players[i].san>=G.players[i].max)return;heal(G.players[i],1);log(`응급 치료: ${G.players[i].name} SAN +1`)}
 else if(a==='actress'){G.players.filter(q=>q.loc===p.loc).forEach(q=>{q.spot=2;q.spotBy=p.id});log('스포트라이트: 같은 지역 추적자 다음 판정 +2')}
 else if(a==='killer'){if(!A(p.loc).cracks.length)return;p.armD=true;log('즉시 제거 준비 (균열 소멸 2 ACT, 판정 없음)')}
 else if(a==='investor'){if(G.fx.lock)return;G.players.forEach(q=>{if(q.loc===p.loc||adjOf(p.loc).includes(q.loc)){q.supplied=true;if(q===p)p.act++;else q.mod++}});log('물자 보급: 주변 추적자 ACT +1')}
 else if(a==='writer'){p.arm=true;log('데우스 엑스 마키나 준비')}
 else if(a==='pilot'){p.armP=true;log('공중 지원 준비 (다른 지역 판정 또는 지원 1회)')}
 else if(a==='detective'){p.armT=true;log('탐정의 직감 준비 (다음 균열 소멸 판정: 주사위 2개 합산)')}
 else return;
 p.used=true;render();
}

const FACES=['⚀','⚁','⚂','⚃','⚄','⚅'];
function popNext() {
  const o = G.pop.shift();

  if (o && o.onConfirm) {
    o.onConfirm();
  }

  render();
}
function popHtml(o){
 if(o.k==='dice'){
  const det=`<div class="pl"><div>${o.who} · ${o.where} · ${o.wasWeak?'약화된 균열':'일반 균열'}</div><div>주사위 ${o.dice?`${o.dice[0]} + ${o.dice[1]}`:o.raw}${o.coop?` ${o.coop>0?'+':'−'} 협력 ${Math.abs(o.coop)}`:''}${o.spot?` + 스포트라이트 ${o.spot}`:''}${o.pen?` − 역마살 ${o.pen}`:''}</div>${o.rr!==null?`<div>AREA 보너스 재굴림: ${o.rr} → ${o.mir?'낮은':'높은'} 수 적용</div>`:''}${(o.notes||[]).map(t=>`<div class="muted">${t}</div>`).join('')}<div><b>${o.dice?'합계':'최종'} ${o.r}</b>${o.cap&&o.r===6?' (최대 6으로 조정)':''}${o.low&&o.r===1?' (최소 1로 조정)':''} · ${o.res}</div></div>`;
  return `<div class="over"><div class="card"><div class="dice ${o.done?'':'roll'}" id="dice">${o.done?(o.dice?o.dice.map(d=>FACES[d-1]).join(' '):FACES[o.r-1]):'🎲'}</div><div id="dres" style="${o.done?'':'visibility:hidden'}">${det}</div><button class="pri" id="pok" ${o.done?'':'disabled'} onclick="popNext()">확인</button></div></div>`;
 }
 const L=a=>a.map(t=>`<div>${t}</div>`).join('');
 if(o.k==='msg')return `<div class="over"><div class="card"><h3>${o.title}</h3><div class="pl">${L(o.lines)}</div><button class="pri" onclick="popNext()">확인</button></div></div>`;
 if(o.k==='ev')return `<div class="over"><div class="card ctr"><h3>${o.title}</h3><p class="muted">균열 발생</p>${o.note?`<p class="muted">${o.note}</p>`:''}<div class="pl">${L(o.spin)}</div><div class="pl">${o.areas.length||o.rest.length||o.lost?L(o.areas)+L(o.rest)+(o.lost?`<div>분산 불가로 소멸: ${o.lost}개 (붕괴도 +${o.lost*.5})</div>`:''):'<div>발생한 균열 없음</div>'}</div><button class="pri" onclick="popNext()">확인</button></div></div>`;
 if(o.k==='card')return `<div class="over"><div class="card ctr"><h3>${o.title}</h3><p class="muted">위기 카드</p><p style="font-size:20px;margin:6px 0">🃏 <b>${o.card.name}</b></p><p>${o.card.desc}</p>${o.lines.length?`<div class="pl"><div class="muted">결과</div>${L(o.lines)}</div>`:''}<button class="pri" onclick="popNext()">확인</button></div></div>`;
 return `<div class="over"><div class="card"><h3>${o.title}</h3><div class="gauge"><i style="width:${Math.min(100,o.gauge/30*100)}%"></i></div><p class="muted">도시 붕괴도 ${o.gauge} / 30</p>${o.secs.map(([h,ls])=>`<div class="sec"><b>${h}</b>${L(ls)}</div>`).join('')}<button class="pri" onclick="popNext()">확인</button></div></div>`;
}
function rollAnim(){
 const o=G.pop[0];if(!o||o.k!=='dice'||o.done)return;
 const d=document.getElementById('dice');let n=0;
 const iv=setInterval(()=>{d.textContent=o.dice?FACES[rnd(6)-1]+' '+FACES[rnd(6)-1]:FACES[rnd(6)-1];if(++n>=9){clearInterval(iv);o.done=true;d.textContent=o.dice?o.dice.map(x=>FACES[x-1]).join(' '):FACES[o.r-1];d.classList.remove('roll');document.getElementById('dres').style.visibility='visible';document.getElementById('pok').disabled=false}},110);
}
function sideHtml(){
 const cp=cur();
 return `<div class='card side'><b>추적자 현황</b>`+G.players.map(q=>`<div class='pr${q===cp?' on':''}'><div class='bar'><span class='nm'>${q===cp?'▶ ':''}${q.name}</span><span>${q.abnormal?'⚠ 이상':''}<button class='ib' onclick='showInfo(${q.id})'>ⓘ 추적자 정보</button></span></div><div class='bar'><span class='muted'>${SIDE(q.loc)}</span><span>SAN ${sanH(q)}/${q.max} · ACT ${q.act}/${q.act0}</span></div><div class='gauge sg'><i style='width:${Math.max(0,q.san)/q.max*100}%'></i></div></div>`).join('')+`</div>`;
}
function overHtml(){
 const win=G.over==='win';
 const why=win?'도시 붕괴도 0 달성':G.collapse>=30?'도시 붕괴도 30 도달':'모든 추적자가 이상 상태';
 const tr=G.players.map(p=>`<div><b>${p.name}</b> · SAN ${sanH(p)}/${p.max} · ${p.abnormal?'이상 상태':'정상'} · ${SIDE(p.loc)}</div>`).join('');
 const cr=AREAS.map(a=>{const c=A(a.n).cracks,w=c.filter(x=>x.weak).length;return `<div>${a.name}: ${c.length?`일반 ${c.length-w}개 / 약화 ${w}개`:'균열 없음'}</div>`}).join('');
 const tot=G.areas.reduce((s,a)=>s+a.cracks.length,0);
 return `<div class='over'><div class='card'><h2>게임 종료 · <span style='color:#e5484d'>${win?'승리':'패배'}</span></h2><p>${win?'도시를 구했다':'도시가 무너졌다'}</p><p class='muted'>${why}</p><div class='pl'><div>진행한 라운드: <b>${G.round}라운드</b> · 도시 붕괴도 <b>${G.collapse}</b> / 30</div></div><h4 style='text-align:center'>추적자 현황</h4><div class='pl'>${tr}</div><button class='pri' onclick='G=null;render()'>다시 시작</button></div></div>`;
}
function showInfo(i){
 const q=G.players[i],c=CH.find(x=>x.k===q.k);
 document.getElementById('modal').innerHTML=`<div class='over'><div class='card wide rules'><h3 style='text-align:center;margin:0'>${c.name} <span class='muted'>${c.en}</span></h3><div class='muted' style='text-align:center'>${c.pos} · 운용 난이도 ${c.diff} · SAN ${c.san} / ACT ${c.act} / AREA ${c.area?AREAS[c.area-1].name:'없음'}</div><h4>특성</h4><p style='margin:0'>${c.t}</p><h4>능력</h4><p style='margin:0'>${c.a}</p><h4>페널티</h4><p style='margin:0'>${c.p}</p><h4>이상 행동</h4><p style='margin:0'>${c.x}</p><div style='text-align:center;margin-top:12px'><button class='pri' onclick='hideRules()'>닫기</button></div></div></div>`;
}
function askReset(){document.getElementById('modal').innerHTML=`<div class='over'><div class='card' style='max-width:420px'><h3>게임 초기화</h3><p class='muted'>현재 게임은 포기 처리되고 추적자 인원 선택 화면으로 돌아갑니다. 진행할까요?</p><div class='row' style='justify-content:center'><button class='pri' onclick='doReset()'>초기화</button><button onclick='hideRules()'>취소</button></div></div></div>`}
function doReset(){hideRules();G=null;SEL=null;render()}
function hideRules(){document.getElementById('modal').innerHTML=''}
function showRules(){document.getElementById('modal').innerHTML=`<div class='over'><div class='card wide rules'><h3 style='text-align:center;margin:0'>HOW TO PLAY</h3>
<h4>승리 · 패배</h4><ul><li>도시 붕괴도는 15에서 시작합니다.</li><li>도시 붕괴도가 0에 도달하면 승리하며, 도시 붕괴도가 30에 도달하거나 모든 추적자가 이상 상태가 되면 패배합니다.</li></ul>
<h4>라운드 흐름</h4><ul><li>① 사건 단계 → ② 행동 단계(추적자 순서대로 턴) → ③ 붕괴 단계 순으로 반복합니다.</li></ul>
<h4>① 사건 단계</h4><ul><li>개수 돌림판을 돌린 뒤, 나온 개수만큼 장소 돌림판을 돌립니다. 돌림판을 돌려 나온 결과대로 균열이 발생합니다. 2인은 1~2 중 1번, 3~4인은 1~2 중 2번, 5~6인은 1~3 중 2번 돌립니다.</li><li>한 지역에 발생할 수 있는 균열은 최대 3개입니다. 이미 균열이 3개 있는 지역에 균열이 또 발생한다면 다음 번호 지역에 발생하며, 해당 지역도 이미 균열이 3개 있다면 인접 지역 중 번호가 낮은 지역에 발생합니다. 모든 지역에 균열이 3개 있다면 해당 균열은 발생하지 않는 대신 붕괴도가 즉시 0.5 오릅니다.</li><li>약화된 균열이 있는 지역에 균열이 추가될 때는 일반 균열이 새로 발생하지 않고, 약화된 균열이 일반 균열로 회복됩니다.</li><li>위기 카드는 인원수와 관계없이 1장을 뽑습니다. 위기 카드의 효과는 해당 라운드에만 적용되며, 라운드가 넘어가면 소멸됩니다.</li></ul>
<h4>② 행동 단계</h4><ul><li>추적자는 SAN(정신력), ACT(행동력), AREA(지역 보정) 스탯을 가집니다. ACT가 0이 되면 자동으로 턴이 종료됩니다.</li><li>이동(1 ACT): 인접 지역으로 이동합니다.</li><li>균열 소멸 판정(1 ACT): 현재 지역의 균열을 대상으로 주사위를 굴립니다. 같은 균열은 한 턴에 한 번만 시도할 수 있습니다.</li><li>지원(1 ACT): 균열이 없는 지역에서 같은 지역 추적자 1명의 SAN을 1 회복합니다.</li><li>능력 사용(ACT 소모 없음): 추적자 고유 능력이며 턴당 1회입니다.</li><li>휴식: 균열이 없는 지역에서 ACT 소모 없이 SAN을 1 회복하고 턴이 끝납니다.</li></ul>
<h4>판정</h4><ul><li>일반 균열: 1~3 실패(약화 균열로 변하고 SAN -1), 4~5 성공(소멸), 6 대성공(소멸, SAN +1).</li><li>약화된 균열: 1~2 실패(유지), 3~6 성공(소멸).</li><li>AREA 보너스: 해당 추적자의 AREA 지역에서 균열 소멸 판정에 실패하면 주사위를 한 번 더 굴려 더 높은 수를 적용합니다. (예외로 위기 카드 \'거울 속의 남자\' 의 효과가 적용되고 있을 때는 더 낮은 수를 적용합니다.)</li><li>협력 보너스: 본인을 제외하고 같은 지역에 있는 다른 추적자 1명당 주사위 값에 1이 더해집니다.</li></ul>
<h4>③ 붕괴 단계</h4><ul><li>균열 전체 개수에 따라 붕괴도가 변합니다. 0개 -2 / 1개 -1 / 2개 변화 없음 / 3개 +1 / 4개 이상 +2.</li><li>일반 균열이 있는 지역의 다음 번호 지역에 일반 균열이 1개 확산됩니다. 약화된 균열은 확산하지 않으며, 확산의 영향을 받는 지역에 약화된 균열이 있으면 약화된 균열이 일반 균열로 회복됩니다.</li><li>라운드 종료 시 SAN이 0 이하인 추적자는 다음 라운드부터 이상 상태가 되어 고유한 이상 행동만 합니다. SAN이 1 이상으로 회복되면 이상 상태에서 벗어납니다.</li></ul>
<div style='text-align:center;margin-top:12px'><button class='pri' onclick='hideRules()'>닫기</button></div></div></div>`}

let rulesPage = 0;

const RULE_PAGES = [
`<h4>붕괴된 도시에 오신 것을 환영합니다.</h4>
<ul>
<li>여기는 1925년 뉴욕. 이 도시는 현재 '균열'이라고 불리는, 원인을 알 수 없는 현실 붕괴 현상에 잠식되고 있습니다.<br>
당신은 시간이 반복되고, 기억이 사라지며, 공간이 뒤틀리는 이 도시가 완전히 무너지기 전에 원인을 해결해야 합니다.<br>
하지만 명심하세요. <b>모든 것을 구할 수는 없습니다.</b></li>
</ul>`,

`<h4>1. 보드판 구성</h4>
<img src="images/map.png"
     alt="이동 규칙 설명"
     style="width:100%;max-width:350px;display:block;margin:12px auto;border-radius:8px;">
<ul>
<li>보드판은 총 7개의 지역으로 구성되어 있습니다. 추적자는 자신의 AREA에서 게임을 시작합니다. (AREA 보너스에 대해서는 5-2.판정 보너스를 참고해 주세요.) 
1번 지역인 '병원'을 시작으로 해서 시계 방향으로 번호가 매겨지며, 가운데에 있는 '광장'이 7번 지역이 됩니다.<br><br></li>
</ul>
<ul>
<li>- 1번 지역 <b>병원(Hospital)</b>: '공항', '브로드웨이', '광장'과 인접합니다.</li>
<li>- 2번 지역 <b>공항(Airport)</b>: '병원', '월스트리트', '광장'과 인접합니다.</li>
<li>- 3번 지역 <b>월스트리트(Wall Street)</b>: '공항', '도서관', '광장'과 인접합니다.</li>
<li>- 4번 지역 <b>도서관(Library)</b>: '월스트리트', '항구', '광장'과 인접합니다.</li>
<li>- 5번 지역 <b>항구(Harbor)</b>: '도서관', '브로드웨이', '광장'과 인접합니다.</li>
<li>- 6번 지역 <b>브로드웨이(Broadway)</b>: '병원', '항구', '광장'과 인접합니다.</li>
<li>- 7번 지역 <b>광장(Plaza)</b>: 모든 지역과 인접하여 어느 지역에서든 이동할 수 있습니다. AREA 보너스가 없는 추적자들은 이 지역에서 게임을 시작합니다.</li>
</ul>`,

`<h4>2. 기본 규칙</h4>
<ul>
<h4>2-1. 기본 개념</h4>
</ul>
<ul>
<li>《붕괴된 도시》는 <b>여러 라운드를 반복하며</b> 진행하는 게임입니다.</li>
<li>각 라운드는 균열을 발생시키고 위기 카드의 효과를 적용하는 <b>사건 단계</b>로 시작되며, 이후 추적자가 행동하는 <b>행동 단계</b>로 진입합니다.
추적자 한 명이 자신의 행동을 수행하는 과정을 <b>턴</b>이라고 하는데, 모든 추적자가 자신의 턴을 한 번씩 진행하면 하나의 라운드가 종료됩니다.</li>
<li>라운드가 종료되면 일종의 정산 단계인 <b>붕괴 단계</b>를 거친 뒤 다음 라운드가 시작됩니다. 이러한 과정을 게임이 승리 혹은 패배로 종료될 때까지 반복합니다.</li>
</ul>
<ul><br>
<h4>2-2. 스탯 시스템</h4>
</ul>
<ul>
<li>모든 추적자는 <b>정신력(SAN), 행동력(ACT), 지역 보정(AREA)</b>이라는 세 가지 기본 스탯을 가집니다.</li>
<li>- <b>정신력(SAN)</b>: 추적자가 정신적으로 버틸 수 있는 정도를 나타냅니다. 5가 평균입니다.<br>
- <b>행동력(ACT)</b>: 한 턴에 수행할 수 있는 행동의 양을 나타냅니다. 3이 평균입니다.<br>
- <b>지역 보정(AREA)</b>: 특정 지역에서 추가적인 판정 보너스를 받을 수 있는지를 나타냅니다. 모든 추적자는 자신의 AREA에서 시작하며, AREA가 없는 추적자는 7번 지역 '광장'에서 시작합니다.</li>
</ul>`,

`<h4>3. 라운드 진행</h4>
<ul>
<li>하나의 라운드는 사건 단계, 행동 단계, 붕괴 단계의 세 단계로 구성됩니다.</li>
</ul>
<h4>3-1. 사건 단계</h4>
<ul>
<li>새로운 라운드가 시작되면 먼저 <b>개수 돌림판</b>과 <b>장소 돌림판</b>을 사용해 보드에 <b>균열</b>을 생성합니다. 
개수 돌림판을 먼저 돌려 균열의 발생 개수를 결정한 다음, 결정된 횟수만큼 장소 돌림판을 돌려 균열이 발생할 지역을 정합니다. 
장소 돌림판에서 선택된 지역에는 <b>일반 균열(🔴)</b>이 생성됩니다.</li>
<br>
<li>한 지역에 생성될 수 있는 균열은 종류 상관없이 <b>최대 3개까지</b>입니다. 
이미 균열이 3개 존재하는 지역에 추가 균열이 발생할 경우에는 <b>다음 번호의 지역으로 분산하여 생성합니다.</b>
<br>- 예를 들어 이미 균열이 3개 존재하는 병원에 다시 균열이 발생하면, 해당 균열은 다음 번호인 2번 지역 '공항'에 생성됩니다. 
만약 공항에도 이미 균열이 3개 존재한다면, 남은 인접한 지역(6번 지역 브로드웨이, 7번 지역 광장) 중 <b>번호가 가장 낮은 지역</b>인 6번 지역 '브로드웨이'로 분산됩니다. 
브로드웨이 역시 균열이 3개라면 7번 지역 '광장'에 분산됩니다.
<br>- 모든 인접 지역에 이미 균열이 3개씩 존재한다면, 해당 균열은 생성되지 않고 <b>소멸</b>하며, 대신 <b>도시 붕괴도가 즉시 0.5 증가</b>합니다.
<br>- 균열이 발생해야 하는 지역에 이미 약화된 균열(🟡)이 존재한다면, 새로운 일반 균열을 추가하는 대신 <b>기존 약화된 균열이 일반 균열로 회복</b>됩니다.</li><br>
<li>균열 생성이 완료되면 <b>위기 카드 한 장</b>을 뽑아 공개합니다. 공개된 카드의 효과는 해당 라운드에만 적용되며, 라운드가 종료되면 위기 카드의 효과 역시 소멸합니다.
<br>- 위기 카드는 참여 인원수와 관계없이 <b>매 라운드 한 장만</b> 뽑습니다.
<br>- 추적자 중 ‘작가’가 있다면 위기 카드를 두 장 공개한 뒤, 그 중 한 장을 선택해 효과를 적용합니다.</li>
</ul>`,

`<h4>3-2. 행동 단계</h4>
<ul>
<li>사건 단계가 끝나면 각 추적자는 자신의 <b>턴</b>을 진행합니다. 
추적자는 보유한 ACT를 사용하여 이동하거나 균열을 제거하고, 다른 추적자를 지원할 수 있습니다. 
단, ACT가 0이 되는 순간 해당 추적자의 턴은 <b>즉시 종료되며</b>, ACT를 소모하지 않는 행동이라 하더라도 추가로 수행할 수 없습니다.</li><br>
<li>🟢 <b>이동(1 ACT 소모)</b>: 현재 위치에서 인접한 지역으로 이동할 수 있습니다. 
<br>- 보드판에서 추적자가 이동할 수 있는 지역은 <span style="color:	#228B22;">초록색 윤곽선</span>을 가지고 있습니다.</li><br>
<li>🔴 <b>균열 소멸 판정(1 ACT 소모)</b>: 자신이 위치한 지역에 있는 균열을 대상으로 주사위를 굴려 소멸 여부를 판정할 수 있습니다. 
<br>- 한 추적자는 자신의 턴에 동일한 균열을 대상으로 두 번 이상 판정을 시도할 수 없습니다. 
<br>- 한 번 판정을 진행한 균열은 판정 결과에 관계없이 해당 턴 동안 다시 판정 대상으로 선택할 수 없습니다.</li><br>
<li>💉 <b>지원(1 ACT 소모)</b>: 자신과 같은 지역에 있는 다른 추적자 한 명의 SAN을 1 회복시킵니다. 
<br>- 해당 행동은 균열이 존재하지 않는 지역에서만 할 수 있습니다. (단, 지역에 ‘외과의사’가 있을 경우 균열 여부를 무시합니다.)</li><br>
<li>✨ <b>능력 사용(ACT 소모 없음)</b>: 자신의 고유 능력을 사용합니다.
<br>- 별도의 설명이 없는 한 각 추적자는 자신의 턴에 능력을 한 번만 사용할 수 있습니다.
<br>- 일부 추적자는 능력을 사용하기 전 대기 상태일 때 능력 사용을 취소할 수 있습니다.</li><br>
<li>💤 <b>휴식(ACT 소모 없음)</b>: 자신의 SAN을 1 회복합니다. 
<br>- 휴식을 선택하면 남아 있는 ACT가 있더라도 해당 추적자의 턴은 즉시 종료됩니다. 
<br>- 지원과 마찬가지로 균열이 존재하지 않는 지역에서만 할 수 있습니다. (단, 지역에 ‘외과의사’가 있을 경우 균열 여부를 무시합니다.)</li>
</ul>`,

`<h4>3-3. 붕괴 단계</h4>
<ul>
<li>모든 추적자의 행동이 종료되면 일종의 정산인 <b>붕괴 단계</b>에 진입합니다. 붕괴 단계에서는 다음 세 가지 절차를 진행합니다.</li><br>
<li><b>도시 붕괴도 조정</b>: 보드에 남아 있는 균열(약화된 균열 포함)의 전체 개수에 따라 도시 붕괴도가 조정됩니다.
<br>- 0개: 2 감소 / 1개: 1 감소 / 2개: 변화 없음 / 3개: 1 증가 / 4개 이상: 2 증가 
<br>- 도시 붕괴도는 추적자의 수와 관계없이 게임 시작 시 15에서 시작합니다.</li><br>
<li><b>확산</b>: 일반 균열이 존재하는 지역의 다음 번호 지역에 일반 균열을 1개 추가합니다.
<br>- 각 지역에는 이 과정을 통해 한 번에 최대 1개의 균열만 새롭게 추가됩니다. 
<br>- 약화된 균열만 존재하는 지역은 균열 확산의 기준이 되지 않으므로 이 과정을 진행하지 않습니다.
<br>- 균열이 확산될 다음 번호 지역에 약화된 균열이 이미 존재한다면, 그 옆에 새로운 일반 균열이 추가되는 것이 아닌, 기존 약화된 균열이 일반 균열로 회복됩니다. 
이때 회복된 일반 균열은 해당 붕괴 단계에서 추가 확산을 일으키지 않으며, 다음 라운드의 붕괴 단계까지 소멸되지 않고 남아 있다면 그때부터는 다른 일반 균열과 동일하게 정상적으로 확산을 진행합니다.</li><br>
<li><b>추적자 상태 확인</b>: 각 추적자들의 SAN을 확인합니다. 라운드 종료 시점에 SAN이 0 이하인 추적자는 다음 라운드부터 <b>이상 상태</b>에 진입합니다. 
<br>- 이상 상태에 들어간 추적자는 자신의 턴에 일반적인 행동을 수행할 수 없으며, 지정된 <b>이상 행동</b>만 수행할 수 있습니다. 
<br>- 다른 추적자의 지원 등을 통해 SAN을 회복하여 붕괴 단계 종료 시점에 SAN이 1 이상이 되면 이상 상태에서 벗어날 수 있습니다.</li>
</ul>`,

`<h4>4. 판정 시스템</h4>
<ul>
<h4>4-1. 기본 판정</h4>
</ul>
<ul>
<li>추적자가 균열 소멸을 시도할 경우, ACT 1을 소모하고 6면체 주사위 한 개를 굴려 결과를 확인합니다. 
판정 결과는 대상 균열의 상태에 따라 다르게 적용됩니다.</li><br>
<li>🔴 <b>일반 균열</b> 
<br>- 1, 2, 3: 실패(균열 약화, 해당 추적자 SAN 1 감소)
<br>- 4, 5: 보통 성공(균열 즉시 소멸, 해당 추적자 SAN 변화 없음)
<br>- 6: 대성공(균열 소멸, 해당 추적자 SAN 1 증가, 이미 SAN이 최대치에 도달한 상태라면 추가적인 SAN 회복 효과는 적용되지 않음).</li><br>
<li>🟡 <b>약화된 균열</b> 
<br>- 1, 2: 실패(균열 유지)
<br>- 3, 4, 5, 6: 성공(균열 소멸).</li><br>
</ul>
<ul>
<h4>4-2. 판정 보너스</h4>
</ul>
<ul>
<li>균열 소멸 판정에는 <b>AREA 보너스</b>와 <b>협력 보너스</b>가 적용될 수 있습니다.</li><br>
<li>🎲 <b>AREA 보너스</b>: 추적자의 AREA와 현재 위치한 지역이 일치할 때 적용됩니다. 
해당 추적자는 기본 주사위 판정에서 실패가 나왔을 경우 주사위를 한 번 더 굴릴 수 있으며, 두 번의 결과 중 더 높은 숫자를 최종 판정에 적용합니다.</li><br>
<li>🎲 <b>협력 보너스</b>: 같은 지역에 다른 추적자가 함께 있을 때 적용됩니다.
판정을 시도하는 추적자 본인을 제외하고 같은 지역에 있는 추적자 한 명당 최종 주사위 값에 1을 더합니다. 
<br>- 예를 들어 판정을 시도하는 추적자 외에 같은 지역에 두 명의 추적자가 더 있다면, 주사위를 굴려 나온 숫자에 2를 더합니다. 
처음 주사위 결과가 2였다면 협력 보너스를 적용한 최종 결과는 4가 됩니다.<li>
</ul>`,

`<h4>5. 게임 종료 조건</h4>
<ul>
<li><b>도시 붕괴도가 0에 도달</b>하면 <span style="color:#ffff00;"><b>추적자들의 승리</b></span>로 게임이 종료됩니다.</li>
<li>반대로 <b>도시 붕괴도가 30에 도달</b>하거나, <b>모든 추적자가 이상 상태에 진입</b>하면 <span style="color:#ff0000;"><b>추적자들의 패배</b></span>로 게임이 종료됩니다.</li>
</ul>
`
];

function renderRulesPage() {
  const modal = document.getElementById('modal');
  if (!modal) return;

  const last = RULE_PAGES.length - 1;

  modal.innerHTML = `
    <div class="over">
      <div class="card wide rules"
           style="max-height:85vh;display:flex;flex-direction:column">

        <h3 style="text-align:center;margin:0 0 8px">
          규칙 요약
        </h3>

        <div style="overflow-y:auto;min-height:0;flex:1;padding:0 4px">
          ${RULE_PAGES[rulesPage]}
        </div>

        <div class="muted"
             style="text-align:center;margin-bottom:8px">
          페이지 ${rulesPage + 1} / ${RULE_PAGES.length}
        </div>

        <div class="row"
             style="justify-content:center;align-items:center;flex-wrap:wrap;margin-top:12px">

          <button onclick="changeRulesPage(-1)"
                  ${rulesPage === 0 ? 'disabled' : ''}>
            이전
          </button>

          <button onclick="changeRulesPage(1)"
                  ${rulesPage === last ? 'disabled' : ''}>
            다음
          </button>

          <button class="pri" onclick="hideRules()">
            닫기
          </button>

        </div>
      </div>
    </div>`;
}

function changeRulesPage(step) {
  rulesPage = Math.max(
    0,
    Math.min(RULE_PAGES.length - 1, rulesPage + step)
  );

  renderRulesPage();
}

function showRules() {
  rulesPage = 0;
  renderRulesPage();
}
function cancelAbility(){
 const p=cur();
 if(!p.arm&&!p.armD&&!p.armP&&!p.armT)return;
 p.arm=false;p.armD=false;p.armP=false;p.armT=false;p.used=false;log(`${p.name}: 능력 사용 취소`);render();
}
function footHtml(){return `<div class="foot">게임에 대한 건의사항이나 발견한 문제는 아래 링크에 남겨 주세요.<br><a href="https://forms.gle/ckWihTmCcQaR1gpcA" target="_blank" rel="noopener noreferrer">https://forms.gle/ckWihTmCcQaR1gpcA</a></div>`}
const UPDATES=[
 {t:'기능 추가',l:['메인 화면 최하단에 건의사항을 제출할 수 있는 링크를 추가했습니다.','능력을 활성화하고 대기 상태일 때 능력 사용을 취소할 수 있도록 버튼을 추가했습니다.','게임에 참여할 추적자를 모두 선택한 뒤 게임 시작 여부를 묻는 확인 팝업을 추가했습니다.','추적자 선택 화면 상단에 선택한 추적자 이름이 표시되도록 추가했습니다.']},
 {t:'표시 개선',l:['추적자 선택 화면의 UI를 개선했습니다.','균열 소멸 판정 시 주사위 아이콘이 보너스까지 반영된 최종 결과로 나오도록 수정했습니다.','사건 단계의 균열 발생 팝업에서 균열 개수를 합산해 표시하도록 수정했습니다.','추적자의 SAN이 0 미만으로 감소하면 음수로 표기되도록 수정했습니다.','추적자의 SAN이 최대치의 절반 이하이면 숫자가 빨간색으로 표시되도록 수정했습니다.']},
 {t:'신 컨텐츠 추가',l:['새로운 추적자 \'탐정\'이 도시를 찾아왔습니다. 탐정과 함께 이 도시의 비밀을 파헤쳐보세요!', '위기 카드  \'빌려온 시간 \',  \'기록되지 않은 희생 \', \'전염되는 광기 \',  \'공명하는 악몽 \',  \'동조 \',  \'불완전한 봉인 \'을 추가했습니다.','위기 카드 \'메아리치는 상처\', \'불안한 군중\', \'시간이 다 됐다\', \'도시가 숨을 쉰다\', \'기억하는 방\', \'불시착\', \'강제 교환\', \'뒤바뀐 균열\'을 추가했습니다.','위기 카드 \'거울 속의 남자\', \'저항하는 균열\', \'잘못된 군중\', \'불신의 공기\', \'환각의 잔영\'을 추가했습니다.']},
 {t:'규칙·밸런스 조정',l:['참여 인원별 개수 돌림판을 조정했습니다 (2인 1~2 1번 / 3~4인 1~2 2번 / 5~6인 1~3 2번).','킬러의 이상 행동 \'충동\'을 수정했습니다. 이제 이상 상태의 킬러는 더이상 인접 지역에 균열 1개를 발생시키지 않습니다.','작가의 능력 \'데우스 엑스 마키나\'가 약화된 균열 판정 실패에도 발동되도록 수정했습니다.']},
 {t:'버그 수정',l:['파일럿의 능력 \'공중 지원\'이 상시 발동되던 문제를 수정했습니다.','위기 카드 \'잘못된 군중\'의 협력 보너스가 추적자가 지역에 혼자 있을 때도 적용되던 문제를 수정했습니다.']},
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
 `<div class="sgrid">`+CH.map(c=>`<div class="card"><div class="ph">
  <img
    src="${IMGS[c.k]}"
    alt="${c.name}"
    loading="lazy"
    onerror="this.style.display='none'; this.parentNode.classList.add('no-image')"
  >
  <span class="img-fallback">${c.name}</span>
</div>
 <div class="nm2">${c.name}</div>
 <div class="sm">${c.pos}</div>
 <div class="sm">운용 난이도: ${c.diff}</div>
 <details><summary>추적자 정보</summary><p><b>기본 스탯:</b> SAN ${c.san} / ACT ${c.act} / AREA ${c.area?AREAS[c.area-1].name:'없음'}</p><p><b>특성</b> ${c.t}</p><p><b>능력</b> ${c.a}</p><p><b>페널티</b> ${c.p}</p><p><b>이상 행동</b> ${c.x}</p></details>
 <div class="pick"><button class="pri" ${SEL.picks.includes(c.k)?'disabled':''} onclick="selPick('${c.k}')">선택</button></div></div>`).join('')+`</div>`+(n>=SEL.count?confirmHtml():'');
}
function render(){
 const app=document.getElementById('app');
 const rbtn=document.getElementById('rb');if(rbtn)rbtn.style.display=G?'':'none';
 if(!G){
  app.innerHTML=SEL?renderSel():`<div class="card"><p class='muted' style='text-align:center'>추적자 인원을 선택하세요</p><div class='row' style='justify-content:center'>${[2,3,4,5,6].map(n=>`<button onclick="SEL={count:${n},picks:[]};render()">${n}인</button>`).join('')}</div></div>${updHtml()}${footHtml()}`;
  return;
 }
 const p=cur(),pct=Math.min(100,G.collapse/30*100),here=A(p.loc);
 let h=`<div class="card"><div class="bar"><span>${G.round}라운드</span><span>도시 붕괴도 <b>${G.collapse}</b> / 30</span></div><div class="gauge"><i style="width:${pct}%"></i></div>
 <div class="muted">🃏 ${G.card?`${G.card.name} — ${G.card.desc}${G.fx.note?` → <b>${G.fx.note}</b>`:''}`:'선택 중'}</div>${dbgHtml()}</div><div class='wrap'><div class='map'>`;
 AREAS.forEach(ar=>{
  const a=A(ar.n),isHere=p.loc===ar.n,adj=!G.over&&!G.choice&&canMove(p,ar.n);
  const cr=a.cracks.length?a.cracks.map(c=>c.weak?'🟡':'🔴').join(''):'';
  const toks=G.players.filter(q=>q.loc===ar.n).map(q=>`<span class="tok${q===p?' cur':''}${q.abnormal?' ab':''}">${G.fx.sync===q.id?'🔗':''}${G.fx.noAbil===q.id?'🔇':''}${q.ab?'🔀':''}${q.name}</span>`).join('');
  h+=`<div class="hw${isHere?' here':''}${adj?' adj':''}" style="left:${ar.x}%;top:${ar.y}%"><button class="hx" ${adj?`onclick="doMove(${ar.n})"`:'disabled'}><i style="background:${AREAS[idOf(ar.n)-1].c}"><b>${EMO(ar.n)}<br>${SIDE(ar.n)}</b><span>${cr}${G.fx.sealed===ar.n?'🚫':''}${G.fx.cut&&(G.fx.cut===ar.n||ar.n===7)?'✂️':''}${G.fx.resist===ar.n?'🪨':''}${G.fx.distrust===ar.n?'🌫️':''}${G.fx.swapMap&&G.fx.swapMap.includes(ar.n)?'🔀':''}</span><span>${toks}</span></i></button></div>`;
 });
 h+=`</div>${sideHtml()}</div><div class='card'><div class='bar'><b style='font-size:17px'>${p.name}</b><span style='font-size:15px'>${EMO(p.loc)} ${SIDE(p.loc)}</span></div>
 <div class="bar"><span>🧠 SAN ${sanH(p)}/${p.max}${p.abnormal?' (이상)':''}</span><span>⚡ ACT ${p.act}/${p.act0}</span></div>
 <div class="muted" style="margin:4px 0 8px">${p.ab&&p.ab!==p.k?`🔀능력: ${ABN[p.ab]} `:''}${p.spot?'🔦스포트라이트 ':''}${p.armD?'🎯즉시 제거 대기 ':''}${p.armP?'✈️공중 지원 대기 ':''}${p.armT?'🔍탐정의 직감 대기 ':''}${p.arm?'🪄데우스 대기 ':''}${p.supplied?'📦보급 ':''}${p.k==='pilot'&&p.stay>=2&&p.loc===p.last?'⏳역마살 -1 ':''}· 테두리가 초록인 지역을 눌러 이동</div><div class="row">`;
 here.cracks.forEach(c=>{
  if(p.armD)h+=`<button class="pri" ${p.act<2?'disabled':''} onclick="doInstant(${c.id})">🎯 ${c.weak?'약화':'일반'} 즉시 제거 (2 ACT)</button>`;
  else h+=`<button class="pri" ${p.act<1||G.judged.has(c.id)||!canJudge(p.loc)?'disabled':''} onclick="doJudge(${p.loc},${c.id})">${c.weak?'🟡 약화':'🔴 일반'} 균열 소멸 판정</button>`;
 });
 if(rem(p))AREAS.forEach(ar=>{if(ar.n!==p.loc)A(ar.n).cracks.forEach(c=>{const k=remoteCost(p,ar.n);h+=`<button ${p.act<k||G.judged.has(c.id)||!canJudge(ar.n)?'disabled':''} onclick="doJudge(${ar.n},${c.id})">✈️ ${SIDE(ar.n)} ${c.weak?'🟡':'🔴'} 판정 (${k} ACT)</button>`})});
 G.players.forEach(q=>{
  if(q===p||!canSR(q.loc)||(q.loc!==p.loc&&!rem(p)))return;
  const k=costSup(p,q);h+=`<button ${G.fx.noSupport||p.act<k||q.san>=q.max?'disabled':''} onclick="doSup(${q.id})">${q.name} 지원 (${k} ACT)</button>`;
 });
 if(!canAbil(p))h+=`<button disabled>🔇 능력 사용 불가 (잘못된 얼굴)</button>`;
 else if(!p.used){
  if(ab(p)==='surgeon')G.players.filter(q=>q.loc===p.loc).forEach(q=>{h+=`<button ${q.san>=q.max?'disabled':''} onclick="doAbility(${q.id})">🩺 응급 치료: ${q.id===p.id?'본인':q.name}</button>`});
  else h+=`<button ${(ab(p)==='killer'&&!here.cracks.length)||(ab(p)==='detective'&&!here.cracks.length)||(ab(p)==='investor'&&G.fx.lock)?'disabled':''} onclick="doAbility(0)">✨ ${ABN[ab(p)]}${ab(p)==='investor'&&G.fx.lock?' (엇갈린 신호로 무효)':''}</button>`;
 }
 if(p.arm||p.armD||p.armP||p.armT)h+=`<button onclick='cancelAbility()'>↩ 능력 사용 취소</button>`;
 if(p.k!=='surgeon'&&canSR(p.loc))h+=`<button ${p.san>=p.max||G.fx.noRestHeal?'disabled':''} onclick='doRest()'>휴식 (턴 종료)</button>`;
 h+=`<button onclick="doEnd()">턴 종료</button></div></div>`;
 h+=`<div class="card"><div class="log">${G.log.slice(0,12).map(t=>`<div>${t}</div>`).join('')}</div></div>`;
 if(G.pop.length)h+=popHtml(G.pop[0]);else if(G.choice)h+=`<div class="over"><div class="card"><h3>플롯 비틀기</h3><p class="muted">이번 라운드에서 발동할 위기 카드를 선택해주세요</p>${G.choice.map((c,i)=>`<p><button class="pri" onclick="pickCard(${i})">${c.name}</button><br><span class="muted">${c.desc}</span></p>`).join('')}</div></div>`;
 if(!G.pop.length&&!G.choice&&G.sac)h+=sacHtml();
 if(!G.pop.length&&!G.choice&&!G.sac&&G.det)h+=detHtml();
 if(!G.pop.length&&G.over)h+=overHtml();
 if(!G.pop.length&&!G.choice&&!G.sac&&!G.det&&!G.over){
  const key=G.round+':'+G.turn;

  if(G.shown!==key){
    G.shown=key;

    const toastId=`toast-${G.round}-${G.turn}`;

    h+=`<div class='toast' id='${toastId}'>
      <div>
        <small>${G.round}라운드</small><br>
        <b>${p.name}</b>의 턴
      </div>
    </div>`;

    setTimeout(()=>{
      const t=document.getElementById(toastId);
      if(t)t.remove();
    },1500);
  }
}
 app.innerHTML=h;rollAnim();
}
render();
