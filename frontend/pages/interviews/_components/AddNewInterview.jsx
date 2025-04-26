"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
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
                className="p-6 border border-blue-300 dark:border-blue-500 bg-blue-50 dark:bg-blue-950 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg shadow text-blue-900 dark:text-blue-100 cursor-pointer transition-all"
                onClick={() => setOpenDialog(true)}
            >
                <h2 className="font-semibold text-lg text-center">+ Start a New Interview</h2>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-2xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                            Describe Your Interview Role
                        </DialogTitle>
                        <DialogDescription className="text-gray-600 dark:text-gray-300">
                            <form onSubmit={onSubmit} className="space-y-5 mt-4">
                                <div>
                                    <label className="block mb-1 font-medium text-gray-900 dark:text-gray-100">Job Role/Position</label>
                                    <Input
                                        className="bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
                                        placeholder="e.g. Full Stack Developer"
                                        required
                                        onChange={(e) => setJobPosition(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium text-gray-900 dark:text-gray-100">Job Description / Tech Stack</label>
                                    <Textarea
                                        className="bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
                                        placeholder="e.g. React, NodeJS, etc."
                                        required
                                        onChange={(e) => setJobDescription(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium text-gray-900 dark:text-gray-100">Years of Experience</label>
                                    <Input
                                        className="bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
                                        placeholder="e.g. 3"
                                        type="number"
                                        required
                                        onChange={(e) => setJobExperience(e.target.value)}
                                    />
                                </div>

                                <div className="flex justify-end gap-4 mt-6">
                                    <Button
                                        variant="outline"
                                        type="button"
                                        onClick={() => setOpenDialog(false)}
                                        className="border-gray-400 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
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
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddNewInterview;
