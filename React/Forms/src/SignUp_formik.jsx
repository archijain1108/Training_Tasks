import { useState } from "react";
import { useFormik } from "formik";
import validationSchema from "./validation/Yup_validation.js";

const SignUp_formik = () => {
  const [userData, setUserData] = useState( () => {
      const data = localStorage.getItem("userData")
      return data ? JSON.parse(data) : []
});

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      alert(
        JSON.stringify(values, (key, value) =>
          key === "password" || key === "confirmPassword" ? undefined : value,
        ),
      );

      setUserData([...userData, values]);

      localStorage.setItem("userData", JSON.stringify(userData));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>

      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        placeholder="Enter firstname"
        onChange={formik.handleChange}
        value={formik.values.firstName}
        onBlur={formik.handleBlur}
      />
      {formik.touched.firstName && formik.errors.firstName && (
        <p class="err_msg">{formik.errors.firstName}</p>
      )}

      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        placeholder="Enter lastname"
        onChange={formik.handleChange}
        value={formik.values.lastName}
        onBlur={formik.handleBlur}
      />
      {formik.touched.lastName && formik.errors.lastName && (
        <p class="err_msg">{formik.errors.lastName}</p>
      )}

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Enter email"
        onChange={formik.handleChange}
        value={formik.values.email}
        onBlur={formik.handleBlur}
      />
      {formik.touched.email && formik.errors.email && (
        <p class="err_msg">{formik.errors.email}</p>
      )}

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Enter password"
        onChange={formik.handleChange}
        value={formik.values.password}
        onBlur={formik.handleBlur}
      />
      {formik.touched.password && formik.errors.password && (
        <p class="err_msg">{formik.errors.password}</p>
      )}

      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Enter confirm password"
        onChange={formik.handleChange}
        value={formik.values.confirmPassword}
        onBlur={formik.handleBlur}
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <p lclass="err_msg">{formik.errors.confirmPassword}</p>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export default SignUp_formik;


// field touched at least once then only err will show
// blur detect value change
// errors comes from yup
