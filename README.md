# Checklist App

## Description

This is a simple checklist app that allows you to create, edit, duplicate and delete checklists. It also allows you to check off items on your checklist and uncheck them.

## Setup

### Prerequisites

1. [Nvm](https://github.com/nvm-sh/nvm)
2. Create a MongoDB database. You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) to create a free database.

## Installation

1. Clone the repository
2. Run `nvm i` to install and use the correct version of node
3. Run `npm i` to install the dependencies
4. Duplicate the `.env.example` file and rename it to `.env.local` and update the variables with your own values

# Development

1. Run `npm run dev` to start the app

# Deployment

I recommend using [Netlify](https://www.netlify.com/) as you can create a few account, link it your GH account and deploy the app.

1. Click add new site
2. Select import from an existing project
3. Link it to your GH account
4. Select the repo you want to deploy
5. Setup environment variables
6. Deploy the app
