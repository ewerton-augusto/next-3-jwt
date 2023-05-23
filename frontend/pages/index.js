import React from "react";
import { useRouter } from "next/router";
import { authService } from "../src/services/auth/authService";

export default function HomeScreen() {
  const router = useRouter();
  const [values, setValues] = React.useState({
    username: "ewerton.augusto",
    password: "safepassword",
  });

  function handleChange(event) {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    setValues((currentValues) => {
      return {
        ...currentValues,
        [fieldName]: fieldValue,
      };
    });
  }

  function handleSubmitLogin(event) {
    // onSubmit - Controller
    // authService - Service
    event.preventDefault();

    authService
      .login({
        username: values.username,
        password: values.password,
      })
      .then((response) => {
        // router.push('/auth-page-static');
        router.push("/auth-page-ssr");
      })
      .catch(() => console.log("Invalid user and/or password"));
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmitLogin}>
        <input
          placeholder="Username"
          name="username"
          value={values.usuario}
          onChange={handleChange}
        />
        <input
          placeholder="Password"
          name="password"
          type="password"
          value={values.senha}
          onChange={handleChange}
        />
        <div>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
}
