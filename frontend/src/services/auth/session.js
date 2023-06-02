import { useEffect, useState } from "react";
import { authService } from "./authService";
import { useRouter } from "next/router";

// SSR
// decorator pattern
export const withSession = (func) => {
  return async (ctx) => {
    try {
      const session = await authService.getSession(ctx);
      const modifiedCtx = {
        ...ctx,
        req: {
          ...ctx.req,
          session,
        },
      };
      return func(modifiedCtx);
    } catch (error) {
      return {
        redirect: {
          destination: "/?error=401",
          permanent: false,
        },
      };
    }
  };
};

// Static
export const useSession = () => {
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    try {
      const responseSession = await authService.getSession();
      setSession(responseSession);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    session,
    error,
    loading,
  };
};

// High Order Component - Component Decorator
export const withSessionHighOrderComponent = (Component) => {
  const Wrapper = (props) => {
    const session = useSession();
    const router = useRouter();

    if (session.error && !session.loading) router.push("/?error=401");

    const modifiedProps = {
      ...props,
      session: session.session,
    };
    return <Component {...modifiedProps} />;
  };
  return Wrapper;
};
