import { Client, Language, PlaceData } from "@googlemaps/google-maps-services-js";
import { NextResponse } from "next/server";

const client = new Client({});

export async function GET(request: Request, { params }: { params: { lat: string; lng: string; radius: string } }) {
  if (process.env.NODE_ENV === "development") {
    return NextResponse.json(DUMMY_RESPONSE);
  }

  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword");
  const genre = searchParams.get("genre");
  const isOpen = searchParams.get("isOpen");

  let nextPageToken = undefined;
  let results: Partial<PlaceData>[] = [];

  // 最大3ページまで取得する
  for (let i = 0; i < 3; i++) {
    const response = await client.placesNearby({
      params: {
        key: process.env.GOOGLE_MAPS_API_KEY || "",
        keyword: keyword || undefined,
        language: Language.ja,
        location: [Number(params.lat), Number(params.lng)],
        opennow: isOpen === "true",
        pagetoken: nextPageToken,
        radius: Number(params.radius),
        type: genre || undefined,
      },
    });

    results = results.concat(response.data.results);

    // 次のページのトークンがあれば取得し、なければループを抜ける
    if (response.data.next_page_token) {
      nextPageToken = response.data.next_page_token;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } else {
      break;
    }
  }
  return NextResponse.json(results);
}

const DUMMY_RESPONSE = [
  {
    geometry: {
      location: {
        lat: 35.6803997,
        lng: 139.7690174,
      },
      viewport: {
        northeast: {
          lat: 35.81744534519053,
          lng: 139.918874338966,
        },
        southwest: {
          lat: 35.51904202902757,
          lng: 139.5628610838164,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png",
    icon_background_color: "#7B9EB0",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    name: "東京",
    photos: [
      {
        height: 1799,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/110543873949960736982">saleem zaid</a>'],
        photo_reference:
          "ATplDJarL1i7PL_ysZm5Cr2jtB6yaTb8lK2OXn1Ow8k3W9ntBHt3R7033BJ1if50-aS1pd2FSi1iOaQ7NMK5tPrZjO4yktlv4ljiEHhg9qhwoLvToUey3XjnufJSXtAlNPCf31MqMP8pSdjP_xJQBHBBTxIBJad18raEZyWbaV7Cu_qx46TA",
        width: 1080,
      },
    ],
    place_id: "ChIJXSModoWLGGARILWiCfeu2M0",
    reference: "ChIJXSModoWLGGARILWiCfeu2M0",
    scope: "GOOGLE",
    types: ["colloquial_area", "locality", "political"],
    vicinity: "東京",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585696,
        lng: 139.745484,
      },
      viewport: {
        northeast: {
          lat: 35.65981428029151,
          lng: 139.74699385,
        },
        southwest: {
          lat: 35.65711631970851,
          lng: 139.74369445,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    icon_background_color: "#FF9E67",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    name: "ピザーラエクスプレス 東京タワー店",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 3024,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/102783633938344263807">Shiahin Wei</a>'],
        photo_reference:
          "ATplDJZHawLfb7aCwD1smxf9ljO1g9bfQgrYJXYldN7Tq75P3VEPgaHyKyNuKZLyKYuSZsroc62VNjLS_bJk0apmwbqcIt7iHhBz30sgTKI2TGjUYJljR4t6wpG6a_WUG4TpJ2jb51vTpAXMO9jcX4Kas4zd-3AZisWFb2KkoiaIZkY-SpgN",
        width: 4032,
      },
    ],
    place_id: "ChIJCewJkL2LGGAR9OKufixRAYA",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    price_level: 2,
    rating: 3.5,
    reference: "ChIJCewJkL2LGGAR9OKufixRAYA",
    scope: "GOOGLE",
    types: ["meal_takeaway", "restaurant", "point_of_interest", "food", "establishment"],
    user_ratings_total: 42,
    vicinity: "港区芝公園４丁目２−８ 東京タワー 2F フードコート",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585805,
        lng: 139.7454329,
      },
      viewport: {
        northeast: {
          lat: 35.6603155302915,
          lng: 139.7469706802915,
        },
        southwest: {
          lat: 35.6576175697085,
          lng: 139.7442727197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    icon_background_color: "#7B9EB0",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    name: "東京タワー",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 4000,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/107121608071013822705">chie Minoz</a>'],
        photo_reference:
          "ATplDJbO4u1KUFiJrWDpR-K5b8qq82NvG4XttssJqe3QTXUGOHzOAot7t4GuztdErLTsFjpg0MVqPcKJP8yrYk8tQMvwwv9DDFJdTlsEVkcEiBm_hW_QWs0z3EPzvMDZ9vRGDEV3F7WGnxHOr_wB_2b-W7wfaYwSJOK9nTYPkl0eEn1c1kHq",
        width: 1868,
      },
    ],
    place_id: "ChIJCewJkL2LGGAR3Qmk0vCTGkg",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    rating: 4.5,
    reference: "ChIJCewJkL2LGGAR3Qmk0vCTGkg",
    scope: "GOOGLE",
    types: ["art_gallery", "shopping_mall", "landmark", "tourist_attraction", "point_of_interest", "establishment"],
    user_ratings_total: 72375,
    vicinity: "港区芝公園４丁目２−８",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585744,
        lng: 139.7451017,
      },
      viewport: {
        northeast: {
          lat: 35.66001363029149,
          lng: 139.7465822302915,
        },
        southwest: {
          lat: 35.6573156697085,
          lng: 139.7438842697085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    icon_background_color: "#FF9E67",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    name: "宇明家 東京タワー店",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 1107,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/108383024942011566673">宇明家 東京タワー店</a>',
        ],
        photo_reference:
          "ATplDJaG0nObKJD4QHKQ9YAoM2Ippy6eAIdpYwOopWH0K5yT7pdyy5DtCDRbgi9jGyTpBvRdiyReVE9wOw7McKp5SGHpbr1uqX1zaUKtjpe5FC8fdvRzjammWSjTZC7EUdCnKEYVLOM0MxoVvUKDaIQo3aylPD8MktQoDtcg7l5qh25-Lx2i",
        width: 1479,
      },
    ],
    place_id: "ChIJCewJkL2LGGARfFaSSzUJeCY",
    plus_code: {
      compound_code: "MP5W+C2 日本、東京都港区",
      global_code: "8Q7XMP5W+C2",
    },
    rating: 2.8,
    reference: "ChIJCewJkL2LGGARfFaSSzUJeCY",
    scope: "GOOGLE",
    types: ["restaurant", "point_of_interest", "food", "establishment"],
    user_ratings_total: 90,
    vicinity: "港区芝公園４丁目２−８ 東京タワー 2F",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6587587,
        lng: 139.745759,
      },
      viewport: {
        northeast: {
          lat: 35.66015813029149,
          lng: 139.7471347302915,
        },
        southwest: {
          lat: 35.6574601697085,
          lng: 139.7444367697085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
    icon_background_color: "#FF9E67",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
    name: 'TOKYO TOWER "CHO-TEN"HIGHBALL GARDEN',
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 1816,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/114269019201287642689">峰本陽平</a>'],
        photo_reference:
          "ATplDJYkQOzOnFc5pUBfaK0HNj1M2zZb4CJNzn9irtmc174wiFTq8cfqIx0UA886-es97bPH5uNQQz48ANg5NKdXENRej17YUvAeUASc5zwf8u2Bp3M2AlSXJ3dvCmHfKAKqye0ynpMOiyx0tYA3EhSOutUoF30A7wEfe8NELBBYBsmCSrvE",
        width: 4032,
      },
    ],
    place_id: "ChIJCewJkL2LGGAR4lfmRtj35B8",
    plus_code: {
      compound_code: "MP5W+G8 日本、東京都港区",
      global_code: "8Q7XMP5W+G8",
    },
    price_level: 2,
    rating: 4,
    reference: "ChIJCewJkL2LGGAR4lfmRtj35B8",
    scope: "GOOGLE",
    types: ["bar", "restaurant", "point_of_interest", "food", "establishment"],
    user_ratings_total: 137,
    vicinity: "港区芝公園４丁目２−８ 東京タワー 正面玄関前",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6586442,
        lng: 139.7454467,
      },
      viewport: {
        northeast: {
          lat: 35.6598741302915,
          lng: 139.7465926802915,
        },
        southwest: {
          lat: 35.6571761697085,
          lng: 139.7438947197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    icon_background_color: "#FF9E67",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    name: "サーティワンアイスクリーム 東京タワー店",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 3072,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/115983758253416652147">Xin</a>'],
        photo_reference:
          "ATplDJbai2cjIsZixwMCz8m2MTKamIA2LM07qg1VlyUBLSSMbk8-Gdjg80YWP-0vQPw9cbyFa7a5TWaYtVhWCLc_qLJujCpBQ3iZdNvw-4I0ceHsBVXP7e1WCuxUsqE8XpCsnZi0MKvKg7supY0WVpOVuKqDj__bsGkzHvwU5W6WS05d3EAs",
        width: 4096,
      },
    ],
    place_id: "ChIJi9J_kL2LGGAR0vQFIoNazJU",
    plus_code: {
      compound_code: "MP5W+F5 日本、東京都港区",
      global_code: "8Q7XMP5W+F5",
    },
    price_level: 2,
    rating: 3.9,
    reference: "ChIJi9J_kL2LGGAR0vQFIoNazJU",
    scope: "GOOGLE",
    types: ["bakery", "restaurant", "point_of_interest", "store", "food", "establishment"],
    user_ratings_total: 76,
    vicinity: "港区芝公園４丁目２−８ 東京タワービル２Ｆ",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6587202,
        lng: 139.7454162,
      },
      viewport: {
        northeast: {
          lat: 35.6602070802915,
          lng: 139.7468761302915,
        },
        southwest: {
          lat: 35.6575091197085,
          lng: 139.7441781697085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
    icon_background_color: "#FF9E67",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
    name: "マザー牧場CAFE 東京タワー店",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 394,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/110730392660155924845">マザー牧場CAFE 東京タワー店</a>',
        ],
        photo_reference:
          "ATplDJZT1zeN3Oz38bgcCSjQOGVn_eP4J45U8u4ln1aYzt0w-1BmJSCGM2jO9nFpj8WI8aYAvjLGfgzbNvfDbA_8ScCZw2noI5IdiJWuNKEWo87HWYtzupc8o8TFB05ZnYCZE6nVOhxTxNvhrSN4EHGDTvRs0-UJw-REAHbz_WuweGGDKYVR",
        width: 525,
      },
    ],
    place_id: "ChIJCewJkL2LGGAR32R2GQkq2Tc",
    plus_code: {
      compound_code: "MP5W+F5 日本、東京都港区",
      global_code: "8Q7XMP5W+F5",
    },
    price_level: 2,
    rating: 3.4,
    reference: "ChIJCewJkL2LGGAR32R2GQkq2Tc",
    scope: "GOOGLE",
    types: ["cafe", "point_of_interest", "food", "establishment"],
    user_ratings_total: 62,
    vicinity: "港区芝公園４丁目２−８ 東京タワーフットタウン 3F",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585696,
        lng: 139.745484,
      },
      viewport: {
        northeast: {
          lat: 35.6601099302915,
          lng: 139.7469694802915,
        },
        southwest: {
          lat: 35.65741196970851,
          lng: 139.7442715197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "ピンクドット 東京タワー店",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 2000,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/107600239798658909183">ピンクドット 東京タワー店</a>',
        ],
        photo_reference:
          "ATplDJY72EeNWLNsVswaY4-Kia0JmX1Fo0pFo_Qdntot2j6WTRjUgqXy69_Ug98Y2gbu9FBDXvrlsuQ5jnSK6HLgCQQkRIAym61piqL_XI6wzSmxycIFcdI_CUcmwqfKw4LMhhp7EBD3W7_jUmXgr2p-8DXJiWLbMrwSXEUGjcDNLSrL3XGZ",
        width: 4000,
      },
    ],
    place_id: "ChIJCewJkL2LGGARbEj-YR1BOQw",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    rating: 3.5,
    reference: "ChIJCewJkL2LGGARbEj-YR1BOQw",
    scope: "GOOGLE",
    types: ["point_of_interest", "store", "food", "establishment"],
    user_ratings_total: 14,
    vicinity: "港区芝公園４丁目２−８ 東京タワー 2F",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.658432,
        lng: 139.7453142,
      },
      viewport: {
        northeast: {
          lat: 35.6600518802915,
          lng: 139.7468843302915,
        },
        southwest: {
          lat: 35.65735391970851,
          lng: 139.7441863697085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/school-71.png",
    icon_background_color: "#7B9EB0",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/school_pinlet",
    name: "RED Bambini Montessori International School",
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 4500,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/101279560781434165667">RED Bambini Montessori International School</a>',
        ],
        photo_reference:
          "ATplDJZL962JQLNBmx8Zr6QNKPtQnTKSLQJBOtV8TOZuJ-XQsVaTUc76fMHEmjIO-7Mo7YkckV4xYejLzyYS_3JkQ1GI8zSqTGBUBaV3pLv3sPqgCR0ue4p7oY1ODm3t2MKci49jR_OaBtdyR22EMOEn3p6ZxTM0eRb83mQGZXcHx2Irx4TW",
        width: 3000,
      },
    ],
    place_id: "ChIJxwZDX6aLGGARL_wVbYFcC-0",
    plus_code: {
      compound_code: "MP5W+94 日本、東京都港区",
      global_code: "8Q7XMP5W+94",
    },
    rating: 4.8,
    reference: "ChIJxwZDX6aLGGARL_wVbYFcC-0",
    scope: "GOOGLE",
    types: ["point_of_interest", "school", "establishment"],
    user_ratings_total: 18,
    vicinity: "港区芝公園４丁目２−８ 東京タワー 1階",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585696,
        lng: 139.745484,
      },
      viewport: {
        northeast: {
          lat: 35.6603084802915,
          lng: 139.7465894802915,
        },
        southwest: {
          lat: 35.6576105197085,
          lng: 139.7438915197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    icon_background_color: "#FF9E67",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    name: "モスバーガー東京タワー店",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 2752,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/110144014193510094862">Kazuaki E.</a>'],
        photo_reference:
          "ATplDJbeFS6JLZtZpDIGpPQ7Av_D8y1r44npctwRemEv-c19OmhW7cU2b_CfK9u_tU4qDzuvOzdMEAuqReXjjdk8e59839lraHzSrZlqE9KZxnezd1_X0P9fgE-WHQkWi3954mrOqgxAXXd7Tpeaui62aN8xIqChdykDoH6drnUiuGUrRYOH",
        width: 4896,
      },
    ],
    place_id: "ChIJ04qRkL2LGGARkKlkUQj-8mU",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    price_level: 2,
    rating: 3.6,
    reference: "ChIJ04qRkL2LGGARkKlkUQj-8mU",
    scope: "GOOGLE",
    types: ["restaurant", "point_of_interest", "food", "establishment"],
    user_ratings_total: 176,
    vicinity: "港区芝公園４丁目２−８",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585887,
        lng: 139.7455539,
      },
      viewport: {
        northeast: {
          lat: 35.66009923029149,
          lng: 139.7470301802915,
        },
        southwest: {
          lat: 35.6574012697085,
          lng: 139.7443322197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "GOODS SHOP",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 2322,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/114811866828575363879">Fran P</a>'],
        photo_reference:
          "ATplDJayxN4Y_I3Q3JltU6Jz_jr-BxoZTobZT6dlj36n7SAT5ApXeKogCMRHqByjSPyvAPSnGWA4sAwtvplsq7OtbpAsppId_d4jhr_-Z7v4R8iV_Yu-XqmdJSKrVl2_5iW3syvdN2uyDsgqIzvh7x20bE4vFCOi1ncYGgdExsVo7wQAUzV5",
        width: 4128,
      },
    ],
    place_id: "ChIJKSjekL2LGGARFh8TTPYK8rI",
    plus_code: {
      compound_code: "MP5W+C6 日本、東京都港区",
      global_code: "8Q7XMP5W+C6",
    },
    rating: 4,
    reference: "ChIJKSjekL2LGGARFh8TTPYK8rI",
    scope: "GOOGLE",
    types: ["point_of_interest", "store", "establishment"],
    user_ratings_total: 8,
    vicinity: "港区２",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6584979,
        lng: 139.7452264,
      },
      viewport: {
        northeast: {
          lat: 35.6601112802915,
          lng: 139.7467914802915,
        },
        southwest: {
          lat: 35.6574133197085,
          lng: 139.7440935197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    icon_background_color: "#FF9E67",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    name: "丹波屋 東京タワー店",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 1512,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/102813572043245867423">丹波屋 東京タワー店</a>',
        ],
        photo_reference:
          "ATplDJZqexlEcRUMdxuH05W5bZZ7Cb07PZOdDS6FxaD55a42vbhRfJ9FEUvMHGPx-JUE_7XBvLFPuPdY7RhAnFykKfmbFIKRBStoD7_mqzuUEaaETBb8GDhThBca0PyokdYVeSnPHtPL88T8Mr3lViUKWgc9Ci79C73zA7fJZ3zuSdotTFla",
        width: 2016,
      },
    ],
    place_id: "ChIJr14phb2LGGARxPWjGb_4CBc",
    plus_code: {
      compound_code: "MP5W+93 日本、東京都港区",
      global_code: "8Q7XMP5W+93",
    },
    rating: 3.2,
    reference: "ChIJr14phb2LGGARxPWjGb_4CBc",
    scope: "GOOGLE",
    types: ["restaurant", "point_of_interest", "food", "establishment"],
    user_ratings_total: 46,
    vicinity: "港区芝公園４丁目２−８",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6584996,
        lng: 139.7457597,
      },
      viewport: {
        northeast: {
          lat: 35.6600212802915,
          lng: 139.7471994802915,
        },
        southwest: {
          lat: 35.6573233197085,
          lng: 139.7445015197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    icon_background_color: "#7B9EB0",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    name: "日本宝石特許鑑定協会",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 4032,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/114553111105953258551">Toshihito Kondo</a>'],
        photo_reference:
          "ATplDJY40bfgTSAy6HjZwb33iPCLqnbH1KQQ6BeVPLYPzWDAOX4___ffOy48jn9OFTWxu3VI1h-j6nhDBVeN8CvoL_uMsT5RoD5-3hxWmLR2GG5lschVLV_3B05YpIdVJfTIwSGznky3Wph2kkFXAw01OZ9K5QCuWmUcUPvzIvU56VqnVYts",
        width: 3024,
      },
    ],
    place_id: "ChIJm-43j-SLGGAR0QSotm9QTjI",
    plus_code: {
      compound_code: "MP5W+98 日本、東京都港区",
      global_code: "8Q7XMP5W+98",
    },
    rating: 4.3,
    reference: "ChIJm-43j-SLGGAR0QSotm9QTjI",
    scope: "GOOGLE",
    types: ["jewelry_store", "finance", "point_of_interest", "store", "establishment"],
    user_ratings_total: 3,
    vicinity: "港区芝公園４丁目２−８ 東京タワー 2F",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585048,
        lng: 139.7454341,
      },
      viewport: {
        northeast: {
          lat: 35.6600654302915,
          lng: 139.7469556302915,
        },
        southwest: {
          lat: 35.6573674697085,
          lng: 139.7442576697085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
    icon_background_color: "#FF9E67",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
    name: "カフェ ラ・トゥール",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 4032,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/101141476393751109648">石川奏多</a>'],
        photo_reference:
          "ATplDJZE2iuVa2Kk7hem_jL7GqOvW0BTw-CR6bii2ffbDeJc6dy2QN4JgXdAtr-WLnow-CdDcdGEYTb3OCNN4qGnncjups0ZC6uQ0G987bJKAeWwL2XrjAnxf8FggVpVGUsNkFjPkkuFnl6VfnFPwYom6e8b2n6qcefJLQVcBdQddNy3vSFa",
        width: 3024,
      },
    ],
    place_id: "ChIJCewJkL2LGGARtY7mt2qtjb0",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    rating: 3.7,
    reference: "ChIJCewJkL2LGGARtY7mt2qtjb0",
    scope: "GOOGLE",
    types: ["cafe", "point_of_interest", "store", "food", "establishment"],
    user_ratings_total: 47,
    vicinity: "港区芝公園４丁目２−８ 東京タワー 1F メインデッキ",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6587662,
        lng: 139.7454577,
      },
      viewport: {
        northeast: {
          lat: 35.6602319302915,
          lng: 139.7469019302915,
        },
        southwest: {
          lat: 35.6575339697085,
          lng: 139.7442039697085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "東京タワーオフィシャルショップTHE SKY",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 1959,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/114717080003972609434">bluejays 47</a>'],
        photo_reference:
          "ATplDJYGURFvlKAL5Izq-24oCVnudo0-JCT63Or25Xjs_OIGT2ToLC3XQ_8LG2pz8NYlZsUWNvlKr1P1p3tk75a_nCUs0qTq4ZRAKiQyufI3jotGqL_dFfj6RRyyY114djzQCKseUeH1cg-LVw15wFO0WSeeciHD0jFTvXRNOSRVGrGWlnJV",
        width: 1102,
      },
    ],
    place_id: "ChIJZXl9cDGLGGARE2vejD-Gwb8",
    plus_code: {
      compound_code: "MP5W+G5 日本、東京都港区",
      global_code: "8Q7XMP5W+G5",
    },
    rating: 4.1,
    reference: "ChIJZXl9cDGLGGARE2vejD-Gwb8",
    scope: "GOOGLE",
    types: ["point_of_interest", "store", "establishment"],
    user_ratings_total: 14,
    vicinity: "港区芝公園４丁目２−８ メインデッキ 2階",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.658593,
        lng: 139.745464,
      },
      viewport: {
        northeast: {
          lat: 35.6601289802915,
          lng: 139.7469456802915,
        },
        southwest: {
          lat: 35.6574310197085,
          lng: 139.7442477197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    icon_background_color: "#7B9EB0",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    name: "ギフトヴィレッジ東京タワー店",
    opening_hours: {
      open_now: false,
    },
    place_id: "ChIJJeaGkL2LGGARnbFX15_ZiJ0",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    reference: "ChIJJeaGkL2LGGARnbFX15_ZiJ0",
    scope: "GOOGLE",
    types: ["point_of_interest", "food", "establishment"],
    vicinity: "港区芝公園４丁目２−８",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585769,
        lng: 139.7454506,
      },
      viewport: {
        northeast: {
          lat: 35.6601209802915,
          lng: 139.7469557802915,
        },
        southwest: {
          lat: 35.6574230197085,
          lng: 139.7442578197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/convenience_pinlet",
    name: "ローソン Ｓ東京タワー店",
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 3024,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/118412272490303990886">伊藤善久（Yoshihisa Ito）</a>',
        ],
        photo_reference:
          "ATplDJbqV80tm_8clwUvt7_o0Xz34bp4MvfBeyQ5UsE2N3DZjUOzyRh-Y8sLwNB1OZLpgtYaz2QxWI3TbebcMahAUXLaH7s0pR6zAjjJT-V6kDV0PuU135W1zGVh5quofgGjasCYThL7sOEOtqyKM23UYIJmRSH8a7Cbxh8A6h-irHZfIh59",
        width: 4032,
      },
    ],
    place_id: "ChIJQd_-KL2LGGARklq68oRdVyo",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    rating: 3,
    reference: "ChIJQd_-KL2LGGARklq68oRdVyo",
    scope: "GOOGLE",
    types: ["convenience_store", "point_of_interest", "store", "food", "establishment"],
    user_ratings_total: 10,
    vicinity: "港区芝公園４丁目２−８ 東京タワー 2F",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585769,
        lng: 139.7454506,
      },
      viewport: {
        northeast: {
          lat: 35.6601209802915,
          lng: 139.7469455802915,
        },
        southwest: {
          lat: 35.6574230197085,
          lng: 139.7442476197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    icon_background_color: "#FF9E67",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    name: "RED° SHOKUDO",
    photos: [
      {
        height: 500,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/102472549726551891227">RED° SHOKUDO</a>'],
        photo_reference:
          "ATplDJbpQDoEN4-MK44aahC0q7wAyYYdvrL5fvpeXO-qmjG7k6rcQVtRSgPzgkA5jE3Ih88HKH4MP9QsNxF0m6GJBcsYLknClOFezLXNtktGH7ou-BNPmZQY00MgTNNSkTR3v-OgJK0TzAAAvi9QkcRVFfT3xDl6BCRDxL2rmav4sWvApQk",
        width: 1000,
      },
    ],
    place_id: "ChIJIxAU__-LGGARaclqfDnm0p8",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    rating: 3.3,
    reference: "ChIJIxAU__-LGGARaclqfDnm0p8",
    scope: "GOOGLE",
    types: ["restaurant", "point_of_interest", "food", "establishment"],
    user_ratings_total: 18,
    vicinity: "港区芝公園４丁目２−８ 東京タワー 1階 フットタウン",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585769,
        lng: 139.7454506,
      },
      viewport: {
        northeast: {
          lat: 35.6601209802915,
          lng: 139.7469455802915,
        },
        southwest: {
          lat: 35.6574230197085,
          lng: 139.7442476197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "東京プリント工房",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 1108,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/104376667400433520006">東京プリント工房</a>',
        ],
        photo_reference:
          "ATplDJZ1CrP56q24kvqdC2BvSQfo4uTuOE0GHsvTPpnclwRvOhGEsLs0WmlCRwudrWcHWvR4IwC6UIVi1Q_yFbj5WZHt1zljRzq1M1YL6wwNMVECCKqeRxc-RiRnUTGmNWIy4lYTTx14wM-tfvYaaSUIXslHfV8GitDq2OKekg68MQjuABjL",
        width: 1478,
      },
    ],
    place_id: "ChIJ10U-pN2LGGARt-3C2rZNTQ4",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    rating: 4.7,
    reference: "ChIJ10U-pN2LGGARt-3C2rZNTQ4",
    scope: "GOOGLE",
    types: ["point_of_interest", "store", "establishment"],
    user_ratings_total: 3,
    vicinity: "芝公園４丁目２−８",
  },
  {
    geometry: {
      location: {
        lat: 35.65808130000001,
        lng: 139.7515077,
      },
      viewport: {
        northeast: {
          lat: 35.68270876520896,
          lng: 139.7819884821575,
        },
        southwest: {
          lat: 35.62288889971529,
          lng: 139.708744908729,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png",
    icon_background_color: "#7B9EB0",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    name: "港区",
    photos: [
      {
        height: 4032,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/115323344002269705227">Takashi IE</a>'],
        photo_reference:
          "ATplDJZoJmNnA_hN1G80JxtxvJp1Dv9osU0OyokvjkOnVjJuOIFe3nLwBHaprAoHQaqO4xYJBg-DZqYJ1FnjM8q8jc8Y2hH3RpgwY-9zvhsC6EU8E3w7ir727RouFY1rFwnhpGA_VomJ1n9k0zEUBPUi_Xc7uOS_FySpld6yd4QqKvSOL_Dp",
        width: 3024,
      },
    ],
    place_id: "ChIJ8yIZtLuLGGARrGzw8nX96zM",
    reference: "ChIJ8yIZtLuLGGARrGzw8nX96zM",
    scope: "GOOGLE",
    types: ["locality", "political"],
    vicinity: "港区",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585769,
        lng: 139.7454506,
      },
      viewport: {
        northeast: {
          lat: 35.6601209802915,
          lng: 139.7469557802915,
        },
        southwest: {
          lat: 35.6574230197085,
          lng: 139.7442578197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    icon_background_color: "#FF9E67",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    name: "Siddique Palace 東京タワー店",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 1108,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/112083867821070503763">Siddique Palace 東京タワー店</a>',
        ],
        photo_reference:
          "ATplDJaMHK2Bn9y-1uR1N6lb_xr5eQOZscjGcUEl-mEHTn4QRWqAjFELe3pn4tNLQxoObG7j_QfM8q0FuFLSbRGi2VJgoFOu5gp_mrzhyDGIEUe2DhnEZrzDJIH62RjE9zEs7ngr2Kh3bQDvF5xMM1j9rfznJ5GZBhJzwy_H_qk3ts3THvLF",
        width: 1478,
      },
    ],
    place_id: "ChIJt035H0qLGGARsztG8OexhNo",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    rating: 3.7,
    reference: "ChIJt035H0qLGGARsztG8OexhNo",
    scope: "GOOGLE",
    types: ["restaurant", "food", "point_of_interest", "establishment"],
    user_ratings_total: 144,
    vicinity: "港区芝公園４丁目２−８ 東京タワー ２階 内フットタウン",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585769,
        lng: 139.7454506,
      },
      viewport: {
        northeast: {
          lat: 35.6601209802915,
          lng: 139.7469455802915,
        },
        southwest: {
          lat: 35.6574230197085,
          lng: 139.7442476197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    icon_background_color: "#7B9EB0",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    name: "code name: WIZARD",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 2160,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/101918681151306943029">code name: WIZARD</a>',
        ],
        photo_reference:
          "ATplDJa1VsmmMSc8B-DPKRMUp8jfsEH7XaCkFo8SWuVXTvEa8Jlv8z22ylVvUeM__tI-DEbNVRr8ehAhy7jpwfT3bfzg80iHwXvF7PvLGYO6XvsJ__jQPvALG2lwBsPruGZpFz8Lq91Ptc829fl3cY4W91HzbRMQc5GVF5WWCN_78DpXxomm",
        width: 3840,
      },
    ],
    place_id: "ChIJb_JWcUiLGGARGq_zGbQoSvg",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    reference: "ChIJb_JWcUiLGGARGq_zGbQoSvg",
    scope: "GOOGLE",
    types: ["point_of_interest", "establishment"],
    vicinity: "港区芝公園４丁目２−８ WIZARD受付 東京タワー 1階 フットタウン",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585769,
        lng: 139.7454506,
      },
      viewport: {
        northeast: {
          lat: 35.66010363029149,
          lng: 139.7469447802915,
        },
        southwest: {
          lat: 35.6574056697085,
          lng: 139.7442468197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "東京タワーオフィシャルショップ GALAXY",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 1568,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/116928520101691328173">tomo takaku</a>'],
        photo_reference:
          "ATplDJYFssL1I9ZOQMzwI5m0drkdLy-5v0tm72ROr-YifqyHuyu23zddBQbpyZX-qKOOZ-pA4wvoz_Ke3gnMcBf9ofDYnw7ULxJ1JAkExCBOT_b_P5hZSDOH0c06hQyLeIbGGbT_Bk_WAruVy-h2JJJ_WWN978n3-MmJ_iMz4lCpFWsF-ZJG",
        width: 3264,
      },
    ],
    place_id: "ChIJbeJFRbSLGGARD8HV6NCGaRw",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    rating: 4,
    reference: "ChIJbeJFRbSLGGARD8HV6NCGaRw",
    scope: "GOOGLE",
    types: ["point_of_interest", "store", "establishment"],
    user_ratings_total: 1,
    vicinity: "港区芝公園４丁目２−８ フットタウン 3階",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585769,
        lng: 139.7454506,
      },
      viewport: {
        northeast: {
          lat: 35.6601209802915,
          lng: 139.7469455802915,
        },
        southwest: {
          lat: 35.6574230197085,
          lng: 139.7442476197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
    icon_background_color: "#FF9E67",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/bar_pinlet",
    name: "TOKYO TOWER “ROOFTOP” HIGHBALL GARDEN",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 3024,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/105809800131472075459">Shuhei Fukuda</a>'],
        photo_reference:
          "ATplDJZbhcxKX2fqv6Mpc9ALbwICIv2OZbNyRzUTdiylXsMoEPF44yY1rQ1CuMsGJrFp9W4LObSwYF1CX-1Sto_BfQdIJ4V-pWYjRkJ8yff1foXq-ANBUmxevGd7hBAKaFlKTjcxI-le2t4EilnNWRDp4AxXQbWJ_E4V0P1lnD2wojClz1AE",
        width: 4032,
      },
    ],
    place_id: "ChIJp3VcP4yLGGAR-v_ZUO1Y5XE",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    rating: 4.1,
    reference: "ChIJp3VcP4yLGGAR-v_ZUO1Y5XE",
    scope: "GOOGLE",
    types: ["bar", "restaurant", "food", "point_of_interest", "establishment"],
    user_ratings_total: 11,
    vicinity: "港区芝公園４丁目２−８ 屋上 東京タワ フットタウン",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585769,
        lng: 139.7454506,
      },
      viewport: {
        northeast: {
          lat: 35.6601209802915,
          lng: 139.7469588302915,
        },
        southwest: {
          lat: 35.6574230197085,
          lng: 139.7442608697085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "KLANKA Ginza TokyoTower",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 2269,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/107258524764433289256">KLANKA Ginza TokyoTower</a>',
        ],
        photo_reference:
          "ATplDJZxK-aYKXG_lBRnmwnBMExAfzuydY0RaV9l5Fy2Q9pKCghzWhoDPn3ekPDQP2cBpyizJjgNxBO4BSEacTPeuE-ul0Cy5jzO1ZOEvYa-kEkOWn1wY0Tx8hWmgRPqtFqFmyVvID2fUb49Uw8sZIxST5H6PeC7rtfpJY5pEHeoY8sGGV75",
        width: 4032,
      },
    ],
    place_id: "ChIJ62WyU6eLGGARqOwtpYk-w54",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    rating: 4.3,
    reference: "ChIJ62WyU6eLGGARqOwtpYk-w54",
    scope: "GOOGLE",
    types: ["jewelry_store", "point_of_interest", "store", "establishment"],
    user_ratings_total: 62,
    vicinity: "港区芝公園４丁目２−８ 東京タワー 2F",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585436,
        lng: 139.7454507,
      },
      viewport: {
        northeast: {
          lat: 35.6600992302915,
          lng: 139.7469618802915,
        },
        southwest: {
          lat: 35.6574012697085,
          lng: 139.7442639197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/atm-71.png",
    icon_background_color: "#909CE1",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/atm_pinlet",
    name: "ローソン銀行ＡＴＭ Ｓ東京タワー共同出張所",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 1660,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/114717080003972609434">bluejays 47</a>'],
        photo_reference:
          "ATplDJYP1FZXukUD7xNZh8y0MRLHZHrIfjC-MIDoqkvpWEz1xKlS4PBBfLUUJcDNcaNatFK7WRVZnZVvzup1v-uiulkypGoCtB5vgpJBugDtR0p6_dH1y0KfVmffu36C8RTtChxChSzQ5OJrzT3yAhWqtKbWDka01Tj-sI_-3ja1Zqu8mNU5",
        width: 1037,
      },
    ],
    place_id: "ChIJ_2MEqQaLGGARHJRjGcIjEBc",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    rating: 5,
    reference: "ChIJ_2MEqQaLGGARHJRjGcIjEBc",
    scope: "GOOGLE",
    types: ["atm", "finance", "point_of_interest", "establishment"],
    user_ratings_total: 1,
    vicinity: "港区芝公園４丁目２−８",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585722,
        lng: 139.7454671,
      },
      viewport: {
        northeast: {
          lat: 35.6601148302915,
          lng: 139.7469526302915,
        },
        southwest: {
          lat: 35.6574168697085,
          lng: 139.7442546697085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    icon_background_color: "#7B9EB0",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    name: "東京タワー トップデッキ",
    photos: [
      {
        height: 3000,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/102491927116360727333">Yuval Levy</a>'],
        photo_reference:
          "ATplDJbFVmx_uC_R1yKvJWW9_2NbwT7opuwjq8ZVRRP42d9dMhuJKdaftoyELdtikiwV32RdiJvD-J3jVzHPHbitoy-XkTRSNScqYiAMr-mLsMXNk-fWXB831L2_IlSH8w19KxAODHC7YlsVLz33bEJ4xC0y3Lq3nX9JYXHxmHBCESpsIq5J",
        width: 4000,
      },
    ],
    place_id: "ChIJ1cngb2CLGGARqrMJ87j1pUA",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    rating: 4,
    reference: "ChIJ1cngb2CLGGARqrMJ87j1pUA",
    scope: "GOOGLE",
    types: ["point_of_interest", "establishment"],
    user_ratings_total: 22,
    vicinity: "港区芝公園４丁目２−８",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.658593,
        lng: 139.745464,
      },
      viewport: {
        northeast: {
          lat: 35.6601289802915,
          lng: 139.7469456802915,
        },
        southwest: {
          lat: 35.6574310197085,
          lng: 139.7442477197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    icon_background_color: "#7B9EB0",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    name: "日本イーデイピー㈱",
    place_id: "ChIJCewJkL2LGGARd4WgEP7MgFA",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    reference: "ChIJCewJkL2LGGARd4WgEP7MgFA",
    scope: "GOOGLE",
    types: ["point_of_interest", "establishment"],
    vicinity: "港区芝公園４丁目２−８",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.658593,
        lng: 139.745464,
      },
      viewport: {
        northeast: {
          lat: 35.6601289802915,
          lng: 139.7469456802915,
        },
        southwest: {
          lat: 35.6574310197085,
          lng: 139.7442477197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "富士エキスポート",
    opening_hours: {
      open_now: false,
    },
    place_id: "ChIJCewJkL2LGGARJnTHEFH9G7Q",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    reference: "ChIJCewJkL2LGGARJnTHEFH9G7Q",
    scope: "GOOGLE",
    types: ["point_of_interest", "store", "establishment"],
    vicinity: "港区芝公園４丁目２−８",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.658593,
        lng: 139.745464,
      },
      viewport: {
        northeast: {
          lat: 35.6601289802915,
          lng: 139.7469456802915,
        },
        southwest: {
          lat: 35.6574310197085,
          lng: 139.7442477197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    icon_background_color: "#7B9EB0",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    name: "タワア商会",
    place_id: "ChIJCewJkL2LGGAR_5jzMiKQLPA",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    rating: 5,
    reference: "ChIJCewJkL2LGGAR_5jzMiKQLPA",
    scope: "GOOGLE",
    types: ["food", "point_of_interest", "establishment"],
    user_ratings_total: 1,
    vicinity: "港区芝公園４丁目２−８",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585278,
        lng: 139.7453856,
      },
      viewport: {
        northeast: {
          lat: 35.6601010802915,
          lng: 139.7469176802915,
        },
        southwest: {
          lat: 35.6574031197085,
          lng: 139.7442197197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    icon_background_color: "#7B9EB0",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    name: "Club333",
    place_id: "ChIJX3lwdQCLGGARjVgz2YgEEGU",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    reference: "ChIJX3lwdQCLGGARjVgz2YgEEGU",
    scope: "GOOGLE",
    types: ["point_of_interest", "establishment"],
    vicinity: "港区芝公園４丁目２−８",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585696,
        lng: 139.745484,
      },
      viewport: {
        northeast: {
          lat: 35.6601099302915,
          lng: 139.7469892302915,
        },
        southwest: {
          lat: 35.65741196970851,
          lng: 139.7442912697085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "NINJA TOKYO PROSHOP",
    photos: [
      {
        height: 4032,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/111184624886200204990">THIN LIZZY</a>'],
        photo_reference:
          "ATplDJbGHLgJd8EtajeKIHPz5vK_M2ghYNXAUgfBQJVsvJctym7axs5htSaO3jMIXfW07l-sTrzGzwqGyC6AVlIPJkfetRAumCOlmsuN0Hq4EJyHPnDKt7y1gX2Lf7VKZhUDGGWXJZE0RgES_INKY4_Gwj1wYSr2H3w6r64Yp7x6Ausq01jK",
        width: 3024,
      },
    ],
    place_id: "ChIJB3OcC0uLGGARw7edAZuZl5E",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    reference: "ChIJB3OcC0uLGGARw7edAZuZl5E",
    scope: "GOOGLE",
    types: ["point_of_interest", "store", "establishment"],
    vicinity: "港区芝公園４丁目２−８ 東京タワー 2階",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585696,
        lng: 139.745484,
      },
      viewport: {
        northeast: {
          lat: 35.6601099302915,
          lng: 139.7469892302915,
        },
        southwest: {
          lat: 35.65741196970851,
          lng: 139.7442912697085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    icon_background_color: "#7B9EB0",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    name: "テスト株式会社",
    place_id: "ChIJ__-_kL2LGGARrwwhFR6bfgc",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    reference: "ChIJ__-_kL2LGGARrwwhFR6bfgc",
    scope: "GOOGLE",
    types: ["point_of_interest", "establishment"],
    vicinity: "港区芝公園４丁目２−８",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585696,
        lng: 139.745484,
      },
      viewport: {
        northeast: {
          lat: 35.6601099302915,
          lng: 139.7469892302915,
        },
        southwest: {
          lat: 35.65741196970851,
          lng: 139.7442912697085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    icon_background_color: "#7B9EB0",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    name: "タワーの姉御🗼 人間パワースポット🌟吉祥天るり",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 2000,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/115200158639011517678">タワー🗼の姉御🌟 人間パワースポット🌟吉祥天るり</a>',
        ],
        photo_reference:
          "ATplDJbq0qmjZYJWL-ifyNQMmqZCzf4ezrviQ3JBsymQTU62Wxo5jy6k15I9gUEtJCKTQZ_T1jT4_cHe0_CpSQH1iQYl7bPZvzGOfqTy0NSCOrRMjH7BMELUQZ7OczH6zVdok8nvH_9FgzZTeUZtnEqw5Rbt7eI19-RRgoHHPilCnNCCOkK5",
        width: 1414,
      },
    ],
    place_id: "ChIJxbSTwxqLGGARZXb2FE55Wic",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    rating: 4.9,
    reference: "ChIJxbSTwxqLGGARZXb2FE55Wic",
    scope: "GOOGLE",
    types: ["point_of_interest", "establishment"],
    user_ratings_total: 9,
    vicinity: "港区芝公園４丁目２−８ 東京タワー 333 フットタウン2F 芝パーク物産内（圖星",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585696,
        lng: 139.745484,
      },
      viewport: {
        northeast: {
          lat: 35.6601099302915,
          lng: 139.7469694802915,
        },
        southwest: {
          lat: 35.65741196970851,
          lng: 139.7442715197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    icon_background_color: "#7B9EB0",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    name: "圖星 男のタロット",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 4032,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/111444668105369415487">吉祥天るり</a>'],
        photo_reference:
          "ATplDJYeU5OnL8omTVJr9LW66EZcX6c0zV-JAO05_MpxhaF_M9_VusU_h5mH9HpVxXYBSSOmXAXigs5Xn6tvrtG01eKCh7sAkKH0yrnuLA1zZuOxSFunrf0_GgrXp1L9i6MVIrRAZvPIvAjf51Kuvd9D9K_ltWvU8HVLuDclGb8lkiY9DQa4",
        width: 3024,
      },
    ],
    place_id: "ChIJCXBfzEmLGGARGPODKK50kkY",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    reference: "ChIJCXBfzEmLGGARGPODKK50kkY",
    scope: "GOOGLE",
    types: ["point_of_interest", "establishment"],
    vicinity: "港区芝公園４丁目２−８ 東京タワー 333 フットタウン2F",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585696,
        lng: 139.745484,
      },
      viewport: {
        northeast: {
          lat: 35.6601099302915,
          lng: 139.7469660802915,
        },
        southwest: {
          lat: 35.65741196970851,
          lng: 139.7442681197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    icon_background_color: "#7B9EB0",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    name: "RED° TOKYO TOWER",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 2832,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/100671189025319425456">RED° TOKYO TOWER</a>',
        ],
        photo_reference:
          "ATplDJZKBXM823AzZsWnnT6B9JARJJdIidkr9SVPPULFy6yiy8g8AuHTUTHJHxFtYxbdJyXLfcvXTQmEfPFI16Zjk9BDgB4i78AsH7ePa7TbSJrFJhKrh60DKrV2v9ovwzfwGbjto_IXYjwCyCRwyLO5wWEDEVvMP1gfVP-PUkaprhx4GQC1",
        width: 4240,
      },
    ],
    place_id: "ChIJc6bWtfWLGGARHGi91obxpqM",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    rating: 3.7,
    reference: "ChIJc6bWtfWLGGARHGi91obxpqM",
    scope: "GOOGLE",
    types: ["point_of_interest", "establishment"],
    user_ratings_total: 414,
    vicinity: "港区芝公園４丁目２−８ 東京タワー 3階 フットタウン",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585696,
        lng: 139.745484,
      },
      viewport: {
        northeast: {
          lat: 35.6601099302915,
          lng: 139.7469694802915,
        },
        southwest: {
          lat: 35.65741196970851,
          lng: 139.7442715197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    icon_background_color: "#7B9EB0",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    name: "東京タワーバンジーVR",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 1084,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/104411009552112068967">東京タワーバンジーVR</a>',
        ],
        photo_reference:
          "ATplDJYj4SJfHL8IH16Oo8Nmc-Oq6LXJNBVZfh8AGgMJAmHM2B-sCkEBwgFGNvxfvO0EWdA54PonDNhDsFm6dPQcrGmNrtZ8qL1MAag7_xIDUf4ajY02rQHSlEXUmEZtEmrm4ll4aoDtpsUQlppa8INUMjhaHBq95hZJ2K1-kV2b3o2S3TQF",
        width: 1440,
      },
    ],
    place_id: "ChIJ52I_bXyLGGARSNc6Z8lzono",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    rating: 5,
    reference: "ChIJ52I_bXyLGGARSNc6Z8lzono",
    scope: "GOOGLE",
    types: ["point_of_interest", "establishment"],
    user_ratings_total: 2,
    vicinity: "港区芝公園４丁目２−８ 東京タワー 内 メインデッキ",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585696,
        lng: 139.745484,
      },
      viewport: {
        northeast: {
          lat: 35.6601099302915,
          lng: 139.7469694802915,
        },
        southwest: {
          lat: 35.65741196970851,
          lng: 139.7442715197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "TTA STORE ㈱BJ",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 961,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/117970751914570227510">TTA STORE ㈱BJ</a>'],
        photo_reference:
          "ATplDJZE2hQg2TDyEgpUZF0fdMcn_QY5j7pY2fchk3_RIjyolDHril9CAtx1xERPvkPWyHzDtyxsnN2TOR1zx09KS789SHySOk2M7RslaTRG11DbYFhxOg47HSgLrAsxfti5_wzpR4z5PoN32MCl2-yF3Dle07lNXT0zeB9na2zhhs0ziiqL",
        width: 1704,
      },
    ],
    place_id: "ChIJ8aQSd3CLGGARKkCW9zAdcOo",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    rating: 4.8,
    reference: "ChIJ8aQSd3CLGGARKkCW9zAdcOo",
    scope: "GOOGLE",
    types: ["art_gallery", "point_of_interest", "store", "establishment"],
    user_ratings_total: 4,
    vicinity: "港区芝公園４丁目２−８ 東京タワー 2F",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585696,
        lng: 139.745484,
      },
      viewport: {
        northeast: {
          lat: 35.6601099302915,
          lng: 139.7469694802915,
        },
        southwest: {
          lat: 35.65741196970851,
          lng: 139.7442715197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "東京おみやげ堂 東京タワー店",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 480,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/103315640645381494133">東京おみやげ堂 東京タワー店</a>',
        ],
        photo_reference:
          "ATplDJa7vJX_UhE3j0YQcUGMerRs9NZAHn0XwAS0-5FDkn4VeU7wpWv71J3i11dRr5AU8dcyvF48zNKslZ6brEh75CYXXMbnPFqSOxlb4YLhyffrpZTWxwfp9kFQMswp3nt5qYaGhSgptmnXsFh3ezNUGPKU7jPVwRoon40gbikpYhM2KMqe",
        width: 640,
      },
    ],
    place_id: "ChIJG4WVQu6LGGAR20lmzOVDxNY",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    reference: "ChIJG4WVQu6LGGAR20lmzOVDxNY",
    scope: "GOOGLE",
    types: ["point_of_interest", "store", "establishment"],
    vicinity: "港区芝公園４丁目２−８ 東京タワー 2階 おみやげたうん内",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585696,
        lng: 139.745484,
      },
      viewport: {
        northeast: {
          lat: 35.6601099302915,
          lng: 139.7469892302915,
        },
        southwest: {
          lat: 35.65741196970851,
          lng: 139.7442912697085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    icon_background_color: "#13B5C7",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    name: "東京鐵塔售票口",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 7008,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/101197382641499143095">李金尧</a>'],
        photo_reference:
          "ATplDJZc20oLcE9mPiNU3uB2Sz2XtWZYtk4PRsGafafbnEDIdPBoJ8qFL00KmwHcsKXKkdI6Sg2zmLE4wo0B5HknDGMMrbvaUU84ISvR2SAIrYfGJviineCEjpm6dQdAY7WaFy3PDgeN2a9Gp0FvyPrgjg09jIeP9bknxXIbUCz54d_aef1O",
        width: 4672,
      },
    ],
    place_id: "ChIJS3ioM3SLGGARUG1WA0cOKS4",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    rating: 4.7,
    reference: "ChIJS3ioM3SLGGARUG1WA0cOKS4",
    scope: "GOOGLE",
    types: ["tourist_attraction", "point_of_interest", "establishment"],
    user_ratings_total: 3,
    vicinity: "港区芝公園４丁目２−８",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585696,
        lng: 139.745484,
      },
      viewport: {
        northeast: {
          lat: 35.6601099302915,
          lng: 139.7469694802915,
        },
        southwest: {
          lat: 35.65741196970851,
          lng: 139.7442715197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    icon_background_color: "#FF9E67",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    name: "生パスタ専門店SPALA 東京タワー店",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 3024,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/114644971785846817086">生パスタ専門店SPALA 東京タワー店</a>',
        ],
        photo_reference:
          "ATplDJZ7vp_cUquRQB1kkhoIG5LtoGx8ltZF377ydtxwmjFfhozFoXXXgH8eMq2VnNruowpP4_cU4xCgLB83zh_9th7QcJaaqpiX8amorOnRJ-zoIa1sPCv82-h6v4ZLUvLCMSGlkhw6SASGr9e6SxHkLzrpp8SqB7yy7bZbE-9iSx4reW7e",
        width: 4032,
      },
    ],
    place_id: "ChIJN2D06d6LGGARyz8lzMkN8Y4",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    rating: 3.7,
    reference: "ChIJN2D06d6LGGARyz8lzMkN8Y4",
    scope: "GOOGLE",
    types: ["restaurant", "point_of_interest", "food", "establishment"],
    user_ratings_total: 12,
    vicinity: "港区芝公園４丁目２−８ 東京タワー 2F",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6585696,
        lng: 139.745484,
      },
      viewport: {
        northeast: {
          lat: 35.6601099302915,
          lng: 139.7469694802915,
        },
        southwest: {
          lat: 35.65741196970851,
          lng: 139.7442715197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "東京芝パーク物産",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 1108,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/115063855110210225299">東京芝パーク物産</a>',
        ],
        photo_reference:
          "ATplDJYax_vhYlbR37Z_gbSrunSan7R2Phy1ABVQaYQWTEgpqyscLShhz7SB9zTSCequEtBBIXTdTzO6gc7TkqhDOUAcE40dmAtgNbODpsd0B-daPXwc5ydtpe3ruz3CEi0QlXlLPjt9T6LDxCZS9ihOSmyelrimdP-h_7eBMNtjSEYlAavG",
        width: 1478,
      },
    ],
    place_id: "ChIJ354FwDeLGGARn5gtE_aoH70",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    reference: "ChIJ354FwDeLGGARn5gtE_aoH70",
    scope: "GOOGLE",
    types: ["point_of_interest", "store", "establishment"],
    vicinity: "港区芝公園４丁目２−８ 東京タワー 2F",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.658626,
        lng: 139.7454175,
      },
      viewport: {
        northeast: {
          lat: 35.6601591302915,
          lng: 139.7469170302915,
        },
        southwest: {
          lat: 35.6574611697085,
          lng: 139.7442190697085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/atm-71.png",
    icon_background_color: "#909CE1",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/atm_pinlet",
    name: "セブン銀行ATM",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 2761,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/117921576222237023617">流れ者ぽまち</a>'],
        photo_reference:
          "ATplDJZMpLyahzSyzZ-FDAZUABtCjSF6Zimz-9KI1cPx7frrOEm8n4Fj_uXCsC72hmjDKG4qi-lYpGBA60FV9h3g5RqP89B4txmazEVbwcBdk5woBlkEhCnsHQgkLKjFD54wLi6Zf0FeV5xFGnkQP0GdgLKii60NrPcrm_AkD0i98_MaTIqI",
        width: 2761,
      },
    ],
    place_id: "ChIJ7W_beBuLGGARzrRWe3rZp9Q",
    plus_code: {
      compound_code: "MP5W+F5 日本、東京都港区",
      global_code: "8Q7XMP5W+F5",
    },
    rating: 5,
    reference: "ChIJ7W_beBuLGGARzrRWe3rZp9Q",
    scope: "GOOGLE",
    types: ["atm", "bank", "finance", "point_of_interest", "store", "establishment"],
    user_ratings_total: 2,
    vicinity: "港区芝公園４丁目２−８",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.658594,
        lng: 139.745493,
      },
      viewport: {
        northeast: {
          lat: 35.6601241802915,
          lng: 139.7469554802915,
        },
        southwest: {
          lat: 35.6574262197085,
          lng: 139.7442575197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    icon_background_color: "#7B9EB0",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    name: "タワー大神宮",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 3000,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/107756062715955549941">辰っつぁん</a>'],
        photo_reference:
          "ATplDJZ9ajMdcGFYp_EqL0ZRJdiaqUh7h6rNyx2SQbQg_mcJl_R8BpH-6S4ypYZ9eldgEotDHIUysLQvIHSHvy98R-kVpmW5ZwPi-idWaBlRBNkUHvWGkHnHw6XS8B6mK4NKdOqxnG6pmkNYrSqRffWVKFVbgkrXFVJO8B7Nr_gZwmUXsdUj",
        width: 3517,
      },
    ],
    place_id: "ChIJS-dLl72LGGARNB0r6M-gM0M",
    plus_code: {
      compound_code: "MP5W+C5 日本、東京都港区",
      global_code: "8Q7XMP5W+C5",
    },
    rating: 3.9,
    reference: "ChIJS-dLl72LGGARNB0r6M-gM0M",
    scope: "GOOGLE",
    types: ["place_of_worship", "point_of_interest", "establishment"],
    user_ratings_total: 85,
    vicinity: "港区芝公園４丁目２−８",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.65850469999999,
        lng: 139.7453085,
      },
      viewport: {
        northeast: {
          lat: 35.66010033029149,
          lng: 139.7468590802915,
        },
        southwest: {
          lat: 35.65740236970849,
          lng: 139.7441611197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    icon_background_color: "#FF9E67",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    name: "SAKE CAFE DIAMOND",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 3468,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/108084357719651702906">能勢靖</a>'],
        photo_reference:
          "ATplDJZ48YcJwuRZqihy-6KadpkPAz_Uip9_07MVbQzkokeMPq__d9miomR79CSfW1b4sVC1HDWw9rxwvCIjHp7EwK3CO6LEFQZUUKKg4HMo0IIKaYLqN_mbgmCD-WiyI4_513zhKKdOBXn5xem2es5HUduUgnuyFAOyPK1vapUQYeorKSP5",
        width: 4624,
      },
    ],
    place_id: "ChIJwxhiqT2LGGARJKEO9Y4YWP4",
    plus_code: {
      compound_code: "MP5W+C4 日本、東京都港区",
      global_code: "8Q7XMP5W+C4",
    },
    rating: 2.4,
    reference: "ChIJwxhiqT2LGGARJKEO9Y4YWP4",
    scope: "GOOGLE",
    types: ["restaurant", "point_of_interest", "food", "establishment"],
    user_ratings_total: 42,
    vicinity: "港区芝公園４丁目２−８",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6586589,
        lng: 139.7455003,
      },
      viewport: {
        northeast: {
          lat: 35.6601540302915,
          lng: 139.7469684302915,
        },
        southwest: {
          lat: 35.6574560697085,
          lng: 139.7442704697085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    icon_background_color: "#7B9EB0",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    name: "東京タワー メインデッキ2階",
    photos: [
      {
        height: 12000,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/117026194986161291386">ASun</a>'],
        photo_reference:
          "ATplDJb1eZZDdwN0ohdhJjexx03_m0hGwPmAn_Vl61t90fM6NTlzyCXHmo0h_EpA19rbNrewKycWOlkGi_s9bvU2qAiQ6Vf-ZUPuOvyqn5zm0JVMGWTuXezaE2BLJO9VIABOyUdoGnXIdPbWJUdJ0eNNNb8a9-tf5RDmJ-Ph7naMgeGn1xWG",
        width: 9000,
      },
    ],
    place_id: "ChIJs_ml2ruLGGARDuEorcSNgVw",
    plus_code: {
      compound_code: "MP5W+F6 日本、東京都港区",
      global_code: "8Q7XMP5W+F6",
    },
    rating: 4.8,
    reference: "ChIJs_ml2ruLGGARDuEorcSNgVw",
    scope: "GOOGLE",
    types: ["point_of_interest", "establishment"],
    user_ratings_total: 11,
    vicinity: "港区芝公園４丁目２−８ メインデッキ 2階",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.65866620000001,
        lng: 139.7453582,
      },
      viewport: {
        northeast: {
          lat: 35.6599068302915,
          lng: 139.7465524302915,
        },
        southwest: {
          lat: 35.65720886970851,
          lng: 139.7438544697085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    icon_background_color: "#7B9EB0",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    name: "東京タワー メインデッキ1階",
    photos: [
      {
        height: 3648,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/112289143088756252757">田村誠一</a>'],
        photo_reference:
          "ATplDJYxaQQrTiISgNaBNjM4oGs3lPKgzq_8UoocFgZdMe0-RbCQ9r4nQ8tcX9ubC6Bxz3cU0O9e62drSePbzF9nBXg2xrNl1-54xg6VVYg1TZpxKp7ZJzhUJq7X218qJ9_-wXbMStswRIaeEfxAR9aXjrLomjMUVDfgNyGI1QHCFVzHXyvF",
        width: 5472,
      },
    ],
    place_id: "ChIJsVsY6RqLGGARct1-_4Bso6M",
    plus_code: {
      compound_code: "MP5W+F4 日本、東京都港区",
      global_code: "8Q7XMP5W+F4",
    },
    rating: 4.3,
    reference: "ChIJsVsY6RqLGGARct1-_4Bso6M",
    scope: "GOOGLE",
    types: ["point_of_interest", "establishment"],
    user_ratings_total: 18,
    vicinity: "港区芝公園４丁目２−８ 東京タワーフットタウン 2F",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6586897,
        lng: 139.7455221,
      },
      viewport: {
        northeast: {
          lat: 35.66015543029149,
          lng: 139.7469659802915,
        },
        southwest: {
          lat: 35.65745746970849,
          lng: 139.7442680197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "TOKIO 333",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 2592,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/104139485798073072964">Ataru 1</a>'],
        photo_reference:
          "ATplDJZLxEYPPMU7xCP_J8G9mtezSmMQg1CjHrMbPuDP3TUBGSGf9lkiL2p8PwOvQvZTHvy9b8QnxCaN5ISK2eVfny_J7Ns2978pUBKOWSYRuu3PRnnh_Ej8cmRb-6igaxKukG_9InEb3xb0ltLg3r1oyK2xr-i4w7Gxa8nxBnhbQSjwSj88",
        width: 3872,
      },
    ],
    place_id: "ChIJKSjekL2LGGAR8ELRpp0BML4",
    plus_code: {
      compound_code: "MP5W+F6 日本、東京都港区",
      global_code: "8Q7XMP5W+F6",
    },
    rating: 4.1,
    reference: "ChIJKSjekL2LGGAR8ELRpp0BML4",
    scope: "GOOGLE",
    types: ["point_of_interest", "store", "establishment"],
    user_ratings_total: 12,
    vicinity: "港区芝公園４丁目２−８",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.65869559999999,
        lng: 139.7455355,
      },
      viewport: {
        northeast: {
          lat: 35.66018258029149,
          lng: 139.7469971302915,
        },
        southwest: {
          lat: 35.65748461970849,
          lng: 139.7442991697085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "K-POP Plaza Tokyo(KPT)",
    opening_hours: {
      open_now: false,
    },
    place_id: "ChIJ2_eLb32LGGARk5euGlZ6l8M",
    plus_code: {
      compound_code: "MP5W+F6 日本、東京都港区",
      global_code: "8Q7XMP5W+F6",
    },
    rating: 5,
    reference: "ChIJ2_eLb32LGGARk5euGlZ6l8M",
    scope: "GOOGLE",
    types: ["point_of_interest", "store", "food", "establishment"],
    user_ratings_total: 1,
    vicinity: "港区芝公園４丁目２−８",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6587225,
        lng: 139.7455518,
      },
      viewport: {
        northeast: {
          lat: 35.66017808029149,
          lng: 139.7469878302915,
        },
        southwest: {
          lat: 35.6574801197085,
          lng: 139.7442898697085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    icon_background_color: "#7B9EB0",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    name: "TOKYO TOWER TOURIST INFORMATION CENTER",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 4608,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/106314851344552654922">Meiji Balendres</a>'],
        photo_reference:
          "ATplDJbJbKy-7ZEPiCIivvrAJI8ccBNrrSZ3bqpwoRRuk-0iSiOmJK70oZofyhnNeFLd-cQEEMfZZ0iUEyk4G1ItZGQ2XUHgxx8ANHq5sYWvwZuDu7LgteBXSk_-i4luUlFdDzjyTkwD6XfGismsE7jLf7LKVYRW1SNVPVPPGa95FmUciUvN",
        width: 3456,
      },
    ],
    place_id: "ChIJpUKFkL2LGGARd0tKtiugUbw",
    plus_code: {
      compound_code: "MP5W+F6 日本、東京都港区",
      global_code: "8Q7XMP5W+F6",
    },
    rating: 4.7,
    reference: "ChIJpUKFkL2LGGARd0tKtiugUbw",
    scope: "GOOGLE",
    types: ["travel_agency", "point_of_interest", "establishment"],
    user_ratings_total: 21,
    vicinity: "港区芝公園４丁目２−８",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6587324,
        lng: 139.74556,
      },
      viewport: {
        northeast: {
          lat: 35.6601952802915,
          lng: 139.7470016302915,
        },
        southwest: {
          lat: 35.6574973197085,
          lng: 139.7443036697085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    icon_background_color: "#FF9E67",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    name: "ケンズカフェ東京 TOKYOタワー店",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 3024,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/111957825779635168206">anju</a>'],
        photo_reference:
          "ATplDJYm5lLf9NLozBLETh7hAzcjTtK6j_m1xrCwIkx2TZPVk9P6ua3RFHwXtYm1WCcGmzhwT0pzF0bmviP5s7ePSemViwMT-eUzLbGiD_iR98_KZzbsx2AK69cQ1yrZD9NtJgCNHnKV1hLtSmtdaqxyorWPj67f0nlnofYev_rAmTam1KIu",
        width: 4032,
      },
    ],
    place_id: "ChIJU1Mf5OKLGGARebYZMQnzNlM",
    plus_code: {
      compound_code: "MP5W+F6 日本、東京都港区",
      global_code: "8Q7XMP5W+F6",
    },
    rating: 4.6,
    reference: "ChIJU1Mf5OKLGGARebYZMQnzNlM",
    scope: "GOOGLE",
    types: ["bakery", "point_of_interest", "store", "food", "establishment"],
    user_ratings_total: 12,
    vicinity: "港区芝公園４丁目２−８ 東京タワー",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.65874469999999,
        lng: 139.7455613,
      },
      viewport: {
        northeast: {
          lat: 35.66012253029149,
          lng: 139.7469342302915,
        },
        southwest: {
          lat: 35.6574245697085,
          lng: 139.7442362697085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    icon_background_color: "#7B9EB0",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    name: "東京タワー似顔絵チームタワーズ",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 1536,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/107732884494991054402">東京タワー似顔絵チームタワーズ</a>',
        ],
        photo_reference:
          "ATplDJYC9ixUIx7b8raC8GVFCVGmNW6FlbxWmVWDqDpzmyAyg3KX8zO7skYAPrgnlkyC9CFEfw4qmnyZn5Y-HL9DaRueUu-SKxYb1TWBEybiw6g7G9g-HGsseJEW_ij1bKv3uG2SyfoCMXCRNyM1pqzoB37LvvKL_f4vNrAx09xo6Q3XYK3Q",
        width: 2048,
      },
    ],
    place_id: "ChIJV-GakL2LGGARQ7jGMkXKWis",
    plus_code: {
      compound_code: "MP5W+F6 日本、東京都港区",
      global_code: "8Q7XMP5W+F6",
    },
    rating: 4.4,
    reference: "ChIJV-GakL2LGGARQ7jGMkXKWis",
    scope: "GOOGLE",
    types: ["point_of_interest", "establishment"],
    user_ratings_total: 8,
    vicinity: "港区芝公園４丁目２−８ フットタウン 2F",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6587025,
        lng: 139.7451962,
      },
      viewport: {
        northeast: {
          lat: 35.66003698029149,
          lng: 139.7465611802915,
        },
        southwest: {
          lat: 35.65733901970849,
          lng: 139.7438632197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    icon_background_color: "#7B9EB0",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    name: "東京タワーホール",
    photos: [
      {
        height: 628,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/104192650701966144148">Volcano ZH</a>'],
        photo_reference:
          "ATplDJbdBqR6X87BmY3DWMkZCn4ALCOjRee9a9NFeGw5XfmK6ifH732Ek7_uF12mMfcJSf7Tkh7QpGe6UjnXEUydg01OQeL2gj8hOrIYicIO0tXL0T48ZBQl9f0XdJlnHHyAnPGhtBKJoAfuc5Uen6TEAQ3Qe3wTc3bAH4jwMWXG8Papqu_L",
        width: 941,
      },
    ],
    place_id: "ChIJoZvPhL2LGGARt1tHPLDugkA",
    plus_code: {
      compound_code: "MP5W+F3 日本、東京都港区",
      global_code: "8Q7XMP5W+F3",
    },
    rating: 4.5,
    reference: "ChIJoZvPhL2LGGARt1tHPLDugkA",
    scope: "GOOGLE",
    types: ["point_of_interest", "establishment"],
    user_ratings_total: 11,
    vicinity: "港区芝公園４丁目２−８ 東京タワーフットタウンB1F",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.658785,
        lng: 139.7453018,
      },
      viewport: {
        northeast: {
          lat: 35.66026953029149,
          lng: 139.7467616802915,
        },
        southwest: {
          lat: 35.65757156970849,
          lng: 139.7440637197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
    icon_background_color: "#FF9E67",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
    name: "汁なし担々麺 金蠍（きんかつ） 東京タワー店",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 2109,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/114717080003972609434">bluejays 47</a>'],
        photo_reference:
          "ATplDJa3lFGjArsKZ7TYPENx1l1gLY2Y1liKixN5z6xcCl3uGLRePkWS4USgrKi4zC1-7TMP9w4f0fPr9PEbeFqX8mHG7FsvKx0Hh1m1k5HKmTS5IEABLz7gUOMgF3I2KWCGQsghJQYnJ-bQtzy9QxSVDgO9JUlKQexuBHwL-NYiPyr7c3lY",
        width: 3749,
      },
    ],
    place_id: "ChIJWa2D_fGLGGARUFg1qbfs7MM",
    plus_code: {
      compound_code: "MP5W+G4 日本、東京都港区",
      global_code: "8Q7XMP5W+G4",
    },
    rating: 3.9,
    reference: "ChIJWa2D_fGLGGARUFg1qbfs7MM",
    scope: "GOOGLE",
    types: ["restaurant", "point_of_interest", "food", "establishment"],
    user_ratings_total: 107,
    vicinity: "港区芝公園４丁目２−８",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6587447,
        lng: 139.7456398,
      },
      viewport: {
        northeast: {
          lat: 35.66019508029149,
          lng: 139.7470715802915,
        },
        southwest: {
          lat: 35.65749711970849,
          lng: 139.7443736197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "東京タワーフットタウン",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 4032,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/116379975286707206598">-C Hira</a>'],
        photo_reference:
          "ATplDJaQSHo-oh3U9xS0ThHuKHyXb0m3teVWFl8UmaegCXUs7KHqXa47fe6gn32oFl8z6S1ofhfjEwa1VSOaRqQo_wnrzBOO8eTVC0sTnHQ0wKVRswulG37hMoYKzSQ8WjzmKPl26Ezf3JyXQ4HZ-hv33gMR6fltraX_K8X752DmCvjffxdr",
        width: 3024,
      },
    ],
    place_id: "ChIJH3lfRSOLGGARbkCME4cgE10",
    plus_code: {
      compound_code: "MP5W+F7 日本、東京都港区",
      global_code: "8Q7XMP5W+F7",
    },
    rating: 4,
    reference: "ChIJH3lfRSOLGGARbkCME4cgE10",
    scope: "GOOGLE",
    types: ["shopping_mall", "point_of_interest", "establishment"],
    user_ratings_total: 1,
    vicinity: "港区芝公園４丁目２−８",
  },
  {
    business_status: "CLOSED_TEMPORARILY",
    geometry: {
      location: {
        lat: 35.6587934,
        lng: 139.745612,
      },
      viewport: {
        northeast: {
          lat: 35.6602320802915,
          lng: 139.7470003802915,
        },
        southwest: {
          lat: 35.6575341197085,
          lng: 139.7443024197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
    icon_background_color: "#FF9E67",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
    name: "LIP COFFEE",
    permanently_closed: true,
    photos: [
      {
        height: 3024,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/108455570094792228695">moto0316</a>'],
        photo_reference:
          "ATplDJZ592Y-Z8UMCt61PN1R_wSc_NamR1_HSq2oA7OuUPKs5_ii1PfamButv305vNEQSS4_M2595FMZxg8wm0pw1a11vvRyfRDocLCq7_tJIifTnk8aDFSSg63EU9XjLkMlkDAHzt8WsPQAMl-nvufGqG3zJ0YHFPsPWsgLAcYK-p5_gNhf",
        width: 4032,
      },
    ],
    place_id: "ChIJl06POH-LGGAR6qjwcL9fgRY",
    plus_code: {
      compound_code: "MP5W+G6 日本、東京都港区",
      global_code: "8Q7XMP5W+G6",
    },
    rating: 2.5,
    reference: "ChIJl06POH-LGGAR6qjwcL9fgRY",
    scope: "GOOGLE",
    types: ["cafe", "point_of_interest", "store", "food", "establishment"],
    user_ratings_total: 2,
    vicinity: "港区芝公園４丁目２−８ 東京タワー 1F",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6587572,
        lng: 139.7451795,
      },
      viewport: {
        northeast: {
          lat: 35.6602810802915,
          lng: 139.7466875802915,
        },
        southwest: {
          lat: 35.65758311970851,
          lng: 139.7439896197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    icon_background_color: "#7B9EB0",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    name: "タワーギャラリー",
    photos: [
      {
        height: 3024,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/104442684504011166540">Tetsuya Nakashima</a>',
        ],
        photo_reference:
          "ATplDJY5fOLveggo_b3v5umTCxq_MVmgdpY56vwCzlmnZi-LMNda11_9S0P4aADDC_DlAmcUPBJp3a-o8y-Non7wxTpiSi-3XaECBrUzLOmMWcVEhzbtj4gmFsCo8CUf9VtlVWQXwbgP2SSjjyQjlO1r3kFTi0IOTl2fY5W_b0xUxzM9LGxB",
        width: 4032,
      },
    ],
    place_id: "ChIJ0SfGqAGLGGARcJ3hd2eoCRg",
    plus_code: {
      compound_code: "MP5W+G3 日本、東京都港区",
      global_code: "8Q7XMP5W+G3",
    },
    rating: 3.8,
    reference: "ChIJ0SfGqAGLGGARcJ3hd2eoCRg",
    scope: "GOOGLE",
    types: ["point_of_interest", "establishment"],
    user_ratings_total: 6,
    vicinity: "港区芝公園４丁目２−８",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6588558,
        lng: 139.745271,
      },
      viewport: {
        northeast: {
          lat: 35.6603132802915,
          lng: 139.7467351802915,
        },
        southwest: {
          lat: 35.6576153197085,
          lng: 139.7440372197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    icon_background_color: "#4B96F3",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
    name: "写真ピックアップカウンター",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 1568,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/116928520101691328173">tomo takaku</a>'],
        photo_reference:
          "ATplDJbr7iq2PSIohFuEPcOyEo7Q58LhDzQOn3WstoB-_3fNL8atZZyejTm2r6Y1pa6YKV9cta-vll08LSjFvpUxMWbnRq2cSY5vDAXrASLLIHgTHqfmO-gPnJxv083IDEysnFOonufOtG8PkzA2gFOVD-OhywSkbci3LXzKiLW-5FTNSAMo",
        width: 3264,
      },
    ],
    place_id: "ChIJBZWUqF2LGGAR5cJGbvg04ao",
    plus_code: {
      compound_code: "MP5W+G4 日本、東京都港区",
      global_code: "8Q7XMP5W+G4",
    },
    reference: "ChIJBZWUqF2LGGAR5cJGbvg04ao",
    scope: "GOOGLE",
    types: ["electronics_store", "home_goods_store", "point_of_interest", "store", "establishment"],
    vicinity: "港区芝公園４丁目２−８ 東京タワー フット タウン 3F",
  },
  {
    business_status: "OPERATIONAL",
    geometry: {
      location: {
        lat: 35.6588101,
        lng: 139.7458372,
      },
      viewport: {
        northeast: {
          lat: 35.66015908029149,
          lng: 139.7471861802915,
        },
        southwest: {
          lat: 35.65746111970849,
          lng: 139.7444882197085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
    icon_background_color: "#7B9EB0",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
    name: "TOKYO TOWER Winter Fantasy RETROSPECTIVE ILLUMINATION",
    photos: [
      {
        height: 4000,
        html_attributions: ['<a href="https://maps.google.com/maps/contrib/108560721823848159535">加藤美恵子</a>'],
        photo_reference:
          "ATplDJZNu2SQU1Ijufwof5zy_pYU4YbPgWREwMqTaNI2wsM_h_VjrlPgU8ZHVSHhX5cJtjGeezW911144fY_npEAyhS7jDfCt4xT_l-0EjK9Z2uQmX5i1oX9vdod9T4BaxCrmaTU0ifV0TAqJ1wCDOOvsKUcuDUiBJeLV9ZoSwkU1XFICqCJ",
        width: 3000,
      },
    ],
    place_id: "ChIJW0UhuEOLGGARX8wELqkp5qM",
    plus_code: {
      compound_code: "MP5W+G8 日本、東京都港区",
      global_code: "8Q7XMP5W+G8",
    },
    rating: 5,
    reference: "ChIJW0UhuEOLGGARX8wELqkp5qM",
    scope: "GOOGLE",
    types: ["point_of_interest", "establishment"],
    user_ratings_total: 1,
    vicinity: "港区芝公園４丁目２",
  },
  {
    geometry: {
      location: {
        lat: 35.6584884,
        lng: 139.7455584,
      },
      viewport: {
        northeast: {
          lat: 35.6597055802915,
          lng: 139.7467470302915,
        },
        southwest: {
          lat: 35.6570076197085,
          lng: 139.7440490697085,
        },
      },
    },
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/atm-71.png",
    icon_background_color: "#909CE1",
    icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/atm_pinlet",
    name: "セブン銀行",
    place_id: "ChIJhcEnl72LGGARDirvCnzCWiI",
    reference: "ChIJhcEnl72LGGARDirvCnzCWiI",
    scope: "GOOGLE",
    types: ["atm", "subpremise", "finance", "point_of_interest", "establishment"],
    vicinity: "２",
  },
];
