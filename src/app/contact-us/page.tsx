'use client';
import i18n from '@/i18n';
import { Mail, MapPin, PhoneCall } from 'lucide-react';
import Link from 'next/link';

export default function ContactUs() {
  return (
    <main>
      <section className="overlay bg-[url('/img/contact_us.jpg')] bg-center bg-cover bg-no-repeat h-screen relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 mx-auto right-0 text-center z-10">
          <h2 className="text-[#FFB600] text-5xl font-bold underline w-full mb-4">
            {i18n.t('en_countact')}
          </h2>
          <ul className="flex justify-center flex-wrap w-full items-center">
            <li className="flex items-center mb-2 w-full justify-center">
              <MapPin className="mr-2" color="#FFB600" size={18} />
              <address className="text-white text-lg">
                7A-nayak lane, Ram vihar, Bangluru-302025
              </address>
            </li>
            <li className="flex items-center mr-4">
              <PhoneCall className="mr-2" color="#FFB600" size={18} />
              <Link
                href="tel:+919898520023"
                className="text-white text-lg underline font-normal hover:text-[#FFB600] transition-all"
              >
                +919898520023
              </Link>
            </li>
            <li className="flex items-center">
              <Mail className="mr-2" color="#FFB600" size={18} />
              <Link
                href="mailto:testemail@test.com"
                className="text-white text-lg underline font-normal hover:text-[#FFB600] transition-all"
              >
                testemail@test.com
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
