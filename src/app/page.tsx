export default function Home() {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">場所</span>
      </label>
      <input
        type="text"
        placeholder="新宿駅"
        className="input-bordered input w-full"
      />
      <button className="btn">現在地からはこちら</button>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">から</span>
        </label>
        <select className="select-bordered select">
          <option>200m</option>
          <option>500m</option>
          <option>800m</option>
          <option>1km</option>
          <option>3km</option>
          <option>10km</option>
        </select>
        <label className="label">
          <span className="label-text-alt">圏内</span>
        </label>
      </div>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">キーワード</span>
        </label>
        <input
          type="text"
          placeholder="オムライス"
          className="input-bordered input w-full max-w-xs"
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
      <div className="form-control">
        <label className="label cursor-pointer">
          <input type="checkbox" className="checkbox" />
          <span className="label-text">営業中のスポットのみを表示</span>
        </label>
      </div>
      <button className="btn">この条件で探す</button>
    </div>
  );
}
