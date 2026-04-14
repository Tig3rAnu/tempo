'use client';
import { Card, CardContent } from '@/components/ui/card';
import i18n from '@/i18n';
import { ChevronsRight, MapPin } from 'lucide-react';
import Link from 'next/link';

function UniversitiesList() {
  return (
    <main>
      <section className="overlay bg-[url('/img/studen_guide_bg.png')] bg-center bg-no-repeat bg-cover h-[650px] relative max-[991px]:h-[300px]">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 mx-auto text-center w-1/2 z-10 max-[991px]:w-full">
          <h2 className="text-7xl text-[#FF9A02] font-bold pb-4 max-[991px]:text-3xl">
            {i18n.t('en_universities')}
          </h2>
        </div>
      </section>
      <section className="py-16">
        <div className="container max-[575px]:px-4">
          <div className="flex items-center flex-wrap w-full">
            <div className="mb-16 w-1/4 px-2 max-[575px]:w-full max-[991px]:w-1/2 max-[575px]:mb-4">
              <Link href="/universities/123">
                <Card className="pt-8 relative bg-[url('/img/university_img.png')] bg-no-repeat bg-center h-[280px] rounded-bl-3xl rounded-br-3xl">
                  <div className="w-full h-full absolute top-0 left-0 bg-[#1546FF]/[0.5] rounded-bl-3xl rounded-br-3xl"></div>
                  <CardContent className="w-full absolute bottom-0 left-0 bg-[#FFB600]/[0.8] rounded-bl-3xl rounded-br-3xl">
                    <h3 className="text-2xl font-bold py-4 text-black">
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
            </div>
            <div className="mb-16 w-1/4 px-2 max-[575px]:w-full max-[991px]:w-1/2 max-[575px]:mb-4">
              <Link href="/universities/1234">
                <Card className="pt-8 relative bg-[url('/img/university_img.png')] bg-no-repeat bg-center h-[280px] rounded-bl-3xl rounded-br-3xl">
                  <div className="w-full h-full absolute top-0 left-0 bg-[#1546FF]/[0.5] rounded-bl-3xl rounded-br-3xl"></div>
                  <CardContent className="w-full absolute bottom-0 left-0 bg-[#FFB600]/[0.8] rounded-bl-3xl rounded-br-3xl">
                    <h3 className="text-2xl font-bold py-4 text-black">
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
            </div>
            <div className="mb-16 w-1/4 px-2 max-[575px]:w-full max-[991px]:w-1/2 max-[575px]:mb-4">
              <Link href="/universities/12345">
                <Card className="pt-8 relative bg-[url('/img/university_img.png')] bg-no-repeat bg-center h-[280px] rounded-bl-3xl rounded-br-3xl">
                  <div className="w-full h-full absolute top-0 left-0 bg-[#1546FF]/[0.5] rounded-bl-3xl rounded-br-3xl"></div>
                  <CardContent className="w-full absolute bottom-0 left-0 bg-[#FFB600]/[0.8] rounded-bl-3xl rounded-br-3xl">
                    <h3 className="text-2xl font-bold py-4 text-black">
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
            </div>
            <div className="mb-16 w-1/4 px-2 max-[575px]:w-full max-[991px]:w-1/2 max-[575px]:mb-4">
              <Link href="/universities/123456">
                <Card className="pt-8 relative bg-[url('/img/university_img.png')] bg-no-repeat bg-center h-[280px] rounded-bl-3xl rounded-br-3xl">
                  <div className="w-full h-full absolute top-0 left-0 bg-[#1546FF]/[0.5] rounded-bl-3xl rounded-br-3xl"></div>
                  <CardContent className="w-full absolute bottom-0 left-0 bg-[#FFB600]/[0.8] rounded-bl-3xl rounded-br-3xl">
                    <h3 className="text-2xl font-bold py-4 text-black">
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
            </div>
            <div className="mb-16 w-1/4 px-2 max-[575px]:w-full max-[991px]:w-1/2 max-[575px]:mb-4">
              <Link href="/universities/1234567">
                <Card className="pt-8 relative bg-[url('/img/university_img.png')] bg-no-repeat bg-center h-[280px] rounded-bl-3xl rounded-br-3xl">
                  <div className="w-full h-full absolute top-0 left-0 bg-[#1546FF]/[0.5] rounded-bl-3xl rounded-br-3xl"></div>
                  <CardContent className="w-full absolute bottom-0 left-0 bg-[#FFB600]/[0.8] rounded-bl-3xl rounded-br-3xl">
                    <h3 className="text-2xl font-bold py-4 text-black">
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
            </div>
            <div className="mb-16 w-1/4 px-2 max-[575px]:w-full max-[991px]:w-1/2 max-[575px]:mb-4">
              <Link href="/universities/12345678">
                <Card className="pt-8 relative bg-[url('/img/university_img.png')] bg-no-repeat bg-center h-[280px] rounded-bl-3xl rounded-br-3xl">
                  <div className="w-full h-full absolute top-0 left-0 bg-[#1546FF]/[0.5] rounded-bl-3xl rounded-br-3xl"></div>
                  <CardContent className="w-full absolute bottom-0 left-0 bg-[#FFB600]/[0.8] rounded-bl-3xl rounded-br-3xl">
                    <h3 className="text-2xl font-bold py-4 text-black">
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default UniversitiesList;
