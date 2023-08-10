import Image from "next/image";

const searchPage = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <section className="group">
        <div
          tabIndex={0}
          className="block w-full cursor-pointer rounded-xl bg-background-secondary"
        >
          <div className="relative aspect-video">
            <Image
              src="/mt.jpeg"
              fill
              alt=""
              className="rounded-t-xl object-cover"
            />
          </div>
          <div className="flex flex-col gap-y-2 px-3 py-2">
            <div className="text-left">
              <span className="mr-2">
                <span className="mr-1 text-xl font-bold text-secondary">
                  999
                </span>
                件
              </span>
              <span className="text-xs">
                <span className="text-accent">★</span>5.0
              </span>
            </div>
            <p className="text-left text-2xl font-bold">上高地</p>
            <div className="flex flex-wrap gap-2 text-sm">
              <span>観光スポット</span>
              <span>公園</span>
            </div>
          </div>
        </div>
        <div className="hidden group-focus-within:block">
          <div className="absolute left-0 top-0 block h-full w-full bg-black/70">
            <div
              tabIndex={0}
              className="mx-auto mt-[15%] block max-h-[80%] w-5/6 cursor-pointer overflow-y-scroll rounded-lg bg-background-secondary p-3"
            >
              <div className="relative aspect-video">
                <Image
                  src="/mt.jpeg"
                  fill
                  alt=""
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="mt-2 flex flex-col gap-y-4">
                <section className="flex flex-col gap-y-2">
                  <div className="text-left">
                    <span className="mr-2">
                      <span className="mr-1 text-xl font-bold text-secondary">
                        999
                      </span>
                      件
                    </span>
                    <span className="text-xs">
                      <span className="text-accent">★</span>5.0
                    </span>
                  </div>
                  <p className="text-left text-2xl font-bold">上高地</p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span>観光スポット</span>
                    <span>公園</span>
                  </div>
                  <div className="text-left">
                    <span className="mr-2 rounded bg-green-500 p-1 text-xs">
                      営業中
                    </span>
                    <span className="text-xs">24時間営業</span>
                  </div>
                </section>
                <section className="flex flex-col gap-y-2">
                  <div className="flex gap-x-2">
                    <Image src="/pen.svg" width={20} height={20} alt="" />
                    <a
                      href="https://www.google.com/maps"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Google Mapで見る
                    </a>
                  </div>
                  <div className="flex gap-x-2">
                    <Image src="/pen.svg" width={20} height={20} alt="" />
                    <a
                      href="https://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      https://example.com
                    </a>
                  </div>
                  <div className="flex gap-x-2">
                    <Image src="/pen.svg" width={20} height={20} alt="" />
                    <a
                      href="tel:000-1234-5678"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      000-1234-5678
                    </a>
                  </div>
                </section>
                <span className="border-b border-stone-200"></span>
                <section className="flex flex-col gap-y-1 text-left text-xs">
                  <div className="flex items-center gap-x-2">
                    <div className="relative h-7 w-7">
                      <Image
                        src="/user-icon.JPG"
                        alt=""
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <p>Hayato</p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <span>1ヶ月前</span>
                    <span className="text-xs">
                      <span className="text-accent">★</span>5.0
                    </span>
                  </div>
                  <p className="text-sm">
                    有料道路を通りますが夏にお薦めの場所です。入口にはトイレや売店もあり、本数が少ないですがバスでも一応行けます。駐車場は道沿いに有り。岩の地層から水が出てきて、木陰だし、この一帯はとても涼しいです。透明な水は冷たくて爽やか。ただ迂回路の無い一本道なので、時間帯で凄く混みます。
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default searchPage;
