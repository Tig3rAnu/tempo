import i18n from '@/i18n';
import {
  BookOpenCheck,
  ClipboardPen,
  GraduationCap,
  Navigation,
} from 'lucide-react';
import { Inter } from 'next/font/google';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import Image from 'next/image';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '600', '700', '800', '900'],
});

function ServicesAt() {
  const data = [
    {
      icon: <ClipboardPen color="#fff" />,
      title: '100% Online Admission',
      description:
        'Are you aspiring to study abroad in the field of medicine or non-medical disciplines, but unable to travel? Look no further! Our 100% online admission service offers you the opportunity to pursue your dreams from the comfort of your own home.',
    },
    {
      icon: <Navigation color="#fff" />,
      title: 'Visa & Travel Arrangements',
      description:
        "Embarking on your study abroad adventure is an exciting endeavor, and we're here to make the visa and travel arrangements a breeze. At siksha study, we understand that the logistics of obtaining a visa, booking flights, and preparing for international travel can be daunting.",
    },
    {
      icon: <BookOpenCheck color="#fff" />,
      title: 'Expert Guidance',
      description:
        "We understand that planning a study abroad experience can be overwhelming. That's why we offer expert guidance and resources every step of the way. From choosing the right program to handling visa applications and financial planning, we've got you covered.",
    },
    {
      icon: <GraduationCap color="#fff" />,
      title: 'Student Insights',
      description:
        'Hear directly from students who have already studied abroad. Learn from their experiences, gain valuable tips, and get a sneak peek into life as an international student.',
    },
  ];
  return (
    <section className="max-[575px]:py-4 py-16 bg-[url('/img/services_lines.png')]">
      <div className="container">
        <div className="text-center pb-16 max-[575px]:pb-4">
          <small
            className={`text-[#1546FF] text-2xl font-semibold ${inter.className}`}
          >
            {i18n.t('en_how_dohelp')}
          </small>
          <h2 className="text-5xl font-bold max-[575px]:text-3xl">
            {i18n.t('en_servicesat')}{' '}
            <span className="text-[#FFB600]">{i18n.t('en_siksha')}</span>
          </h2>
          <p>{i18n.t('en_subheading_title1')}</p>
        </div>
        <div className="flex items-center xl:max-xl:space-x-4 justify-center flex-wrap">
          {(data || []).map((sr) => {
            return (
              <div className="w-1/4 max-[575px]:w-full sm:max-md:w-full md:max-xl:w-1/2 pt-8 px-4">
                <Card
                  className="pt-8 px-4 relative rounded-br-2xl mb-4 max-[575px]:mb-2"
                  key={sr.title}
                >
                  <CardHeader className="p-0">
                    <CardTitle className="flex items-center flex-wrap">
                      <span className="relative w-12 h-12 rounded-full bg-[#1546FF] flex justify-center items-center mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        {sr.icon}
                      </span>
                      <span className="text-lg">{sr.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 py-4 h-[115px] overflow-hidden">
                    {sr.description}
                  </CardContent>
                  <CardFooter className="flex justify-between p-0">
                    <Button className="p-0 bg-transparent text-[#1546FF] underline font-semibold hover:bg-transparent hover:text-[#FFB600] transition-all">
                      Read More
                    </Button>
                  </CardFooter>
                  <Image
                    src="/img/corner.png"
                    width={73}
                    height={41}
                    className="absolute bottom-0 right-0"
                    alt="corner img"
                  />
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesAt;
