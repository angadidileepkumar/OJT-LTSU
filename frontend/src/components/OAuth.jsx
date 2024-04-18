import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signInFailure, signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/dashboard?tab=profile");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <Button
      type='button'
      color='purple'
      className='text-purple hover:text-black hover:bg-gradient-to-r from-[#9C7945] via-[#F4EBA3] to-[#9C7945]'
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className='h-5 w-5 mr-4' />
      <span className=' font-weight-900  '>Continue with Google</span>
    </Button>
  );
}
