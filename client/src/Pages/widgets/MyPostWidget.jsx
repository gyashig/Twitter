import {
  EditOutlined,
  DeleteOutlined,

  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import {TbPhotoFilled} from 'react-icons/tb'
import  {MdOutlineSlowMotionVideo} from 'react-icons/md'
import {FaDownload} from 'react-icons/fa';
import FlexBetween from "../../components/Flex";
import Dropzone from "react-dropzone";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../StateManagement/state";
import {toast} from 'react-hot-toast';

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`https://twitterbackend-g174.onrender.com/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
    toast.success("Tweets posted successfully")
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="0.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="Create New Post..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "1rem",
            padding: "1rem 2rem",
          }}
        />
         <button
          disabled={!post}
          onClick={handlePost}
          className="font-bold text-slate-500  "
        >
          POST
        </button>
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          
        <div className="flex items-center space-x-3 border rounded-full p-2 mr-2 opacity-80">
                <TbPhotoFilled className='text-red-400 text-2xl ml-2 w-5 h-5 cursor-pointer ' />
                <p className=" opacity-70 font-bold cursor-pointer "  color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}>Photo</p>
                </div>
          
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
            <div className="flex items-center space-x-3 border rounded-full p-2 mr-2 opacity-80">
                <MdOutlineSlowMotionVideo className='text-red-400 text-2xl ml-2 w-5 h-5 ' />
                <p className=" opacity-70 font-bold "  sx={{ color: mediumMain }} >Video</p>
                </div>
            </FlexBetween>

            <FlexBetween gap="0.25rem"  >
                <div className="flex items-center space-x-3 border rounded-full p-2 mr-2 opacity-80">
                <FaDownload className='text-red-400 text-2xl ml-2 w-5 h-5 ' ></FaDownload>
                <p className=" opacity-70 font-bold "  sx={{ color: mediumMain }} >Attachment</p>
                </div>

            </FlexBetween>

            <FlexBetween gap="0.25rem">
          
              <div className="flex items-center space-x-3 border rounded-full p-2 mr-2 opacity-80">
                    <MicOutlined className='text-red-400 text-2xl ml-2 w-5 h-5 ' sx={{ color: mediumMain }} />
                <p className=" opacity-70 font-bold "  sx={{ color: mediumMain }}>Audio</p>
                </div>

            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

       
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
