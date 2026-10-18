
const PEOPLE = [
  {
    name: '서윤', age: 29, job: '브랜드 디자이너', location: '서울 성동구',
    image: 'img/photo-1786954880252-0b47845b35cc.jpg', position: 'center 34%',
    intro: '좋은 대화가 오래 남는다고 믿어요. 주말에는 조용한 전시를 보거나 새로운 동네를 걷습니다.',
    values: ['주말에 한두 번 만나기', '매일 꾸준히 연락하기'],
    reason: '주말에 한두 번 만나고, 연락은 꾸준히 하는 걸 좋아해요.',
    verified: ['사진 확인 완료', '회사 이메일 인증'],
    stack: ['Figma', 'Brand', 'Coffee'],
  },
  {
    name: '민지', age: 31, job: '콘텐츠 에디터', location: '서울 마포구',
    image: 'img/photo-1772146345330-e35689b58b2d.jpg', position: 'center 26%',
    intro: '일과 삶의 속도를 잘 나누려고 해요. 잘 만든 문장과 늦은 오후의 산책을 좋아합니다.',
    values: ['주 1회 여유롭게 만나기', '하루 한 번 안부 나누기'],
    reason: '각자의 시간을 존중하고, 만날 때는 깊게 이야기하고 싶어 해요.',
    verified: ['사진 확인 완료'],
    stack: ['Books', 'Walk', 'Jazz'],
  },
  {
    name: '하린', age: 28, job: '서비스 기획자', location: '경기 성남시',
    image: 'img/photo-1762954419103-43708f0cf893.jpg', position: 'center 24%',
    intro: '호기심이 많고 새로운 것을 함께 배우는 관계를 좋아해요. 쉬는 날에는 가벼운 등산을 합니다.',
    values: ['주말에 함께 취미 즐기기', '편할 때 자주 연락하기'],
    reason: '새로운 경험을 함께하고 서로의 일에 관심을 갖는 관계를 원해요.',
    verified: ['사진 확인 완료', '회사 이메일 인증'],
    stack: ['Hiking', 'Product', 'Tea'],
  },
];
const ME_IMAGE = 'img/photo-1500648767791-00dcc994a43e.jpg';
const NAV = [
  { label: '추천', icon: 'home', screen: 'recommend' },
  { label: '좋아요', icon: 'heart', screen: 'empty' },
  { label: '대화', icon: 'message', screen: 'chat' },
  { label: '내 정보', icon: 'user', screen: 'empty' },
];
const SUGGESTIONS = ['안녕하세요!', '오늘 하루는 어떠셨어요?', '퇴근하셨나요?'];
const TYPING_TEXT = '오늘의 연결을 찾았어요.';

const ICONS = {
  'arrow-left': '<path d="m15 18-6-6 6-6"/>',
  'arrow-right': '<path d="m9 18 6-6-6-6"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>',
  home: '<path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9M9 20v-6h6v6"/>',
  message: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/>',
  more: '<circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"/>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  sliders: '<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
};

const state = {
  screen: 'recommend',
  navLabel: '추천',
  index: 0,
  liked: [],
  matchOpen: false,
  sheet: null,
  region: '서울',
  showGuide: false,
  typed: '',
  draft: '',
  messages: [],
  sending: false,
};

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const icon = (name, size = 20) =>
  `<svg aria-hidden="true" class="icon" fill="none" height="${size}" viewBox="0 0 24 24" width="${size}">${ICONS[name]}</svg>`;
const brand = () => '<div class="brand" aria-label="DevMeet"><span class="brand-mark">d_</span><span>devmeet</span></div>';
const iconButton = (label, name, act) => `<button class="icon-button" aria-label="${label}" data-act="${act}">${icon(name)}</button>`;
const badge = (text) => `<span class="verified-badge"><span class="verified-dot">${icon('check', 10)}</span>${text}</span>`;
const likeButton = (sent, label) =>
  `<button class="primary-button ${sent ? 'is-sent' : ''}" data-act="like" ${sent ? 'disabled' : ''}>${icon(sent ? 'check' : 'heart', 18)}${label}</button>`;
