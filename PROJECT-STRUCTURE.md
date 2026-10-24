# Харитаи проект

Page-ҳо дар `src/pages/` ҳастанд. Компонентҳои ҳар page дар папкаи ҳамном. URL-ҳо дар `src/App.tsx`; адресҳои сайт иваз нашудаанд.

## components/Home

- `src/components/Home/HomeActions.tsx`
- `src/components/Home/HomeFeatures.tsx`
- `src/components/Home/HomeFooter.tsx`
- `src/components/Home/HomeHeader.tsx`
- `src/components/Home/HomeHero.tsx`
- `src/components/Home/HomeStats.tsx`
- `src/components/Home/HomeSteps.tsx`

## components/Dashboard

- `src/components/Dashboard/BalanceSummary.tsx`
- `src/components/Dashboard/DebtChart.tsx`
- `src/components/Dashboard/DebtFormDialog.tsx` — Формаи қарзи Dashboard. Contact ID, direction, amount ва сана ба /api/debts мерава.
- `src/components/Dashboard/IncomingPayment.tsx` — Ряди сабзи амалиёти охирин: номи тамос, маблағи + ва сана.
- `src/components/Dashboard/OutgoingPayment.tsx` — Ряди сурхи амалиёти охирин: номи тамос, маблағи − ва сана.
- `src/components/Dashboard/PayableBalanceCard.tsx` — Карточкаи Ма қарздорам: i_owe_them аз summary.
- `src/components/Dashboard/QuickAddMenu.tsx` — Тугмаи + дар layout; hover кунӣ ду намуди қарз меброя, click форма мекушоя.
- `src/components/Dashboard/ReceivableBalanceCard.tsx` — Карточкаи Аз ма қарздоранд: they_owe_me аз summary.
- `src/components/Dashboard/RecentPayments.tsx`
- `src/components/Dashboard/TotalBalanceCard.tsx` — Карточкаи Ҳамагӣ: net_balance аз /api/dashboard/summary.

## components/Debts

- `src/components/Debts/DebtActions.tsx` — Менюи ряди қарз: detail, edit, пардохт, бастан ё delete.
- `src/components/Debts/DebtFilters.tsx` — Search, contact, folder ва sort-и ҷадвали қарзҳо; аз props идора мешава.
- `src/components/Debts/DebtsTable.tsx`
- `src/components/Debts/exportDebts.ts`
- `src/components/Debts/ExportMenu.tsx`
- `src/components/Debts/PayableDebtCard.tsx` — Карточкаи mobile-и қарзе ки ма қарздорам.
- `src/components/Debts/PayableDebtRow.tsx` — Ряди сурхи Debts: қарзе ки ма бояд пардохт кнм.
- `src/components/Debts/PaymentFormDialog.tsx` — POST /api/debts/:id/payments: amount ва note-и пардохти ҳамин қарз.
- `src/components/Debts/QuickPaymentMenu.tsx`
- `src/components/Debts/ReceivableDebtCard.tsx` — Карточкаи mobile-и қарзе ки аз ма қарздоранд.
- `src/components/Debts/ReceivableDebtRow.tsx` — Ряди сабзи Debts: қарзе ки ба ма бояд пардохт кнан.

## components/DebtDetails

- `src/components/DebtDetails/DebtDetailsContent.tsx`
- `src/components/DebtDetails/DebtOverview.tsx` — Карточкаи як қарз: маблағи умумӣ, пардохтшуда ва боқимонда.
- `src/components/DebtDetails/PaymentHistoryItem.tsx` — Як ряди таърихи қарз: маблағ, сана ва note-и пардохт.

## components/Archive

