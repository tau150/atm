import type { Props } from "./types";

import { useEffect } from "react";
import { useRouter } from "next/router";

import Loading from "components/UI/Loading/Loading";
import { useAuthUser } from "contexts/AuthContext";
import { privateRoutes } from "constants/privateRoutes";

const RoutesProtection: React.FC<Props> = ({ children }): React.ReactElement => {
  const router = useRouter();
  const auth = useAuthUser();

  useEffect(() => {
    if (!auth?.authUser.isAuthenticated) {
      if (privateRoutes.includes(router.pathname)) {
        router.push("/");

        return;
      }
    }
  }, [auth?.authUser.isAuthenticated, router, router.pathname]);

  if (router.pathname === "/") {
    return children;
  }

  if (!privateRoutes.includes(router.pathname)) {
    return <>{children}</>;
  }

  if (!auth?.authUser.isAuthenticated) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default RoutesProtection;
