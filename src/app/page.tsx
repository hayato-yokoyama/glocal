export default function Home() {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">どこに行く?</span>
      </label>
      <input
        type="text"
        placeholder="新宿駅"
        className="input-bordered input w-full"
      />
      <button className="btn">現在地からはこちら</button>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">ここからどのぐらい距離ある?</span>
        </label>
        <select className="select-bordered select">
          <option disabled selected>
            200m
          </option>
          <option>500m</option>
          <option>800m</option>
          <option>1km</option>
          <option>3km</option>
          <option>10km</option>
        </select>
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
      <button className="btn">この条件で探す</button>
    </div>
  );
}
