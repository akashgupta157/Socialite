![logo](https://github.com/akashgupta157/Socialite/assets/112753311/52128941-4ce6-4d21-b0f9-5ff71aa62d7c)
# Socialite: A Social Media Platform

## Overview

Socialite is a state-of-the-art social media platform developed with TypeScript, Next.js, and Tailwind CSS. This platform offers a feature-rich and responsive interface that allows users to seamlessly connect, share, and engage with content.

## Features

- **Authentication:**
  - Secure user authentication system for account protection.

- **Strongly Typed React Components:**
  - Utilize TypeScript for robust and type-safe React components.

- **Post Management:**
  - Users can create, like, reply to, and delete posts.
  - Bookmark posts for easy reference.

- **Image Uploads:**
  - Seamless integration for users to add images to their posts.
  - All image uploads are stored securely on Cloudinary Cloud Storage.

- **User Interaction:**
  - Follow and unfollow other users to build a personalized network.
  - Explore and view all users and trending lists.

- **Real-time Updates:**
  - Stay informed with real-time updates on likes and user profile changes.

- **Profile Management:**
  - Users can edit and personalize their profiles to reflect their identity.

- **Responsive Design:**
  - Enjoy a responsive design that ensures optimal user experience on both mobile and desktop devices.

## Tech Stack

- **TypeScript:**
  - Enhance code quality and maintainability with static typing.

- **Next.js:**
  - Build fast and scalable applications with server-side rendering and a powerful React framework.

- **Tailwind CSS:**
  - Utilize a utility-first CSS framework for designing a clean and customizable user interface.

- **Cloudinary Cloud Storage:**
  - Securely store and manage all image uploads in Cloudinary Cloud Storage.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/akashgupta157/Socialite
   ```

2. Install dependencies:
   ```bash
   cd socialite
   npm install
   ```

3. Create a .env.local file in the root of the project and add the following:
    ```bash
    MONGODB_URI=your_mongodb_uri
    SECRET_KEY=your_secret_key
    ```
    Note: Replace your_mongodb_uri with your MongoDB connection URI and your_secret_key with a secret key for authentication.

4. Start the development server:
   ```bash
   npm run dev
   ```
   
5. Open your browser and visit [http://localhost:3000](http://localhost:3000) to experience Socialite.
   
## Deployment
Socialite is deployed on Vercel. Visit the live deployment at https://socialite-app.vercel.app.

## Contribution Guidelines

We welcome contributions! Please follow these guidelines when contributing to Socialite:

- Fork the repository and create a new branch for your feature or bug fix.
- Run tests and lint your code before submitting a pull request.
- Clearly document your code and changes in the pull request description.

## License

Socialite is open-source software licensed under the [MIT License](LICENSE).

Feel free to reach out if you have any questions or feedback. Happy coding!
