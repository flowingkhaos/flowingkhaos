export const PerkQuery = `
query PERK_QUERY {
  genericBlocksConnection(where: {slug_contains: "perk"}, locales: en) {
    edges {
      node {
        description
        id
        slug
        title
        className
        titleClassName
        imgClassName
        image {
          height
          id
          url
          width
        }
        spareImg {
          id
          url
          width
        }
      }
    }
  }
}
  `;

export async function GET_PERK_GRID(): Promise<Perk[]> {
  const apiRequest = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

  try {
    const response = await fetch(apiRequest, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: PerkQuery,
        next: { revalidate: 3600 },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching perk data: ${response.statusText}`);
    }

    const perkData = await response.json();
    //console.log(perkData);

    if (perkData.errors) {
      console.error(
        "Errors occurred while fetching perk data:",
        perkData.errors
      );
      throw new Error("Errors occurred while fetching perk data");
    }

    return perkData.data.genericBlocksConnection.edges.map((edge: any) => ({
      id: edge.node.id,
      title: edge.node.title,
      description: edge.node.description,
      className: edge.node.className, // Add className if required
      imgClassName: edge.node.imgClassName, // Add imgClassName if required
      titleClassName: edge.node.titleClassName, // Add titleClassName if required
      img: edge.node.image?.url ?? "",
      spareImg: edge.node.spareImg?.url ?? "",
    }));
  } catch (error) {
    console.error("GET_PERK error:", error);
    throw error; // Re-throw the error to be handled by the calling function.
  }
}

export interface Perk {
  id: string;
  title: string;
  description: string;
  className: string;
  imgClassName: string;
  titleClassName: string;
  img: string;
  spareImg: string;
}

export const ProjectQuery = `
query PROJECT_QUERY {
    genericBlocksConnection(where: {slug_contains: "project"}) {
      edges {
        node {
          description
          id
          icon {
            height
            id
            url
            width
          }
          link
          slug
          title
          image {
            height
            id
            url
            width
          }
        }
      }
    }
  }
  `;

export async function GET_PROJECTS(): Promise<Project[]> {
  const apiRequest = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

  try {
    const response = await fetch(apiRequest, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: ProjectQuery,
        next: { revalidate: 3600 },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching project data: ${response.statusText}`);
    }

    const projectsData = await response.json();
    //console.log(projectsData);

    if (projectsData.errors) {
      console.error(
        "Errors occurred while fetching projects data:",
        projectsData.errors
      );
      throw new Error("Errors occurred while fetching projects data");
    }

    const projects = projectsData.data.genericBlocksConnection.edges.map(
      (edge: any) => {
        //console.log("Node data:", edge.node);
        const iconLists = edge.node.icon
          ? edge.node.icon.map((icon: any) => icon.url)
          : [];

        return {
          id: edge.node.id,
          title: edge.node.title,
          des: edge.node.description,
          img: edge.node.image?.url ?? "",
          iconLists: iconLists,
          link: edge.node.link,
        };
      }
    );

    //console.log("Mapped projects:", projects);
    return projects;
  } catch (error) {
    console.error("GET_PROJECTS error:", error);
    throw error; // Re-throw the error to be handled by the calling function.
  }
}

export interface Project {
  id: string;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link: string;
}

export const TestimonialQuery = `
query TESTIMONIAL_QUERY {
    genericBlocksConnection(where: {slug_contains: "testimonial"}) {
      edges {
        node {
          description
          id
          name
          slug
          title
          link
          image {
            height
            id
            url
            width
          }
        }
      }
    }
  }
  `;

