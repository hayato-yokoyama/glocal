import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // if (process.env.NODE_ENV === "development") {
  //   return NextResponse.json(MOCK_DATA);
  // }

  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const distance = searchParams.get("distance");
  const keyword = searchParams.get("keyword");
  const genre = searchParams.get("genre");
  const isOpen = searchParams.get("isOpen");
  const token = searchParams.get("token");

  if (lat === null || lng === null) {
    throw new Error("lat or lng is null");
  }
  if (distance === null) {
    throw new Error("distance is null");
  }

  const url = getNearBySearchUrl(
    process.env.GOOGLE_MAPS_API_KEY as string,
    lat,
    lng,
    distance,
    keyword,
    genre,
    isOpen,
    token
  );

  const response = await fetch(url);
  const data = await response.json();
  return NextResponse.json(data);
}

const getNearBySearchUrl = (
  key: string,
  lat: string,
  lng: string,
  distance: string,
  keyword: string | null,
  genre: string | null,
  isOpen: string | null,
  token: string | null
) => {
  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
  );
  // Required parameters
  url.searchParams.append("key", key);
  url.searchParams.append("location", `${lat},${lng}`);
  url.searchParams.append("radius", distance);

  // Optional parameters
  url.searchParams.append("language", "ja");

  if (token) {
    // pagetokenをパラメータに含めるときは、その他のパラメータを含めないようにする
    url.searchParams.append("pagetoken", token);
    return url;
  }
  if (keyword) {
    url.searchParams.append("keyword", keyword);
  }
  if (genre) {
    url.searchParams.append("type", genre);
  }
  if (isOpen) {
    url.searchParams.append("opennow", "true");
  }
  return url;
};

