import {
  Approach,
  Bento,
  Company,
  Experiences,
  Footer,
  GET_APPROACH,
  GET_BENTO_GRID,
  GET_COMPANIES,
  GET_EXPERIENCE,
  GET_FOOTER,
  GET_PROJECTS,
  GET_SOCIALS,
  GET_TESTIMONIALS,
  Project,
  Socials,
  Testimonial,
} from "../gql/queries/blocks";
import { Author, GET_AUTHORS } from "../gql/queries/blog/authors";

export async function fetchGridItems(): Promise<Bento[]> {
  try {
    const bentoItems = await GET_BENTO_GRID();
    //console.log(bentoItems);
    return bentoItems;
  } catch (error) {
    console.error("Error fetching grid items:", error);
    return [];
  }
}

// Placeholder grid items array, initial empty
export let gridItems: Bento[] = [];

// Populate the gridItems array
fetchGridItems().then((items) => {
  gridItems = items;
});

export async function fetchProjectItem(): Promise<Project[]> {
  try {
    const projectItems = await GET_PROJECTS();
    //console.log(projectItems);
    return projectItems;
  } catch (error) {
    console.error("Error fetching grid items:", error);
    return [];
  }
}

// Placeholder grid items array, initial empty
export let projectItems: Project[] = [];

// Populate the gridItems array
fetchProjectItem().then((items) => {
  projectItems = items;
});

export async function fetchTestimonialsItem(): Promise<Testimonial[]> {
  try {
    const testimonialItems = await GET_TESTIMONIALS();
    //console.log(testimonialItems);
    return testimonialItems;
  } catch (error) {
    console.error("Error fetching grid items:", error);
    return [];
  }
}

// Placeholder grid items array, initial empty
export let testimonialItems: Testimonial[] = [];

// Populate the gridItems array
fetchTestimonialsItem().then((items) => {
  testimonialItems = items;
});

export async function fetchCompaniesItem(): Promise<Company[]> {
  try {
    const companyItems = await GET_COMPANIES();
    //console.log(companyItems);
    return companyItems;
  } catch (error) {
    console.error("Error fetching grid items:", error);
    return [];
  }
}

// Placeholder grid items array, initial empty
export let companyItems: Company[] = [];

// Populate the gridItems array
fetchCompaniesItem().then((items) => {
  companyItems = items;
});

export async function fetchExperiencesItem(): Promise<Experiences[]> {
  try {
    const workExperience = await GET_EXPERIENCE();
    //console.log(workExperience);
    return workExperience;
  } catch (error) {
    console.error("Error fetching grid items:", error);
    return [];
  }
}

// Placeholder grid items array, initial empty
export let workExperience: Experiences[] = [];

// Populate the gridItems array
fetchExperiencesItem().then((items) => {
  workExperience = items;
});

export async function fetchSocialsItem(): Promise<Socials[]> {
  try {
    const socialItems = await GET_SOCIALS();
    //console.log(socialItems);
    return socialItems;
  } catch (error) {
    console.error("Error fetching grid items:", error);
    return [];
  }
}

// Placeholder grid items array, initial empty
export let socialItems: Socials[] = [];

// Populate the gridItems array
fetchSocialsItem().then((items) => {
  socialItems = items;
});

export async function fetchApproachesItem(): Promise<Approach[]> {
  try {
    const approachItems = await GET_APPROACH();
    //console.log(approachItems);
    return approachItems;
  } catch (error) {
    console.error("Error fetching grid items:", error);
    return [];
  }
}

// Placeholder grid items array, initial empty
export let approachItems: Approach[] = [];

// Populate the gridItems array
fetchApproachesItem().then((items) => {
  approachItems = items;
});

export async function fetchFooterItem(): Promise<Footer[]> {
  try {
    const footerItems = await GET_FOOTER();
    //console.log(footerItems);
    return footerItems;
  } catch (error) {
    console.error("Error fetching grid items:", error);
    return [];
  }
}

// Placeholder grid items array, initial empty
export let footerItems: Footer[] = [];

// Populate the gridItems array
fetchFooterItem().then((items) => {
  footerItems = items;
});

