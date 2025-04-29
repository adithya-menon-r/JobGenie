# JobGenie Installation Guide

### 1. Repository Setup
```bash
git clone https://github.com/adithya-menon-r/JobGenie.git
cd JobGenie
```

## 2. Install Frontend Dependencies
Navigate to the `frontend` directory and install the required dependencies:
```bash
cd frontend
pnpm install
```
> _Make sure you have the `pnpm` package manager installed globally._

## 3. Install Backend Dependencies
Navigate to the `backend` directory and install the required dependencies:
```bash
cd ../backend
npm install
```

## 4. Set up Python Backend
Navigate to the `backend-python` directory:
```bash
cd ../backend-python
```

Create a virtual environment:
```bash
python -m venv .venv
```
Activate the virtual environment:
- For Windows:
  ```bash
  .\.venv\Scripts\activate
  ```
- For Linux:
  ```bash
  source .venv/bin/activate
  ```

Install the required Python dependencies:
```bash
pip install -r requirements.txt
```

## 5. Set Up Environment Variables
- In the `frontend` directory, create a `.env` file with the following:

    ```plaintext
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="YOUR_CLERK_PUBLISHABLE_KEY"
    CLERK_SECRET_KEY="YOUR_CLERK_SECRET_KEY"
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/jobs
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/jobs
    NEXT_PUBLIC_DRIZZLE_DATABASE_URL="YOUR_DRIZZLE_DB_URL"
    NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY="YOUR_GOOGLE_GEMINI_API_KEY"
    NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT=5
    ```
- In the `backend` directory, create a `.env` file with the following:

    ```plaintext
    PORT=YOUR_BACKEND_PORT
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
    ```
- In the `backend-python` directory, create a `.env` file with the following:
    ```plaintext
    FRONTEND_URL=YOUR_FRONTEND_URL
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
    APIFY_API_KEY="YOUR_APIFY_API_KEY"
    APIFY_ACTOR_ID="YOUR_APIFY_ACTOR_ID"
    ```

## 6. Run the Application
Go to the `frontend` directory and run:
```bash
pnpm run dev
```

Go to the `backend` directory and run:
```bash
npm run dev
```

Go to the `backend-python` directory, after activating the virtual environment, run:
```bash
python run.py
```

Open up `http://localhost:3000` and voilà - JobGenie is up and running!