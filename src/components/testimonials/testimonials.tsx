'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star } from 'lucide-react';
import i18n from '@/i18n';

function Testimonials() {
  return (
    <section className="py-16 max-[639px]:py-4">
      <div className="bg-[url('/assets/img/linesBg.png')] bg-cover bg-no-repeat bg-center bg-scroll pb-24 max-[639px]:pb-8">
        <div className="lg:w-full min-[1600px]:w-[1600px] sm:w-full sm:px-28 lg:px-0 mx-auto">
          <h2 className="font-bold text-5xl mb-2 text-center pt-12 max-[639px]:text-3xl">
            {i18n.t('en_what_student_say')}{' '}
            <span className="text-[#FFB600]">{i18n.t('en_about_us')}</span> ?
          </h2>

          <div className="w-[1000px] max-[1200px]:w-full mx-auto bg-[#D9D9D9]/[0.30] px-8  mt-12 max-[639px]:mt-4">
            <Swiper
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={true}
              modules={[Pagination, Autoplay]}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="py-12">
                  <p className="text-center italic pb-8 text-[#666] max-[639px]:tex-sm">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using Content here, content here, making it look like
                  </p>
                  <div className="flex items-center justify-center">
                    <div className="avatar w-16 h-16 bg-gray-500 rounded-full"></div>
                    <div className="ml-3">
                      <p className="text-lg font-normal mb-0 italic leading-4">
                        Rundransh Singh
                      </p>
                      <small>M.D Student</small>
                    </div>
                  </div>
                  <ul className="flex items-center justify-center py-4">
                    <li className="mr-1">
                      <Star fill="#FFB800" stroke="none" />
                    </li>
                    <li className="mr-1">
                      <Star fill="#FFB800" stroke="none" />
                    </li>
                    <li className="mr-1">
                      <Star fill="#FFB800" stroke="none" />
                    </li>
                    <li className="mr-1">
                      <Star fill="#FFB800" stroke="none" />
                    </li>
                    <li>
                      <Star fill="#DEDEDE" stroke="none" />
                    </li>
                  </ul>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="py-12">
                  <p className="text-center italic pb-8 text-[#666] max-[639px]:tex-sm">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using Content here, content here, making it look like
                  </p>
                  <div className="flex items-center justify-center">
                    <div className="avatar w-16 h-16 bg-gray-500 rounded-full"></div>
                    <div className="ml-3">
                      <p className="text-lg font-normal mb-0 italic leading-4">
                        Arpita Singh
                      </p>
                      <small>M.B.B.S Student</small>
                    </div>
                  </div>
                  <ul className="flex items-center justify-center py-4">
                    <li className="mr-1">
                      <Star fill="#FFB800" stroke="none" />
                    </li>
                    <li className="mr-1">
                      <Star fill="#FFB800" stroke="none" />
                    </li>
                    <li className="mr-1">
                      <Star fill="#FFB800" stroke="none" />
                    </li>
                    <li className="mr-1">
                      <Star fill="#FFB800" stroke="none" />
                    </li>
                    <li>
                      <Star fill="#DEDEDE" stroke="none" />
                    </li>
                  </ul>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="py-12">
                  <p className="text-center italic pb-8 text-[#666] max-[639px]:tex-sm">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using Content here, content here, making it look like
                  </p>
                  <div className="flex items-center justify-center">
                    <div className="avatar w-16 h-16 bg-gray-500 rounded-full"></div>
                    <div className="ml-3">
                      <p className="text-lg font-normal mb-0 italic leading-4">
                        Rundransh Singh
                      </p>
                      <small>M.B.B.S Student</small>
                    </div>
                  </div>
                  <ul className="flex items-center justify-center py-4">
                    <li className="mr-1">
                      <Star fill="#FFB800" stroke="none" />
                    </li>
                    <li className="mr-1">
                      <Star fill="#FFB800" stroke="none" />
                    </li>
                    <li className="mr-1">
                      <Star fill="#FFB800" stroke="none" />
                    </li>
                    <li className="mr-1">
                      <Star fill="#FFB800" stroke="none" />
                    </li>
                    <li>
                      <Star fill="#DEDEDE" stroke="none" />
                    </li>
                  </ul>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="py-12">
                  <p className="text-center italic pb-8 text-[#666] max-[639px]:tex-sm">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using Content here, content here, making it look like
                  </p>
                  <div className="flex items-center justify-center">
                    <div className="avatar w-16 h-16 bg-gray-500 rounded-full"></div>
                    <div className="ml-3">
                      <p className="text-lg font-normal mb-0 italic leading-4">
                        Arpita Singh
                      </p>
                      <small>M.B.B.S Student</small>
                    </div>
                  </div>
                  <ul className="flex items-center justify-center py-4">
                    <li className="mr-1">
                      <Star fill="#FFB800" stroke="none" />
                    </li>
                    <li className="mr-1">
                      <Star fill="#FFB800" stroke="none" />
                    </li>
                    <li className="mr-1">
                      <Star fill="#FFB800" stroke="none" />
                    </li>
                    <li className="mr-1">
                      <Star fill="#FFB800" stroke="none" />
                    </li>
                    <li>
                      <Star fill="#DEDEDE" stroke="none" />
                    </li>
                  </ul>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
