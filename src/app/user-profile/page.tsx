'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import i18n from '@/i18n';
import {
  Bell,
  CircleDashed,
  CircleUser,
  Lock,
  Pencil,
  Trash,
} from 'lucide-react';
// import { CldUploadButton } from 'next-cloudinary';
import UserNotifications from './components/notifications';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  managePasswordSchema,
  userInfoSchema,
} from '@/validations/managePassword.validation';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import Image from 'next/image';

function UserProfile() {
  const [progress, setProgress] = useState(13);
  const [profileImg, setProfileImg] = useState<string>('');
  const form = useForm<z.infer<typeof managePasswordSchema>>({
    resolver: zodResolver(managePasswordSchema),
    defaultValues: {
      oldPassword: '',
      new_password: '',
      confirmPassword: '',
    },
  });

  const userInfoForm = useForm<z.infer<typeof userInfoSchema>>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      full_name: 'visvhendra singh',
      email: 'test@test.com',
      mobile: '9509824465',
      mobile_prefix: '+91',
    },
  });

  const onSubmit = (values: z.infer<typeof managePasswordSchema>) => {
    console.log(values);
  };
  const onUpload = (result: any) => {
    setProfileImg(result.info.secure_url);
  };

  const onDeleteProfileImg = () => {
    setProfileImg('');
  };

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      <section className="overlay bg-center bg-no-repeat bg-cover h-[550px] relative">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 mx-auto text-center w-3/4 z-10">
          <h2 className="text-7xl text-[#FFB600] font-bold pb-4">
            {i18n.t('User Name Here')}
          </h2>
        </div>
      </section>
      <section className="py-16">
        <div className="container">
          <div className="w-2/3 mx-auto">
            <Tabs
              defaultValue="personalInfo"
              orientation="vertical"
              className="flex items-start w-full"
            >
              <TabsList className="grid-cols-2 flex flex-wrap w-[250px] mr-4">
                <Card>
                  <CardContent className="flex flex-wrap p-0">
                    <TabsTrigger
                      value="personalInfo"
                      className="w-full justify-start p-2 bg-transparent data-[state=active]:bg-[#FFB600] mb-2"
                    >
                      <CircleUser size={18} className="mr-2" /> Personal
                      Information
                    </TabsTrigger>
                    <TabsTrigger
                      value="accountStatus"
                      className="w-full justify-start p-2 bg-transparent data-[state=active]:bg-[#FFB600] mb-2"
                    >
                      <CircleDashed size={18} className="mr-2" />
                      Application Status
                    </TabsTrigger>
                    <TabsTrigger
                      value="password"
                      className="w-full justify-start p-2 bg-transparent data-[state=active]:bg-[#FFB600] mb-2"
                    >
                      <Lock size={18} className="mr-2" />
                      Manage Password
                    </TabsTrigger>
                    <TabsTrigger
                      value="notifications"
                      className="w-full justify-start p-2 bg-transparent data-[state=active]:bg-[#FFB600]"
                    >
                      <Bell size={18} className="mr-2" />
                      Notifications
                    </TabsTrigger>
                  </CardContent>
                </Card>
              </TabsList>
              <TabsContent value="personalInfo" className="w-4/5">
                <Card>
                  <div className="bg-[#1546FF] py-4">
                    <div className="w-[150px] h-[150px] bg-white rounded-full shadow-2xl mx-auto relative">
                      <Image
                        src={profileImg}
                        width={150}
                        height={150}
                        className="rounded-full"
                        alt="user avatar"
                      />
                      {/* <CldUploadButton
                        uploadPreset="hunb8rvi"
                        onUpload={onUpload}
                        className="absolute bottom-0 left-4"
                      >
                        <span className="w-9 h-9 rounded-full bg-[#FFB600] flex justify-center items-center">
                          <Pencil size={18} color="#fff" />
                        </span>
                      </CldUploadButton> */}
                      <span className="w-9 h-9 rounded-full bg-red-500 flex justify-center items-center absolute right-0 bottom-0 cursor-pointer">
                        <Trash
                         size={18}
                         color="#fff"
                         onClick={onDeleteProfileImg}
                       />
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Edit your profile information & profile image
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Form {...userInfoForm}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-2"
                      >
                        <FormField
                          control={userInfoForm.control}
                          name="full_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Enter your old password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={userInfoForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Enter your new password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={userInfoForm.control}
                          name="mobile"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mobile Number</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Enter your Confirm Password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </form>
                    </Form>
                  </CardContent>
                  <CardFooter>
                    <Button>Save changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="accountStatus" className="w-4/5">
                <Card>
                  <CardHeader>
                    <CardTitle>Application Status</CardTitle>
                    <CardDescription>Track your application</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-xl mb-4 text-orange-500 font-medium">
                      In Progress
                    </p>
                    <Progress value={progress} className="w-[100%]" />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="password" className="w-4/5">
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change your password here. After saving, you'll be logged
                      out.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-2"
                      >
                        <FormField
                          control={form.control}
                          name="oldPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Old Password</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="Enter your old password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="new_password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="Enter your new password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="Enter your Confirm Password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </form>
                    </Form>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Save password</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="notifications" className="w-4/5">
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                      Get Up to date with your notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UserNotifications />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </main>
  );
}
export default UserProfile;
