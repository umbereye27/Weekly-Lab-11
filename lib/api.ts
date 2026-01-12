export interface BlogPost {
  id: number;
  title: string;
  description: string;
  slug: string;
  published_at: string;
  cover_image: string;
  body_html: string;
  body_markdown: string;
  reading_time_minutes: number;
  tag_list: string[];
  user: {
    name: string;
    username: string;
    profile_image: string;
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch('https://dev.to/api/articles?per_page=20&top=7', {
      next: { revalidate: 3600 }, 
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`https://dev.to/api/articles/${slug}`, {
      next: { revalidate: 86400 }, // Revalidate every day
    });
    
    if (!response.ok) {
      return null;
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}