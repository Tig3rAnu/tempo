import i18n from '@/i18n';
import { Card, CardContent, CardFooter } from '../ui/card';
import { CheckCheck, IndianRupee, X } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

function Subscription() {
  return (
    <section className="py-16 max-[639px]:py-4 bg-slate-100">
      <div className="container">
        <div className="text-center pb-24 max-[639px]:pb-8">
          <h2 className="text-5xl font-bold max-[575px]:text-3xl">
            {i18n.t('en_membership')}
          </h2>
        </div>
        <div className="flex items-center justify-center w-full space-x-8 flex-wrap sm:max-xl:space-x-0 max-[639px]:space-x-0">
          <Card className="relative shadow-2xl rounded-2xl max-[639px]:w-full sm:max-xl:w-full sm:max-xl:mb-16 max-[639px]:mb-16">
            <Badge className="bg-[#1546FF] text-xl font-medium text-white absolute left-0 right-0 mx-auto text-center w-32 py-2 justify-center -top-[20px]">
              {i18n.t('en_basic')}
            </Badge>
            <CardContent className="pb-0">
              <ul className="pt-16">
                <li className="flex items-center mb-4">
                  <X color="#FF0000" className="mr-2" />
                  {i18n.t('en_airport_pickup')}
                </li>
                <li className="flex items-center mb-4">
                  <X color="#FF0000" className="mr-2" />
                  {i18n.t('en_allotment_hostel')}
                </li>
                <li className="flex items-center mb-4">
                  <X color="#FF0000" className="mr-2" />
                  {i18n.t('en_documentation_university')}
                </li>
                <li className="flex items-center mb-4">
                  <X color="#FF0000" className="mr-2" />
                  {i18n.t('en_extension_visa')}
                </li>
                <li className="flex items-center mb-4">
                  <X color="#FF0000" className="mr-2" />
                  {i18n.t('en_opening_account')}
                </li>
                <li className="flex items-center mb-4">
                  <X color="#FF0000" className="mr-2" />
                  {i18n.t('en_two_days_food')}
                </li>
                <li className="flex items-center mb-4">
                  <CheckCheck color="#52FF00" className="mr-2" />
                  {i18n.t('en_local_sim_card')}
                </li>
                <li className="flex items-center mb-4">
                  <CheckCheck color="#52FF00" className="mr-2" />
                  {i18n.t('en_guidance_till_admission')}
                </li>
              </ul>
            </CardContent>
            <CardFooter className="w-full text-center flex-wrap justify-center">
              <h2 className="text-4xl font-bold w-full pb-4 flex items-center justify-center">
                <IndianRupee size={27} /> 5000
              </h2>
              <Button className="bg-[#FFB600] rounded-full text-lg font-bold px-8">
                Get Now
              </Button>
            </CardFooter>
          </Card>
          <Card className="relative  shadow-2xl rounded-2xl max-[639px]:w-full sm:max-xl:w-full -mt-14 max-[639px]:-mt-0 sm:max-xl:-mt-0 sm:max-xl:mb-16 max-[639px]:mb-16">
            <Badge className="bg-[#1546FF] text-xl font-medium text-white absolute left-0 right-0 mx-auto text-center w-32 py-2 justify-center -top-[20px]">
              {i18n.t('en_premium')}
            </Badge>
            <CardContent>
              <ul className="pt-16">
                <li className="flex items-center mb-4">
                  <CheckCheck color="#52FF00" className="mr-2" />
                  {i18n.t('en_airport_pickup')}
                </li>
                <li className="flex items-center mb-4">
                  <CheckCheck color="#52FF00" className="mr-2" />
                  {i18n.t('en_allotment_hostel')}
                </li>
                <li className="flex items-center mb-4">
                  <CheckCheck color="#52FF00" className="mr-2" />
                  {i18n.t('en_documentation_university')}
                </li>
                <li className="flex items-center mb-4">
                  <CheckCheck color="#52FF00" className="mr-2" />
                  {i18n.t('en_extension_visa')}
                </li>
                <li className="flex items-center mb-4">
                  <CheckCheck color="#52FF00" className="mr-2" />
                  {i18n.t('en_opening_account')}
                </li>
                <li className="flex items-center mb-4">
                  <CheckCheck color="#52FF00" className="mr-2" />
                  {i18n.t('en_two_days_food')}
                </li>
                <li className="flex items-center mb-4">
                  <CheckCheck color="#52FF00" className="mr-2" />
                  {i18n.t('en_local_sim_card')}
                </li>
                <li className="flex items-center mb-4">
                  <CheckCheck color="#52FF00" className="mr-2" />
                  {i18n.t('en_guidance_till_admission')}
                </li>
              </ul>
            </CardContent>
            <CardFooter className="w-full text-center flex-wrap justify-center">
              <h2 className="text-4xl font-bold w-full pb-4">$800</h2>
              <Button className="bg-[#FFB600] rounded-full text-lg font-bold px-8">
                Get Now
              </Button>
            </CardFooter>
          </Card>
          <Card className="relative  shadow-2xl rounded-2xl max-[639px]:w-full sm:max-xl:w-full sm:max-xl:mb-16 max-[639px]:mb-16">
            <Badge className="bg-[#1546FF] text-xl font-medium text-white absolute left-0 right-0 mx-auto text-center w-32 py-2 justify-center -top-[20px]">
              {i18n.t('en_agent')}
            </Badge>
            <CardContent>
              <ul className="pt-16">
                <li className="flex items-center mb-4">
                  <CheckCheck color="#52FF00" className="mr-2" />
                  {i18n.t('en_enroll_students')}
                </li>
                <li className="flex items-center mb-4">
                  <CheckCheck color="#52FF00" className="mr-2" />
                  {i18n.t('en_allotment_hostel')}
                </li>
                <li className="flex items-center mb-4">
                  <CheckCheck color="#52FF00" className="mr-2" />
                  {i18n.t('en_documentation_university')}
                </li>
                <li className="flex items-center mb-4">
                  <CheckCheck color="#52FF00" className="mr-2" />
                  {i18n.t('en_extension_visa')}
                </li>
                <li className="flex items-center mb-4">
                  <CheckCheck color="#52FF00" className="mr-2" />
                  {i18n.t('en_opening_account')}
                </li>
                <li className="flex items-center mb-4">
                  <CheckCheck color="#52FF00" className="mr-2" />
                  {i18n.t('en_two_days_food')}
                </li>
                <li className="flex items-center mb-4">
                  <CheckCheck color="#52FF00" className="mr-2" />
                  {i18n.t('en_local_sim_card')}
                </li>
                <li className="flex items-center mb-4">
                  <CheckCheck color="#52FF00" className="mr-2" />
                  {i18n.t('en_local_guidance_year')}
                </li>
              </ul>
            </CardContent>
            <CardFooter className="w-full text-center flex-wrap justify-center">
              <h2 className="text-4xl font-bold w-full pb-4 flex items-center justify-center">
                <IndianRupee size={27} /> 10000
              </h2>
              <Button className="bg-[#FFB600] rounded-full text-lg font-bold px-8">
                Get Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Subscription;
