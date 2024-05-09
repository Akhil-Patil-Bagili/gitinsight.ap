# GitInsight

## Introduction

GitInsight offers unparalleled insights into Git repositories for developers, project managers, and non-technical users. By leveraging OpenAI's GPT-4 and advanced data indexing, GitInsight simplifies querying Git commits and understanding project trends.

## Getting Started

This guide will help you set up GitInsight from scratch, covering both the frontend and backend.

## our application is now live: 
## Live Link: https://663c9b157c707700084970d2--gitinsight-ai.netlify.app/

Note: If you get into an issue "No response from the server", its because your browser is not setup to allow the origin. To fix this issue, please follow the below steps-
- open new tab in the same browser and go to the link: https://34.229.180.222/fetch_commits
- click on advance and then proceed to use option.
- This should give you Method Not Allowed page which simply means you have successfully allowed the origin.
- Now try accessing the app again in the same browser. It should work fine then.


### Prerequisites

Ensure you have the following installed:
- Node.js and npm for frontend development
- Python 3.8 or higher for backend development
- Docker (optional) for database and deployment

### Tech Stack

- **Frontend**: React, Axios, Vite
- **Backend**: Flask, GPT-4, Astra DB
- **Database**: Astra DB
- **Deployment**: AWS or Render, Docker (optional)

## Setup Instructions

### Backend Setup

1. **Clone the GitInsight Repository**

git clone https://github.com/Ankith-Harsha-Akhil/GitInsight.git
```
cd GitInsight
```

2. **Set Up a Virtual Environment**
- macOS/Linux:
  ```
  python3 -m venv venv
  source venv/bin/activate
  ```
- Windows:
  ```
  python -m venv venv
  .\venv\Scripts\activate
  ```

3. **Install Dependencies**
```
pip install -r requirements.txt
```

### Frontend Setup

1. **Navigate to the Frontend Directory**
```
cd frontend
```

2. **Install NPM Packages**
```
npm install
```

3. **Start the Frontend Application**
```
npm start
```
Access the application at `http://localhost:3000`.

### Running the Application

Make sure the backend server is running before you access the frontend application in your browser.

### Docker Setup (Optional)

For deploying with Docker, refer to the Docker documentation for setup instructions tailored to this project.

## Contributing

We welcome contributions to GitInsight. Please check the project's contribution guidelines for more information on how to contribute.

