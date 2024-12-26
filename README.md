# GitGet : GitHub Repository Search
A React application that allows users to search for GitHub users and explore their repositories. Built with TypeScript and Vite, featuring repository filtering, similar users discovery, pagination, and dark mode UI.
Live Demo: https://git-get.netlify.app/

## Features
- User search with autocomplete functionality
- Repository exploration with name search and language filtering
- Similar users discovery
- Pagination for repository results
- Dark mode interface
- Responsive design following UX principles
- GraphQL API integration (GitHub API v4)
- Comprehensive test coverage
- Storybook component documentation
## Technologies
- React + TypeScript
- Vite
- GraphQL
- Vitest for testing
- Storybook
- GitHub API v4
- Netlify for deployment
## Getting Started
### Prerequisites
- Node.js
- npm or yarn
- GitHub Personal Access Token
### Installation
1. Clone the repository:
bash
git clone https://github.com/emna-dammak/GitGet
cd GitGet

2. Install dependencies:
bash
npm install

3. Create a .env file in the root directory:
env
VITE_GITHUB_TOKEN=your_personal_access_token

4. Start the development server:
bash
npm run dev

## Running Tests
Execute the test suite using:
bash
npm run test

## Storybook
View component documentation and stories:
bash
npm run storybook

## Deployment
The project is deployed on Netlify.
## Project Structure

src/
  ├── assets/
  ├── components/
  ├── models/
  ├── graphql/
  ├── stories/
  └── pages/
      ├── Home/
      ├── Repositories/
      └── SimilarUsers/

## Future Improvements
1. Add repository sorting options
2. Enhance error handling and loading states
3. Add user activity visualization
4. Implement caching for frequently searched users
5. Improve accessibility features
6. Add more interactive repository statistics
