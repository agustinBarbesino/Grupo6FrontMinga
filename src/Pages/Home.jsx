import { useState } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="flex flex-col w-full bg-[#F4F4F4] pb-16 pt-16">
      <div className="min-h-[calc(100vh-40vh)]">
        {/* Carousel Section */}
        <section className="hidden lg:block w-full py-8 px-4 bg-[#F4F4F4]">
          <div className="relative w-full max-w-[1258px] h-[265px] mx-auto">
            <div className="w-full h-full bg-[#F472B6] flex flex-col md:flex-row items-center p-4 md:p-6 rounded-lg">
              {/* Button left */}
              <button
                onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
                className="hidden md:flex text-white bg-[#F9A8D4] p-2 md:p-3 rounded-full items-center justify-center z-10 hover:bg-[#F472B6] transition-colors"
              >
                <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Content */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-1 relative md:pr-16">
                {/* img left */}
                <div className="hidden md:flex relative items-center justify-center">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/74c1/1422/523fb73c0843c17b79f58c0508ca9f7a?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZlN3FIRihLVZge57SXiX1Y8ynT0RJ20sScsxcFHQlFOkhDtoM4U~NUmPezSURSVPgqOJ2w9cXibkrSbo7iRigISJ6I6W~aduUp4qKBYa~Wyu2fDoBwOYEjIn19ciywGGMkb2uqWfmEJ6a5yjZfBXQx6UjVJhseXIT9n0EfTFoKzTh8k1JTRPbEZRdy5HSbjjtKkVk5EhHJp4bO-NnFHs-CJjSlfbhHtUMPfhD05i1~Qkm2uaFXV371ERWgIoefD~cHn~edR52fkx5C6vcoSoRCY3TiIxVl2yqFoCSWA4HsjDrUPZvk0yapZNnzvkJjuhZogPpAvTH5o35jQOS6Qvaw__"
                    alt="Naruto Delay"
                    className="w-48 md:w-[277px] h-56 md:h-[307px] mb-6"
                  />
                </div>

                {/* img center */}
                <div className="hidden md:flex relative items-center justify-center">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/511b/7568/ef59acdd63429092bed163f4a51dbf16?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DYE9CpAdWN4euhi59tXTOKnjGXA9-G1CoI2u0xomstMP0J8x6up79iXOgwnGyfCeX-CteUYgxzVpDSKSm3JJzxmmVyIXU7orkuNQNQjiNWZUM3LKG7LUeBsVRH-AATRsl7rsh21aJA0xkZrmq0CU~mUkVFn9w2oGEb~cs8XGxVGJZKpPOlHWZLHmVlCE4albbVCKQB9GChpXFQehDa6-Pks4QeLC4gJgWI~k9PsvAaNXVpAAMFgBgBLrt3XfnpbwsGrL~FeEwkHxYpbyU8PTxiQMw8xwF-vmcbGZT8H0j5QhuiCwRaFNCzlK0RkBfCaD7mB5CMtVohDht7XuHEClPg__"
                    alt="Carrusso"
                    className="w-36 md:w-[180px] h-56 md:h-[284px] rounded-lg mb-16"
                  />
                </div>

                {/* Text */}
                <div className="text-white text-center md:text-left">
                  <h2 className="text-xl md:text-2xl mb-2 pt-32">Shonen</h2>
                  <p className="text-xs">
                    Is the manga that is aimed at adolescent boys. They are series with large amounts of action, in which humorous situations often occur. The camaraderie between members of a collective or a combat team stands out.
                  </p>
                </div>
              </div>

              {/* button right */}
              <button
                onClick={() => setCurrentSlide((prev) => prev + 1)}
                className="hidden md:flex text-white bg-[#F9A8D4] p-2 md:p-3 rounded-full items-center justify-center z-10 hover:bg-[#F472B6] transition-colors"
              >
                <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative mx-auto">
          <div className="relative w-full max-w-[1258px] lg:h-[551px] h-screen mx-auto flex items-center">
            {/* Background image */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src="https://s3-alpha-sig.figma.com/img/c3ca/6946/5e5e0084c33976fd998b27efb07aded4?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hTtGgNfuPtvJDmq4aJpdOJKQ4f3iPd553pcQb~fJZVljyj0x0aCTINMUNeJQjITpgHPcNWm8FXyPrckj3j54FZyTrjAOtVIwablfx5fzBCSLvVFOrK7b5P66-xeABnqXVZJFKme~CNup0V084RvDhTf06HQ~HCNacnuUxqlzhpfChWMQGg1wxCtW3xf2uTuCRTkHKsUQWTP9LL5OXbQ-IWaknXytpNFrm-wfn1Z-ZqLS-tDfE6nwDEaumQFELLPZcknwe2MdmnPqFS4BuDEzvQX3qxxI4zLfkZcWmx8I3uw~nJZgYKExV3~tRjXXl4zaLBEFXcBxjv-em30sypT6Og__"
                alt="Background"
                className="w-full h-full object-cover lg:object-[center_-200px]"
              />
              <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Hero content - Left Aligned */}
            <div className="relative z-0 text-white px-6 md:px-8 lg:px-8 w-full h-full flex flex-col justify-center lg:justify-end pb-16">
              <div className="ml-0 md:ml-10 lg:ml-20 space-y-4 text-center lg:text-left">
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold">
                  Live the emotion of the manga
                </h1>
                <p className="text-base md:text-2xl max-w-md">
                  Find the perfect manga for you
                </p>
                <p className="text-base max-w-md">
                  #MingaForever 🔥
                </p>
                <button className="bg-[#F472B6] w-full max-w-[200px] py-3 text-white font-medium hover:bg-[#F9A8D4] text-xl rounded-md">
                  Sign In!
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}