const isLiked = () => state.liked.includes(state.index);

function recommendScreen() {
  const o = PEOPLE[state.index];
  const sent = isLiked();
  return `
  <main class="screen recommendation-screen">
    <header class="topbar">${brand()}${iconButton('추천 조건 열기', 'sliders', 'sheet:filter')}</header>
    <section class="recommend-heading">
      <div>
        <p class="eyebrow typing-line" id="typing">${state.typed}</p>
        <h1>오늘의 추천</h1>
        <p class="subtitle">오늘은 세 사람을 소개할게요.</p>
      </div>
      <span class="counter">0${state.index + 1} <i></i> 03</span>
    </section>
    <article class="profile-card reveal" data-act="go:detail">
      <div class="photo-wrap">
        <img alt="${o.name}님의 데모 프로필" src="${o.image}" style="object-position:${o.position}">
        <button class="detail-link" data-act="go:detail">자세히 보기 ${icon('arrow-right', 14)}</button>
      </div>
      <div class="card-content">
        <div class="identity-row">
          <div><h2>${o.name}, ${o.age}</h2><p>${o.job} · ${o.location}</p></div>
          ${badge('확인 완료')}
        </div>
        <div class="match-reason"><span class="mono-label">// 함께 맞는 방식</span><p>${o.reason}</p></div>
        <p class="intro-clamp">${o.intro}</p>
      </div>
    </article>
    <div class="recommend-actions">
      <button class="secondary-button" data-act="next">다음 사람 ${icon('arrow-right', 17)}</button>
      ${likeButton(sent, sent ? '보냈어요' : 'LGTM · 좋아요')}
    </div>
    <p class="${state.showGuide ? 'like-balance guide' : 'like-balance'}">${state.showGuide ? '마음에 드는 프로필에 좋아요를 보내요.' : `오늘 남은 좋아요 ${sent ? 2 : 3}회`}</p>
  </main>`;
}

function detailScreen() {
  const i = PEOPLE[state.index];
  const sent = isLiked();
  return `
  <main class="screen detail-screen">
    <header class="detail-topbar">
      ${iconButton('추천으로 돌아가기', 'arrow-left', 'go:recommend')}
      <span class="mono-label">PROFILE / 0${state.index + 1}</span>
      <span class="header-spacer"></span>
    </header>
    <div class="detail-scroll">
      <img class="detail-photo" alt="${i.name}님의 데모 프로필" src="${i.image}" style="object-position:${i.position}">
      <section class="detail-identity">
        <p class="eyebrow">오늘의 추천</p>
        <h1>${i.name}, ${i.age}</h1>
        <p>${i.job} · ${i.location}</p>
        <div class="badge-row">${i.verified.map(badge).join('')}</div>
      </section>
      <section class="reason-panel"><span class="mono-label">WHY YOU TWO</span><p>${i.reason}</p></section>
      <section class="detail-section">
        <h2>관계를 생각하는 방식</h2>
        <div class="value-list">
          <div><span>관계 목적</span><strong>진지한 만남</strong></div>
          <div><span>만남 빈도</span><strong>${i.values[0]}</strong></div>
          <div><span>연락 빈도</span><strong>${i.values[1]}</strong></div>
        </div>
      </section>
      <section class="detail-section"><h2>저를 소개할게요</h2><p class="body-copy">${i.intro}</p></section>
      <section class="detail-section">
        <h2>조금 더 알아보기</h2>
        <div class="info-grid">
          <div><span>키</span><strong>165cm</strong></div>
          <div><span>음주</span><strong>가끔</strong></div>
          <div><span>흡연</span><strong>비흡연</strong></div>
          <div><span>종교</span><strong>무교</strong></div>
        </div>
        <div class="quiet-tags">${i.stack.map((e) => `<span>${e}</span>`).join('')}</div>
      </section>
    </div>
    <div class="sticky-action">${likeButton(sent, sent ? '보냈어요' : 'LGTM · 좋아요 보내기')}</div>
  </main>`;
}

