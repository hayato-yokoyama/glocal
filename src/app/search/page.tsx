import Image from "next/image";

const searchPage = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <section className="group">
        <button className="block w-full rounded-xl bg-background-secondary">
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
        </button>
        <div className="hidden group-focus-within:block">
          <div className="absolute left-0 top-0 block h-full w-full bg-black/70">
            <button className="mx-auto mt-20 block w-5/6 rounded-lg bg-background-secondary p-3">
              <div className="relative aspect-video">
                <Image
                  src="/mt.jpeg"
                  fill
                  alt=""
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="mt-2 flex flex-col gap-y-2">
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
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default searchPage;
