import { assets } from "../assets/assets.js";

export const userData = {
  id: 1,
  name: "David",
  email: "david.weasly@outlook.com",
};

export const projectsData = [
  {
    _id: "123",
    review: 4.5,
    projectName: "Microsoft Teams",
    status: "Active",
    category: "Business",
    reviewsCount: 400,
    createdDate: 1739318400000,
    organization: "Microsoft",
    logo: assets.teamsLogo,
    description:
      "Collecting user feedback on Microsoft Teams' collaboration features, video conferencing, and productivity tools. Showcasing real experiences from professionals across industries.",
    response: true,
  },

  {
    _id: "124",
    review: 3.5,
    projectName: "Microsoft Outlook",
    status: "Inactive",
    category: "Business",
    reviewsCount: 250,
    createdDate: 1739059200000,
    organization: "Microsoft",
    logo: assets.outlookLogo,
    description:
      "Gathering user experiences on Outlook’s email management, calendar scheduling, and seamless integration with Microsoft services. Highlighting productivity and communication efficiency",
    response: true,
  },
  {
    _id: "125",
    review: 4.0,
    projectName: "Instagram",
    status: "Active",
    category: "Business",
    reviewsCount: 100,
    createdDate: 1738886400000,
    organization: "Meta",
    logo: assets.instagramLogo,
    description:
      "Collecting user feedback on Instagram’s photo and video sharing, engagement features, and social media influence. Showcasing experiences from creators, businesses, and everyday users.",
    response: false,
  },
  {
    _id: "126",
    review: 4.0,
    projectName: "Microsoft Store",
    status: "Active",
    category: "Business",
    reviewsCount: 700,
    createdDate: 1738800000000,
    organization: "Microsoft",
    logo: assets.storeLogo,
    description:
      "Gathering user insights on the Microsoft App Store’s app selection, usability, and download experience. Highlighting feedback on performance, security, and developer support.",
    response: true,
  },
  {
    _id: "127",
    review: 3.5,
    projectName: "Blender.igs",
    status: "Active",
    category: "Business",
    reviewsCount: 50,
    createdDate: 1737763200000,
    organization: "Igs_corp",
    logo: assets.igsLogo,
    description:
      "Collecting user feedback on 3d Modeling and Renders engagement features, and social media influence. Showcasing experiences from creators, businesses, and everyday users.",
    response: true,
  },
];

export const Step1 = {
  question: "How it works?",
  step1:
    "Easily collect testimonials from your users with a simple, shareable link.",
  step2: "Manage everything from your dashboard—no hassle, no coding required!",
};
export const Step2 = {
  question: "Seamless Integration",
  step1:
    "Use our NPM package to fetch and display testimonials on your website—fully customizable!",
  step2: "No pre-made UI restrictions—design the display as you like.",
};

export const testimonials = [
  {
    _id: "122352",
    name: "John Doe",
    profilePhoto: "https://randomuser.me/api/portraits/men/1.jpg",
    review:
      "Microsoft Teams has completely transformed our remote meetings. Seamless integration with Office 365!",
    rating: 5,
    isSus: true,
    isReported: true,
  },
  {
    _id: "1252",
    name: "Emma Williams",
    profilePhoto: "https://randomuser.me/api/portraits/women/2.jpg",
    review:
      "Good tool, but sometimes notifications don’t sync properly across devices.",
    rating: 4,
    isSus: false,
    isReported: false,
  },
  {
    _id: "13252",
    name: "Liam Johnson",
    profilePhoto: "https://randomuser.me/api/portraits/men/3.jpg",
    review:
      "The UI is a bit cluttered, but overall a great platform for collaboration.",
    rating: 4,
    isSus: false,
    isReported: true,
  },
  {
    _id: "123245",
    name: "Sophia Martinez",
    profilePhoto: "https://randomuser.me/api/portraits/women/4.jpg",
    review:
      "We love using Teams for project management. The video call quality is top-notch!",
    rating: 5,
    isSus: false,
    isReported: false,
  },
  {
    _id: "12355",
    name: "Noah Brown",
    profilePhoto: "https://randomuser.me/api/portraits/men/5.jpg",
    review: "Laggy and buggy at times. Slack feels smoother in comparison.",
    rating: 3,
    isSus: false,
    isReported: false,
  },
  {
    _id: "1235",
    name: "Isabella Davis",
    profilePhoto: "https://randomuser.me/api/portraits/women/6.jpg",
    review:
      "Solid tool for work, but Microsoft needs to improve mobile performance.",
    rating: 4,
    isSus: false,
    isReported: false,
  },
  {
    _id: "1224",
    name: "Mason Wilson",
    profilePhoto: "https://randomuser.me/api/portraits/men/7.jpg",
    review:
      "Can’t believe my manager makes us use this. It crashes all the time!",
    rating: 2,
    isSus: false,
    isReported: false,
  },
  {
    _id: "1223",
    name: "Ava Taylor",
    profilePhoto: "https://randomuser.me/api/portraits/women/8.jpg",
    review:
      "A reliable platform, though I miss the customization options from Zoom.",
    rating: 4,
    isSus: false,
    isReported: false,
  },
  {
    _id: "1222",
    name: "James Anderson",
    profilePhoto: "https://randomuser.me/api/portraits/men/9.jpg",
    review:
      "This is the worst software ever. I literally lost all my messages overnight.",
    rating: 1,
    isSus: false,
    isReported: false,
  },
];

export const passData = {
  projectId: "123",
  passcode: "XYZ123",
  key: "a1b2c3d4-e5f6-7890-g1h2i3j4k5l6",
  createdAt: "2025-02-15T12:34:56Z",
};

export const projectReviewData = {
  projectId: 123,
  logo: assets.teamsLogo,
  projectName: "Microsoft Teams",
  organization: "Microsoft",
  description:
    "Collecting user feedback on Microsoft Teams' collaboration features, video conferencing, and productivity tools. Showcasing real experiences from professionals across industries.",
  category: "Business",
  status: "Active",
};

export const reviewEmail = {
  projectId: 123,
  isVerified: true,
  isReviewed: true,
  review: {
    name: "Emily Carter",
    rating: 5,
    review:
      "Microsoft Teams has completely transformed our remote collaboration! The integration with Office apps and video calls is seamless",
  },
};
