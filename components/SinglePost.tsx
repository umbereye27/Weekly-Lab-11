import Image from "next/image";

export default function PostPage() {
  return (
    <article className="max-w-2xl mx-auto px-4 py-10 text-sm leading-6 bg-background text-foreground">
      {/* Tag and Title */}
      <span className="text-xs bg-blue-100 text-blue-600 font-semibold px-2 py-0.5 rounded">
        Technology
      </span>
      <h1 className="text-2xl font-bold mt-2">
        The Impact of Technology on the Workplace: How Technology is Changing
      </h1>

      {/* Author */}
      <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
        <Image
          src="/Image.png"
          alt="Author"
          width={24}
          height={24}
          className="rounded-full"
        />
        <span>Jason Francisco</span>
        <span className="ml-auto">July 10, 2025</span>
      </div>

      {/* Hero Image */}
      <div className="mt-6">
        <Image
          src="/hero-image.jpg"
          alt="Castle"
          width={800}
          height={400}
          className="rounded-md border-4 border-red-500 object-cover"
        />
      </div>

      {/* Paragraphs */}
      <section className="mt-6 space-y-4 text-justify">
        <p>
          Traveling is an enriching experience that opens your mind, broadens your horizons,
          and allows you to explore new places, cultures, and perspectives. However, a
          successful journey requires careful planning and preparation to ensure a smooth
          and enjoyable adventure.
        </p>

        <p>
          In this article, we will walk you through the essential steps to plan and prepare
          for your trip effectively.
        </p>

        <h2 className="text-base font-semibold mt-6">Research Your Destination</h2>
        <p>
          Information is power when it comes to travel. Start by researching your destination.
          This includes understanding its culture, customs, language, climate, and popular
          attractions. Read travel blogs, watch vlogs, and use reputable travel websites to
          gather insights.
        </p>

        <h2 className="text-base font-semibold mt-6">Plan Your Itinerary</h2>
        <p>
          Having a loose itinerary gives you the opportunity and convenience of flexibility,
          but having a basic plan ensures you make the most of your time. Highlight key
          attractions, must-see spots, and don’t forget to plan for breaks and meals.
        </p>
      </section>

      {/* Quote */}
      <blockquote className="bg-gray-100 text-gray-700 italic p-4 my-6 rounded-md border-l-4 border-gray-300">
        “Traveling opens your eyes to new environments and expands your beliefs.
        Often, you’ll be amazed at all the perspectives you’ve never considered before.”
      </blockquote>

      {/* Inline Image with caption */}
      <div className="mt-6">
        <Image
          src="/travel-image.jpg"
          alt="Traveler looking at sunset"
          width={800}
          height={400}
          className="rounded-md object-cover"
        />
        <p className="text-center text-xs text-gray-500 mt-1">View from a local guest house</p>
      </div>

      {/* More Paragraphs */}
      <section className="mt-6 space-y-4 text-justify">
        <h2 className="text-base font-semibold">Pack Lightly and Smartly</h2>
        <p>
          Packing efficiently is vital. Avoid overpacking and stick to essentials. Use packing
          cubes or organizers to separate items. Make sure to pack for the climate and expected
          activities.
        </p>

        <h2 className="text-base font-semibold">Stay Safe and Healthy</h2>
        <p>
          Safety and health should be your top priorities. Get vaccinated if applicable,
          buy travel insurance, and be aware of local emergency numbers. Carry a basic
          first-aid kit and necessary medications.
        </p>

        <h2 className="text-base font-semibold">Immerse Yourself in the Local Culture</h2>
        <p>
          Engage with locals, try traditional foods, learn a few basic phrases of the local
          language, and participate in cultural events. Respect traditions and norms to show
          appreciation and openness.
        </p>

        <h2 className="text-base font-semibold">Conclusion</h2>
        <p>
          Traveling is one of the best ways to explore a blend of discovery, growth, and
          enjoyment. With the right preparation and mindset, every journey can be a
          transformative experience. Safe travels!
        </p>
      </section>
    </article>
  );
}