export async function GET_TESTIMONIALS(): Promise<Testimonial[]> {
  const apiRequest = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

  try {
    const response = await fetch(apiRequest, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: TestimonialQuery,
        next: { revalidate: 3600 },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching project data: ${response.statusText}`);
    }

    const TestimonialsData = await response.json();
    //console.log(TestimonialsData.data.genericBlocksConnection.edges);

    if (TestimonialsData.errors) {
      console.error(
        "Errors occurred while fetching testimonials data:",
        TestimonialsData.errors
      );
      throw new Error("Errors occurred while fetching testimonials data");
    }

    return TestimonialsData.data.genericBlocksConnection.edges.map(
      (edge: any) => ({
        id: edge.node.id,
        name: edge.node.name,
        title: edge.node.title,
        quote: edge.node.description,
        link: edge.node.link,
        img: edge.node.image?.url ?? "",
      })
    );
  } catch (error) {
    console.error("GET_TESTIMONIALS error:", error);
    throw error; // Re-throw the error to be handled by the calling function.
  }
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  link: string;
  quote: string;
  img: string;
}

export const CompanyQuery = `
query COMPANY_QUERY {
    genericBlocksConnection(where: {slug_contains: "company"}) {
      edges {
        node {
          description
          id
          name
          slug
          image {
            height
            id
            url
            width
          }
        }
      }
    }
  }
  `;

export async function GET_COMPANIES(): Promise<Company[]> {
  const apiRequest = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

  try {
    const response = await fetch(apiRequest, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: CompanyQuery,
        next: { revalidate: 3600 },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching companies data: ${response.statusText}`);
    }

    const CompaniesData = await response.json();
    //console.log(CompaniesData);

    if (CompaniesData.errors) {
      console.error(
        "Errors occurred while fetching companies data:",
        CompaniesData.errors
      );
      throw new Error("Errors occurred while fetching companies data");
    }

    return CompaniesData.data.genericBlocksConnection.edges.map(
      (edge: any) => ({
        id: edge.node.id,
        name: edge.node.name,
        img: edge.node.image?.url ?? "",
      })
    );
  } catch (error) {
    console.error("GET_COMPANIES error:", error);
    throw error; // Re-throw the error to be handled by the calling function.
  }
}

export interface Company {
  id: string;
  name: string;
  img: string;
}

export const ExperienceQuery = `
query EXPERIENCE_QUERY {
    genericBlocksConnection(where: {slug_contains: "experience"}) {
      edges {
        node {
          description
          id
          slug
          title
          className
          image {
            height
            id
            url
            width
          }
        }
      }
    }
  }
  `;

export async function GET_EXPERIENCE(): Promise<Experience[]> {
  const apiRequest = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

  try {
    const response = await fetch(apiRequest, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: ExperienceQuery,
        next: { revalidate: 3600 },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching Experience data: ${response.statusText}`);
    }

    const experienceData = await response.json();
    //console.log(experienceData);

    if (experienceData.errors) {
      console.error(
        "Errors occurred while fetching experience data:",
        experienceData.errors
      );
      throw new Error("Errors occurred while fetching experience data");
    }

    return experienceData.data.genericBlocksConnection.edges.map(
      (edge: any) => ({
        id: edge.node.id,
        title: edge.node.title,
        desc: edge.node.description,
        className: edge.node.className,
        thumbnail: edge.node.image?.url ?? "",
      })
    );
  } catch (error) {
    console.error("GET_Experience error:", error);
    throw error; // Re-throw the error to be handled by the calling function.
  }
}

export interface Experience {
  id: string;
  title: string;
  desc: string;
  className: string;
  thumbnail: string;
}

export const SocialQuery = `
query SOCIAL_QUERY {
    genericBlocksConnection(where: {slug_contains: "social"}) {
      edges {
        node {
          id
          slug
          name
          link
          image {
            height
            id
            url
            width
          }
        }
      }
    }
  }
  `;

export async function GET_SOCIALS(): Promise<Socials[]> {
  const apiRequest = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

  try {
    const response = await fetch(apiRequest, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: SocialQuery,
        next: { revalidate: 3600 },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching Experience data: ${response.statusText}`);
    }

    const socialsData = await response.json();
    //console.log(socialsData);

    if (socialsData.errors) {
      console.error(
        "Errors occurred while fetching socials data:",
        socialsData.errors
      );
      throw new Error("Errors occurred while fetching socials data");
    }

    return socialsData.data.genericBlocksConnection.edges.map((edge: any) => ({
      id: edge.node.id,
      name: edge.node.name,
      link: edge.node.link,
      img: edge.node.image?.url ?? "",
    }));
  } catch (error) {
    console.error("GET_SOCIALS error:", error);
    throw error; // Re-throw the error to be handled by the calling function.
  }
}

