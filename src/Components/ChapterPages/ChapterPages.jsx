import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules';

//css
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import './ChapterPages.css'

//data
import { mangas } from '../../MockData/dataChapters'
console.log(mangas[0].chapters[0].pages);


export default function ChapterPages() {

    return (
        <>
        <Swiper className='mySwiper'
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={30}
            freeMode={true}
            navigation={true}
            modules={[Navigation, Pagination]}
            effect='fade'
            fadeEffect={{
                crossFade: true,
            }}
            speed={2000}
            breakpoints={{
                480: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    slidesPerGroup: 4,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                    slidesPerGroup: 3,
                },
                1024: {
                    slidesPerView: 1,
                    spaceBetween: 50,
                    slidesPerGroup: 1,
                },
            }}

        >


            {mangas[0].chapters[0].pages.map((p, i) => (
                <SwiperSlide key={i} >
                    <img src={p} alt=""/>
                </SwiperSlide>
            ))}
        </Swiper>
    </>
    );
}