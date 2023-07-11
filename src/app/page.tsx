export default function Home() {
  return (
    <div className="form-control w-full gap-y-2">
      <label className="label">場所</label>
      <input
        type="text"
        placeholder="新宿駅"
        className="input-bordered input w-full"
      />
      <div className="flex items-center justify-end gap-x-2">
        <button className="btn">現在地からはこちら</button>
        <select className="select-bordered select w-52">
          <option>200m（徒歩2分）</option>
          <option>500m（徒歩6分）</option>
          <option>800m（徒歩10分）</option>
          <option>1km（自動車5分）</option>
          <option>3km（自動車8分）</option>
          <option>10km（自動車15分）</option>
        </select>
      </div>

      <div className="form-control w-full">
        <label className="label">キーワード</label>
        <input
          type="text"
          placeholder="オムライス"
          className="input-bordered input w-full"
        />
      </div>

      <fieldset>
        <legend>ジャンル</legend>
        <div>
          <label>
            <input type="checkbox" />
            レストラン
          </label>
        </div>

        <div>
          <label>
            <input type="checkbox" />
            観光地
          </label>
        </div>

        <div>
          <label>
            <input type="checkbox" />
            カフェ
          </label>
        </div>
      </fieldset>
      <div className="flex items-center justify-center gap-x-2">
        <input type="checkbox" className="checkbox" />
        <span>営業中のスポットのみを表示</span>
      </div>
      <button className="btn">この条件で探す</button>
    </div>
  );
}