function conversationHtml() {
  if (state.messages.length === 0) {
    return `
    <div class="empty-conversation">
      <span class="chat-open-mark">d_ →</span>
      <h1>가볍게 인사해 보세요.</h1>
      <p>준비된 문장을 누르면 입력창에 담겨요.<br>전송 전 편하게 다듬어 보세요.</p>
      <div class="suggestions">${SUGGESTIONS.map((s, i) => `<button type="button" data-act="suggest:${i}">${s}</button>`).join('')}</div>
    </div>`;
  }
  return `
    <div class="message-list">
      <div class="date-divider">오늘</div>
      ${state.messages.map((m) => `<div class="message-row"><span>${esc(m)}</span><time>방금</time></div>`).join('')}
    </div>`;
}

function sendButtonHtml() {
  const active = state.draft.trim();
  return `<button aria-label="메시지 전송" class="${active ? 'send-button active' : 'send-button'}" ${!active || state.sending ? 'disabled' : ''} type="submit" id="send-button">${state.sending ? '<span class="sending-dot"></span>' : icon('send', 19)}</button>`;
}

function chatScreen() {
  const r = PEOPLE[state.index];
  return `
  <main class="screen chat-screen">
    <header class="chat-header">
      ${iconButton('추천으로 돌아가기', 'arrow-left', 'chat-back')}
      <div class="chat-person">
        <img alt="" src="${r.image}" style="object-position:${r.position}">
        <div><strong>${r.name}</strong><span><i></i> 사진 확인 완료</span></div>
      </div>
      ${iconButton('대화 메뉴 열기', 'more', 'sheet:more')}
    </header>
    <div class="conversation" id="conversation">${conversationHtml()}</div>
    <form class="composer" id="composer">
      <input aria-label="메시지 입력" id="chat-input" placeholder="${r.name}님에게 메시지 보내기" value="${esc(state.draft)}">
      ${sendButtonHtml()}
    </form>
  </main>`;
}

function emptyScreen() {
  return `
  <main class="screen simple-screen">
    <header class="topbar">${brand()}</header>
    <div class="simple-empty">
      <span class="mono-label">// READY SOON</span>
      <h1>${state.navLabel}</h1>
      <p>아직 새로운 소식이 없어요.</p>
    </div>
  </main>`;
}

function bottomNav() {
  return `
  <nav class="bottom-nav" aria-label="주요 메뉴">
    ${NAV.map((n, i) => `<button class="${state.navLabel === n.label ? 'nav-item active' : 'nav-item'}" data-act="nav:${i}">${icon(n.icon, 19)}<span>${n.label}</span></button>`).join('')}
  </nav>`;
}

function matchDialog() {
  const r = PEOPLE[state.index];
  return `
  <div class="modal-layer" role="dialog" aria-modal="true">
    <div class="match-dialog">
      <span class="merged-label">MERGED.</span>
      <div class="match-portraits">
        <img alt="${r.name}님의 데모 프로필" src="${r.image}" style="object-position:${r.position}">
        <span class="connection-line"><i></i></span>
        <img alt="도윤님의 데모 프로필" src="${ME_IMAGE}">
      </div>
      <h2>서로의 마음이 닿았어요.</h2>
      <p class="match-copy">${r.name}님도 도윤님을 더 알아가고 싶어 해요.</p>
      <div class="shared-value"><span>함께 맞는 방식</span><p>꾸준히 연락하며 천천히 알아가기</p></div>
      <button class="match-cta" data-act="match-chat">첫 인사 보내기 ${icon('arrow-right', 18)}</button>
      <button class="text-button" data-act="match-continue">추천 계속 보기</button>
    </div>
  </div>`;
}

