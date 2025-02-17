export default async function HeroComponent() {
  return (
    <div className="relative h-screen bg-slate-500 w-full ">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
        <h1 className="text-white text-4xl font-bold lg:text-6xl">test page</h1>
        <p className="text-white text-lg lg:text-2xl">Lorem ipsum</p>
      </div>
    </div>
  );
}
