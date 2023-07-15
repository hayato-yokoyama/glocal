import Image from "next/image";

const searchPage = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <section className="rounded-xl bg-background-secondary">
        <div className="relative aspect-video">
          <Image
            src="/mt.jpeg"
            fill
            alt=""
            className="rounded-t-xl object-cover"
          />
        </div>
        <div className="flex flex-col gap-y-2 px-3 py-2">
          <div>
            <span className="mr-2">
              <span className="mr-1 text-xl font-bold text-secondary">999</span>
              件
            </span>
            <span className="text-xs">
              <span className="text-accent">★</span>5.0
            </span>
          </div>
          <p className="text-2xl font-bold">上高地</p>
          <div className="flex flex-wrap gap-2 text-sm">
            <span>観光スポット</span>
            <span>公園</span>
          </div>
        </div>
      </section>
    </div>
  );
};
export default searchPage;
