export default function Home() {
  return (
    <div className="flex flex-col gap-y-8">
      <fieldset>
        <legend>場所</legend>
        <input type="text" placeholder="新宿駅" className="border" />
        <div>
          <span>から</span>
          <select>
            <option>200m（徒歩2分）</option>
            <option>500m（徒歩6分）</option>
            <option>800m（徒歩10分）</option>
            <option>1km（自動車5分）</option>
            <option>3km（自動車8分）</option>
            <option>10km（自動車15分）</option>
          </select>
        </div>
        <button>現在地はこちらをクリック</button>
      </fieldset>
      <fieldset>
        <legend>キーワード</legend>
        <input type="text" className="border" />
      </fieldset>
      <fieldset>
        <legend>ジャンル</legend>
        <div>
          <label className="flex gap-2">
            <input type="checkbox" />
            レストラン
          </label>
        </div>

        <div>
          <label className="flex gap-2">
            <input type="checkbox" />
            観光地
          </label>
        </div>

        <div>
          <label className="flex gap-2">
            <input type="checkbox" />
            カフェ
          </label>
        </div>
      </fieldset>
      <label className="flex gap-2">
        <input type="checkbox" />
        営業中のスポットのみを表示
      </label>
      <button>この条件で探す</button>
    </div>
  );
}
