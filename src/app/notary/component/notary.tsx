import ImageUpload from '@/common/ImageUpload';
import { DemoPaymentMethod } from '@/common/paymentBox';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import i18n from '@/i18n';
import { notarySchema } from '@/validations/notary.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

function NotaryForm() {
  const form = useForm<z.infer<typeof notarySchema>>({
    resolver: zodResolver(notarySchema),
    defaultValues: {
      full_name: '',
      email: '',
      mobile_number: '',
      images: [],
    },
  });
  const onSubmit = (data: z.infer<typeof notarySchema>) => {
    console.log(data, 'data');
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-4 max-[575px]:p-1 space-y-4"
      >
        <div className="flex items-center w-full flex-wrap">
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{i18n.t('en_email')}</FormLabel>
                  <FormControl>
                    <Input placeholder={i18n.t('en_email_place')} {...field} />
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
          <div className="w-full px-2 mb-4">
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Documents</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value.map(
                        (image: { url: string }) => image.url
                      )}
                      //   disabled={loading}
                      onChange={(url: string) =>
                        field.onChange([...field.value, { url }])
                      }
                      onRemove={(url: string) =>
                        field.onChange([
                          ...field.value.filter(
                            (current: { url: string }) => current.url !== url
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DemoPaymentMethod />
        </div>
        <Button>Make a Payment</Button>
        {/* <Button type="submit">Submit</Button> */}
      </form>
    </Form>
  );
}

export default NotaryForm;
