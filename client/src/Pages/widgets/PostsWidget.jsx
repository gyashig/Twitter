import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "StateManagement/state";
import PostWidget from "../widgets/PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
 

  const getPosts = async () => {
    try {
      const response = await fetch("https://twitterbackend-g174.onrender.com/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      console.log(data); // Log the response data to check its structure
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Handle the error or set an error state if necessary.
    }
  };
  
  
  const getUserPosts = async () => {
    const response = await fetch(
      `https://twitterbackend-g174.onrender.com/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);

  return (
    <>
    
      { posts.map(
        
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
          createdAt,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            createdAt={createdAt}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
