import { URLSearchParams } from "url";
import { RichTextContent } from "@graphcms/rich-text-types";

export const GET_PAGE = async (slug: string): Promise<Page | undefined> => {
  const apiRequest = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

  const query = `
  query GET_PAGE($where: PageWhereUniqueInput!) {
    page(where: $where) {
      id
      title
      slug
      subtitle
      description
      content {
        json
      }
      image {
        url
        id
        width
        height
      }
      sections {
        title
        subtitle
        content {
          json
        }
        image {
          url
          id
          width
          height
        }
        buttons {
          text
          slug
        }
      }
      hero {
        title
        subtitle
        description
        buttons {
          slug
          text
        }
        image {
          url
          id
          width
          height
        }
      }
      stat {
        title
        subtitle
        description
        value
        analytic
      }
      buttons {
        text
        slug
      }
      faq {
        title
        question
        answer
      }
      seoOverride {
        description
        id
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
`;

  const params = new URLSearchParams({
    method: "POST",
    query,
    variables: JSON.stringify({ where: { slug: slug } }),
  });
  //console.log(slug);

  try {
    const response = await fetch(`${apiRequest}?${params}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(
        `fetchAPI request failed with status: ${response.status}`
      );
    }

    const data = await response.json();

    //console.log("Raw fetchAPI response data:", data);

    //? Access page data within the response
    return data?.data?.page;
  } catch (error) {
    console.error(`Error fetching page with slug ${slug}:`, error);
    return undefined;
  }
};

export interface Page {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  description?: string;
  content: {
    html: RichTextContent;
    json: RichTextContent;
  };
  image?: Image;
  sections?: SectionProps[];
  hero?: HeroProps;
  stat?: StatProps;
  buttons?: Button[];
  faq?: FaqProps[];
  seoOverride?: SEOOverride;
}

interface SEOOverride {
  description: string;
  title: string;
  id: string;
  image?: {
    id: string;
    height: number;
    width: number;
    url: string;
  };
}

interface Image {
  url: string;
  id: string;
  width: number;
  height: number;
}

export interface SectionProps {
  title: string;
  subtitle?: string;
  content: {
    json: RichTextContent;
  };
  image?: Image;
  buttons: Button[];
}

export interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  buttons?: Button[];
  image?: Image;
}

export interface StatProps {
  title: string;
  subtitle?: string;
  description: string[];
  value: string[];
  analytic: string[];
}

interface Button {
  text: string;
  slug: string;
}

interface FaqProps {
  faq: {
    id: string;
    title: string;
    question: string[];
    answer: string[];
  };
}
