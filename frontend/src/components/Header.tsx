import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "@/features/auth/authSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="flex h-16 justify-between items-center p-2 border-b">
      <h1 className="text-3xl leading-tight tracking-tighter font-bold px-4 font-averia">Build Buddy</h1>
      <ul className="flex flex-row px-4 ml-auto">
        {user ? (
          <li>
            <Button
              onClick={onLogout}
              className={buttonVariants({ variant: "outline" })}
            >
              Logout
            </Button>
          </li>
        ) : (
          <>
            <li>
              <Link className={buttonVariants({ variant: "link" })} to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link
                className={buttonVariants({ variant: "link" })}
                to="/register"
              >
                Register
              </Link>
            </li>
          </>
        )}
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </header>
  );
}
