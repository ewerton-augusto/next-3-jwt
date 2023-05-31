import { authService } from "./authService";

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
