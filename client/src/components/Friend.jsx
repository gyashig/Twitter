import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../StateManagement/state";
import FlexBetween from "./Flex";
import UserImage from "./UserImage";
import {RiDeleteBin6Fill} from 'react-icons/ri';
import {toast} from 'react-hot-toast'



const Friend = ({ friendId, name, subtitle, userPicturePath, post,deletePost,userId  }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);



  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);
  

  const patchFriend = async () => {
    const response = await fetch(
      `https://twitterbackend-g174.onrender.com/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
    toast.success(data.message);
  };


  const handleDelete = async () => {
    try {
      console.log(post)
      if (post && post._id) {
        const response = await fetch(`https://twitterbackend-g174.onrender.com/posts/${userId}/posts`, {
          method: 'DELETE',
        });

        if (response.ok) {
          
          dispatch(deletePost({ postId: post._id }));
          toast.success("Post Has been Deleted")
        } else {
          toast.error('shwing error while deleting post');
        }
      } else {
        toast.error('Post data is missing');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Error deleting post');
    }
  };
  
 
  return (
  
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="45"  />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="bold"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <FlexBetween gap={1}>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
      <IconButton >
        <RiDeleteBin6Fill onClick={handleDelete} sx={{ color: primaryDark }}/>
      </IconButton>
  
      
      </FlexBetween>
    
     
    </FlexBetween>



  );
};

export default Friend;
