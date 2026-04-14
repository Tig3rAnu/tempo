import i18n from '@/i18n';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import Link from 'next/link';
import { ChevronsRight, MapPin } from 'lucide-react';

function TopUniversity() {
  return (
    <section className="py-16 max-[575px]:py-4 bg-[url('/img/services_lines.png')]">
      <div className="container">
        <div className="text-center">
          <h2 className="text-5xl text-black font-bold pb-8 max-[575px]:text-3xl">
            {i18n.t('en_discover_university')}{' '}
            <span className="text-[#FFB600]">{i18n.t('en_universities')}</span>
          </h2>
          <p className="max-[575px]:text-sm">
            {i18n.t('en_best_university_discription')}
          </p>
        </div>
        <div className="py-8">
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              '@0.00': {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              '@0.75': {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              '@1.00': {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              '@1.50': {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide className="mb-16">
              <Link href="/universities/123">
                <Card className="pt-8 relative bg-[url('/img/university_img.png')] bg-no-repeat bg-center h-[280px] rounded-bl-3xl rounded-br-3xl">
                  <div className="w-full h-full absolute top-0 left-0 bg-[#1546FF]/[0.5] rounded-bl-3xl rounded-br-3xl"></div>
                  <CardContent className="w-full absolute bottom-0 left-0 bg-[#FFB600]/[0.8] rounded-bl-3xl rounded-br-3xl">
                    <h3 className="text-2xl font-bold py-4 text-black max-[575px]:text-xl">
                      Long established fact
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center self-center text-xl">
                        More Info <ChevronsRight size={20} className="mt-1" />
                      </span>
                      <span className="flex items-center self-center text-xl">
                        <MapPin size={18} className="mr-2" /> Russia
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </SwiperSlide>
            <SwiperSlide className="mb-16">
              <Link href="/universities/1234">
                <Card className="pt-8 relative bg-[url('/img/university_img.png')] bg-no-repeat bg-center h-[280px] rounded-bl-3xl rounded-br-3xl">
                  <div className="w-full h-full absolute top-0 left-0 bg-[#1546FF]/[0.5] rounded-bl-3xl rounded-br-3xl"></div>
                  <CardContent className="w-full absolute bottom-0 left-0 bg-[#FFB600]/[0.8] rounded-bl-3xl rounded-br-3xl">
                    <h3 className="text-2xl font-bold py-4 text-black max-[575px]:text-xl">
                      Long established fact
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center self-center text-xl">
                        More Info <ChevronsRight size={20} className="mt-1" />
                      </span>
                      <span className="flex items-center self-center text-xl">
                        <MapPin size={18} className="mr-2" /> Russia
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </SwiperSlide>
            <SwiperSlide className="mb-16">
              <Link href="/universities/12345">
                <Card className="pt-8 relative bg-[url('/img/university_img.png')] bg-no-repeat bg-center h-[280px] rounded-bl-3xl rounded-br-3xl">
                  <div className="w-full h-full absolute top-0 left-0 bg-[#1546FF]/[0.5] rounded-bl-3xl rounded-br-3xl"></div>
                  <CardContent className="w-full absolute bottom-0 left-0 bg-[#FFB600]/[0.8] rounded-bl-3xl rounded-br-3xl">
                    <h3 className="text-2xl font-bold py-4 text-black max-[575px]:text-xl">
                      Long established fact
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center self-center text-xl">
                        More Info <ChevronsRight size={20} className="mt-1" />
                      </span>
                      <span className="flex items-center self-center text-xl">
                        <MapPin size={18} className="mr-2" /> Russia
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </SwiperSlide>
            <SwiperSlide className="mb-16">
              <Link href="/universities/123456">
                <Card className="pt-8 relative bg-[url('/img/university_img.png')] bg-no-repeat bg-center h-[280px] rounded-bl-3xl rounded-br-3xl">
                  <div className="w-full h-full absolute top-0 left-0 bg-[#1546FF]/[0.5] rounded-bl-3xl rounded-br-3xl"></div>
                  <CardContent className="w-full absolute bottom-0 left-0 bg-[#FFB600]/[0.8] rounded-bl-3xl rounded-br-3xl">
                    <h3 className="text-2xl font-bold py-4 text-black max-[575px]:text-xl">
                      Long established fact
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center self-center text-xl">
                        More Info <ChevronsRight size={20} className="mt-1" />
                      </span>
                      <span className="flex items-center self-center text-xl">
                        <MapPin size={18} className="mr-2" /> Russia
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </SwiperSlide>
            <SwiperSlide className="mb-16">
              <Link href="/universities/1234567">
                <Card className="pt-8 relative bg-[url('/img/university_img.png')] bg-no-repeat bg-center h-[280px] rounded-bl-3xl rounded-br-3xl">
                  <div className="w-full h-full absolute top-0 left-0 bg-[#1546FF]/[0.5] rounded-bl-3xl rounded-br-3xl"></div>
                  <CardContent className="w-full absolute bottom-0 left-0 bg-[#FFB600]/[0.8] rounded-bl-3xl rounded-br-3xl">
                    <h3 className="text-2xl font-bold py-4 text-black max-[575px]:text-xl">
                      Long established fact
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center self-center text-xl">
                        More Info <ChevronsRight size={20} className="mt-1" />
                      </span>
                      <span className="flex items-center self-center text-xl">
                        <MapPin size={18} className="mr-2" /> Russia
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </SwiperSlide>
            <SwiperSlide className="mb-16">
              <Link href="/universities/12345678">
                <Card className="pt-8 relative bg-[url('/img/university_img.png')] bg-no-repeat bg-center h-[280px] rounded-bl-3xl rounded-br-3xl">
                  <div className="w-full h-full absolute top-0 left-0 bg-[#1546FF]/[0.5] rounded-bl-3xl rounded-br-3xl"></div>
                  <CardContent className="w-full absolute bottom-0 left-0 bg-[#FFB600]/[0.8] rounded-bl-3xl rounded-br-3xl">
                    <h3 className="text-2xl font-bold py-4 text-black max-[575px]:text-xl">
                      Long established fact
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center self-center text-xl">
                        More Info <ChevronsRight size={20} className="mt-1" />
                      </span>
                      <span className="flex items-center self-center text-xl">
                        <MapPin size={18} className="mr-2" /> Russia
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
export default TopUniversity;