const MOCK_DATA = {
  html_attributions: [],
  results: [
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 35.6898742,
          lng: 139.6965706,
        },
        viewport: {
          northeast: {
            lat: 35.6912032802915,
            lng: 139.6978430302915,
          },
          southwest: {
            lat: 35.6885053197085,
            lng: 139.6951450697085,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
      icon_background_color: "#4B96F3",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/convenience_pinlet",
      name: "ナチュラルローソン 新宿駅西店",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 4032,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/116889022560112045541">T N</a>',
          ],
          photo_reference:
            "ATplDJYqfHsvROVLi5gAp7X57Ipxbnq4K6a68Fx_WyUdkf_VVy_DnkSd-SuJCzxVAOuWb739IJNM0lt1uDTrSbZOw7fN7R9zCy9sxjYEAFs-O5GqLNnu-Wure9mkjchGQlB0axRPEL8Kg8l1WdrTOiZdj1YQWvDMTo7zH_w1AEEzjfdobhRP",
          width: 3024,
        },
      ],
      place_id: "ChIJsVGNUNGMGGARje-B0m2yMLI",
      plus_code: {
        compound_code: "MMQW+WJ 日本、東京都新宿区",
        global_code: "8Q7XMMQW+WJ",
      },
      rating: 3.7,
      reference: "ChIJsVGNUNGMGGARje-B0m2yMLI",
      scope: "GOOGLE",
      types: [
        "convenience_store",
        "atm",
        "finance",
        "point_of_interest",
        "store",
        "food",
        "establishment",
      ],
      user_ratings_total: 47,
      vicinity: "新宿区西新宿１丁目１３−１２ 西新宿昭和ビル",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 35.69232579999999,
          lng: 139.6974558,
        },
        viewport: {
          northeast: {
            lat: 35.6934738302915,
            lng: 139.6986797802915,
          },
          southwest: {
            lat: 35.6907758697085,
            lng: 139.6959818197085,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "新宿エルタワーサンスカイルーム",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 6048,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/105409585828090368512">Takenori Suzuki</a>',
          ],
          photo_reference:
            "ATplDJZOwhOCn5oz5UVh9MlwcGCDkKVcRwN_U0uEHgaxmogEc9WgO2Nv4X1gEh0E1yF8oZXQvFYnwZLYwWZ50bjhnCmKMawhGHTr3UzoKFtlA3_iNKSdywrpMRU3NOl56EkRJxWQr475cZKcATj1NOiDp5t50Qd11acay6qkGx8ufJudIWSI",
          width: 8064,
        },
      ],
      place_id: "ChIJcdzi69aMGGARzobJWpNQQ7Y",
      plus_code: {
        compound_code: "MMRW+WX 日本、東京都新宿区",
        global_code: "8Q7XMMRW+WX",
      },
      rating: 3.5,
      reference: "ChIJcdzi69aMGGARzobJWpNQQ7Y",
      scope: "GOOGLE",
      types: ["point_of_interest", "store", "establishment"],
      user_ratings_total: 186,
      vicinity: "新宿区西新宿１丁目６−１ １階・３０階 新宿エルタワー",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 35.6933938,
          lng: 139.7037051,
        },
        viewport: {
          northeast: {
            lat: 35.6947583802915,
            lng: 139.7050024802915,
          },
          southwest: {
            lat: 35.6920604197085,
            lng: 139.7023045197085,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "鳥良商店 新宿区役所前店",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 460,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/101452188395699488940">鳥良商店 新宿区役所前店</a>',
          ],
          photo_reference:
            "ATplDJYj7LXUoI7my7rrfInuC3zrGrnIOmXSDs0i_rKUtAGC7X1yQLgN6EFMDoUu9rQ0HF4qZeVXlPv3kgIf_1EaEF3gRsf--6mk79_EesMJY4C4uwU2qCHGaY3dWDp_LC2PsRZDJG88veQLFvOvANBWooJYufxZ8eH9HTg-cYVt6kq4F0I",
          width: 819,
        },
      ],
      place_id: "ChIJ4WyHgdmMGGAR9GhJdXAJrQQ",
      plus_code: {
        compound_code: "MPV3+9F 日本、東京都新宿区",
        global_code: "8Q7XMPV3+9F",
      },
      price_level: 2,
      rating: 3.7,
      reference: "ChIJ4WyHgdmMGGAR9GhJdXAJrQQ",
      scope: "GOOGLE",
      types: [
        "meal_delivery",
        "meal_takeaway",
        "restaurant",
        "point_of_interest",
        "food",
        "establishment",
      ],
      user_ratings_total: 453,
      vicinity: "新宿区歌舞伎町１丁目２−２ 歌舞伎町ビル 1F エイチ･エフ",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 35.69433190000001,
          lng: 139.6986686,
        },
        viewport: {
          northeast: {
            lat: 35.6957043302915,
            lng: 139.7001113802915,
          },
          southwest: {
            lat: 35.6930063697085,
            lng: 139.6974134197085,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "CharmeR 新宿店",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 4032,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/107644533216024469827">みさみさ</a>',
          ],
          photo_reference:
            "ATplDJYN3WXDGQwmMQzp9OK_QBPulJ9Z4ruDAs5UlhQlZ43pwaxDdLELl2uugrwRDnAE4vlG7vDzTWhkOp4XdIzokEJLSe-VSDnlCmjEru3HJSqKSDfVULcgel0TDxAWoyEM_3XiM8UH39zqmzNGZU4tBQYeiFanIQ-lGOp5Un8YIXElXnTs",
          width: 1816,
        },
      ],
      place_id: "ChIJY-767dqMGGARUMZZY6RB4_I",
      plus_code: {
        compound_code: "MMVX+PF 日本、東京都新宿区",
        global_code: "8Q7XMMVX+PF",
      },
      rating: 3.3,
      reference: "ChIJY-767dqMGGARUMZZY6RB4_I",
      scope: "GOOGLE",
      types: ["hair_care", "point_of_interest", "establishment"],
      user_ratings_total: 27,
      vicinity: "新宿区西新宿７丁目１０−１９ 西新宿ビル 6階",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 35.69378010000001,
          lng: 139.7014005,
        },
        viewport: {
          northeast: {
            lat: 35.6951140802915,
            lng: 139.7027973802915,
          },
          southwest: {
            lat: 35.6924161197085,
            lng: 139.7000994197085,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "とらそば",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 3000,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/103062840803234992426">とらそば</a>',
          ],
          photo_reference:
            "ATplDJZqzc8uPztezYingR-oFZG5WNXuj028MmXkbEMDrR1vawXxRTY7WNgYXPi_f1VniNHRw1pe6bU0dvriNwS3cYHgZo7TXSKTdHyO6jc9DEauJmBholqCEZU4mjtYKQt6V90Sf5MfbMHnvK1VX3Xj9HEQx9V-Tg2wPgfP2bkF8N5RGJUv",
          width: 4000,
        },
      ],
      place_id: "ChIJm4Ru2NmMGGARswNke0WKrNw",
      plus_code: {
        compound_code: "MPV2+GH 日本、東京都新宿区",
        global_code: "8Q7XMPV2+GH",
      },
      rating: 3.5,
      reference: "ChIJm4Ru2NmMGGARswNke0WKrNw",
      scope: "GOOGLE",
      types: ["restaurant", "point_of_interest", "food", "establishment"],
      user_ratings_total: 635,
      vicinity: "新宿区歌舞伎町１丁目１７−１３ 新宿ピックペックビル1F",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 35.690348,
          lng: 139.695967,
        },
        viewport: {
          northeast: {
            lat: 35.6915268802915,
            lng: 139.6972886802915,
          },
          southwest: {
            lat: 35.6888289197085,
            lng: 139.6945907197085,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
      name: "喫茶室ルノアール 新宿西口エステックビル店",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 600,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/115700124132662740184">喫茶室ルノアール 新宿西口エステックビル店</a>',
          ],
          photo_reference:
            "ATplDJaajf_XFpGvN4vSIKrMeGki0YjMB1OwyL1U1bM9CTvKx6nId-77QDEeQ4NQSrzOw610-pdk4w4rGeuhfO0Xk_USAvZ_1GOHn-NFZkyNVxPg6V2SxqQKfWK4hCTCi5tWT5aQnM9WRw4bsv189bV_2GDc6-L3un3Dcx2Ut987tllItNlm",
          width: 800,
        },
      ],
      place_id: "ChIJEy93BNSMGGARwLzjSOzBwMc",
      plus_code: {
        compound_code: "MMRW+49 日本、東京都新宿区",
        global_code: "8Q7XMMRW+49",
      },
      price_level: 2,
      rating: 3.7,
      reference: "ChIJEy93BNSMGGARwLzjSOzBwMc",
      scope: "GOOGLE",
      types: ["cafe", "point_of_interest", "store", "food", "establishment"],
      user_ratings_total: 358,
      vicinity: "新宿区西新宿１丁目２４−１ エステック情報ビル B1F",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 35.6848803,
          lng: 139.7033888,
        },
        viewport: {
          northeast: {
            lat: 35.6862802302915,
            lng: 139.7049010802915,
          },
          southwest: {
            lat: 35.6835822697085,
            lng: 139.7022031197085,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/school-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/school_pinlet",
      name: "服部栄養専門学校",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 1077,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/103481354215850907351">服部栄養専門学校</a>',
          ],
          photo_reference:
            "ATplDJYN7HuXBWvHJrEORXb5byUS9d6TYJmihgKh0V9TQZlLx8bF2NNewKEgMj1_ajbKsmc8kGtxrZPlWiz5SSnaXeVM6zi-bN5Cgzv1wftR3TF6sOPwzwk2vJALcz4DbC0yg_kxmH-SP1p79uQ5eVAvImp2S0FN3YR8t-zmOOCJHbx-nuol",
          width: 1610,
        },
      ],
      place_id: "ChIJI_g1yMWMGGAR29Ix_6I27ek",
      plus_code: {
        compound_code: "MPM3+X9 日本、東京都渋谷区",
        global_code: "8Q7XMPM3+X9",
      },
      rating: 4.3,
      reference: "ChIJI_g1yMWMGGAR29Ix_6I27ek",
      scope: "GOOGLE",
      types: ["school", "point_of_interest", "establishment"],
      user_ratings_total: 49,
      vicinity: "渋谷区千駄ケ谷５丁目２５−４ 服部栄養専門学校",
    },
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 35.6932968,
          lng: 139.6982771,
        },
        viewport: {
          northeast: {
            lat: 35.6947633302915,
            lng: 139.6996486802915,
          },
          southwest: {
            lat: 35.6920653697085,
            lng: 139.6969507197085,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
      name: "星乃珈琲店 西新宿店",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 6144,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/115365209007991200015">ぴぴねこ</a>',
          ],
          photo_reference:
            "ATplDJbucjVADMmDm3ux1MsHdVSzJN8AH1Mb1Yf4tQzEJKkCr15dzP0699MLfG24TKHuq6Ss54X9SQ3ZVqMgTHpBp8meG0qrnP2hrHurFZxXfsZwAmuzhXTGbdLh2yiyQ_CzXDrS-1IgJNYXobZgVeJh2oRI3BMZ3RbyLMKMubzqA9oze3T9",
          width: 8192,
        },
      ],
      place_id: "ChIJEST7VtaMGGAR9SOwRVQtYeI",
      plus_code: {
        compound_code: "MMVX+88 日本、東京都新宿区",
        global_code: "8Q7XMMVX+88",
      },
      price_level: 2,
      rating: 3.8,
      reference: "ChIJEST7VtaMGGAR9SOwRVQtYeI",
      scope: "GOOGLE",
      types: ["cafe", "point_of_interest", "store", "food", "establishment"],
      user_ratings_total: 400,
      vicinity: "新宿区西新宿１丁目３−１４ １階",
    },
  ],
  status: "OK",
};
