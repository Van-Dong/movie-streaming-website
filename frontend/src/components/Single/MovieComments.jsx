import React, { useEffect } from "react";
import Titles from "../Titles";
import { FaClosedCaptioning, FaCommentAlt } from "react-icons/fa";
import { Message } from "../UserInputs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { commentValidation } from "../validation/UserValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from "../Notifications/Error";
import { getCommentByMovieId } from "../../services/commentServices";
import Loader from "../Notifications/Loader";
import {
  deleteCommentAction,
  getCommentsAction,
  postCommentAction,
} from "../../redux/actions/commentActions";
import { IoCloseSharp } from "react-icons/io5";

function daysPassed(dateString) {
  const date = new Date(dateString);

  const curDate = new Date();
  let diff = Math.round((curDate - date) / 1000); // convert from ms -> s

  if (diff < 60) {
    return `${diff} seconds ago`;
  }

  diff = Math.round(diff / 60);
  if (diff < 60) {
    return `${diff} mintues ago`;
  }

  diff = Math.round(diff / 60);
  if (diff < 24) {
    return `${diff} hours ago`;
  }

  diff = Math.round(diff / 24);
  if (diff < 30) {
    return `${diff} days ago`;
  }

  diff = Math.round(diff / 30);
  if (diff < 12) {
    return `${diff} months ago`;
  }

  diff = Math.round(diff / 12);
  return `${diff} years ago`;
}

const MovieComments = ({ movieId }) => {
  const { auth } = useSelector((state) => state.userLogin);
  const { isLoading, comments } = useSelector((state) => state.commentGetAll);
  const { isLoading: postCommentLoading } = useSelector(
    (state) => state.commentPost
  );
  const { userInfo } = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(commentValidation),
  });

  const onSend = (data) => {
    if (data) {
      dispatch(postCommentAction({ ...data, movieId }));
      setValue("comment", "");
    }
  };

  const handleDeleteComment = (id) => {
    window.confirm("Are you sure you want delete this comment ?") &&
      dispatch(deleteCommentAction(id));
  };

  useEffect(() => {
    if (movieId) {
      dispatch(getCommentsAction({ movieId }));
    }
  }, [dispatch]);

  const Comment = ({ comment }) => (
    <div className="flex flex-row gap-4">
      <div className="w-12 h-12 rounded-full border border-border">
        {/* <img
          src="/images/movies/1.jpg"
          alt="user1"
          className="w-full h-full object-cover rounded-full"
        /> */}
        <div className="w-12 h-12 flex-colo rounded-full bg-dryGray text-main capitalize">
          {comment?.username[0]}
        </div>
      </div>
      <div className="w-full flex flex-col gap-1">
        <div className="bg-main w-full px-4 py-2 rounded-md relative">
          <div className="text-subMain font-bold">{comment.username}</div>
          <div>{comment.comment}</div>
          {comment?.username === userInfo?.username && (
            <button
              onClick={() => handleDeleteComment(comment?.id)}
              className="absolute top-1 right-1 text-text"
            >
              <IoCloseSharp />
            </button>
          )}
        </div>
        <div className="italic text-border text-right text-sm">
          {daysPassed(comment.createdAt)}
        </div>
      </div>
    </div>
  );

  return (
    <div className="my-12">
      <Titles title={"Comment"} Icon={FaCommentAlt} />
      <div className="mt-10 container mx-auto py-6 bg-dry flex-colo">
        <div className="xl:w-9/12 2xl:w-8/12 lg:w-10/12 md:w-11/12 w-full px-8 flex flex-col">
          {/* Comment form  */}
          <form
            onSubmit={handleSubmit(onSend)}
            className="flex flex-col items-end"
          >
            <div className="text-sm w-full">
              <label className="text-border font-semibold">
                Input your comment
              </label>
              <textarea
                className="w-full h-20 mt-2 p-6 border border-border rounded bg-main"
                placeholder="Input your comment"
                {...register("comment")}
              ></textarea>
              {errors.comment && <InlineError text={errors.comment.message} />}
            </div>
            {auth?.refreshToken ? (
              <button
                disabled={postCommentLoading}
                type="submit"
                className="bg-subMain px-5 py-3 flex-colo rounded mt-1 hover:bg-opacity-60"
              >
                {postCommentLoading ? "Send..." : "Send"}
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-subMain px-5 py-3 flex-colo rounded mt-1"
              >
                Login to comment
              </Link>
            )}
          </form>

          {isLoading ? (
            <Loader />
          ) : comments?.length > 0 ? (
            /* List comment */
            <div className="w-full flex flex-col gap-4 mt-8">
              {comments.map((c, index) => (
                <Comment key={index} comment={c} />
              ))}
              {/* Comment */}
            </div>
          ) : (
            "No comment"
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieComments;
