import React from 'react';
import { Search, X } from 'lucide-react';

const Favorites = () => {
  const favorites = [
    {
      id: 1,
      title: 'Superman Comic',
      publisher: 'DC',
      image: 'https://s3-alpha-sig.figma.com/img/571a/e2f3/af94054c21b404db18ffb2222cfc8274?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Tm1dzjt3iR7brKs6Il5OAYLRT0kYesGIPJyOMBo3rV7jmqT3lOPDkqpvVshs-V8WyWiAwCQaMxoQUty87cnzq3n5Hdisoqp0uW6UKkiCLwkIXdUoYjgU4VVh-3e8DamvS11b78peLPAH83LWXnR0y4B3gUIbBSv7yYVKlsQ72Iin0NnNSgrg0j51QfXXHUoLTaecp9TGbNzY-~o-~X1CEEQvSvmKxnVpbCw9lEVTQarsPJg-FxrkazIULtn2C3xRK9E2BQhnk99Ax6eMOVU0WlFPOj5-mxT2AVnnb2j6NDYFv0Y6L~jBfQOhV0TOAN7Ip5-BnodUBquMOANTgDCRiA__',
      color: 'bg-blue-200'
    },
    {
      id: 2,
      title: 'Spider-man Comic',
      publisher: 'Marvel',
      image: 'https://s3-alpha-sig.figma.com/img/71eb/cc30/182201dc2d8c93de4a2123cbbd195384?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eu9Yfk5331vpX2JrQ4cOAn5kBByJr8jNmnP7AqND-sxQRyaCu4pEgWF3Lo7uqeNkphPi2vtH56np1kUOI4ir3xA6rZj9B28W6BXB~gf29KgeRg7yMBhUpGOgAu0SqX5~NbA4N5h22DyoCV3OEGZWdEMGkaw8bnTSqoUb2iPUpfru53g-sWz2BWx0dx4rUO92xW~A2N-cpUBOf7Q1MrrNLy7Tytg64YDB-Ut2H2zNrCRivVGTeh4bfe2bAd3cmR9X0WSAAVU4myzQRLlKKoM-5MOxQEPr3PmRWJc0POPv1yeWeI18o8E4sS51c~MyngzBYNuBM3wIWXKHINwFedUyqQ__',
      color: 'bg-red-200'
    },
    {
      id: 3,
      title: 'Superman Comic',
      publisher: 'DC',
      image: 'https://s3-alpha-sig.figma.com/img/187b/94b7/d0de71faee276635a86ff242af707a9c?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ikNgcpMWfOYGs2cS6e8i1VN3eTcFZ4nfqgjkVF-1vCJ9KmWChC4jTLoljp4xN5LVnNzVO2yzSw3yHbzc4jDP9~5fvH81rqu9HVcQVyPMJkQwAr0cpoTTHPimnAGYgB6kA4NcdREPj5Q8BDFF4FnTMAK9hg5T0om9r1D1oLIVQVHIltFRISmb~bP3RpkXqrmd3rX6PcCr6GE1WbUwDLvmevfYOwRjeHtKgyewlDeK8RSnaLFJU42l93Jpq04TKpHX85cWGohhLl8bAUVSFirJz7Lhm52caPFHI5-8cVkKwNbXarX-eNtV3IyEhZTgLGCUW7zLji--V5dCTUea430OTw__',
      color: 'bg-green-200'
    },
    {
      id: 4,
      title: 'Superman Comic',
      publisher: 'Type',
      image: 'https://s3-alpha-sig.figma.com/img/1654/21f0/086d0b2881fbc9dbca4d50727e283dd2?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IV1PmoC8b8il6zmNJCDcu81V4J2wvPY35JoCFtftgxEXrrGW0XMha-hsYsqIH14caLB9z0cD3jnKBL~rKyhYQJqALGJ1EXVTYhd-MH-EqgMxjdpXVBHXhkxOPKB3UWGoHDAKLw7pd93trfAnNY~LyGGlyJR4VfZTtA3Bk2UAQ6OXs7M-hZuiNvyQihQF4lwq5iC4r6PJnVi5D1ex08oN9ufG72cUttncQ79nCUdXGgwwmHBGHb79pqAQfx91rOIQ3~QmLExcdHjyV3f6lBJuNgx~xvZISgjR2hUE85uRb93q09fj~LXSgp~nHuYWCsV1Dn2YCnzrEluLupnnC6Rtig__',
      color: 'bg-green-200'
    },
    {
      id: 4,
      title: 'Superman Comic',
      publisher: 'Type',
      image: 'https://s3-alpha-sig.figma.com/img/1654/21f0/086d0b2881fbc9dbca4d50727e283dd2?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IV1PmoC8b8il6zmNJCDcu81V4J2wvPY35JoCFtftgxEXrrGW0XMha-hsYsqIH14caLB9z0cD3jnKBL~rKyhYQJqALGJ1EXVTYhd-MH-EqgMxjdpXVBHXhkxOPKB3UWGoHDAKLw7pd93trfAnNY~LyGGlyJR4VfZTtA3Bk2UAQ6OXs7M-hZuiNvyQihQF4lwq5iC4r6PJnVi5D1ex08oN9ufG72cUttncQ79nCUdXGgwwmHBGHb79pqAQfx91rOIQ3~QmLExcdHjyV3f6lBJuNgx~xvZISgjR2hUE85uRb93q09fj~LXSgp~nHuYWCsV1Dn2YCnzrEluLupnnC6Rtig__',
      color: 'bg-green-200'
    },
    {
      id: 4,
      title: 'Superman Comic',
      publisher: 'Type',
      image: 'https://s3-alpha-sig.figma.com/img/1654/21f0/086d0b2881fbc9dbca4d50727e283dd2?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IV1PmoC8b8il6zmNJCDcu81V4J2wvPY35JoCFtftgxEXrrGW0XMha-hsYsqIH14caLB9z0cD3jnKBL~rKyhYQJqALGJ1EXVTYhd-MH-EqgMxjdpXVBHXhkxOPKB3UWGoHDAKLw7pd93trfAnNY~LyGGlyJR4VfZTtA3Bk2UAQ6OXs7M-hZuiNvyQihQF4lwq5iC4r6PJnVi5D1ex08oN9ufG72cUttncQ79nCUdXGgwwmHBGHb79pqAQfx91rOIQ3~QmLExcdHjyV3f6lBJuNgx~xvZISgjR2hUE85uRb93q09fj~LXSgp~nHuYWCsV1Dn2YCnzrEluLupnnC6Rtig__',
      color: 'bg-green-200'
    },
    {
      id: 4,
      title: 'Superman Comic',
      publisher: 'Type',
      image: 'https://s3-alpha-sig.figma.com/img/1654/21f0/086d0b2881fbc9dbca4d50727e283dd2?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IV1PmoC8b8il6zmNJCDcu81V4J2wvPY35JoCFtftgxEXrrGW0XMha-hsYsqIH14caLB9z0cD3jnKBL~rKyhYQJqALGJ1EXVTYhd-MH-EqgMxjdpXVBHXhkxOPKB3UWGoHDAKLw7pd93trfAnNY~LyGGlyJR4VfZTtA3Bk2UAQ6OXs7M-hZuiNvyQihQF4lwq5iC4r6PJnVi5D1ex08oN9ufG72cUttncQ79nCUdXGgwwmHBGHb79pqAQfx91rOIQ3~QmLExcdHjyV3f6lBJuNgx~xvZISgjR2hUE85uRb93q09fj~LXSgp~nHuYWCsV1Dn2YCnzrEluLupnnC6Rtig__',
      color: 'bg-green-200'
    },
    {
      id: 4,
      title: 'Superman Comic',
      publisher: 'Type',
      image: 'https://s3-alpha-sig.figma.com/img/1654/21f0/086d0b2881fbc9dbca4d50727e283dd2?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IV1PmoC8b8il6zmNJCDcu81V4J2wvPY35JoCFtftgxEXrrGW0XMha-hsYsqIH14caLB9z0cD3jnKBL~rKyhYQJqALGJ1EXVTYhd-MH-EqgMxjdpXVBHXhkxOPKB3UWGoHDAKLw7pd93trfAnNY~LyGGlyJR4VfZTtA3Bk2UAQ6OXs7M-hZuiNvyQihQF4lwq5iC4r6PJnVi5D1ex08oN9ufG72cUttncQ79nCUdXGgwwmHBGHb79pqAQfx91rOIQ3~QmLExcdHjyV3f6lBJuNgx~xvZISgjR2hUE85uRb93q09fj~LXSgp~nHuYWCsV1Dn2YCnzrEluLupnnC6Rtig__',
      color: 'bg-green-200'
    },
    {
      id: 4,
      title: 'Superman Comic',
      publisher: 'Type',
      image: 'https://s3-alpha-sig.figma.com/img/1654/21f0/086d0b2881fbc9dbca4d50727e283dd2?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IV1PmoC8b8il6zmNJCDcu81V4J2wvPY35JoCFtftgxEXrrGW0XMha-hsYsqIH14caLB9z0cD3jnKBL~rKyhYQJqALGJ1EXVTYhd-MH-EqgMxjdpXVBHXhkxOPKB3UWGoHDAKLw7pd93trfAnNY~LyGGlyJR4VfZTtA3Bk2UAQ6OXs7M-hZuiNvyQihQF4lwq5iC4r6PJnVi5D1ex08oN9ufG72cUttncQ79nCUdXGgwwmHBGHb79pqAQfx91rOIQ3~QmLExcdHjyV3f6lBJuNgx~xvZISgjR2hUE85uRb93q09fj~LXSgp~nHuYWCsV1Dn2YCnzrEluLupnnC6Rtig__',
      color: 'bg-green-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Background Image Container - Ajustado para escritorio */}
      <div 
        className="fixed top-0 left-0 right-0 h-60 lg:h-72 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://s3-alpha-sig.figma.com/img/e99b/5da8/a52db4fd64894930c7407e9673bb78ee?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OyxAb8N79rL9NSkepNcxqeXuYtfih-IS1wST3CCQu7z~hYQmYxziuJ~7Cp1IVxXsHUlUIuBk9RfDZ-OlKLupLMgv5nW7Mln34gFAiytq4ldsghnB7vx5iyx2N1xhrdHw9DoFkRlqeui8ABraxf16c1SjbmAHQsT4CX6UGiDG20GUu6vFhmQRMBybWiDoQvWwSOjMST~DbKuKHCUOm2WGgN5Wud6OVd3P1HUcHHlDsRmZBJIpctgH8yjd9l3ADiSiUjAqheUsoba8vJchCqGByl-1esHW8Serp6dY2G-uj2fuOHv3hYvFcBoKawzkR-fLbFjM4bdpn5vDkZGHHkn-Eg__')`
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Content Container - Centrado y con máximo ancho en escritorio */}
      <div className="relative pt-8 container mx-auto max-w-7xl">
        {/* Title - Tamaño aumentado en escritorio */}
        <h1 className="text-white text-center text-3xl lg:text-4xl font-bold mb-8">Favourites</h1>

        {/* Search Bar - Centrado y con ancho máximo en escritorio */}
        <div className="px-4 mb-6 pt-8 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Find your manga here"
              className="w-full px-4 py-3 rounded-full shadow-lg pl-12"
            />
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          </div>
        </div>

        {/* Favorites Grid - Transformado en grid para escritorio */}
        <div className="px-4 space-y-4 lg:space-y-0 pb-4 lg:grid lg:grid-cols-2 lg:gap-6 xl:grid-cols-3 2xl:grid-cols-4">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-3xl p-4 shadow-md transition-transform hover:scale-105"
            >
              {/* Close Button - Ajustado para consistencia en escritorio */}
              <button className="absolute top-4 left-8 z-10 hover:bg-gray-100 p-1 rounded-full transition-colors">
                <X size={20} className="text-gray-400" />
              </button>

              <div className="flex items-center">
                <div className={`w-1.5 h-24 rounded-full ${item.color} mr-4`}></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg lg:text-xl">{item.title}</h3>
                  <p className="text-sm lg:text-base text-gray-500">{item.publisher}</p>
                </div>
                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;