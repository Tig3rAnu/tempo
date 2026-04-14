import i18n from '@/i18n';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Kanit } from 'next/font/google';
import Link from 'next/link';

const kanit = Kanit({
  subsets: ['latin'],
  weight: '700',
});
function Banner() {
  return (
    <div className="bg-[#FFE49B]/[0.6] w-full h-[845px] max-[1600px]:h-[600px] relative max-[650px]:h-[400px]">
      <Image
        src="/img/circle.png"
        width={147}
        height={371}
        className="absolute top-2/4 -translate-y-2/3 left-0 opacity-25"
        alt="circle image"
      />
      <div className="container h-full relative">
        <div className="absolute top-2/4 -translate-y-2/4 w-[62%] max-[650px]:w-full max-[650px]:px-4  max-[1600px]:-translate-y-1/4 max-[1200px]:left-0 max-[1200px]:right-0 max-[1200px]:mx-auto">
          <h1 className="typewriting text-6xl font-bold leading-[70px] max-[1343px]:text-5xl max-[650px]:text-xl">
            {i18n.t('en_banner_title1')}
          </h1>
          <h2 className="text-6xl font-bold leading-[70px] max-[1343px]:text-5xl max-[650px]:text-2xl">
            {i18n.t('en_banner_title2')}{' '}
            <span className="text-[#FFB600]/[0.9]">
              {i18n.t('en_banner_title3')}
            </span>{' '}
            {i18n.t('en_abroad')}
          </h2>
          <p className="text-xl py-4 max-[1343px]:text-lg max-[650px]:text-sm">
            {i18n.t('en_banner_discription')}
          </p>
          <div className="mt-8 max-[639px]:mt-0">
            <Link
              href="/fee-deposite"
              className="animate-bounce inline-block px-4 py-2 mr-4 rounded-full bg-[#FFC83E] dark:bg-white hover:bg-[#1546FF] transition-all text-black hover:text-white dark:text-black"
            >
              {i18n.t('en_deposite_fee')}
            </Link>
            <Link
              href="/apply-course/medical"
              className="rounded-full inline-block py-2 px-4 bg-[#1546FF] dark:bg-white hover:bg-[#FFC83E] transition-all text-white hover:text-black dark:text-black"
            >
              {i18n.t('en_apply_now')}
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-[#1546FF] w-[450px] absolute h-full right-0 top-0 max-[1200px]:hidden">
        <Image
          src="/img/banner_texture_group.png"
          width={450}
          height={845}
          className="w-full h-full"
          alt="texture"
        />
        <div
          className="
        bg-[#FFC83E] 
          absolute 
          bottom-0 
          min-[1850px]:right-[40%] 
          max-[1800px]:right-[15px] 
          rounded-tl-[200px]
          rounded-tr-[200px]
          w-[512px]
          h-[598px]
          max-[1850px]:w-[350px]
          max-[1850px]:h-[480px]
          banner_round_shape"
        >
          <Image
            src="/img/banner_girl_img.png"
            width={413}
            height={718}
            alt="banner girl image"
            className="absolute bottom-0 left-0 right-0 z-10 mx-auto max-[1600px]:h-[550px] max-[1600px]:w-[320px]"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
