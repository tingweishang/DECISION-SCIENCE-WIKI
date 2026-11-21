'use strict';
const slides = [
  ['先定義要做的決策', '你經營一家只賣當日鮮食的小店。明天要訂幾份？先分開三件事：可控制的訂量 Q、無法控制的需求 D，以及用來比較方案的利潤。', ['discrete','nv'], '<p class="formula">決策 Q ＋ 不確定的需求 D → 利潤</p><p>學習目標：用機率描述需求、比較方案，最後決定訂量。</p>'],
  ['先用抽樣認識不確定性', '公平硬幣的正面機率是 50%。選擇樣本數並重抽，觀察估計值與 50% 的差距。大樣本通常更穩定，每一次重抽仍會波動。', ['mc'], '<div class="controls"><label>擲幣次數<select id="trials"><option>10</option><option>100</option><option>1000</option><option>10000</option></select></label><button type="button" id="run">重抽樣本</button></div><output id="coin" aria-live="polite"></output>'],
  ['用決策樹倒推期望金額', '方案 A 保證賺 30 元。方案 B 在需求高時賺 80 元，需求低時虧 20 元。先在機率節點做加權，再在決策節點比較。這是教學自編案例。', ['tree','risk'], '<p class="formula">方案 B 的 EMV = 80p − 20(1−p)</p><label>需求高的機率<input id="chance" type="range" min="0" max="100" value="60"></label><output id="tree-result" aria-live="polite"></output>'],
  ['次數、累積機率與經驗分配', '從 10 天記錄到需求 1 份有 2 天、2 份有 5 天、3 份有 3 天。只訂 2 份，必須把需求 1 份和 2 份的機率加起來。這是教學自編資料。', ['empirical','discrete'], '<div class="scroll"><table><thead><tr><th>需求</th><th>1 份</th><th>2 份</th><th>3 份</th></tr></thead><tbody><tr><th scope="row">PMF</th><td>20%</td><td>50%</td><td>30%</td></tr><tr><th scope="row">CDF</th><td>20%</td><td>70%</td><td>100%</td></tr></tbody></table></div><details><summary>訂 2 份時，缺貨機率是多少？</summary><p>30%。取需求大於 2 的尾端機率，也就是 1 − 0.7。</p></details>'],
  ['看到新證據後，更新機率', 'Lecture 3 的市場案例中，原先強市機率是 30%。強市時有 80% 機率出現正面訊號，弱市時也有 10% 機率出現正面訊號。現在你看到正面訊號。', ['bayes'], '<details><summary>揭曉強市的後驗機率</summary><p class="formula">P(強市｜正面) = (0.3×0.8)/(0.3×0.8+0.7×0.1) ≈ 77.42%</p><p>分母包含所有產生正面訊號的途徑。</p></details>'],
  ['連續變數用區間描述', '等待時間可以是 2.5 分鐘或 2.51 分鐘，因此看門檻與區間機率。若把兩段作業時間加總，相依性會影響總工期的波動。', ['cdf','corr'], '<p class="formula">P(a ≤ X ≤ b) = F(b) − F(a)</p><details><summary>兩段工期正相關，總工期變異會怎麼變？</summary><p>在各段變異不變時，總工期變異比獨立情況大，因為還要加上 2Cov(X,Y)。</p></details>'],
  ['等一件事，或等好幾件事', '若每通客服電話的處理時間互相獨立，且都服從平均 10 分鐘的指數分配，k 通電話的總時間服從 Gamma(k, 10)。這裡第二個參數是尺度，單位為分鐘。', ['expo','gamma'], '<label>連續處理的電話數<input id="calls" type="range" min="1" max="10" value="5"></label><output id="gamma-result" aria-live="polite"></output>'],
  ['報童模型：找出最佳進貨量', '使用 Lecture 6 第 2 頁的需求設定，D = 1 到 5 各有 20% 機率。初始售價 100 元、成本 25 元、殘值 0 元。調整單價看臨界比例與最佳訂量怎麼變。', ['nv'], '<div class="controls"><label>售價<input id="price" type="number" min="1" max="10000" value="100"></label><label>成本<input id="cost" type="number" min="1" max="10000" value="25"></label><label>殘值<input id="salvage" type="number" min="0" max="10000" value="0"></label></div><output id="optimal" aria-live="polite"></output><div class="scroll" id="profits"></div>'],
  ['從模擬結果回到決策', '比較方案時，先指明目標，例如最大化期望利潤，再檢查虧損機率及極端情境。航空案例若連售價都可調，需求也可能隨價格改變，因此要比較更多組合。', ['selling','simopt','shortfall'], '<p class="formula">建立需求情境 → 計算每個方案的績效 → 按準則選擇</p>'],
  ['自我檢查', '若缺貨代價增加，而過量代價和需求分配保持不變，最佳訂量通常會往哪個方向變？', ['nv','cdf'], '<fieldset id="quiz"><legend>選擇答案</legend><button type="button" data-choice="down">下降</button> <button type="button" data-choice="up">不下降，可能上升</button> <button type="button" data-choice="same">一定不變</button></fieldset><output id="feedback" aria-live="polite"></output>']
];
const stage = document.querySelector('#stage');
const jump = document.querySelector('#jump');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const get = id => document.getElementById(id);
const read = id => get(id).valueAsNumber;
const percent = x => (100 * x).toFixed(2).replace(/\.00$/, '') + '%';
let current = 0;
for (const [index, slide] of slides.entries()) jump.add(new Option(`${index+1} · ${slide[0]}`, index));
function show(index) {
  current = Math.max(0, Math.min(slides.length - 1, index));
  jump.value = current;
  prev.disabled = current === 0;
  next.disabled = current === slides.length - 1;
  get('progress').max = slides.length;
  get('progress').value = current + 1;
  get('position').textContent = `第 ${current+1} / ${slides.length} 頁`;
  const [title, intro, refs, interaction] = slides[current];
  const links = refs.map(id => {
    const entry = window.wikiData.entries.find(item => item.id === id);
    return `<a href="index.html#${entry.id}">${entry.title}（L${entry.lecture}，頁 ${entry.start}–${entry.end}）</a>`;
  });
  stage.innerHTML = `<h2>${title}</h2><p>${intro}</p>${interaction}<p><small>Wiki 依據　${links.join('　')}</small></p>`;
  if (get('run')) {
    const sample = () => {
      const n = Number(get('trials').value);
      let heads = 0;
      for (let i = 0; i < n; i++) heads += Number(Math.random() < .5);
      get('coin').textContent = `${heads} / ${n} 正面 · ${percent(heads/n)} · 與 50% 差 ${(100*Math.abs(heads/n-.5)).toFixed(2)} 個百分點`;
    };
    get('run').addEventListener('click', sample);
    get('trials').addEventListener('change', sample);
    sample();
  }
  if (get('chance')) {
    const calculate = () => {
      const probability = read('chance');
      const value = probability - 20;
      const choice = value === 30 ? '兩方案並列' : value > 30 ? '選 B' : '選 A';
      get('tree-result').textContent = `高需求 ${probability}% · A = 30 元 · B = ${value} 元 · ${choice}`;
    };
    get('chance').addEventListener('input', calculate);
    calculate();
  }
  if (get('calls')) {
    const calculate = () => {
      const calls = read('calls');
      get('gamma-result').textContent = `${calls} 通 · 平均 ${10*calls} 分鐘 · 標準差 ${(10*Math.sqrt(calls)).toFixed(2)} 分鐘`;
    };
    get('calls').addEventListener('input', calculate);
    calculate();
  }
  if (get('price')) {
    for (const id of ['price','cost','salvage']) get(id).addEventListener('input', stock);
    stock();
  }
  get('quiz')?.addEventListener('click', event => {
    const choice = event.target.dataset.choice;
    if (!choice) return;
    get('feedback').textContent = choice === 'up'
      ? '答對了。Cu 增大會提高臨界比例，CDF 首次達到門檻的訂量不會往左移。'
      : '再試一次。想想 Cu/(Cu+Co) 的分子和分母一起增加時，比例會怎麼變。';
  });
}
function stock() {
  const p = read('price'), c = read('cost'), s = read('salvage');
  const result = get('optimal');
  const profits = get('profits');
  if (![p,c,s].every(Number.isInteger) || !(0 <= s && s < c && c < p && p <= 10000)) {
    result.textContent = '請輸入整數，且 0 ≤ 殘值 < 成本 < 售價 ≤ 10000。';
    profits.replaceChildren();
    return;
  }
  const cu = p-c, co = c-s;
  const rows = Array.from({length:6}, (_,q) => {
    let total = 0;
    for (let d = 1; d <= 5; d++) total += p*Math.min(d,q) + s*Math.max(q-d,0) - c*q;
    return {q, total};
  });
  const best = Math.max(...rows.map(row => row.total));
  const chosen = rows.find(row => row.q*(cu+co) >= 5*cu).q;
  result.textContent = `Cu = ${cu} 元 · Co = ${co} 元 · 臨界比例 ${percent(cu/(cu+co))} · 最小最佳訂量 ${chosen} 份 · 服務水準 ${percent(chosen/5)}`;
  profits.innerHTML = '<table><thead><tr><th scope="col">訂量（份）</th><th scope="col">服務水準</th><th scope="col">期望利潤（元）</th></tr></thead><tbody>' +
    rows.map(({q,total}) => `<tr class="${total===best ? 'best' : ''}"><th scope="row">${q}${total===best ? '（最佳）' : ''}</th><td>${percent(q/5)}</td><td>${(total/5).toFixed(2)}</td></tr>`).join('') + '</tbody></table>';
}
prev.addEventListener('click', () => show(current-1));
next.addEventListener('click', () => show(current+1));
jump.addEventListener('change', () => show(Number(jump.value)));
document.addEventListener('keydown', event => {
  if (event.target.closest('input, select, button, textarea, summary') || !['ArrowLeft','ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  show(current + (event.key === 'ArrowRight' ? 1 : -1));
});
show(0);
