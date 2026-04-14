'use client';
import i18n from '@/i18n';
import Image from 'next/image';

export default function StudentGuide() {
  return (
    <main>
      <section className="overlay bg-[url('/img/studen_guide_bg.png')] bg-center bg-no-repeat bg-cover h-[650px] max-[575px]:h-[350px] relative">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 mx-auto text-center w-1/2 z-10 max-[991px]:w-full">
          <h2 className="text-7xl text-[#FF9A02] font-bold pb-4 max-[575px]:text-3xl">
            {i18n.t('en_student_guide')}
          </h2>
          <p className="text-white text-lg max-[575px]:text-sm">
            Siksha is Creating comprehensive student guides for an online
            education platform catering to both medical and non-medical courses
            involves providing clear and detailed information to help students
            navigate the platform effectively. Outline to help Students:
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container">
          <div className="flex items-center flex-wrap">
            <div className="w-1/2 pr-4 max-[1024px]:w-full mb-4">
              <Image
                src="/img/student_guide_img_2.png"
                width={550}
                height={748}
                className="w-full h-auto"
                alt="who we are immg"
              />
            </div>
            <div className="w-1/2 p-4 max-[1024px]:w-full mb-4">
              <h2 className="text-3xl text-black font-bold mb-4 max-[575px]:text-xl">
                Simply dummy text of the printing and typesetting
              </h2>
              <p className="text-justify text-b1ack/[0.6] max-[575px]:text-sm">
                Welcome to Siksha, your gateway to a world-class education
                designed for global success. We are a leading online education
                platform specializing in both medical and non-medical courses,
                catering to students seeking top-tier education abroad. At
                Siksha, we understand that the pursuit of knowledge knows no
                boundaries, and that is why we bring the best of international
                education to your fingertips. Our platform offers a diverse
                range of courses curated to meet the demands of today is
                competitive global landscape. Whether you aspire to excel in
                medical sciences or explore non-medical disciplines, we provide
                a dynamic and interactive learning environment. Partnering with
                renowned institutions worldwide, our courses are crafted to
                empower students with the skills, knowledge, and perspectives
                necessary for success in their chosen fields. Join us at Siksha
                and embark on a transformative educational journey that
                transcends borders and opens doors to a world of opportunities.
                Your future, globally connected and brilliantly bright, starts
                here.
              </p>
            </div>
            <div className="w-1/2 pr-16 max-[1024px]:w-full max-[1024px]:pr-4 mb-4">
              <h2 className="text-3xl text-black font-bold mb-4 max-[575px]:text-xl">
                Simply dummy text of the printing and typesetting
              </h2>
              <p className="text-justify text-b1ack/[0.6] max-[575px]:text-sm">
                Our mission at Siksha is to empower aspiring students globally
                with affordable, accessible and world-class education, fostering
                excellence in both medical and non-medical disciplines. We are
                committed to breaking down geographical barriers, providing a
                platform where knowledge knows no borders, where whole world is
                at your hands. By collaborating with prestigious institutions
                around the world, we aim to offer a diverse array of courses
                that cater to the unique aspirations of each learner. Our
                mission is to create an online educational ecosystem that not
                only imparts academic expertise but also nurtures critical
                thinking, innovation, and a global perspective. We strive to be
                a catalyst for personal and professional growth, equipping our
                students with the skills and insights necessary to thrive in the
                competitive landscape of international education. At Siksha, our
                mission is to be the bridge that connects ambitious minds with
                unparalleled opportunities, fostering a community of lifelong
                learners who contribute meaningfully to the global society.
              </p>
            </div>
            <div className="w-1/2 max-[1024px]:w-full mb-4">
              <Image
                src="/img/about_us_one.png"
                width={550}
                height={748}
                className="w-full h-auto"
                alt="who we are immg"
              />
            </div>
            <div className="w-1/2 pr-4 max-[1024px]:w-full mb-4">
              <Image
                src="/img/student_guide_img_2.png"
                width={550}
                height={748}
                className="w-full h-auto"
                alt="who we are immg"
              />
            </div>
            <div className="w-1/2 p-4 max-[1024px]:w-full mb-4">
              <h2 className="text-3xl text-black font-bold mb-4 max-[575px]:text-xl">
                Simply dummy text of the printing and typesetting
              </h2>
              <p className="text-justify text-b1ack/[0.6] max-[575px]:text-sm">
                Welcome to Siksha, your gateway to a world-class education
                designed for global success. We are a leading online education
                platform specializing in both medical and non-medical courses,
                catering to students seeking top-tier education abroad. At
                Siksha, we understand that the pursuit of knowledge knows no
                boundaries, and that is why we bring the best of international
                education to your fingertips. Our platform offers a diverse
                range of courses curated to meet the demands of today is
                competitive global landscape. Whether you aspire to excel in
                medical sciences or explore non-medical disciplines, we provide
                a dynamic and interactive learning environment. Partnering with
                renowned institutions worldwide, our courses are crafted to
                empower students with the skills, knowledge, and perspectives
                necessary for success in their chosen fields. Join us at Siksha
                and embark on a transformative educational journey that
                transcends borders and opens doors to a world of opportunities.
                Your future, globally connected and brilliantly bright, starts
                here.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