function regionChoices() {
  return ['서울', '경기'].map((e) => `<button class="${state.region === e ? 'selected' : ''}" data-act="region:${e}">${e}${state.region === e ? icon('check', 14) : ''}</button>`).join('');
}

function sheetHtml() {
  const filter = state.sheet === 'filter';
  const body = filter
    ? `
      <div class="filter-group"><label>지역</label><div class="choice-row" id="region-row">${regionChoices()}</div></div>
      <div class="filter-line"><span>최근 접속</span><strong>7일 이내</strong></div>
      <div class="filter-line"><span>거리</span><strong>50km 이내</strong></div>
      <div class="filter-line"><span>나이</span><strong>26–34세</strong></div>
      <div class="sheet-actions"><button class="reset-button">초기화</button><button class="apply-button" data-act="sheet-close">적용</button></div>`
    : `
      <div class="menu-list"><button>알림 끄기</button><button>신고하기</button><button class="danger">차단하기</button></div>`;
  return `
  <div class="sheet-layer" data-act="sheet-close">
    <section aria-modal="true" class="bottom-sheet" role="dialog" data-stop>
      <div class="sheet-handle"></div>
      <header>
        <div><span class="mono-label">${filter ? 'DISCOVERY SETTING' : 'CONVERSATION'}</span><h2>${filter ? '추천 조건' : '대화 설정'}</h2></div>
        ${iconButton('닫기', 'x', 'sheet-close')}
      </header>
      ${body}
    </section>
  </div>`;
}

const root = document.getElementById('root');
root.innerHTML = `
  <div class="app-canvas"><div class="phone-shell">
    <div id="screen-slot" style="display:contents"></div>
    <div id="nav-slot" style="display:contents"></div>
    <div id="modal-slot" style="display:contents"></div>
    <div id="sheet-slot" style="display:contents"></div>
  </div></div>`;
const slots = {
  screen: document.getElementById('screen-slot'),
  nav: document.getElementById('nav-slot'),
  modal: document.getElementById('modal-slot'),
  sheet: document.getElementById('sheet-slot'),
};

let typingTimer = null;
function startTyping() {
  clearInterval(typingTimer);
  let n = 0;
  state.typed = '';
  typingTimer = setInterval(() => {
    n += 1;
    state.typed = TYPING_TEXT.slice(0, n);
    const el = document.getElementById('typing');
    if (el) el.textContent = state.typed;
    if (n === TYPING_TEXT.length) clearInterval(typingTimer);
  }, 38);
}

function startLikeGuide() {
  let seen = true;
  try {
    seen = !!sessionStorage.getItem('devmeet-like-guide');
    if (!seen) sessionStorage.setItem('devmeet-like-guide', 'seen');
  } catch (e) {
    seen = false;
  }
  if (!seen && !state.guideShown) {
    state.showGuide = true;
    state.guideShown = true;
  }
}

const SCREENS = { recommend: recommendScreen, detail: detailScreen, chat: chatScreen, empty: emptyScreen };

// 화면 전체를 새로 그리는 건 화면이 바뀔 때만. 같은 화면 안에서는 바뀐 부분만 갈아 끼워 등장 애니메이션이 다시 돌지 않게 한다.
function renderScreen() {
  slots.screen.innerHTML = SCREENS[state.screen]();
  slots.nav.innerHTML = state.screen !== 'detail' && state.screen !== 'chat' ? bottomNav() : '';
}

