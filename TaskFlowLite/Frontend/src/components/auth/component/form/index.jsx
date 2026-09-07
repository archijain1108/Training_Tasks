import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, registerSchema } from "../../validation";
import { LOGIN_FIELDS, REGISTER_FIELDS } from "../../constant/index.js";
import { useAuth } from "../../hook/useAuth.jsx";
import { useNavigate } from "react-router-dom";

const Form = ({ mode }) => {
  const isLogin = mode === "login";

  const schema = isLogin ? loginSchema : registerSchema;
  const fields = isLogin ? LOGIN_FIELDS : REGISTER_FIELDS;

  const { handleRegister, handleLogin } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    console.log(data);

    try {
      if (isLogin) {
        await handleLogin(data);
      } else {
        await handleRegister(data);
      }

      reset();
    } catch (err) {
      setError("root", {
        message:
          err.response?.data?.message ||
          err?.response?.data?.errors?.[0]?.message ||
          "Something went wrong",
      });
    }
  }

  return (
    <div className="w-full min-h-full flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      <h1 className="text-xl text-center font-semibold pb-2 text-white">
        Task<span className="text-blue-600">Flow</span>
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-lg border border-blue-900/50 
                   bg-gray-950 p-5 sm:p-7 shadow-xl"
      >
        <div className="space-y-5">
          {fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                {field.placeholder}
              </label>

              <input
                id={field.name}
                type={field.type}
                {...register(field.name)}
                className="w-full rounded-lg border border-gray-800 
                                   bg-black px-3 py-2.5 text-sm text-white 
                                   outline-none transition
                                   placeholder:text-gray-600
                                   focus:border-blue-600
                                   focus:ring-1 focus:ring-blue-600"
              />

              {errors[field.name] && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors[field.name].message}
                </p>
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2.5 
                       text-sm font-semibold text-white transition
                       hover:bg-blue-700
                       focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:ring-offset-2 
                       focus:ring-offset-gray-950
                       disabled:cursor-not-allowed 
                       disabled:opacity-50"
        >
          {isSubmitting ? "Please wait..." : isLogin ? "Login" : "Register"}
        </button>

        {errors.root ? (
          <p
            className="mt-4 rounded-lg border border-red-500/20 
                          bg-red-500/10 px-3 py-2 text-sm text-red-400"
          >
            {errors.root.message}
          </p>
        ) : (
          isSubmitSuccessful && (
            <p
              className="mt-4 rounded-lg border border-green-500/20 
                          bg-green-500/10 px-3 py-2 text-sm text-green-400"
            >
              {isLogin ? "Login successful" : "Registration successful"}
            </p>
          )
        )}

        {mode === "register" ? (
          <p className="text-gray-100 text-sm text-center p-2">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-400 cursor-pointer"
            >
              Login
            </span>
          </p>
        ) : (
          <p className="text-gray-100 text-sm text-center p-2">
            New User?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-400 cursor-pointer"
            >
              Register
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Form;
