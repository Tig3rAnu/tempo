'use client';
import i18n from '@/i18n';
import { MedicalCourseForm } from '../component/medical/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams } from 'next/navigation';
import { NonMedicalCourseForm } from '../component/nonMedical/form';
import { LanguageCourseForm } from '../component/languageCourse/form';

export default function ApplyForCourse() {
  const params = useParams();
  console.log(params, 'params');
  return (
    <main className="bg-[#f1f1f1]">
      <section className="overlay bg-[url('/img/medical-bg.png')] bg-center bg-no-repeat bg-cover h-[650px] relative max-[1280px]:h-[500px] max-[991px]:h-[300px] max-[575px]:h-[200px]">
        <div className="absolute top-1/2 -translate-y-1/2 max-[575px]:-translate-y-0 max-[575px]:top-unset max-[575px]:bottom-0   max-[575px]:w-full left-0 right-0 mx-auto text-center w-1/2 z-10">
          <h2 className="text-7xl max-[991px]:text-3xl text-[#FFB600] font-bold pb-4 max-[1280px]:text-5xl max-[575px]:text-2xl w-full">
            {i18n.t('en_choose_course')}
          </h2>
        </div>
      </section>
      <section className="py-16 max-[991px]:py-4">
        <div className="container max-[991px]:px-2">
          <div>
            <Tabs
              defaultValue={params.courseType ? `${params.courseType}` : ''}
              className="bg-white w-2/3 p-8 mx-auto mt-12 max-[991px]:w-full max-[991px]:p-2"
            >
              <TabsList className="flex items-center justify-start mb-4 w-2/3 h-auto bg-[#FFB600] max-[1280px]:overflow-x-auto max-[991px]:w-full">
                <TabsTrigger
                  value="medical"
                  className="text-black text-lg font-bold max-[1280px]:text-sm max-[1280px]:font-medium"
                >
                  {i18n.t('en_medical')}
                </TabsTrigger>
                <TabsTrigger
                  value="non-medical"
                  className="text-black text-lg font-bold max-[1280px]:text-sm max-[1280px]:font-medium"
                >
                  {i18n.t('en_non_medical')}
                </TabsTrigger>
                <TabsTrigger
                  value="language-course"
                  className="text-black text-lg font-bold max-[1280px]:text-sm max-[1280px]:font-medium"
                >
                  {i18n.t('en_language_course')}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="medical">
                <h3 className="font-semibold text-2xl py-4">
                  {i18n.t('en_medical_course_title')}
                </h3>
                <MedicalCourseForm />
              </TabsContent>
              <TabsContent value="non-medical">
                <h3 className="font-semibold text-2xl py-4">
                  {i18n.t('Choose and apply for Non-medical course.')}
                </h3>
                <NonMedicalCourseForm />
              </TabsContent>
              <TabsContent value="language-course">
                <h3 className="font-semibold text-2xl py-4">
                  {i18n.t('Choose and apply for Language courses.')}
                </h3>
                <LanguageCourseForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </main>
  );
}
