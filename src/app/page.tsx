'use client';
import Banner from '@/components/banner/banner';
import HowSikshaWorks from '@/components/howSikshaWorks/howSikshaWorks';
import ServicesAt from '@/components/servicesAt/servicesAt';
import Subscription from '@/components/subscriptionPlans/subscriptions';
import Testimonials from '@/components/testimonials/testimonials';
import TopUniversity from '@/components/topUniversity/topUniversity';

export default function Home() {
  return (
    <main>
      <Banner />
      <ServicesAt />
      <HowSikshaWorks />
      <TopUniversity />
      <Subscription />
      <Testimonials />
    </main>
  );
}
