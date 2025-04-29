# JobGenie

JobGenie is a career assistant that helps job seekers not just find the right jobs, but actually get them. It handles everything from real time job matching based on your resume, tailoring cover letters and resumes for specific roles, generating mock interviews, and providing AI driven career guidance.

![image](https://github.com/user-attachments/assets/c74e6352-e810-45af-8311-e48add7777a7)

## Problem We Aim to Solve
The job search process is messy an inefficient. As college students, we have been through the cycle of blindly applying to dozens of roles, tweaking the same resume, writing generic cover letters, and hoping something sticks. Most of the time, there is no feedback, no idea if you are even a good fit. JobGenie was built to fix that - by helping you find roles that actually match your profile, tailor your resume and cover letter for each job, and prep properly for interviews.

## Installation
For setup instructions, refer to [INSTALLATION.md](INSTALLATION.md)

## Key Features
### Skill Based Job Matching
JobGenie scrapes real-time listings from LinkedIn and finds jobs based on skills extracted from your resume, along with your preferences for role, location, and other filters. It shows personalized job recommendations with a match percentage based on how closely your skills align. You can save interesting roles or open the listing directly.

### Resume Tools
JobGenie analyzes your resume along with the given job description to:
  - Extract the required skills based on the JD and calculate your skill match percentage.
  - Score your resume for ATS compatibility, highlight what works, and suggest improvements to improve the ATS score.
  - Customize your resume and generate a tailored cover letter using both the job description and (optionally) a self description. 

### AI-powered Mock Interview
JobGenie generates mock interview questions based on the role, JD, and experience level. You can record video responses directly on the platform and get feedback on both content and delivery - what you said and how you said it.

### Career Guidance
You can ask JobGenie for learning resources, role specific roadmaps, or anything career related - from breaking into a new field to doubling down in your current one. You also get real time insights on industry specific job market trends to stay in the loop.

## Tech Stack

| Tech                                | Purpose                               |
|-------------------------------------|---------------------------------------|
| **Next.js 15** & **Tailwind CSS**  | Frontend                             |
| **Node.js** & **Express.js**       | Backend & RESTful API framework      |
| **FastAPI**                        | Python Backend Server                 |
| **Clerk**                          | User authentication                   |
| **PostgreSQL**                     | Database with Drizzle ORM            |
| **Gemini**                         | LLM for AI integrated features       |
| **APIfy LinkedIn Job Scraper API** | Job scraping                         |
| **node-latex**                     | LaTeX rendering to PDF               |

## Contributors
- Adithya Menon R
- Priyansh Narang
- Rahul K
- Kaushal Loya

_Made with ❤️ for jobseekers and dream chasers._

## License
[LICENSE](LICENSE)
