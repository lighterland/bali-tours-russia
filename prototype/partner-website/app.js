const variants = {
  A: { name: 'Trust-first editorial', render: () => `
    <div class="shell a">
      <header class="nav"><div class="brand">BALI · БЛИЖЕ</div><div class="nav-links"><span>Маршруты</span><span>Как это работает</span><span>О нас</span></div><a class="pill" href="#contact">Обсудить поездку</a></header>
      <section class="a-hero">
        <div><div class="eyebrow">Частные туры · понятная организация</div><h1>Бали без лишней неопределённости.</h1><p class="lead">Помогаем выбрать маршрут ещё до поездки, заранее объясняем стоимость и передаём подтверждённый заказ местной команде на Бали.</p><a class="cta" href="#contact">Получить пример расчёта</a><div class="trust-row"><div><b>Цена в USD</b><div class="small">RUB и IDR — в предложении</div></div><div><b>Один контакт</b><div class="small">до и во время тура</div></div><div><b>Два формата</b><div class="small">essential или practical</div></div></div></div>
        <div class="a-art" aria-label="Abstract Bali placeholder"></div>
      </section>
      <section class="section a-story"><div><div class="eyebrow">Почему нам доверять</div><h2>Люди по обе стороны маршрута.</h2></div><div><p class="lead">Русскоязычная коммуникация и оформление заявки — со стороны рынка России. Машина, водитель, гид и решение вопросов на месте — ответственность операционной команды Бали.</p><p>Здесь позже появятся реальные профили команды, разрешённые фотографии и подтверждённые отзывы.</p></div></section>
      <section class="section"><div class="eyebrow">Примеры · не финальные предложения</div><h2>Выберите уровень удобства.</h2><div class="a-packages"><article class="demo-card"><h3>Essential</h3><div class="price">от $70</div><p>Основной маршрут и транспорт. Дополнительные билеты указаны отдельно.</p></article><article class="demo-card"><h3>Practical</h3><div class="price">от $95</div><p>Больше включённых билетов и меньше расчётов на месте.</p></article><article class="demo-card"><h3>Private flexible</h3><div class="price">по запросу</div><p>Темп и маршрут для пары или небольшой группы.</p></article></div></section>
      <section id="contact" class="section"><h2>Сначала обсудим, потом подтвердим.</h2><p class="lead">Telegram · WhatsApp · VK · форма на сайте</p><a class="cta" href="#">Начать консультацию</a></section>
    </div>` },
  B: { name: 'Catalogue-first comparison', render: () => `
    <div class="shell b">
      <header class="nav"><div class="brand">BALI ROUTES</div><div class="nav-links"><span>Все туры</span><span>Essential</span><span>Practical</span><span>FAQ</span></div><a class="cta" href="#">Запросить даты</a></header>
      <section class="section"><div class="b-head"><div><div class="eyebrow">Каталог-концепт</div><h1>Сравните маршруты до переписки.</h1></div><p class="lead">Одинаковая структура карточек показывает цену, формат, длительность и всё, что оплачивается отдельно.</p></div><div class="filters"><span>1 день</span><span>Пара</span><span>С билетами</span><span>Природа</span><span>Культура</span></div>
      <div class="catalogue">${['Best of Ubud|$70|8–10 часов · Essential','Volcano & Springs|$85|10–12 часов · Essential','Bali Complete|$110|10 часов · Practical','Your Own Route|Quote|Для пары · Flexible'].map((x,i)=>{const [n,p,m]=x.split('|');return `<article class="tour"><div class="tour-art"></div><div><div class="small">ПРИМЕР ${i+1}</div><h3>${n}</h3><div class="price">${p}</div><p>${m}</p><a class="cta" href="#">Уточнить детали</a></div></article>`}).join('')}</div></section>
      <section class="section"><div class="eyebrow">Что означает формат</div><h2>Никаких сюрпризов в составе.</h2><table class="compare"><tr><th></th><th>Essential</th><th>Practical</th></tr><tr><td>Транспорт</td><td>Включён*</td><td>Включён*</td></tr><tr><td>Входные билеты</td><td>Часть отдельно*</td><td>Больше включено*</td></tr><tr><td>Изменение темпа</td><td>По согласованию</td><td>По согласованию</td></tr><tr><td>Цена</td><td>Доступнее</td><td>Больше определённости</td></tr></table><p class="small">*Все значения — placeholder до подтверждения партнёром.</p></section>
    </div>` },
  C: { name: 'Concierge-first journey', render: () => `
    <div class="shell c">
      <header class="nav"><div class="brand">ВАШ БАЛИ</div><div class="nav-links"><span>Как заказать</span><span>Маршруты</span><span>Поддержка</span></div><a class="pill" href="#">Написать</a></header>
      <section class="section c-hero"><div><div class="eyebrow">Не checkout. Живая консультация.</div><h1>Расскажите, каким вы хотите увидеть Бали.</h1><p class="lead">Мы уточним даты, темп и бюджет, подготовим расчёт в USD с эквивалентом в RUB или IDR, затем подтвердим местную команду.</p></div><div class="chat"><div class="small">ДЕМО ДИАЛОГА</div><div class="bubble them">Мы едем вдвоём и плохо переносим быструю езду.</div><div class="bubble us">Учтём спокойный темп. Вам важнее водопады и природа или храмы и культура?</div><div class="bubble them">Природа. И хотелось бы заранее понимать полную цену.</div><div class="bubble us">Подготовим два варианта: essential и practical, со всеми доплатами отдельной строкой.</div></div></section>
      <section class="section"><div class="steps"><div class="step"><b>01</b><h3>Запрос</h3><p>Дата, люди, отель, интересы.</p></div><div class="step"><b>02</b><h3>Предложение</h3><p>USD + расчёт RUB/IDR.</p></div><div class="step"><b>03</b><h3>Подтверждение</h3><p>Оплата и booking summary.</p></div><div class="step"><b>04</b><h3>Бали</h3><p>Handoff местной команде.</p></div></div></section>
      <section class="section c-offer"><div class="c-offer-grid"><div><div class="eyebrow">Один вход, несколько каналов</div><h2>Продолжим там, где вам удобно.</h2><div class="contact-options"><span>Telegram</span><span>WhatsApp</span><span>VK</span><span>Форма</span></div></div><div class="demo-card"><h3>Что мы спросим</h3><p>Дата · количество гостей · район отеля · желаемый маршрут · темп · особые потребности.</p><a class="cta" href="#">Начать запрос</a></div></div></section>
    </div>` }
};
const keys = Object.keys(variants);
const params = new URLSearchParams(location.search);
let current = variants[params.get('variant')] ? params.get('variant') : 'A';
function show(key){current=key;document.getElementById('app').innerHTML=variants[key].render();document.getElementById('variant-label').textContent=`${key} — ${variants[key].name}`;params.set('variant',key);history.replaceState(null,'',`${location.pathname}?${params}`)}
function cycle(delta){const i=keys.indexOf(current);show(keys[(i+delta+keys.length)%keys.length])}
document.getElementById('previous').addEventListener('click',()=>cycle(-1));
document.getElementById('next').addEventListener('click',()=>cycle(1));
document.addEventListener('keydown',e=>{if(['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)||document.activeElement?.isContentEditable)return;if(e.key==='ArrowLeft')cycle(-1);if(e.key==='ArrowRight')cycle(1)});
show(current);
