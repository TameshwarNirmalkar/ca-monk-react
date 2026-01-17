// Type the query function to return a Promise of the expected type

export interface BlogItemI {
  id: number;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}

export const getBlogLists = async (): Promise<BlogItemI[] | null> => {
  try {
    return await fetch("http://localhost:3001/blogs").then((res) => res.json());
  } catch (error) {
    throw new Error("Failed to fetch blog lists");
  }
};

export const getBlogById = async (id: string): Promise<BlogItemI | null> => {
  try {
    const response = await fetch(`http://localhost:3001/blogs/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch blog by ID");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Failed to fetch blog by ID");
  }
};

export const postBlog = async (
  blogData: BlogItemI
): Promise<BlogItemI | null> => {
  try {
    const response = await fetch(`http://localhost:3001/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    });
    if (!response.ok) {
      throw new Error("Failed to post blog");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Failed to post blog");
  }
};

export const deleteBlog = async (
  blogData: BlogItemI
): Promise<BlogItemI | null> => {
  try {
    const response = await fetch(`http://localhost:3001/blogs/${blogData.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete blog");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Failed to delete blog");
  }
};
