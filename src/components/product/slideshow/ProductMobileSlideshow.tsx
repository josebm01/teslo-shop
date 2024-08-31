'use client'

import {Swiper, SwiperSlide} from 'swiper/react'
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';
import { ProductImage } from '../product-image/ProductImage';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
  return (
    <div className={ className }>
      {/* Swiper */}
    <Swiper
      style={{
        width: '100vw',
        height: '500px'
      }}
        pagination
        autoplay={{
          delay: 2500 // cambiar de imagen cada 2.5 segundos
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >

        {
          images.map( image => (
            <SwiperSlide key={ image }>
              <ProductImage 
                width={ 600}
                height={ 500 } 
                src={image}
                alt={ title }
                className='rounded-lg object-fill'
              />
            </SwiperSlide>
          ))
        }
       
      </Swiper>

    </div>
  )
}
