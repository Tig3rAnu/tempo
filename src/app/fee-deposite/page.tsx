'use client';
import { Icons } from '@/common/icons/icon';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import i18n from '@/i18n';
import { useForm } from 'react-hook-form';

function FeeDeposite() {
  const form = useForm();
  return (
    <main>
      <section className="bgGradient bg-center bg-no-repeat bg-cover h-[450px] relative max-[991px]:h-[250px]">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 mx-auto text-center w-3/4 z-10">
          <h2 className="text-7xl text-black font-bold pb-4 max-[991px]:text-3xl">
            {i18n.t('en_fee_deposite')}
          </h2>
        </div>
      </section>
      <section className="py-16 max-[575px]:py-4">
        <div className="container max-[575px]:px-2">
          <Card className="p-8 max-[575px]:p-2 w-1/2 mx-auto max-[991px]:w-full">
            <Form {...form}>
              <form>
                <div className="flex items-center flex-wrap w-full">
                  <div className="w-1/2 px-2 mb-4 max-[575px]:w-full">
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{i18n.t('en_full_name')}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={i18n.t('en_fullname_place')}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/2 px-2 mb-4 max-[575px]:w-full">
                    <FormField
                      control={form.control}
                      name="father_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{i18n.t('en_father_name')}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={i18n.t('en_fatherName_place')}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/2 px-2 mb-4 max-[575px]:w-full">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{i18n.t('en_email')}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={i18n.t('en_email_place')}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/2 px-2 mb-4 max-[575px]:w-full">
                    <FormField
                      control={form.control}
                      name="mobile_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{i18n.t('en_mobile_number')}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={i18n.t('en_mobileNumber_place')}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/2 px-2 mb-4 max-[575px]:w-full">
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{i18n.t('en_country_name')}</FormLabel>
                          <FormControl>
                            <Select {...field}>
                              <SelectTrigger id="Country" className=" w-full ">
                                <SelectValue placeholder="Country" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="japan">Japan</SelectItem>
                                <SelectItem value="rassia">Rassia</SelectItem>
                                <SelectItem value="india">India</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/2 px-2 mb-4 max-[575px]:w-full">
                    <FormField
                      control={form.control}
                      name="university_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{i18n.t('en_university_name')}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={i18n.t('en_university_name_place')}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/2 px-2 mb-4 max-[575px]:w-full">
                    <FormField
                      control={form.control}
                      name="course"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{i18n.t('en_course')}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={i18n.t('en_course_place')}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/2 px-2 mb-4 max-[575px]:w-full">
                    <FormField
                      control={form.control}
                      name="semester"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{i18n.t('en_semester')}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={i18n.t('en_semester_place')}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </form>
            </Form>
            <Card className="my-8">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>
                  Add a new payment method to your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <RadioGroup
                  defaultValue="card"
                  className="grid grid-cols-3 gap-4"
                >
                  <div>
                    <RadioGroupItem
                      value="card"
                      id="card"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="card"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="mb-3 h-6 w-6"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="M2 10h20" />
                      </svg>
                      Card
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="paypal"
                      id="paypal"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="paypal"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Icons.paypal className="mb-3 h-6 w-6" />
                      Paypal
                    </Label>
                  </div>
                </RadioGroup>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="First Last" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="number">Card number</Label>
                  <Input id="number" placeholder="" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="month">Expires</Label>
                    <Select>
                      <SelectTrigger id="month">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">January</SelectItem>
                        <SelectItem value="2">February</SelectItem>
                        <SelectItem value="3">March</SelectItem>
                        <SelectItem value="4">April</SelectItem>
                        <SelectItem value="5">May</SelectItem>
                        <SelectItem value="6">June</SelectItem>
                        <SelectItem value="7">July</SelectItem>
                        <SelectItem value="8">August</SelectItem>
                        <SelectItem value="9">September</SelectItem>
                        <SelectItem value="10">October</SelectItem>
                        <SelectItem value="11">November</SelectItem>
                        <SelectItem value="12">December</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="year">Year</Label>
                    <Select>
                      <SelectTrigger id="year">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => (
                          <SelectItem
                            key={i}
                            value={`${new Date().getFullYear() + i}`}
                          >
                            {new Date().getFullYear() + i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="CVC" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Continue</Button>
              </CardFooter>
            </Card>
          </Card>
        </div>
      </section>
    </main>
  );
}

export default FeeDeposite;