export interface Socials {
  id: string;
  name: string;
  link: string;
  img: string;
}

export const FooterQuery = `
query FOOTER_QUERY {
    genericBlocksConnection(where: {slug_contains: "footer"}) {
      edges {
        node {
          id
          slug
          title
          description
          name
        }
      }
    }
  }
  `;

export async function GET_FOOTER(): Promise<Footer[]> {
  const apiRequest = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

  try {
    const response = await fetch(apiRequest, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: FooterQuery,
        next: { revalidate: 3600 },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching Footer data: ${response.statusText}`);
    }

    const footerData = await response.json();

    if (footerData.errors) {
      console.error(
        "Errors occurred while fetching footer data:",
        footerData.errors
      );
      throw new Error("Errors occurred while fetching footer data");
    }
    //console.log(footerData.data.genericBlocksConnection.edges);
    return footerData.data.genericBlocksConnection.edges.map((edge: any) => ({
      id: edge.node.id,
      description: edge.node.description,
      title: edge.node.title,
      name: edge.node.name,
    }));
  } catch (error) {
    console.error("GET_FOOTER error:", error);
    throw error; // Re-throw the error to be handled by the calling function.
  }
}

export interface Footer {
  id: string;
  title: string;
  description: string;
  name: string;
}

export const SearchQuery = `
  query SEARCH_QUERY {
    genericBlocksConnection(where: {slug_contains: "search"}) {
      edges {
        node {
          id
          slug
          title
          description
          name
          link
          className
          titleClassName
        }
      }
    }
  }
`;

export async function GET_SEARCH(): Promise<Search[]> {
  const apiRequest = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

  try {
    const response = await fetch(apiRequest, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: SearchQuery,
        next: { revalidate: 3600 },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching Footer data: ${response.statusText}`);
    }

    const searchData = await response.json();

    if (searchData.errors) {
      console.error(
        "Errors occurred while fetching footer data:",
        searchData.errors
      );
      throw new Error("Errors occurred while fetching footer data");
    }
    //console.log(searchData.data.genericBlocksConnection.edges);
    return searchData.data.genericBlocksConnection.edges.map((edge: any) => ({
      id: edge.node.id,
      slug: edge.node.slug,
      title: edge.node.title,
      description: edge.node.description,
      name: edge.node.name,
      link: edge.node.link,
      className: edge.node.className,
      titleClassName: edge.node.titleClassName,
    }));
  } catch (error) {
    console.error("GET_FOOTER error:", error);
    throw error; // Re-throw the error to be handled by the calling function.
  }
}

export interface Search {
  id: string;
  slug: string;
  title: string;
  description: string;
  name: string;
  link: string;
  className: string;
  titleClassName: string;
}

export const DealQuery = `
  query DEAL_QUERY {
    genericBlocksConnection(where: {slug_contains: "deal"}) {
      edges {
        node {
          id
          slug
          title
          description
          name
          link
          className
          titleClassName
          spareImg {
            id
            url
            width
          }
          image {
            height
            id
            url
            width
          }
        }
      }
    }
  }
`;

