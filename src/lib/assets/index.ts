import {
  Company,
  Deal,
  Footer,
  GET_COMPANIES,
  GET_DEAL,
  GET_FOOTER,
  GET_GLOBE,
  GET_PROJECTS,
  GET_SEARCH,
  GET_EXPERIENCE,
  GET_SOCIALS,
  GET_TESTIMONIALS,
  GET_TYPEWRITER,
  Globe,
  Project,
  Search,
  Experience,
  Socials,
  Testimonial,
  Typewriter,
  GET_PERK_GRID,
  Perk,
} from "../gql/queries/blocks";

export async function fetchGridItems(): Promise<Perk[]> {
  try {
    const perkItems = await GET_PERK_GRID();
    //console.log(perkItems);
    return perkItems;
  } catch (error) {
    console.error("Error fetching perk grid items:", error);
    return [];
  }
}

// Placeholder grid items array, initial empty
export let gridItems: Perk[] = [];

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

export async function fetchExperiencesItem(): Promise<Experience[]> {
  try {
    const experienceItems = await GET_EXPERIENCE();
    //console.log(experienceItems);
    return experienceItems;
  } catch (error) {
    console.error("Error fetching service items:", error);
    return [];
  }
}

// Placeholder grid items array, initial empty
export let experienceItems: Experience[] = [];

// Populate the gridItems array
fetchExperiencesItem().then((items) => {
  experienceItems = items;
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
    //console.log(dealItems);
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

export async function fetchTypewriterItem(): Promise<Typewriter[]> {
  try {
    const typewriterItems = await GET_TYPEWRITER();
    //console.log(typewriterItems);
    return typewriterItems;
  } catch (error) {
    console.error("Error fetching typewriter items:", error);
    return [];
  }
}

// Placeholder grid items array, initial empty
export let typewriterItems: Typewriter[] = [];

// Populate the gridItems array
fetchTypewriterItem().then((items) => {
  typewriterItems = items;
});

export async function fetchGlobeItem(): Promise<Globe[]> {
  try {
    const globeItems = await GET_GLOBE();
    //console.log(globeItems);
    return globeItems;
  } catch (error) {
    console.error("Error fetching globe items:", error);
    return [];
  }
}

// Placeholder grid items array, initial empty
export let globeItems: Globe[] = [];

// Populate the gridItems array
fetchGlobeItem().then((items) => {
  globeItems = items;
});

export const navItems = [
  { name: "Top", link: "#home" },
  { name: "experience", link: "#experience" },
  { name: "Contact", link: "#contact" },
];