export const navItems = [
  { name: "Top", link: "#home" },
  { name: "Projects", link: "#projects" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "experience", link: "#experience" },
  { name: "Contact", link: "#contact" },
];

// export const socialMedia = [
//   {
//     id: 1,
//     img: "/svg/git.svg",
//   },
//   {
//     id: 2,
//     img: "/svg/twit.svg",
//   },
//   {
//     id: 3,
//     img: "/svg/link.svg",
//   },
// ];

// export const workExperience = [
//   {
//     id: 1,
//     title: "Frontend Engineer Intern",
//     desc: "Assisted in the development of a web-based platform using React.js, enhancing interactivity.",
//     className: "md:col-span-2",
//     thumbnail: "/svg/exp1.svg",
//   },
//   {
//     id: 2,
//     title: "Mobile App Dev - JSM Tech",
//     desc: "Designed and developed mobile app for both iOS & Android platforms using React Native.",
//     className: "md:col-span-2", // change to md:col-span-2
//     thumbnail: "/svg/exp2.svg",
//   },
//   {
//     id: 3,
//     title: "Freelance App Dev Project",
//     desc: "Led the dev of a mobile app for a client, from initial concept to deployment on app stores.",
//     className: "md:col-span-2", // change to md:col-span-2
//     thumbnail: "/svg/exp3.svg",
//   },
//   {
//     id: 4,
//     title: "Lead Frontend Developer",
//     desc: "Developed and maintained user-facing features using modern frontend technologies.",
//     className: "md:col-span-2",
//     thumbnail: "/svg/exp4.svg",
//   },
// ];

// export const testimonials = [
//   {
//     quote:
//       "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
//     name: "Michael Johnson",
//     title: "Director of AlphaStream Technologies",
//     img: "/svg/profile.svg",
//   },
//   {
//     quote:
//       "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
//     name: "Michael Johnson",
//     title: "Director of AlphaStream Technologies",
//     img: "/svg/profile.svg",
//   },
//   {
//     quote:
//       "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
//     name: "Michael Johnson",
//     title: "Director of AlphaStream Technologies",
//     img: "/svg/profile.svg",
//   },
//   {
//     quote:
//       "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
//     name: "Michael Johnson",
//     title: "Director of AlphaStream Technologies",
//     img: "/svg/profile.svg",
//   },
//   {
//     quote:
//       "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
//     name: "Michael Johnson",
//     title: "Director of AlphaStream Technologies",
//     img: "/svg/profile.svg",
//   },
// ];

// export const companies = [
//   {
//     id: 1,
//     name: "cloudinary",
//     img: "/svg/cloud.svg",
//     nameImg: "/svg/cloudName.svg",
//   },
//   {
//     id: 2,
//     name: "appwrite",
//     img: "/svg/app.svg",
//     nameImg: "/svg/appName.svg",
//   },
//   {
//     id: 3,
//     name: "HOSTINGER",
//     img: "/svg/host.svg",
//     nameImg: "/svg/hostName.svg",
//   },
//   {
//     id: 4,
//     name: "stream",
//     img: "/svg/s.svg",
//     nameImg: "/svg/streamName.svg",
//   },
//   {
//     id: 5,
//     name: "docker.",
//     img: "/svg/dock.svg",
//     nameImg: "/svg/dockerName.svg",
//   },
// ];

// export const testimonials = [
//   {
//     quote:
//       "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
//     name: "Michael Johnson",
//     title: "Director of AlphaStream Technologies",
//     img: "/svg/profile.svg",
//   },
//   {
//     quote:
//       "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
//     name: "Michael Johnson",
//     title: "Director of AlphaStream Technologies",
//     img: "/svg/profile.svg",
//   },
//   {
//     quote:
//       "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
//     name: "Michael Johnson",
//     title: "Director of AlphaStream Technologies",
//     img: "/svg/profile.svg",
//   },
//   {
//     quote:
//       "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
//     name: "Michael Johnson",
//     title: "Director of AlphaStream Technologies",
//     img: "/svg/profile.svg",
//   },
//   {
//     quote:
//       "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
//     name: "Michael Johnson",
//     title: "Director of AlphaStream Technologies",
//     img: "/svg/profile.svg",
//   },
// ];

