import Image from "next/image";

export default function HomePage() {
  return (
    <div className="py-8 max-w-6xl mx-auto px-6 w-full h-[500px] relative ">
      <Image
        src="/Image.png"
        alt="Home Image"
        fill
        className="object-cover"
        style={{ zIndex: 1 }}
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      <article
        className="absolute bottom-[-40px] px-8 py-4 rounded-md shadow-2xl bg-white text-gray-800"
        style={{ zIndex: 10 }}
      >
        <button className="bg-blue-500 text-white py-1 px-4 rounded-sm">
          Technology
        </button>
        <h2 className="font-bold text-xl py-2">
          The Impact of Technology on the Workplace: <br /> How Technology is
          Changing
        </h2>
        <div className="flex items-center  space-x-3">
          <div className="flex-shrink-0">
            <Image
              src="/Image.png"
              alt="Author avatar"
              width={80}
              height={80}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-600">Jason Francisco</p>
            <p className="text-sm text-gray-500">2 days ago</p>
          </div>
        </div>
      </article>
    </div>
  );
}
