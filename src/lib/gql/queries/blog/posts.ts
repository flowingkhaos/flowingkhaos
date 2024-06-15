import { RichTextContent } from "@graphcms/rich-text-types";
//? query
const AllPosts = `
query AllPosts($first: Int) {
    articles(orderBy: createdAt_DESC, first: $first) {
      id
      excerpt
      slug
      title
      date
      createdAt
      publishedAt
      updatedAt
      image {
        url
        width
        height
        id
      }
      buttons {
        id
        slug
        text
      }
      seoOverride {
        description
        title
        image {
          id
          height
          width
          url
        }
      }
    }
  }
`;

//? fetch function
export async function GET_POSTS(): Promise<Articles> {
  const apiRequest = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;
  try {
    const response = await fetch(apiRequest, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: AllPosts,
        next: { revalidate: 3600 },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error fetching posts: ${response.statusText}`);
    }

    const allPosts = await response.json();

    if (allPosts.errors) {
      console.error("Errors occurred while fetching posts:", allPosts.errors);
      throw new Error("Errors occurred while fetching posts");
    }
    //console.log(allPosts.data);
    //console.log(typeof allPosts);
    return allPosts.data;
  } catch (error) {
    console.error("GET_POSTS error:", error);
    throw error; // Re-throw the error to be handled by the calling function.
  }
}

//? query
export const FeaturedPosts = `
query FeaturedPosts{
    articles(
      where: {featuredPost: true}
      orderBy: publishedAt_DESC
      ) {
      id
      slug
      title
      updatedAt
      author {
        name
      }
      image { 
        url
        width
        height
        id
      }
      buttons {
        id
        slug
        text
      }
    }
  }
`;

//? fetch function
export async function GET_FEATURED_POSTS(): Promise<Articles | undefined> {
  const apiRequest = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;
  const featuredPosts = await fetch(apiRequest, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: FeaturedPosts,
      //next: { revalidate: 3600 },
    }),
  }).then((res) => res.json());

  return featuredPosts.data;
}
//? query
// const SinglePost = `
// query SinglePost($slug: String!) {
//   article(where: {slug: $slug}) {
//     id
//     createdAt
//     publishedAt
//     updatedAt
//     title
//     slug
//     date
//     excerpt
//     content {
//       json
//     }
//     image {
//       id
//       url
//       width
//       height
//     }
//     author {
//       ... on Author {
//         remoteTypeName: __typename
//         remoteId: id
//         name
//         role
//         image {
//           id
//           url
//           width
//           height
//         }
//       }
//     }
//     buttons {
//       id
//       slug
//       text
//     }
//     category {
//       name
//       slug
//     }
//     faq {
//       id
//       answer
//       question
//       title
//     }
//     comments(orderBy: publishedAt_DESC) {
//       id
//       username
//       email
//       comment
//       likes
//       createdAt
//     }
//     seoOverride {
//       description
//       title
//       image {
//         id
//         height
//         width
//         url
//       }
//     }
//     downloadableContentBucket {
//       id
//       name
//       slug
//       publishedAt
//       file {
//         fileName
//         handle
//         height
//         id
//         size
//         url
//         width
//       }
//     }
//   }
// }
// `;

const SinglePost = `
  query GET_SINGLE_POST($slug: String!) {
    articlesConnection(locales: en, where: { slug: $slug }) {
      edges {
        node {
          id
          createdAt
          publishedAt
          updatedAt
          title
          slug
          date
          excerpt
          content {
            json
          }
          image {
            id
            url
            width
            height
          }
          author {
            ... on Author {
              remoteTypeName: __typename
              remoteId: id
              name
              role
              image {
                id
                url
                width
                height
              }
            }
          }
          buttons {
            id
            slug
            text
          }
          category {
            name
            slug
          }
          faq {
            id
            answer
            question
            title
          }
          comments(orderBy: publishedAt_DESC) {
            id
            username
            email
            comment
            likes
            createdAt
          }
          seoOverride {
            description
            title
            image {
              id
              height
              width
              url
            }
          }
          downloadableContentBucket {
            id
            name
            slug
            publishedAt
            file {
              fileName
              handle
              height
              id
              size
              url
              width
            }
          }
        }
      }
    }
  }
`;

//? fetch function
export async function GET_POST_DATA(slug: string): Promise<Post | undefined> {
  const apiRequest = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;
  const post = await fetch(apiRequest, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: SinglePost,
      variables: { slug: slug },
      //next: { revalidate: 3600 },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data);
  console.log(post.articlesConnection.edges);
  //console.log("image: ", post.image);
  return post?.articlesConnection?.edges?.map((edge: any) => ({
    id: edge.node.id,
    createdAt: edge.node.createdAt,
    publishedAt: edge.node.publishedAt,
    updatedAt: edge.node.updateAt,
    title: edge.node.title,
    slug: edge.node.slug,
    date: edge.node.date,
    excerpt: edge.node.excerpt,
    content: edge.node.content,
    image: edge.node.image,
    author: edge.node.author,
    buttons: edge.node.buttons,
    category: edge.node.category,
    faq: edge.node.faq,
    comments: edge.node.comments,
    seoOverride: edge.node.seoOverride,
    downloadableContentBucket: edge.node.downloadableContentBucket,
  }))[0];
}

interface Author {
  remoteTypeName: string; //? "__typename" property for type identification
  remoteId: string; //? "id" property
  name: string;
  role?: string;
  image?: {
    id: string;
    url: string;
    width: number;
    height: number;
  };
}

interface Image {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface SEOOverride {
  description: string;
  title: string;
  image?: {
    id: string;
    height: number;
    width: number;
    url: string;
  };
}

export interface PostButton {
  id: string;
  slug: string;
  text: string;
}

interface Category {
  name: string;
  slug: string;
}

export interface Comment {
  id: string;
  username: string;
  email: string;
  comment: string;
  likes: number;
  createdAt: string; // Assuming ISO 8601 date format
}

export interface Post {
  id: string;
  createdAt: string; // Assuming ISO 8601 date format
  publishedAt?: string; // Optional publishedAt date
  updatedAt: string; // Assuming ISO 8601 date format
  title: string;
  slug: string;
  date: string; // Assuming ISO 8601 date format or custom format
  excerpt: string;
  content: {
    json: RichTextContent;
  };
  image?: Image; // Optional image object
  author?: Author;
  buttons: PostButton[];
  category?: Category; // Optional Categories object
  faq?: {
    id: string;
    title: string;
    question: string[];
    answer: string[];
  };
  comments?: Comment[]; // Optional comments array
  seoOverride?: SEOOverride; // Optional seoOverride object
  downloadableContentBucket?: DownloadableContentBucket[];
}

interface Articles {
  map(arg0: (post: any) => { slug: any }): unknown;
  articles: {
    id: string;
    createdAt: string; // Assuming ISO 8601 date format
    publishedAt?: string; // Optional publishedAt date
    updatedAt: string; // Assuming ISO 8601 date format
    title: string;
    slug: string;
    date: string; // Assuming ISO 8601 date format or custom format
    excerpt: string;
    content: {
      json: RichTextContent;
    };
    image?: Image; // Optional image object
    author?: Author;
    buttons: PostButton[];
    category?: Category; // Optional Categories object
    faq?: {
      id: string;
      title: string;
      question: string[];
      answer: string[];
    };
    comments?: Comment[]; // Optional comments array
    seoOverride?: SEOOverride; // Optional seoOverride object
  }[];
  downloadableContentBucket?: DownloadableContentBucket[];
}

// Interface for function arguments
interface GetPostDataArgs {
  slug: string; // Slug of the post to fetch
}

interface FaqProps {
  faq: {
    id: string;
    title: string;
    question: string[];
    answer: string[];
  };
}

export interface DownloadableContentBucket {
  id: string;
  name: string;
  slug: string;
  publishedAt: string | null;
  file: {
    fileName: string;
    handle: string;
    height: number;
    id: string;
    size: number;
    url: string;
    width: number;
  };
}
