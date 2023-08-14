import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { reset } from "@/features/auth/authSlice";

export const  useAuthCheck= () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      return;
    }

    navigate("/");
    
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);
}
