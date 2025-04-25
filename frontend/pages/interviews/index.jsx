import React from 'react';
import AddNewInterview from './_components/AddNewInterview';
import InterviewLit from './_components/InterviewLit';
import DashboardLayout from "@/components/layout/dashboard-layout";

const DashboardPage = () => {
    return (
        <DashboardLayout>
            <div className='p-10'>
                <h2 className='font-extrabold text-3xl text-black'>Dashboard</h2>
                <h2 className='text-gray-800 mt-2'>Create and Start your AI Mock Interview</h2>

                <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
                    <AddNewInterview />
                </div>

                {/* Previous interviews */}
                <InterviewLit />
            </div>
        </DashboardLayout>
    );
};

export default DashboardPage;
