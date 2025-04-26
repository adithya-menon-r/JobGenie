import React from 'react';
import AddNewInterview from './_components/AddNewInterview';
import InterviewLit from './_components/InterviewLit';
import DashboardLayout from "@/components/layout/dashboard-layout";

const DashboardPage = () => {
    return (
        <DashboardLayout>
            <div className='p-10'>
                <h1 className="text-3xl font-bold tracking-tight">Mock Interviews</h1>
                <p className="text-muted-foreground">Create and Start your AI Mock Interview</p>
  
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