// export const projects = [
//   {
//     id: 1,
//     title: "3D Solar System Planets to Explore",
//     des: "Explore the wonders of our solar system with this captivating 3D simulation of the planets using Three.js.",
//     img: "/svg/p1.svg",
//     iconLists: [
//       "/svg/re.svg",
//       "/svg/tail.svg",
//       "/svg/ts.svg",
//       "/svg/three.svg",
//       "/svg/fm.svg",
//     ],
//     link: "/ui.earth.com",
//   },
//   {
//     id: 2,
//     title: "Yoom - Video Conferencing App",
//     des: "Simplify your video conferencing experience with Yoom. Seamlessly connect with colleagues and friends.",
//     img: "/svg/p2.svg",
//     iconLists: [
//       "/svg/next.svg",
//       "/svg/tail.svg",
//       "/svg/ts.svg",
//       "/svg/stream.svg",
//       "/svg/c.svg",
//     ],
//     link: "/ui.yoom.com",
//   },
//   {
//     id: 3,
//     title: "AI Image SaaS - Canva Application",
//     des: "A REAL Software-as-a-Service app with AI features and a payments and credits system using the latest tech stack.",
//     img: "/svg/p3.svg",
//     iconLists: [
//       "/svg/re.svg",
//       "/svg/tail.svg",
//       "/svg/ts.svg",
//       "/svg/three.svg",
//       "/svg/c.svg",
//     ],
//     link: "/ui.aiimg.com",
//   },
//   {
//     id: 4,
//     title: "Animated Apple Iphone 3D Website",
//     des: "Recreated the Apple iPhone 15 Pro website, combining GSAP animations and Three.js 3D effects..",
//     img: "/svg/p4.svg",
//     iconLists: [
//       "/svg/next.svg",
//       "/svg/tail.svg",
//       "/svg/ts.svg",
//       "/svg/three.svg",
//       "/svg/gsap.svg",
//     ],
//     link: "/ui.apple.com",
//   },
// ];

// export const gridItems = [
//   {
//     id: 1,
//     title: "I prioritize client collaboration, fostering open communication ",
//     description: "",
//     className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
//     imgClassName: "w-full h-full",
//     titleClassName: "justify-end",
//     img: "/svg/b1.svg",
//     spareImg: "",
//   },
//   {
//     id: 2,
//     title: "I'm very flexible with time zone communications",
//     description: "",
//     className: "lg:col-span-2 md:col-span-3 md:row-span-2",
//     imgClassName: "",
//     titleClassName: "justify-start",
//     img: "",
//     spareImg: "",
//   },
//   {
//     id: 3,
//     title: "My tech stack",
//     description: "I constantly try to improve",
//     className: "lg:col-span-2 md:col-span-3 md:row-span-2",
//     imgClassName: "",
//     titleClassName: "justify-center",
//     img: "",
//     spareImg: "",
//   },
//   {
//     id: 4,
//     title: "Tech enthusiast with a passion for development.",
//     description: "",
//     className: "lg:col-span-2 md:col-span-3 md:row-span-1",
//     imgClassName: "",
//     titleClassName: "justify-start",
//     img: "/svg/grid.svg",
//     spareImg: "/svg/b4.svg",
//   },

//   {
//     id: 5,
//     title: "Currently building a JS Animation library",
//     description: "The Inside Scoop",
//     className: "md:col-span-3 md:row-span-2",
//     imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
//     titleClassName: "justify-center md:justify-start lg:justify-center",
//     img: "/svg/b5.svg",
//     spareImg: "/svg/grid.svg",
//   },
//   {
//     id: 6,
//     title: "Do you want to start a project together?",
//     description: "",
//     className: "lg:col-span-2 md:col-span-3 md:row-span-1",
//     imgClassName: "",
//     titleClassName: "justify-center md:max-w-full max-w-60 text-center",
//     img: "",
//     spareImg: "",
//   },
// ];
