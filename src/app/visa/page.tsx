'use client';
import i18n from '@/i18n';
import VisaSupport from './component/visa';

function Visa() {
  return (
    <main>
      <section className="overlay bg-[url('/img/visa.jpg')] bg-center bg-no-repeat bg-cover md:h-[650px] h-[350px] relative">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 mx-auto text-center w-3/4 z-10">
          <h2 className="text-7xl text-[#FFB600] font-bold pb-4">
            {i18n.t('en_visa_helpine')}
          </h2>
        </div>
      </section>
      <VisaSupport />
    </main>
  );
}
export default Visa;
