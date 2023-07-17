import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { reset } from "@/features/auth/authSlice";

export default function useAuthOrRedirect() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {user} = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  return user ? true : false
}
