import { memo } from "react";

import BlogList from "./BlogList";
import BlogItem from "./BlogItem";
import type { BlogItemI } from "@/api_service/blog.service";

export default memo(function BlogWrapper() {
  const onItemClickHandler = (item: BlogItemI) => {
    console.log("Item: ", item);
  };
  return (
    <>
      <BlogList onItemClick={onItemClickHandler} />
      <BlogItem />
    </>
  );
});
