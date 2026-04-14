import i18n from '@/i18n';
import Image from 'next/image';
import { Button } from '../ui/button';
import { ChevronsRight } from 'lucide-react';
import Link from 'next/link';

function HowSikshaWorks() {
  return (
    <section className="overlay how_is_work pt-8 pb-16 bg-[url('/img/how_siksha_work_banner.png')] bg-cover bg-no-repeat bg-center relative">
      <div className="container">
        <div className="text-center relative z-10">
          <small className="text-3xl font-semibold text-white">
            {i18n.t('en_what_offer')}
          </small>
          <h2 className="max-[575px]:text-3xl max-[575px]:pb-2 text-5xl text-[#FFB600] font-bold pb-8">
            {i18n.t('en_how_siksha_work')}
          </h2>
        </div>
        <div className="py-16 max-[575px]:py-4">
          <Image
            src="/img/work_graph.png"
            width={1100}
            height={254}
            className="mx-auto relative z-10 max-[575px]:hidden"
            alt="work graph"
          />
        </div>
        <div className="relative z-10 w-full flex justify-center">
          <Link
            href="/student-guide"
            className="animate-bounce rounded-full px-6 py-2 bg-[#FFB600] text-black hover:text-white flex items-center"
          >
            Student Guide
            <ChevronsRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HowSikshaWorks;