export async function GET_DEAL(): Promise<Deal[]> {
  const apiRequest = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

  try {
    const response = await fetch(apiRequest, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: DealQuery,
        next: { revalidate: 3600 },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching Footer data: ${response.statusText}`);
    }

    const dealData = await response.json();

    if (dealData.errors) {
      console.error(
        "Errors occurred while fetching footer data:",
        dealData.errors
      );
      throw new Error("Errors occurred while fetching footer data");
    }
    //console.log(dealData.data.genericBlocksConnection.edges);
    return dealData.data.genericBlocksConnection.edges.map((edge: any) => ({
      id: edge.node.id,
      slug: edge.node.slug,
      title: edge.node.title,
      description: edge.node.description,
      name: edge.node.name,
      link: edge.node.link,
      className: edge.node.className,
      titleClassName: edge.node.titleClassName,
      img: edge.node.image?.url ?? "",
      spareImg: edge.node.image?.url ?? "",
    }));
  } catch (error) {
    console.error("GET_DEAL error:", error);
    throw error; // Re-throw the error to be handled by the calling function.
  }
}

export interface Deal {
  id: string;
  slug: string;
  title: string;
  description: string;
  name: string;
  link: string;
  className: string;
  titleClassName: string;
  img: string;
  spareImg: string;
}

export const TypewriterQuery = `
  query TYPEWRITER_QUERY {
    genericBlocksConnection(where: {slug_contains: "typewriter"}) {
      edges {
        node {
          id
          slug
          title
          description
          name
          link
          className
          titleClassName
          spareImg {
            id
            url
            width
          }
          image {
            height
            id
            url
            width
          }
        }
      }
    }
  }
`;

export async function GET_TYPEWRITER(): Promise<Typewriter[]> {
  const apiRequest = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

  try {
    const response = await fetch(apiRequest, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: TypewriterQuery,
        next: { revalidate: 3500 },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching Typewriter data: ${response.statusText}`);
    }

    const typewriterData = await response.json();

    if (typewriterData.errors) {
      console.error(
        "Errors occurred while fetching Typewriter data:",
        typewriterData.errors
      );
      throw new Error("Errors occurred while fetching Typewriter data");
    }
    //console.log(typewriterData.data.genericBlocksConnection.edges);
    return typewriterData.data.genericBlocksConnection.edges.map(
      (edge: any) => ({
        id: edge.node.id,
        slug: edge.node.slug,
        title: edge.node.title,
        description: edge.node.description,
        name: edge.node.name,
        link: edge.node.link,
        className: edge.node.className,
        titleClassName: edge.node.titleClassName,
        img: edge.node.image?.url ?? "",
      })
    );
  } catch (error) {
    console.error("GET_DEAL error:", error);
    throw error; // Re-throw the error to be handled by the calling function.
  }
}

export interface Typewriter {
  id: string;
  slug: string;
  title: string;
  description: string;
  name: string;
  link: string;
  className: string;
  titleClassName: string;
  img: string;
}

export const GlobeQuery = `
  query GLOBE_QUERY {
    genericBlocksConnection(where: {slug_contains: "globe"}) {
      edges {
        node {
          id
          slug
          title
          description
          name
          link
          className
          titleClassName
          spareImg {
            id
            url
            width
          }
          image {
            height
            id
            url
            width
          }
        }
      }
    }
  }
`;

export async function GET_GLOBE(): Promise<Globe[]> {
  const apiRequest = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

  try {
    const response = await fetch(apiRequest, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GlobeQuery,
        next: { revalidate: 3600 },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching Globe data: ${response.statusText}`);
    }

    const globeData = await response.json();

    if (globeData.errors) {
      console.error(
        "Errors occurred while fetching Typewriter data:",
        globeData.errors
      );
      throw new Error("Errors occurred while fetching Typewriter data");
    }
    //console.log(globeData.data.genericBlocksConnection.edges);
    return globeData.data.genericBlocksConnection.edges.map((edge: any) => ({
      id: edge.node.id,
      slug: edge.node.slug,
      title: edge.node.title,
      description: edge.node.description,
      name: edge.node.name,
      link: edge.node.link,
      className: edge.node.className,
      titleClassName: edge.node.titleClassName,
      img: edge.node.image?.url ?? "",
    }));
  } catch (error) {
    console.error("GET_DEAL error:", error);
    throw error; // Re-throw the error to be handled by the calling function.
  }
}

export interface Globe {
  id: string;
  slug: string;
  title: string;
  description: string;
  name: string;
  link: string;
  className: string;
  titleClassName: string;
  img: string;
}
