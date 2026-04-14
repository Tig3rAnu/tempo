'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AutoCompleteDropdown from '../AutoCompleteDropdown';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import i18n from '@/i18n';
import { Label } from '@/components/ui/label';
import { languageCourseFormSchema } from '@/validations/applyCourse.validation';
import { DemoPaymentMethod } from '@/common/paymentBox';

export function LanguageCourseForm() {
  const {
    control,
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof languageCourseFormSchema>>({
    resolver: zodResolver(languageCourseFormSchema),
    defaultValues: {
      full_name: '',
      father_name: '',
      mother_name: '',
      email: '',
      mobile_prefix: '+91',
      mobile_number: '',
      citizen: 'IND',
      passport_number: '',
      city: '',
      state: '',
      zipcode: '',
    },
  });

  const country = [
    { value: 'japan', label: 'Japan' },
    { value: 'kazakhstan', label: 'Kazakhstan' },
    { value: 'russia', label: 'Russia' },
    { value: 'uzbekistan', label: 'Uzbekistan' },
  ];

  const universities = [
    {
      value: 'kazan state medical university',
      label: 'Kazan state medical university',
    },
    {
      value: 'people friendship university(rudn)',
      label: 'People friendship university(RUDN)',
    },
    { value: 'crimea federal university', label: 'Crimea Federal university' },
    { value: 'cemerovo state university', label: 'Cemerovo state university' },
    {
      value: 'kabardino balkarian state uinversity',
      label: 'Kabardino balkarian state uinversity',
    },
  ];

  const courses = [
    { value: 'franch', label: 'Franch' },
    { value: 'german', label: 'German' },
  ];

  const onSubmit = (data: z.infer<typeof languageCourseFormSchema>) => {
    console.log(data, 'data', errors);
  };

  return (
    <div>
      <div className="flex mb-4 w-full flex-wrap">
        <div className="w-full">
          <h3 className="underline text-lg mb-4">
            Choose your country / university / course
          </h3>
          <div className="flex justify-between items-center max-[991px]:flex-wrap">
            <div className="w-1/3 pr-4 max-[991px]:w-full max-[991px]:mb-4 max-[991px]:pr-0">
              <AutoCompleteDropdown title="Country" items={country} />
            </div>
            <div className="w-1/3 pr-4 max-[991px]:w-full max-[991px]:mb-4 max-[991px]:pr-0">
              <AutoCompleteDropdown title="University" items={universities} />
            </div>
            <div className="w-1/3 max-[991px]:w-full max-[991px]:mb-4">
              <AutoCompleteDropdown title="Course" items={courses} />
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex mb-4 w-full flex-wrap">
          <div className="w-full py-4">
            <h3 className="underline text-lg">
              Fill your personal Information
            </h3>
          </div>
          <div className="flex w-full flex-wrap">
            <div className="w-1/3 mb-4 pr-4 max-[991px]:w-1/2 max-[575px]:w-full">
              <Label className="mb-2 inline-block">
                {i18n.t('en_full_name')}
                <span className="text-[#ff5656]">*</span>
              </Label>
              <Input
                type="text"
                {...register('full_name')}
                placeholder={i18n.t('en_fullname_place')}
                className="rounded-lg focus-visible:ring-offset-0 focus-visible:ring-transparent placeholder:text-xs placeholder:text-gray-500 bg-[#A6C2ED]/[0.12]"
              />
              {errors.full_name && (
                <p className="text-[#ff5656] text-xs my-1">
                  {errors.full_name.message}
                </p>
              )}
            </div>
            <div className="w-1/3 mb-4 pr-4 max-[991px]:w-1/2 max-[575px]:w-full">
              <Label className="mb-2 inline-block">
                {i18n.t('en_father_name')}
                <span className="text-[#ff5656]">*</span>
              </Label>
              <Input
                type="text"
                {...register('father_name')}
                placeholder={i18n.t('en_father_name_place')}
                className="rounded-lg focus-visible:ring-offset-0 focus-visible:ring-transparent placeholder:text-xs placeholder:text-gray-500 bg-[#A6C2ED]/[0.12]"
              />
              {errors.father_name && (
                <p className="text-[#ff5656] text-xs my-1">
                  {errors.father_name.message}
                </p>
              )}
            </div>
            <div className="w-1/3 mb-4 pr-4 max-[991px]:w-1/2 max-[575px]:w-full">
              <Label className="mb-2 inline-block">
                {i18n.t('en_mother_name')}
                <span className="text-[#ff5656]">*</span>
              </Label>
              <Input
                type="text"
                {...register('mother_name')}
                placeholder={i18n.t('en_mother_name_place')}
                className="rounded-lg focus-visible:ring-offset-0 focus-visible:ring-transparent bg-[#A6C2ED]/[0.12] placeholder:text-xs placeholder:text-gray-500"
              />
              {errors.mother_name && (
                <p className="text-[#ff5656] text-xs my-1">
                  {errors.mother_name.message}
                </p>
              )}
            </div>
            <div className="w-1/3 mb-4 pr-4 max-[991px]:w-1/2 max-[575px]:w-full">
              <Label className="mb-2 inline-block">
                {i18n.t('en_email')}
                <span className="text-[#ff5656]">*</span>
              </Label>
              <Input
                type="text"
                {...register('email')}
                placeholder={i18n.t('en_email_place')}
                className="rounded-lg focus-visible:ring-offset-0 focus-visible:ring-transparent bg-[#A6C2ED]/[0.12] placeholder:text-xs placeholder:text-gray-500"
              />
              {errors.email && (
                <p className="text-[#ff5656] text-xs my-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="w-1/3 mb-4 pr-4 max-[991px]:w-1/2 max-[575px]:w-full">
              <Label className="mb-2 inline-block">
                {i18n.t('en_mobile_number')}
                <span className="text-[#ff5656]">*</span>
              </Label>
              <div className="flex items-center">
                <Controller
                  name="mobile_prefix"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div {...field}>
                      <Select
                        {...register('mobile_prefix')}
                        value={field.value}
                        onValueChange={(value) =>
                          setValue('mobile_prefix', value)
                        }
                      >
                        <SelectTrigger className="w-[60px] bg-[#A6C2ED]/[0.12] rounded-br-none rounded-tr-none">
                          <SelectValue defaultValue="+91" />
                        </SelectTrigger>
                        <SelectContent className="focus-visible:ring-offset-0 focus-visible:ring-transparent">
                          <SelectItem value="+91">+91</SelectItem>
                          <SelectItem value="+41">+41</SelectItem>
                          <SelectItem value="+1">+1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />
                <Input
                  type="text"
                  {...register('mobile_number')}
                  placeholder={i18n.t('en_mobileNumber_place')}
                  className="placeholder:text-xs placeholder:text-gray-500 rounded-lg rounded-bl-none rounded-tl-none focus-visible:ring-offset-0 focus-visible:ring-transparent bg-[#A6C2ED]/[0.12] "
                />
              </div>
              {errors.mobile_number && (
                <p className="text-[#ff5656] text-xs my-1">
                  {errors.mobile_number.message}
                </p>
              )}
            </div>
            <div className="w-1/3 mb-4 pr-4 max-[991px]:w-1/2 max-[575px]:w-full">
              <Label className="mb-2 inline-block">
                {i18n.t('en_citizen')}
                <span className="text-[#ff5656]">*</span>
              </Label>
              <Controller
                name="citizen"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <div {...field}>
                    <Select
                      {...register('citizen')}
                      value={field.value}
                      onValueChange={(value) => setValue('citizen', value)}
                    >
                      <SelectTrigger className="bg-[#A6C2ED]/[0.12]">
                        <SelectValue placeholder={i18n.t('en_citizen_place')} />
                      </SelectTrigger>
                      <SelectContent className="focus-visible:ring-offset-0 focus-visible:ring-transparent">
                        <SelectItem value="IND">India</SelectItem>
                        <SelectItem value="USA">USA</SelectItem>
                        <SelectItem value="RSA">RUSSIA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
              {errors.citizen && (
                <p className="text-[#ff5656] text-xs my-1">
                  {errors.citizen.message}
                </p>
              )}
            </div>
            <div className="w-1/3 mb-4 pr-4 max-[991px]:w-1/2 max-[575px]:w-full">
              <Label className="mb-2 inline-block">
                {i18n.t('en_city')}
                <span className="text-[#ff5656]">*</span>
              </Label>
              <Input
                type="text"
                {...register('city')}
                placeholder={i18n.t('en_city_place')}
                className="rounded-lg focus-visible:ring-offset-0 focus-visible:ring-transparent bg-[#A6C2ED]/[0.12] placeholder:text-xs placeholder:text-gray-500"
              />
              {errors.city && (
                <p className="text-[#ff5656] text-xs my-1">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div className="w-1/3 mb-4 pr-4 max-[991px]:w-1/2 max-[575px]:w-full">
              <Label className="mb-2 inline-block">
                {i18n.t('en_state')}
                <span className="text-[#ff5656]">*</span>
              </Label>
              <Controller
                name="state"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <div {...field}>
                    <Select {...register('state')}>
                      <SelectTrigger className="bg-[#A6C2ED]/[0.12]">
                        <SelectValue
                          placeholder={i18n.t('en_state_place')}
                          defaultValue="rajasthan"
                        />
                      </SelectTrigger>
                      <SelectContent className="focus-visible:ring-offset-0 focus-visible:ring-transparent">
                        <SelectItem value="rajasthan">Rajasthan</SelectItem>
                        <SelectItem value="uttarPradesh">
                          Uttar Pradesh
                        </SelectItem>
                        <SelectItem value="haryana">Haryana</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
              {errors.state && (
                <p className="text-[#ff5656] text-xs my-1">
                  {errors.state.message}
                </p>
              )}
            </div>
            <div className="w-1/3 mb-4 pr-4 max-[991px]:w-1/2 max-[575px]:w-full">
              <Label className="mb-2 inline-block">
                {i18n.t('en_zip')}
                <span className="text-[#ff5656]">*</span>
              </Label>
              <Input
                type="text"
                {...register('zipcode')}
                placeholder={i18n.t('en_zip_place')}
                className="rounded-lg focus-visible:ring-offset-0 focus-visible:ring-transparent bg-[#A6C2ED]/[0.12] placeholder:text-xs placeholder:text-gray-500"
              />
              {errors.zipcode && (
                <p className="text-[#ff5656] text-xs my-1">
                  {errors.zipcode.message}
                </p>
              )}
            </div>
            <div className="w-1/3 mb-4 pr-4 max-[991px]:w-1/2 max-[575px]:w-full">
              <Label className="mb-2 inline-block">
                {i18n.t('en_passport_number')}
              </Label>
              <Input
                type="text"
                {...register('passport_number')}
                placeholder={i18n.t('en_passport_place')}
                className="rounded-lg focus-visible:ring-offset-0 focus-visible:ring-transparent bg-[#A6C2ED]/[0.12] placeholder:text-xs placeholder:text-gray-500"
              />
              {errors.passport_number && (
                <p className="text-[#ff5656] text-xs my-1">
                  {errors.passport_number.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full py-4">
            <h3 className="underline text-lg">Make a Payment</h3>
          </div>
          <DemoPaymentMethod />
        </div>
        <div className="flex items-center">
          <Button type="submit" className="mr-4">
            Apply
          </Button>
          <Link
            href="/"
            className="bg-black rounded-md text-white inline-block py-2 px-3"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
