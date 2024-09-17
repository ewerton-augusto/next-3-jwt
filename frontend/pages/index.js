import React from "react";
import { useRouter } from "next/router";
import { authService } from "../src/services/auth/authService";

export default function HomeScreen() {
  const router = useRouter();
  const [values, setValues] = React.useState({
    username: "ewerton.augusto",
    password: "safepassword",
  });

  const handleChange = (event) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    setValues((currentValues) => {
      return {
        ...currentValues,
        [fieldName]: fieldValue,
      };
    });
  };

  const handleSubmitLogin = async (event) => {
    // onSubmit - Controller
    // authService - Service
    event.preventDefault();

    const isAuthenticated = await authService.login({
      username: values.username,
      password: values.password,
    });

    if (!isAuthenticated || isAuthenticated.status !== 200) {
      alert("Invalid user and/or password");
      return;
    }

    router.push('/auth-page-static');
    // router.push("/auth-page-ssr");
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmitLogin}>
        <input
          placeholder="Username"
          name="username"
          value={values.username}
          onChange={handleChange}
        />
        <input
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        <div>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
}
