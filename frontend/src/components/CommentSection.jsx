import { Button, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function CommentSection({ postId }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [comment, setComment] = useState("");

  return (
    <div className='max-w-2xl mx-auto w-full p-3 mt-5 rounded-xl bg-slate-300 dark:bg-slate-800 dark:text-white'>
      {/* sign in section */}
      {currentUser ? (
        <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
          <p>Signed in as:</p>
          <img
            className='h-5 w-5 object-cover rounded-full'
            src={currentUser.profilePicture}
            alt='user'
          />
          <Link
            to={"/dashboard?tab=profile"}
            className='text-xs text-blue-600 dark:text-cyan-600 hover:underline'
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className='text-sm text-teal-500 my-5 flex gap-1'>
          You must be signed in to comment.
          <Link className='text-blue-500 hover:underline' to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}

      {/* comment form */}
      {currentUser && (
        <form className='border border-teal-500 rounded-md p-3'>
          <Textarea
            placeholder='Add a comment...'
            rows='3'
            maxLength='200'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className='flex justify-between items-center mt-5'>
            <p className='text-gray-500 text-xs'>
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone='purpleToBlue' type='submit'>
              Submit
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}