function patchRecommend() {
  const sent = isLiked();
  const actions = slots.screen.querySelector('.recommend-actions .primary-button');
  if (actions) actions.outerHTML = likeButton(sent, sent ? '보냈어요' : 'LGTM · 좋아요');
  const balance = slots.screen.querySelector('.like-balance');
  if (balance) {
    balance.className = state.showGuide ? 'like-balance guide' : 'like-balance';
    balance.textContent = state.showGuide ? '마음에 드는 프로필에 좋아요를 보내요.' : `오늘 남은 좋아요 ${sent ? 2 : 3}회`;
  }
  const sticky = slots.screen.querySelector('.sticky-action');
  if (sticky) sticky.innerHTML = likeButton(sent, sent ? '보냈어요' : 'LGTM · 좋아요 보내기');
}

function patchRecommendProfile() {
  const card = slots.screen.querySelector('.profile-card');
  const fresh = document.createElement('div');
  fresh.innerHTML = recommendScreen();
  const freshCard = fresh.querySelector('.profile-card');
  card.innerHTML = freshCard.innerHTML;
  slots.screen.querySelector('.counter').outerHTML = fresh.querySelector('.counter').outerHTML;
  patchRecommend();
}

function go(screen, navLabel) {
  if (navLabel) state.navLabel = navLabel;
  state.screen = screen;
  if (screen === 'recommend') {
    startLikeGuide();
    startTyping();
  }
  renderScreen();
}

function like() {
  if (isLiked()) return;
  state.liked.push(state.index);
  state.showGuide = false;
  patchRecommend();
  setTimeout(() => {
    state.matchOpen = true;
    slots.modal.innerHTML = matchDialog();
  }, 460);
}

function closeMatch() {
  state.matchOpen = false;
  slots.modal.innerHTML = '';
}

function openSheet(type) {
  state.sheet = type;
  slots.sheet.innerHTML = sheetHtml();
}

function closeSheet() {
  state.sheet = null;
  slots.sheet.innerHTML = '';
}

function refreshComposer() {
  const btn = document.getElementById('send-button');
  if (btn) btn.outerHTML = sendButtonHtml();
}

root.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  if (el.dataset.act === 'sheet-close' && el.classList.contains('sheet-layer') && e.target.closest('[data-stop]')) return;
  e.stopPropagation();
  const [cmd, arg] = el.dataset.act.split(/:(.*)/s);
  switch (cmd) {
    case 'go': go(arg); break;
    case 'nav': { const n = NAV[Number(arg)]; go(n.screen, n.label); break; }
    case 'next':
      state.index = (state.index + 1) % PEOPLE.length;
      patchRecommendProfile();
      break;
    case 'like': like(); break;
    case 'match-chat': closeMatch(); go('chat', '대화'); break;
    case 'match-continue':
      closeMatch();
      state.index = (state.index + 1) % PEOPLE.length;
      if (state.screen === 'recommend') patchRecommendProfile();
      else go('recommend');
      break;
    case 'chat-back': go('recommend', '추천'); break;
    case 'sheet': openSheet(arg); break;
    case 'sheet-close': closeSheet(); break;
    case 'region':
      state.region = arg;
      document.getElementById('region-row').innerHTML = regionChoices();
      break;
    case 'suggest': {
      state.draft = SUGGESTIONS[Number(arg)];
      const input = document.getElementById('chat-input');
      input.value = state.draft;
      input.focus();
      refreshComposer();
      break;
    }
  }
});

root.addEventListener('input', (e) => {
  if (e.target.id !== 'chat-input') return;
  state.draft = e.target.value;
  refreshComposer();
});

root.addEventListener('submit', (e) => {
  if (e.target.id !== 'composer') return;
  e.preventDefault();
  const text = state.draft.trim();
  if (!text || state.sending) return;
  state.sending = true;
  refreshComposer();
  setTimeout(() => {
    state.messages.push(text);
    state.draft = '';
    state.sending = false;
    const input = document.getElementById('chat-input');
    if (input) input.value = '';
    const conv = document.getElementById('conversation');
    if (conv) conv.innerHTML = conversationHtml();
    refreshComposer();
  }, 420);
});

go('recommend', '추천');
