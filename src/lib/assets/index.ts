import {
  Approach,
  Bento,
  Company,
  Deal,
  Experiences,
  Footer,
  GET_APPROACH,
  GET_BENTO_GRID,
  GET_COMPANIES,
  GET_DEAL,
  GET_EXPERIENCE,
  GET_FOOTER,
  GET_PROJECTS,
  GET_SEARCH,
  GET_SOCIALS,
  GET_TESTIMONIALS,
  Project,
  Search,
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
    console.error("Error fetching projects items:", error);
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
    console.error("Error fetching testimonials items:", error);
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
    console.error("Error fetching companies items:", error);
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
    console.error("Error fetching experience items:", error);
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
    console.error("Error fetching socials items:", error);
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
    console.error("Error fetching approach items:", error);
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
    console.error("Error fetching footer items:", error);
    return [];
  }
}

// Placeholder grid items array, initial empty
export let footerItems: Footer[] = [];

// Populate the gridItems array
fetchFooterItem().then((items) => {
  footerItems = items;
});

export async function fetchSearchItem(): Promise<Search[]> {
  try {
    const searchItems = await GET_SEARCH();
    //console.log(searchItems);
    return searchItems;
  } catch (error) {
    console.error("Error fetching search items:", error);
    return [];
  }
}

// Placeholder grid items array, initial empty
export let searchItems: Search[] = [];

// Populate the gridItems array
fetchSearchItem().then((items) => {
  searchItems = items;
});

export async function fetchDealItem(): Promise<Deal[]> {
  try {
    const dealItems = await GET_DEAL();
    //console.log(searchItems);
    return dealItems;
  } catch (error) {
    console.error("Error fetching deal items:", error);
    return [];
  }
}

// Placeholder grid items array, initial empty
export let dealItems: Deal[] = [];

// Populate the gridItems array
fetchDealItem().then((items) => {
  dealItems = items;
});

export const navItems = [
  { name: "Top", link: "#home" },
  { name: "Projects", link: "#projects" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "experience", link: "#experience" },
  { name: "Contact", link: "#contact" },
];
