
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { Banner } from '@/components/ui/banner';

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  // Example data for the dashboard
  const courseProgress = 35;
  const latestLessons = [
    {
      id: 1,
      title: "Introduction to the Costco Algorithm",
      duration: "25 min",
      progress: 100,
      path: "/dashboard/course"
    },
    {
      id: 2,
      title: "KPIs for High-Growth Tech Companies",
      duration: "40 min",
      progress: 60,
      path: "/dashboard/course"
    },
    {
      id: 3,
      title: "Company Valuation: The Probabilistic Method",
      duration: "35 min",
      progress: 0,
      path: "/dashboard/course"
    }
  ];

  const upcomingEarnings = [
    { company: "Apple (AAPL)", date: "28 Jul 2025", logo: "🍎" },
    { company: "Microsoft (MSFT)", date: "30 Jul 2025", logo: "🪟" },
    { company: "Amazon (AMZN)", date: "1 Aug 2025", logo: "📦" }
  ];
  
  const stats = [
    { 
      title: "Course Progress", 
      value: `${courseProgress}%`, 
      icon: (
        <svg className="w-5 h-5 text-techstock-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      description: "5 of 14 modules completed" 
    },
    { 
      title: "Completed Tests", 
      value: "3/10", 
      icon: (
        <svg className="w-5 h-5 text-techstock-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      description: "Show what you've learned" 
    },
    { 
      title: "Analyzed Stocks", 
      value: "5", 
      icon: (
        <svg className="w-5 h-5 text-techstock-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      description: "AAPL, MSFT, AMZN, NVDA, TSLA" 
    },
    { 
      title: "Portfolio Stocks", 
      value: "3", 
      icon: (
        <svg className="w-5 h-5 text-techstock-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
      description: "Manage your investments" 
    }
  ];

  return (
    <div className="h-screen flex bg-black">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      <div className="flex-1 overflow-auto">
        {/* Banner at the top */}
        <Banner id="dashboard-banner" variant="normal" message="Welcome to your TechStock Dashboard! Track your learning and portfolio performance here." />

        {/* Main Content */}
        <main className="p-6">
          {/* Course Overview Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Course Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-[#0D0D18] border-techstock-gray/30 text-white hover:border-techstock-purple transition-colors duration-300">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">{stat.title}</CardTitle>
                    <div className="h-8 w-8 rounded-full bg-techstock-purple/10 flex items-center justify-center">
                      {stat.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-gray-400">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="bg-[#0D0D18] border-techstock-gray/30 text-white mb-8">
              <CardHeader>
                <CardTitle>Keep Learning</CardTitle>
                <CardDescription className="text-gray-400">Your most recent lessons</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {latestLessons.map((lesson) => (
                  <div key={lesson.id} className="border border-techstock-gray/30 rounded-lg p-4 hover:border-techstock-purple transition-colors duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{lesson.title}</h3>
                      <span className="text-xs text-gray-400">{lesson.duration}</span>
                    </div>
                    <div className="mb-2">
                      <Progress value={lesson.progress} className="h-2 bg-gray-700">
                        <div className="h-full bg-techstock-purple rounded-full"></div>
                      </Progress>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">{lesson.progress}% completed</span>
                      <Link to={lesson.path}>
                        <Button variant="outline" size="sm" className="text-techstock-purple-light border-techstock-purple/30 hover:border-techstock-purple">
                          {lesson.progress === 0 ? "Start" : lesson.progress === 100 ? "Review" : "Continue"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Link to="/dashboard/course" className="w-full">
                  <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:text-white hover:border-gray-500">
                    View all course content
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </section>

          {/* My Portfolio Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">My Portfolio</h2>
            {/* Demo portfolio tracker */}
            <Card className="bg-[#0D0D18] border-techstock-gray/30 text-white mb-8">
              <CardHeader>
                <CardTitle>Track your stocks</CardTitle>
                <CardDescription className="text-gray-400">Add stocks by ticker and quantity. See your portfolio weighting and performance (demo data).</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Demo: hardcoded portfolio table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-gray-400">
                        <th className="px-4 py-2 text-left">Ticker</th>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-right">Quantity</th>
                        <th className="px-4 py-2 text-right">Price</th>
                        <th className="px-4 py-2 text-right">Weight</th>
                        <th className="px-4 py-2 text-right">Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Demo rows */}
                      <tr>
                        <td className="px-4 py-2 font-mono">AAPL</td>
                        <td className="px-4 py-2">Apple Inc.</td>
                        <td className="px-4 py-2 text-right">10</td>
                        <td className="px-4 py-2 text-right">$180.00</td>
                        <td className="px-4 py-2 text-right">50%</td>
                        <td className="px-4 py-2 text-right text-green-400">+12.5%</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono">MSFT</td>
                        <td className="px-4 py-2">Microsoft Corp.</td>
                        <td className="px-4 py-2 text-right">5</td>
                        <td className="px-4 py-2 text-right">$320.00</td>
                        <td className="px-4 py-2 text-right">30%</td>
                        <td className="px-4 py-2 text-right text-green-400">+8.1%</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono">AMZN</td>
                        <td className="px-4 py-2">Amazon.com Inc.</td>
                        <td className="px-4 py-2 text-right">2</td>
                        <td className="px-4 py-2 text-right">$135.00</td>
                        <td className="px-4 py-2 text-right">20%</td>
                        <td className="px-4 py-2 text-right text-red-400">-3.2%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* Demo: add stock form placeholder */}
                <div className="mt-4">
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:border-gray-500">Add Stock (Demo Only)</Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Other dashboard widgets */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Earnings */}
              <Card className="bg-[#0D0D18] border-techstock-gray/30 text-white">
                <CardHeader>
                  <CardTitle>Upcoming Earnings</CardTitle>
                  <CardDescription className="text-gray-400">Earnings calendar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEarnings.map((earning, index) => (
                    <div key={index} className="border border-techstock-gray/30 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-techstock-purple/10 flex items-center justify-center mr-3 text-lg">
                          {earning.logo}
                        </div>
                        <div>
                          <p className="font-medium">{earning.company}</p>
                          <p className="text-xs text-gray-400">{earning.date}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="text-gray-300 border-gray-700 hover:text-white hover:border-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </Button>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Link to="/dashboard/portfolio" className="w-full">
                    <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:text-white hover:border-gray-500">
                      View your portfolio
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
