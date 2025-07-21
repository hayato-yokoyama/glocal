# CLAUDE.md

このファイルは、このリポジトリで Claude Code (claude.ai/code)が作業する際のガイダンスを提供します。

## 開発コマンド

- `npm run dev` - 開発サーバーを起動
- `npm run build` - 本番アプリケーションをビルド
- `npm run start` - 本番サーバーを起動
- `npm run lint` - ESLint を実行（.gitignore ファイルを無視）
- `npm run lint:fix` - 自動修正付きで ESLint を実行
- `npm run lint:html` - JSX/TSX ファイルで markuplint を実行
- `npm run format` - Prettier でコードをフォーマット

## プロジェクト アーキテクチャ

Glocal は Google Maps API を使用し、星評価ではなくレビュー数に基づいて場所を見つける Next.js App Router アプリケーションです。

### 主要構造

**App Router 構造:**

- `src/app/(top)/` - 検索フォーム付きホームページ
- `src/app/(default)/search/[place]/[distance]/` - 動的ルーティングによる検索結果ページ
- `src/app/api/` - Google Maps 統合用 API ルート

**コア機能:**

- 距離フィルタリング付き場所検索（200m から 10km の範囲）
- 駅名検出と自動変換（「駅」接尾辞を追加）
- 星評価ではなくレビュー数でソートされた結果
- レビュー数カテゴリー化（50+、100+、300+、500+、1000+、5000+、10000+）

**データフロー:**

1. ユーザーが`TopForm`コンポーネント経由で検索を送信
2. アプリが`/api/getStation/[address]`経由で場所名が駅と一致するかチェック
3. 駅が見つかった場合、場所名に「駅」を付加
4. `/api/geocode/[address]`経由で場所をジオコーディング
5. `/api/nearbySearch/[lat]/[lng]/[radius]`経由で近隣検索を実行
6. 結果は`user_ratings_total`で降順ソート

### 技術スタック

- **フレームワーク:** Next.js 14 with App Router
- **スタイリング:** カスタムプライマリカラー（#15AABF）付き Tailwind CSS
- **UI コンポーネント:** フォーム、ボタン、UI 要素用 Mantine v7
- **データフェッチング:** クライアントサイドデータフェッチング用 SWR
- **API:** Google Maps Services (@googlemaps/google-maps-services-js)
- **状態管理:** フォーム状態用 Mantine Form

### 重要なパターン

**検索パラメータ型:**

```typescript
type SearchParams = {
  distance: number;
  genre: string;
  isOpen: boolean;
  keyword: string;
  place: string;
};
```

**カスタムフック使用法:**

- `useSearchPlaces(searchParams, latLng)` - レビュー数でカテゴリー化された場所を返す
- `useLatLng(place)` - 場所名を座標に変換

**API ルート:**

- すべての API ルートは JSON レスポンスを返す
- Google Maps API 呼び出しはサーバーサイドのみ
- エラーハンドリングには API エラーと空の結果の両方を含む

### コード品質ツール

- **ESLint:** TypeScript 対応、Next.js 設定、未使用インポート削除、キーソート
- **Prettier:** Tailwind CSS プラグインとインポートソート付きコードフォーマット
- **Markuplint:** HTML/JSX 検証
- **Husky + lint-staged:** コード品質用プリコミットフック
- **TypeScript:** アプリケーション全体での厳密な型付け

### 環境要件

- `NEXT_PUBLIC_BASE_URL` - API 呼び出し用ベース URL
- Google Maps API キー（API ルートで設定）
- 開発用 Node.js 環境
