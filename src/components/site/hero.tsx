export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-4 pt-6 sm:px-6 lg:grid-cols-12 lg:items-stretch lg:pt-10">
      <div className="order-2 flex flex-col justify-end lg:order-1 lg:col-span-5 lg:py-8">
        <p className="text-xs font-semibold tracking-widest text-coral uppercase">Москва · турагентство</p>
        <h1 className="font-display mt-4 text-4xl leading-tight font-medium sm:text-5xl">
          Путешествие, которое вам подходит
        </h1>
        <p className="mt-5 max-w-md text-base text-muted sm:text-lg">
          Any Travel — турагентство с индивидуальным и честным подходом.
        </p>
      </div>
      <div className="order-1 overflow-hidden rounded-3xl lg:order-2 lg:col-span-7">
        <img
          src="/media/coast.jpg"
          alt="Берег с бирюзовой водой и известковыми скалами на закате"
          className="h-72 w-full object-cover sm:h-96 lg:h-stage"
        />
      </div>
    </section>
  );
}
