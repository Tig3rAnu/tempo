'use client';
import { Button } from '@/components/ui/button';
import i18n from '@/i18n';
import Image from 'next/image';
import Link from 'next/link';

export default function UniversityDetails() {
  return (
    <main>
      <section className="overlay bg-[url('/img/university_bg.png')] bg-center bg-no-repeat bg-cover h-[650px] relative max-[991px]:h-[300px]">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 mx-auto text-center w-1/2 z-10 max-[991px]:w-full">
          <h2 className="text-7xl text-white font-bold pb-4 max-[991px]:text-3xl">
            University Name
          </h2>
          <Link
            href="/apply-course/medical"
            className="bg-[#FF9A02] rounded-full text-xl mt-8 max-[991px]:mt-2 inline-block py-2 px-4"
          >
            Apply Now
          </Link>
        </div>
      </section>
      <section className="py-16 max-[991px]:py-8">
        <div className="container max-[991px]:px-4">
          <div className="flex items-center flex-wrap w-3/4 justify-center mx-auto max-[991px]:w-full">
            <div className="w-2/5 pr-16 max-[991px]:w-full max-[991px]:pr-4">
              <Image
                src="/img/student_guide_img_2.png"
                width={550}
                height={748}
                className="w-full h-auto rounded-2xl"
                alt="who we are immg"
              />
            </div>
            <div className="w-1/2 p-4 border-l-4 border-[#FF9A02] max-[991px]:w-full max-[991px]:pr-2">
              <h2 className="text-3xl text-black font-bold mb-4 max-[991px]:text-xl">
                History and Overview
              </h2>
              <ul>
                <li>
                  Harvard is the oldest institution of higher education in the
                  United States.
                </li>
                <li>
                  It was established by the Massachusetts Bay Colony and named
                  after its first benefactor, John Harvard.
                </li>
                <li>
                  The university has a rich history and has played a significant
                  role in shaping education and research in the United States.
                </li>
              </ul>
            </div>
            <div className="w-1/2 pl-4 pr-16 border-l-4 border-[#FF9A02] max-[991px]:w-full max-[991px]:pr-4">
              <h2 className="text-3xl text-black font-bold mb-4 max-[991px]:text-xl">
                Country Overview
              </h2>
              <ul>
                <li>
                  Harvard is the oldest institution of higher education in the
                  United States.
                </li>
                <li>
                  It was established by the Massachusetts Bay Colony and named
                  after its first benefactor, John Harvard.
                </li>
                <li>
                  The university has a rich history and has played a significant
                  role in shaping education and research in the United States.
                </li>
              </ul>
            </div>
            <div className="w-2/5 p-16 max-[991px]:w-full max-[991px]:p-4">
              <Image
                src="/img/about_us_one.png"
                width={550}
                height={748}
                className="w-full h-auto rounded-2xl"
                alt="who we are immg"
              />
            </div>
            <div className="w-2/5 pr-4 p-16 max-[991px]:w-full max-[991px]:p-4">
              <Image
                src="/img/student_guide_img_2.png"
                width={550}
                height={748}
                className="w-full h-auto rounded-2xl"
                alt="who we are immg"
              />
            </div>
            <div className="w-1/2 p-4 border-l-4 border-[#FF9A02] max-[991px]:w-full max-[991px]:p-2">
              <h2 className="text-3xl text-black font-bold mb-4 max-[991px]:text-xl">
                City & Weather
              </h2>
              <ul>
                <li>
                  Harvard is the oldest institution of higher education in the
                  United States.
                </li>
                <li>
                  It was established by the Massachusetts Bay Colony and named
                  after its first benefactor, John Harvard.
                </li>
                <li>
                  The university has a rich history and has played a significant
                  role in shaping education and research in the United States.
                </li>
              </ul>
            </div>
            <div className="w-1/2 p-4 border-l-4 border-[#FF9A02] max-[991px]:w-full max-[991px]:p-2">
              <h2 className="text-3xl text-black font-bold mb-4 max-[991px]:text-xl">
                Hostels & Other Utilities
              </h2>
              <ul>
                <li>
                  Harvard is the oldest institution of higher education in the
                  United States.
                </li>
                <li>
                  It was established by the Massachusetts Bay Colony and named
                  after its first benefactor, John Harvard.
                </li>
                <li>
                  The university has a rich history and has played a significant
                  role in shaping education and research in the United States.
                </li>
              </ul>
            </div>
            <div className="w-2/5 pr-16 max-[991px]:w-full max-[991px]:pr-4">
              <Image
                src="/img/student_guide_img_2.png"
                width={550}
                height={748}
                className="w-full h-auto rounded-2xl"
                alt="who we are immg"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
