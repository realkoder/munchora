import { useAtom } from "jotai";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { userLoginAtom } from "~/atoms/userLoginAtom";
import { useFetch } from "~/lib/api-client";
import type { ILoginResponse } from "~/types/user.interface";

const noAuthRoutes = ["/", "/fag", "/about"];

export default function AuthBootstrapper() {
  const [userLogin, setUserlogin] = useAtom(userLoginAtom);
  const { fetchData: getMe } = useFetch<ILoginResponse>();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogin?.user?.id) return;

    (async () => {
      try {
        const meResponse = await getMe("/me");
        if (meResponse?.user) {
          setUserlogin(meResponse);
        }
      } catch {
        if (!noAuthRoutes.find((route) => route === location.pathname)) {
          navigate("/");
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (userLogin?.user?.id) return;

    if (!noAuthRoutes.find((route) => route === location.pathname)) {
      navigate("/");
    }
  }, [location.pathname]);

  return null;
}
