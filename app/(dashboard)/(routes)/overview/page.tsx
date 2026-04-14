import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Metadata } from 'next'
import { OverviewChart } from './components/overviewChart'
import PaymentsOverview from './components/paymentOverviews'
import RecentUserOverview from './components/recentUsersOverview'
import { IndianRupee } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Example dashboard app built using the components.',
}

export default function OverViewPage() {
  return (
    <>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  Application Submitted
                </CardTitle>
                <CardDescription>
                  Total Application submitted per year
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <OverviewChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <div className="flex justify-between w-full">
                  <CardTitle className="text-2xl font-semibold">
                    Top Payments
                  </CardTitle>
                  <Link href="/payments" className="underline decoration-1">
                    View All
                  </Link>
                </div>
                <CardDescription>
                  Recent payments by students & agents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentsOverview />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 pt-4">
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
              <div className="col-span-2">
                <div className="flex flex-wrap">
                  <div className="w-1/2 pr-6 pb-6">
                    <Card className="text-center bg-card-sutdent h-40 flex justify-center items-center flex-wrap">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 w-full">
                        <CardTitle className="text-2xl font-semibold text-center w-full">
                          Total Students On Boarded
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="font-bold text-4xl">450+</div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-1/2 pr-6 pb-6">
                    <Card className="text-center bg-card-revenue h-40 flex justify-center items-center flex-wrap">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-2xl font-semibold text-center w-full">
                          Revenue Generated
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="font-bold text-4xl flex items-center self-center justify-center">
                          <IndianRupee />
                          1,75000
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-1/2 pr-6 pb-6">
                    <Card className="text-center bg-card-agent h-40 flex justify-center items-center flex-wrap">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 w-full">
                        <CardTitle className="text-2xl font-semibold text-center w-full">
                          Agents
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="font-bold text-4xl">50+</div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-1/2 pr-6 pb-6">
                    <Card className="text-center bg-card-university h-40 flex justify-center items-center flex-wrap">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 w-full">
                        <CardTitle className="text-2xl font-semibold text-center w-full">
                          Universities
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="font-bold text-4xl">450+</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
            <Card className="col-span-1">
              <CardHeader className="flex justify-between w-full">
                <div className="flex justify-between w-full">
                  <CardTitle className="text-2xl font-semibold">
                    Recent Users
                  </CardTitle>
                  <Link href="/students" className="underline decoration-1">
                    View All
                  </Link>
                </div>
                <CardDescription>
                  Recent registered users & agents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentUserOverview />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
