'use client';
import i18n from '@/i18n';
import NotaryForm from './component/notary';
import { Card, CardContent } from '@/components/ui/card';

function Notary() {
  return (
    <main>
      <section className="overlay bg-[url('/img/notary.jpg')] bg-center bg-no-repeat bg-cover h-[550px] relative max-[991px]:h-[350px] max-[575px]:h-[250px]">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 mx-auto text-center w-3/4 z-10 max-[991px]:w-full">
          <h2 className="text-7xl text-[#FFB600] font-bold pb-4 max-[991px]:text-3xl">
            {i18n.t('en_notarized_documents')}
          </h2>
        </div>
      </section>
      <section className="py-8">
        <div className="container max-[575px]:px-2">
          <h3 className="py-8 text-3xl font-bold text-center">
            {i18n.t('en_upload_notary')}
          </h3>
          <Card className="w-1/2 mx-auto max-[991px]:w-full">
            <CardContent className="max-[575px]:p-2">
              <NotaryForm />
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
export default Notary;