- `src/components/Archive/ArchiveActions.tsx` — Менюи қарзи архив: аз нав кушодан ё удалит кардан.
- `src/components/Archive/ArchiveContent.tsx`
- `src/components/Archive/ArchivedPayableCard.tsx` — Ҳамон қарзи ма қарздорро дар mobile-и Archive нишон мета.
- `src/components/Archive/ArchivedPayableRow.tsx` — Дар таблицаи Archive қарзеро нишон мета, ки ма қарздорам.
- `src/components/Archive/ArchivedReceivableCard.tsx` — Ҳамон қарзи аз ма қарздорро дар mobile-и Archive нишон мета.
- `src/components/Archive/ArchivedReceivableRow.tsx` — Дар таблицаи Archive қарзеро нишон мета, ки аз ма қарздоранд.

## components/Contacts

- `src/components/Contacts/ContactActions.tsx` — Менюи як тамос: edit ё delete-и ҳамон ID.
- `src/components/Contacts/ContactCard.tsx` — Карточкаи mobile-и Contacts: ном, телефон ва баланс.
- `src/components/Contacts/ContactFormDialog.tsx` — Формаи Тамосҳо: name, phone, email ва note ба /api/contacts мерава.
- `src/components/Contacts/ContactRow.tsx` — Як тамос дар таблицаи Contacts; пахши ном қарзҳои ҳамон contact-ро мекушоя.
- `src/components/Contacts/ContactsContent.tsx`

## components/Folders

- `src/components/Folders/FolderActions.tsx` — Менюи ҷузвдон: edit ё delete аз рӯи folder ID.
- `src/components/Folders/FolderCard.tsx` — Номи ҷузвдон ва баланси қарзҳои тамосҳои дохилашро нишон мета.
- `src/components/Folders/FolderFormDialog.tsx` — Формаи номи ҷузвдон; POST ё PATCH /api/folders.
- `src/components/Folders/FoldersContent.tsx`

## components/Profile

- `src/components/Profile/ProfileContent.tsx`
- `src/components/Profile/ThemeButtons.tsx` — Тугмаҳои Light, Dark ва Auto; mode дар theme store сабт мешава.

## components/Auth

- `src/components/Auth/LoginForm.tsx`
- `src/components/Auth/RegisterForm.tsx`

## components/Layout

- `src/components/Layout/BottomMenu.tsx` — Менюи поёни экран барои mobile.
- `src/components/Layout/Header.tsx` — Болои dashboard: menu, забон, notification ва profile.
- `src/components/Layout/NotificationsMenu.tsx` — Менюи огоҳиҳои header; ин блок endpoint-и backend надора.
- `src/components/Layout/ProfileMenu.tsx` — Менюи avatar: profile, theme ва logout.
- `src/components/Layout/Sidebar.tsx` — Менюи чап; NavLink page-и интихобшударо active мекна.

## components/Shared

- `src/components/Shared/ConfirmDeleteDialog.tsx` — Пеш аз delete тасдиқ мепурса; confirm шавад onConfirm-ро мехона.
- `src/components/Shared/ErrorBoundary.tsx` — Error-и route ё lazy import-ро мегира ва тугмаи reload нишон мета.
- `src/components/Shared/FormInput.tsx` — Input ва label-и умумӣ; value ва handler аз формаи parent меоянд.
- `src/components/Shared/LanguageMenu.tsx` — Забони интерфейсро тавассути i18next иваз мекна.
- `src/components/Shared/PageLoader.tsx`
- `src/components/Shared/PageLoading.tsx` — Нишонаи loading то page download шава.
- `src/components/Shared/PhotoInput.tsx` — Суратро интихоб карда preview нишон мета; upload ба server нест.

## Логика ва дизайн

- `src/store/` — Zustand ва API-и қарз, тамос, user ва theme.
- `src/token/token.ts` — Axios, token ва refresh.
- `src/styles/` — CSS; дизайн дар TSX омехта нест.
- `src/locales/` — текстҳои tg/ru/en.

`Dashboard/DebtFormDialog` дар дигар page ҳам import мешава. `Dashboard/BalanceSummary` ҳам дар Dashboard ва ҳам дар Debts аст. Барои як компонент нусхаи такрорӣ насохтем.
