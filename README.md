# React Practice — Мансур

Як папка, як репозиторий, барои ҳар машқ branch-и алоҳида.

## Branch-ҳо

- `main` — стартовый шаблони холӣ бо настройка ва библиотекаҳо.
- `practice/day-1`, `practice/day-2` — практикаҳо.
- `archive/before-setup` — коди аввал ва суратҳои пеш аз настройка.

Дар `main` практика нанавис. Машқи навро аз `main` сар кун.

## Стек

React + TypeScript + Vite + Tailwind CSS + Zustand + `react-router`.
`react-router-dom` насб нашудааст. Версияҳои дақиқ дар `package-lock.json` ҳастанд.

Tailwind ба `vite.config.ts` бо `@tailwindcss/vite` пайваст аст.
Дар `src/index.css`: `@import "tailwindcss";`.
Дар `src/main.tsx`: `BrowserRouter` аз `react-router`.
Zustand насб аст; store-ро дар ҳар машқ худат менависӣ.

## Машқи нав — як команда

Аз папкаи проект:

```bash
npm run practice:new -- day-2
npm run dev
```

Командаи `practice:new`:

1. GitHub ва номи branch-ро месанҷад.
2. Агар дар `practice/*` бошӣ, тағйиротро commit мекунад ва push мекунад.
3. Танҳо баъди push-и муваффақ branch-и навро аз `origin/main` месозад.
4. Branch-и навро ҳам ба GitHub push мекунад.

Коди машқи гузашта дар branch-и худаш мемонад.
Дар branch-и нав настройка ва библиотекаҳо ҳастанд; `App.tsx` холӣ render мекунад.
`Button.tsx` холӣ аст. Папкаҳои assets, pages, layout, data ва store `.gitkeep` доранд.
`.gitkeep` танҳо папкаи холиро дар Git нигоҳ медорад.

Номи нав бояд такрорӣ набошад. Масалан: `day-3`, `zustand-crud`, `router-practice`.
Номи `practice/day-3` ҳам қабул мешавад.

Агар fetch, commit ё push ошибка диҳад, script меистад.
Git history-ро reset намекунад ва branch-и кӯҳнаро удалит намекунад.
Агар сохтани branch муваффақ шавад, вале push-и branch-и нав нашавад,
он branch локалӣ мемонад: баъди барқарор шудани интернет `npm run practice:save` зан.

## Нигоҳ доштан ва push кардани машқи ҳозира

```bash
npm run practice:save
```

Ин команда ҳамаи тағйироти барои Git иҷозатдодашударо commit ва push мекунад.
Файлҳои `.gitignore`, мисли `node_modules`, `dist` ва `.env`, push намешаванд.
Commit-и локалӣ то push-и муваффақ дар GitHub нест.

## Кушодани машқи пештара

```bash
npm run practice:open -- day-1
npm run dev
```

Машқи ҳозира аввал save ва push мешавад; баъд машқи интихобшуда кушода мешавад.
Script тағйироти GitHub-ро бо `pull --ff-only` мегирад.
Агар history-ҳо ҷудо шуда бошанд, script меистад; merge-и худкор намекунад.

## Git-и одӣ

`git switch -c practice/day-3` аз branch-и ҳозира копия месозад.
Барои стартовый холӣ командаи script-ро истифода бар.
Ё баъди commit ва push-и машқи ҳозира:

```bash
git fetch origin
git switch -c practice/day-3 origin/main
git push -u origin practice/day-3
```

## Муҳим барои папкаҳо ва библиотекаҳо

Branch-и нав файлҳо ва папкаҳои дар `main` сабтшударо мегирад.
Файле, ки танҳо дар машқи кӯҳна сохтӣ, дар `main` худкор пайдо намешавад.
Барои файли доимии нав онро дар `main` илова ва commit/push кун.
Настройка ё библиотекаи доимиро ҳам дар `main` илова кун, то машқҳои оянда гиранд.

`node_modules` дар ҳамин папка мемонад, дар Git нигоҳ дошта намешавад.
Агар байни branch-ҳои бо dependencies-и гуногун гузарӣ, `npm install` зан.
Ҳангоми гузаштан ба `archive/before-setup` script-ҳои practice вуҷуд надоранд;
баргаштан: `git switch practice/day-1`, баъд `npm install`.

## Проверка

```bash
npm run lint
npm run build
```

Саҳифаи стартовый холӣ аст: `App.tsx` ҳоло `return null` дорад.
Коди практикаатро аз ҳамин файл ё компонентҳо сар кун.

Промт ва план: [SETUP.md](./SETUP.md).
