"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/utils/db";
import { chatSession } from "@/utils/GeminiConfig";
import { MockInteview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const AddNewInterview = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [jobExperience, setJobExperience] = useState("");
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const { user } = useUser();
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const inputPrompt = `
        Based on the following job details:
        Job Position: ${jobPosition}
        Job Description: ${jobDescription}
        Experience Level: ${jobExperience}
        Generate 5 full stack interview questions with answers in JSON format. Each object should include a "question" and a "answer" field. Keep answers concise and under 130 words.
        `;

        const result = await chatSession.sendMessage(inputPrompt);
        const MockJsonResp = (result.response.text()).replace("```json", "").replace("```", "");
        setJsonResponse(MockJsonResp);

        const resp = await db.insert(MockInteview)
            .values({
                mockId: uuidv4(),
                jsonMockResp: MockJsonResp,
                jobPosition,
                jobDesc: jobDescription,
                jobExperience,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format("DD-MM-yyyy"),
            })
            .returning({ mockId: MockInteview.mockId });

        if (resp) {
            setOpenDialog(false);
            router.push(`/interviews/interview/${resp[0]?.mockId}`);
        }

        setLoading(false);
    };

    return (
        <div>
            <div
                className="p-6 border bg-black hover:bg-black/75 rounded-lg shadow-md text-white cursor-pointer transition-all"
                onClick={() => setOpenDialog(true)}
            >
                <h2 className="font-semibold text-lg text-center">+ Add New Interview</h2>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-md bg-white border border-gray-200 rounded-lg p-6">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-800 mb-4">
                            Describe Your Interview Role
                        </DialogTitle>
                        <form onSubmit={onSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Job Role/Position</label>
                                <Input
                                    className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="e.g. Full Stack Developer"
                                    required
                                    value={jobPosition}
                                    onChange={(e) => setJobPosition(e.target.value)}
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Job Description / Tech Stack</label>
                                <Textarea
                                    className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="e.g. React, NodeJS, etc."
                                    required
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                                <Input
                                    className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="e.g. 3"
                                    type="number"
                                    required
                                    value={jobExperience}
                                    onChange={(e) => setJobExperience(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={() => setOpenDialog(false)}
                                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2Icon className="animate-spin h-4 w-4 mr-2" />
                                            Generating...
                                        </>
                                    ) : (
                                        "Start Interview"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddNewInterview;