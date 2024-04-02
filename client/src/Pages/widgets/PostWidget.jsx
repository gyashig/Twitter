import { HiOutlineShare } from 'react-icons/hi';
import { FaRetweet, FaCommentDots } from 'react-icons/fa'
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/Flex";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost} from "../../StateManagement/state";
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { formatDistanceToNow } from "date-fns";







const PostWidget = ({
  postId,
  postUserId,
  name,
  createdAt,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  post,
}) => {
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`https://twitterbackend-g174.onrender.com/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };
 
 
  
  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={<>
          {name}   <span className='opacity-60 text-sm font-normal'>{timeAgo}</span>
        </>
        }
        
        subtitle={location}
        userPicturePath={userPicturePath}
        post={{ _id: postId }} // Pass the post data here
      />
      <Typography color={main} ml={8} mb={2} sx={{ mt: "0.5rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="90%"
          height="auto"
          alt="post"
          className='mb-2 ml-12 '
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`https://twitterbackend-g174.onrender.com/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem" ml={6} >

        <FlexBetween gap="1rem" className="overflow-x-hidden">
          <div className="flex items-center space-x-3rounded-lg pl-1 bg-slate-700 rounded-[0.5rem] pr-4 border-none">
            <FlexBetween gap="0.3rem">

              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FcLike sx={{ color: primary }} />
                ) : (
                  <FcLikePlaceholder />
                )}
              </IconButton>
              <Typography className="text-white">{likeCount}</Typography>
            </FlexBetween>
          </div>
          <FlexBetween gap="0.3rem">

            <div className="flex items-center space-x-3  bg-slate-700 rounded-lg  pl-2  pr-4 ml-3 ">
              <div className="w-10 h-10  flex items-center justify-center">
                <FaCommentDots className='text-white text-2xl ml-5 cursor-pointer' onClick={() => setIsComments(!isComments)} />
              </div>
              <Typography className="text-white font-bold ">{comments.length}</Typography>
            </div>
          </FlexBetween>

          <div className="flex items-center space-x-3  bg-slate-700 rounded-lg pl-2  pr-4 ml-3 ">
            <div className="w-10 h-10  flex items-center justify-center">
              <FaRetweet className='text-white text-2xl ml-5' />
            </div>
            <button className="text-white font-bold cursor-pointer">Retweet</button>
          </div>

          <div className="flex items-center space-x-3  bg-slate-700 rounded-lg  pl-2  pr-4 ml-3 ">
            <div className="w-10 h-10  flex items-center justify-center">
              <HiOutlineShare className='text-white text-2xl ml-1' />
            </div>
          </div>

        </FlexBetween>
      </FlexBetween>
      {isComments && (
        <Box mt="3rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>

      )}

    </WidgetWrapper>
  );
};

export default PostWidget;
