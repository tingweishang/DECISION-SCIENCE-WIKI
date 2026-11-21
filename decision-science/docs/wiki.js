'use strict';
const {entries, sources} = window.wikiData;
const query = document.querySelector('#query');
const lecture = document.querySelector('#lecture');
const results = document.querySelector('#results');
const status = document.querySelector('#status');
const names = ['隨機模擬','決策樹與經驗分配','離散機率','連續機率與相依性','決策機率分配','最佳買賣決策'];
const normalize = value => value.normalize('NFKC').toLowerCase();
const aliases = [
  [/最佳進貨|進貨量|缺貨成本|服務水準怎麼/, 'newsvendor'],
  [/怎麼等待|等待多久/, '等待'],
  [/期望收益|預期收益/, 'emv']
];
function make(tag, text, className) {
  const node = document.createElement(tag);
  node.textContent = text;
  if (className) node.className = className;
  return node;
}
function search(terms, selected) {
  const clean = normalize(terms).trim().replace(/[？?！!。]/g, '');
  const alias = aliases.find(([pattern]) => pattern.test(clean));
  const words = alias ? [alias[1]] : clean.split(/\s+/).filter(Boolean);
  return entries.filter(entry => !selected || entry.lecture === Number(selected))
    .map(entry => {
      const key = normalize([entry.title, entry.keywords, entry.id].join(' '));
      const body = normalize(entry.answer + ' ' + entry.formula);
      return {entry, score: words.every(word => key.includes(word) || body.includes(word))
        ? words.reduce((sum, word) => sum + (key.includes(word) ? 3 : 1), 1) : 0};
    }).filter(hit => hit.score > 0).sort((a,b) => b.score - a.score).map(hit => hit.entry);
}
function render() {
  const hits = search(query.value, lecture.value);
  status.textContent = hits.length ? `${hits.length} 筆知識條目` : '找不到符合的條目。可縮短關鍵詞或清除講義篩選。';
  results.replaceChildren(...hits.map(entry => {
    const card = make('article', '');
    card.id = entry.id;
    const span = entry.start === entry.end ? entry.start : `${entry.start}–${entry.end}`;
    card.append(make('small', `Lecture ${entry.lecture} · PDF 第 ${span} 頁`), make('h3', entry.title), make('p', entry.answer));
    if (entry.formula) card.append(make('p', entry.formula, 'formula'));
    const permalink = make('a', '條目連結');
    permalink.href = '#' + entry.id;
    card.append(permalink);
    return card;
  }));
}
for (const source of sources) {
  lecture.add(new Option(`Lecture ${source.lecture}｜${names[source.lecture-1]}`, source.lecture));
  document.querySelector('#manifest').append(make('li', `Lecture ${source.lecture}｜${names[source.lecture-1]}｜${source.pages} 頁`));
}
document.querySelector('#search').addEventListener('submit', event => {event.preventDefault(); render();});
document.querySelector('#search').addEventListener('reset', event => {
  event.preventDefault();
  query.value = '';
  lecture.value = '';
  render();
});
query.addEventListener('input', render);
lecture.addEventListener('change', render);
for (const button of document.querySelectorAll('[data-query]')) {
  button.addEventListener('click', () => {query.value = button.dataset.query; lecture.value = ''; render();});
}
render();
if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
