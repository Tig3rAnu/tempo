'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import data from './data/data.json';
import Link from 'next/link';
import { Mail, PhoneCall } from 'lucide-react';

function VisaSupport() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="flex flex-wrap items-center w-full">
          {(data || []).map((v) => {
            return (
              <div className="md:w-1/3 px-4 w-full md:mb-0 mb-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{v.agency_Name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="mb-3">
                      <Link
                        href={`tel:${v.contact_number}`}
                        className="flex items-center"
                      >
                        <PhoneCall className="mr-2" />
                        {v.contact_number}
                      </Link>
                    </h3>
                    <p>
                      <Link
                        href={`mailto:${v.email}`}
                        className="flex items-center"
                      >
                        <Mail className="mr-2" />
                        {v.email}
                      </Link>
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default VisaSupport;
