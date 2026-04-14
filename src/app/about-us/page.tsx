'use client';
import i18n from '@/i18n';
import Image from 'next/image';

export default function AboutUs() {
  return (
    <main className="mt-32">
      <section className="py-16 max-[991px]:py-4">
        <div className="container">
          <div className="flex items-center flex-wrap">
            <div className="w-1/2 max-[991px]:w-full mb-4">
              <Image
                src="/img/about_us-img_two.png"
                width={550}
                height={748}
                className="w-full h-auto"
                alt="who we are immg"
              />
            </div>
            <div className="w-1/2 p-4 max-[991px]:w-full mb-4">
              <h2 className="text-5xl text-black font-bold mb-4 max-[991px]:text-2xl">
                {i18n.t('en_who_we_are')}
              </h2>
              <p className="text-justify text-b1ack/[0.6]">
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
            <div className="w-1/2 pr-16 max-[991px]:w-full max-[991px]:pr-4 mb-4">
              <h2 className="text-5xl text-black font-bold mb-4 max-[991px]:text-2xl">
                {i18n.t('en_our_misson')}
              </h2>
              <p className="text-justify text-b1ack/[0.6]">
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
            <div className="w-1/2 max-[991px]:w-full mb-4">
              <Image
                src="/img/about_us_one.png"
                width={550}
                height={748}
                className="w-full h-auto"
                alt="who we are immg"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 max-[991px]:py-4">
        <div className="container">
          <div className="bg-[url('/img/ourValuesBg.png')] bg-center bg-no-repeat bg-cover h-[350px] relative max-[991px]:h-[150px]">
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 mx-auto text-center px-24 max-[991px]:px-4">
              <h2 className="text-7xl text-[#FF9A02] font-bold pb-4 max-[991px]:text-2xl">
                {i18n.t('en_our_values')}
              </h2>
              <p className="text-white text-lg max-[991px]:hidden">
                At Siksha, our values are the guiding principles that underpin
                our commitment to providing exceptional online education in both
                medical and non-medical courses. These values define who we are
                and shape every aspect of our platform:
              </p>
            </div>
          </div>
          <ul className="pt-16 max-[991px]:pt-4">
            <li className="mb-4">
              <strong> 1. Accessibility:</strong> We believe in breaking down
              barriers to education. Our platform is designed to be accessible
              to students worldwide, ensuring that geography is never a
              hindrance to knowledge.
            </li>
            <li className="mb-4">
              <strong>2. Excellence:</strong> We are dedicated to delivering
              courses of the highest quality. Partnering with renowned
              institutions globally, we maintain rigorous standards to ensure
              our students receive an education that meets or exceeds
              international benchmarks.
            </li>
            <li className="mb-4">
              <strong>3. Inclusivity:</strong> Embracing diversity is at the
              core of our values. We foster an inclusive learning environment
              that respects and celebrates the unique backgrounds, perspectives,
              and aspirations of each student.
            </li>
            <li className="mb-4">
              <strong>4. Innovation:</strong> Education is a dynamic field, and
              we are committed to staying at the forefront of innovation. Our
              platform leverages cutting-edge technology and teaching
              methodologies to provide a contemporary and engaging learning
              experience.
            </li>
            <li className="mb-4">
              <strong>5. Empowerment:</strong> Weempower students to take
              control of their educational journey. Our courses are designed not
              just to impart knowledge but to equip learners with the skills,
              critical thinking abilities, and confidence needed to succeed in a
              rapidly evolving global landscape.
            </li>
            <li className="mb-4">
              <strong>6. Affordability: </strong>We understand the financial
              challenges students face. Striving for affordability, we aim to
              minimize costs without compromising the quality of education,
              ensuring that financial constraints do not hinder academic
              pursuits.
            </li>
            <li className="mb-4">
              <strong>7. Community:</strong> Building a supportive learning
              community is paramount. We encourage collaboration, peer-to-peer
              interaction, and networking opportunities to create a global
              community of learners who inspire and uplift each other.
            </li>
            <li className="mb-4">
              <strong>8. Transparency:</strong> We believe in transparency in
              all our operations. From course structures to fees, we provide
              clear and comprehensive information to enable informed
              decision-making for both students and their families.
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
