import { withSessionHighOrderComponent } from "../src/services/auth/session";

const AuthPageStatic = (props) => {
  return (
    <div>
      <h1>Auth Page Static</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};

// High Order Component - Component Decorator
export default withSessionHighOrderComponent(AuthPageStatic);
