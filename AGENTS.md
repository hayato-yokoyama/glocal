# Repository Guidelines

本ドキュメントは glocal リポジトリで開発・レビューに参加するコントリビューター向けのガイドです。Next.js (App Router) + TypeScript + Tailwind CSS + Mantine を前提に、最小限で実用的なルールをまとめています。

## Feature Overview（機能概要）

- 検索フロー: 入力（地名/現在地）→ `useLatLng` で緯度経度取得 → `/api/nearbySearch/:lat/:lng/:radius` で周辺検索 → `user_ratings_total` 降順で並び替え → レビュー数帯でグルーピング表示。
- 駅名判定: `src/app/(default)/search/[place]/[distance]/page.tsx` で同名駅を検出し、該当時は `◯◯駅` に変換して検索。
- グルーピング表示: 10000/5000/1000/500/300/100/50 件以上＋ 50 件以下でセクション化（`SearchList`）。
- API ルート: Route Handlers（`src/app/api/**`）。例: `/api/nearbySearch/:lat/:lng/:radius?keyword&genre&isOpen`。開発時は `NODE_ENV === 'development'` でダミー応答。
- 役割分担: サーバ（Route Handlers）で外部 API 集約、クライアントは `SWR` で取得・キャッシュ。詳細は Server Component を `Suspense` で読込。
- 画像/分析: Place Photos は `/api/getPlaceImage` でプロキシ。GA は本番時のみ `<GoogleAnalytics gaId={NEXT_PUBLIC_GA_ID}>` を挿入。

## Project Structure & Module Organization

- ソース: `src/`
  - ページ/ルート: `src/app/**`（`api/` は Route Handlers）
  - UI: `src/components/**`（コンポーネントごとにディレクトリを分割）
  - フック: `src/hooks/**`
  - 型定義: `src/types/**`
- 静的アセット: `public/`
- 設定: `next.config.js`, `tailwind.config.js`, `tsconfig.json`
- 環境変数: `.env.local`（未コミット）

## Build, Test, and Development Commands

- 開発サーバ: `npm run dev`（`http://localhost:3000`）
- ビルド: `npm run build`（本番用）
- 本番起動: `npm run start`（`build` 済み必須）
- Lint: `npm run lint`（ESLint + Next）
- 自動修正: `npm run lint:fix`
- HTML 構文チェック: `npm run lint:html`（markuplint）
- フォーマット: `npm run format`（Prettier）

## Coding Style & Naming Conventions

- 言語: TypeScript（厳格な型を推奨）
- フォーマット: Prettier（2 スペース、セミコロン有、Tailwind 並び替え）
- Lint: ESLint（`eslint-config-next`、unused-imports 他）
- 命名: コンポーネントは `PascalCase`、フックは `useXxx`。ファイルは `TopForm.tsx` のように機能単位で分割。
- CSS: Tailwind を優先し、複雑になったらコンポーネント分割。

## Testing Guidelines

- 現時点で公式な自動テストは未導入です。UI/機能追加時は再現手順・確認観点を PR に明記してください。
- 将来的な方針（提案）: 単体（Jest/Vitest）、E2E（Playwright）。API は `next/server` のモックまたは Playwright のネットワークモックで検証を想定。

## Commit & Pull Request Guidelines

- コミット: 目的が一目で分かる短文。必要に応じて絵文字を先頭に使用（例: `✨ 機能追加: ...`, `🐛 修正: ...`, `📝 ドキュメント: ...`）。
- ブランチ: `feature/<topic>`、`fix/<topic>`、課題連携は `feature/123-<topic>` など。
- PR 必須項目:
  - 概要・背景・変更点（スクリーンショット/動画歓迎）
  - 影響範囲と確認手順
  - 関連 Issue/チケットのリンク（`#<番号>`）

## Security & Configuration Tips

- 環境変数: `GOOGLE_MAPS_API_KEY`, `NEXT_PUBLIC_BASE_URL`, `NEXT_PUBLIC_GA_ID` を `.env.local` に設定。公開リポジトリへコミットしないこと。
- 外部 API 呼び出しはサーバ側 Route Handlers（`src/app/api/**`）を優先し、クライアントには公開不要な値を渡さない。

## Future Extensions（拡張の指針）

- 距離レンジ追加: `TopForm` の `Select` に選択肢を追加し、UI ラベルと数値（m）を同期。必要に応じて `generateMetadata` の表示文言も更新。
- ジャンル拡張: `TopForm` の `Chip` 候補に Google Places の `type` を追加。`useSearchPlaces` が自動でクエリに反映。
- エラーハンドリング: 位置情報取得失敗、ZERO_RESULTS、API エラー時は `SearchError`/`SearchNotFound` を踏襲。新規 API でも同パターンを再利用。

不明点や提案は Issue/PR で気軽に相談してください。短いサイクルで安全に改善していきましょう。
