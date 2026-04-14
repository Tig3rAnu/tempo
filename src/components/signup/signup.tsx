'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import i18n from '@/i18n';
import { useState } from 'react';
import {
  agentSchema,
  studentSchema,
} from '@/validations/registrationForm.validation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const SignUpForm = () => {
  const [isUserType, setUserType] = useState<string>('student');
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      isUserType === 'student' ? studentSchema : agentSchema
    ),
    defaultValues: {
      full_name: '',
      email: '',
      password: '',
      user_name: '',
      user_type: '',
      mobile_number: '',
      mobile_prefix: '+91',
      agent: {
        company_name: '',
        gst_number: '',
        company_registration: '',
      },
      student: {
        father_name: '',
        dob: '',
        passport_number: '',
      },
    },
  });

  const userType = watch('user_type');
  const onSubmit = (data: any) => {
    console.log(data, 'data', errors);
  };

  return (
    <div>
      <div className="text-sm text-center">
        Expand your horizons, study abroad.{' '}
        <p className="text-black text-2xl font-medium">Register today!</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <Label className="mb-2 inline-block">
              {i18n.t('en_full_name')}
              <span className="text-[#ff5656]">*</span>
            </Label>
            <Input
              type="text"
              {...register('full_name')}
              placeholder={i18n.t('en_fullname_place')}
              className="rounded-full focus-visible:ring-offset-0 focus-visible:ring-transparent bg-transparent placeholder:text-black"
            />
            {errors.full_name && (
              <p className="text-[#ff5656] text-xs my-1">
                {errors.full_name.message}
              </p>
            )}
          </div>
          <div>
            <Label className="mb-2 inline-block">
              {i18n.t('en_email')}
              <span className="text-[#ff5656]">*</span>
            </Label>
            <Input
              type="text"
              {...register('email')}
              placeholder={i18n.t('en_email_place')}
              className="rounded-full focus-visible:ring-offset-0 focus-visible:ring-transparent bg-transparent placeholder:text-black"
            />
            {errors.email && (
              <p className="text-[#ff5656] text-xs my-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Label className="mb-2 inline-block">
              {i18n.t('en_user_name')}
              <span className="text-[#ff5656]">*</span>
            </Label>
            <Input
              type="text"
              {...register('user_name')}
              placeholder={i18n.t('en_userName_place')}
              className="rounded-full focus-visible:ring-offset-0 focus-visible:ring-transparent bg-transparent placeholder:text-black"
            />
            {errors.user_name && (
              <p className="text-[#ff5656] text-xs my-1">
                {errors.user_name.message}
              </p>
            )}
          </div>
          <div>
            <Label className="mb-2 inline-block">
              {i18n.t('en_password')}
              <span className="text-[#ff5656]">*</span>
            </Label>
            <Input
              {...register('password')}
              placeholder={i18n.t('en_password_place')}
              className="rounded-full focus-visible:ring-offset-0 focus-visible:ring-transparent bg-transparent placeholder:text-black"
              type="password"
            />
            {errors.password && (
              <p className="text-[#ff5656] text-xs my-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-4">
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
                      <SelectTrigger className="w-[80px] bg-[#A6C2ED]/[0.12] rounded-br-none rounded-tr-none rounded-bl-full rounded-tl-full">
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
                className="w-full placeholder:text-black rounded-lg rounded-bl-none rounded-br-full rounded-tr-full rounded-tl-none focus-visible:ring-offset-0 focus-visible:ring-transparent bg-[#A6C2ED]/[0.12] "
              />
            </div>
            {errors.mobile_number && (
              <p className="text-[#ff5656] text-xs my-1">
                {errors.mobile_number.message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <Label className="mb-2 inline-block">
            {i18n.t('en_user_type')}
            <span className="text-[#ff5656]">*</span>
          </Label>
          <Controller
            name="user_type"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div {...field}>
                <RadioGroup
                  {...register('user_type')}
                  className="flex items-center my-4"
                  onValueChange={(value) => setUserType(value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="agent" id="agent" />
                    <Label htmlFor="agent">{i18n.t('en_agent')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student">{i18n.t('en_student')}</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          />
          {errors.user_type && (
            <p className="text-[#ff5656] text-sm my-1">
              {errors.user_type.message}
            </p>
          )}
        </div>
        {userType === 'agent' && (
          <div className="grid grid-rows-2 gap-2 grid-flow-col">
            <div>
              <Label className="mb-2 inline-block">
                {i18n.t('en_company_name')}
                <span className="text-[#ff5656]">*</span>
              </Label>
              <Input
                type="text"
                {...register('agent.company_name')}
                placeholder={i18n.t('en_companyName_place')}
                className="rounded-full focus-visible:ring-offset-0 focus-visible:ring-transparent bg-transparent placeholder:text-black"
              />
              {errors.agent && errors.agent.company_name && (
                <p className="text-[#ff5656] text-xs my-1">
                  {errors.agent.company_name.message}
                </p>
              )}
            </div>
            <div>
              <Label className="mb-2 inline-block">
                {i18n.t('en_registration_Number')}
                <span className="text-[#ff5656]">*</span>
              </Label>
              <Input
                type="text"
                {...register('agent.company_registration')}
                placeholder={i18n.t('en_cregistration_place')}
                className="rounded-full focus-visible:ring-offset-0 focus-visible:ring-transparent bg-transparent placeholder:text-black"
              />
              {errors.agent && errors.agent.company_registration && (
                <p className="text-[#ff5656] text-xs my-1">
                  {errors.agent.company_registration.message}
                </p>
              )}
            </div>
            <div>
              <Label className="mb-2 inline-block">
                {i18n.t('en_gst_number')}
                <span className="text-[#ff5656]">*</span>
              </Label>
              <Input
                type="text"
                {...register('agent.gst_number')}
                placeholder={i18n.t('en_gstNumber_place')}
                className="rounded-full focus-visible:ring-offset-0 focus-visible:ring-transparent bg-transparent placeholder:text-black"
              />
              {errors.agent && errors.agent.gst_number && (
                <p className="text-[#ff5656] text-xs my-1">
                  {errors.agent.gst_number.message}
                </p>
              )}
            </div>
          </div>
        )}
        {userType === 'student' && (
          <div className="grid grid-rows-2 gap-2 grid-flow-col">
            <div>
              <Label className="mb-2 inline-block">
                {i18n.t('en_father_name')}
                <span className="text-[#ff5656]">*</span>
              </Label>
              <Input
                type="text"
                {...register(`student.father_name`)}
                placeholder={i18n.t('en_fatherName_place')}
                className="rounded-full focus-visible:ring-offset-0 focus-visible:ring-transparent bg-transparent placeholder:text-black"
              />
              {errors.student && errors.student.father_name && (
                <p className="text-[#ff5656] text-xs my-1">
                  {errors.student.father_name.message}
                </p>
              )}
            </div>
            {/* <div>
              <Label className="mb-2 inline-block">
                {i18n.t('en_mobile_number')}
                <span className="text-[#ff5656]">*</span>
              </Label>
              <Input
                {...register(`mobile_number`)}
                placeholder={i18n.t('en_mobileNumber_place')}
                className="rounded-full focus-visible:ring-offset-0 focus-visible:ring-transparent bg-transparent placeholder:text-black"
              />
              {errors.mobile_number && (
                <p className="text-[#ff5656] text-xs my-1">
                  {errors.mobile_number.message}
                </p>
              )}
            </div> */}
            <div>
              <Label className="mb-2 inline-block">{i18n.t('en_dob')}</Label>
              <Input type="date" {...register(`student.dob`)} />
            </div>
            <div>
              <Label className="mb-2 inline-block">
                {i18n.t('en_passport_number')}
              </Label>
              <Input
                type="text"
                {...register(`student.passport_number`)}
                placeholder={i18n.t('en_passport_place')}
                className="rounded-full focus-visible:ring-offset-0 focus-visible:ring-transparent bg-transparent placeholder:text-black"
              />
            </div>
          </div>
        )}
        <div className="text-center">
          <Button type="submit" className="mt-4 mx-auto w-[250px]">
            {i18n.t('en_signup')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
