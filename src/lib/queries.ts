export const GET_TESTIMONIALS = `
  query GetTestimonials {
    testimonials {
      documentId
      clientName
      projectType
      quote
    }
  }
`;

export const GET_PROJECTS = `
  query GetProjects {
    projects {
      documentId
      title
      description
      coverImage {
        url
      }
    }
  }
`;

export const GET_BLOG_POSTS = `
  query GetBlogPosts {
    blogPosts {
      documentId
      title
      slug
      excerpt
      publishedAt
      coverImage {
        url
      }
    }
  }
`;

export const GET_BLOG_POST_BY_SLUG = `
  query GetBlogPostBySlug($slug: String!) {
    blogPosts(filters: { slug: { eq: $slug } }) {
      documentId
      title
      slug
      content
      publishedAt
      coverImage {
        url
      }
    }
  }
`;

export const GET_FAQS = `
  query GetFaqs {
    faqs {
      documentId
      question
      answer
    }
  }
`;

export const GET_CAREERS = `
  query GetCareers {
    careerListings {
      documentId
      title
      location
      employmentType
      description
    }
  }
`;

export const GET_CERTIFICATES = `
  query GetCertificates {
    certificates {
      documentId
      title
      issuedBy
      issuedDate
      image {
        url
      }
    }
  }
`;
