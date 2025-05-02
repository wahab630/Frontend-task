import loginScreenImg from "../assets/login_screen_img.svg"
import visible from "../assets/visible.svg"
import unVisible from "../assets/unvisible.svg"
import logo from "../assets/logo.svg"
import googleIcon from "../assets/google_icon.svg"
import { useState } from "react";
import { useFormik } from "formik"
import * as Yup from "yup";
import { useAuth } from "../context/ContextApi"
import { apiRequest } from "../utils/api.request"
import { notifyError, notifySuccess } from "../utils/show.toast"
import LoaderSvg from "../components/loaderSvg"
import { useNavigate } from "react-router-dom"
import { LoginFormValues, UserType } from "../types/auth"

const Login = () => {

  let navigate = useNavigate()
  const { login, loading, setLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter User Name."),
      password: Yup.string().required("Please Enter Password."),
    }),
    onSubmit: async (values) => {
      const model = {
        username: values.username,
        password: values.password
      };
      setLoading(true);
      try {
        const response = await apiRequest<UserType>("https://dummyjson.com/auth/login", "POST", model);
        login(response);
        navigate("/")
        notifySuccess("Login Successfull!")
      } catch (error: any) {
        if (error?.response?.data?.message) {
          notifyError(error.response.data.message || "Login failed")
        }
      } finally {
        setLoading(false);
      }
    },
  });

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <main className="h-screen ">
      <section className="grid grid-cols-12 h-full">
        <div className=" left-section">
          <img src={logo} alt=" no logo" />
          <form onSubmit={formik.handleSubmit} className="form-section">
            <div className="space-y-3">
              <h1 className="title">Welcome back</h1>
              <h2 className="subtitle">You need to be signed in to access the project dashboard. </h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <div>
                  <label htmlFor="username" className="input-label">Username</label>
                  <input type="text" name="username" id="username" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    className="input-field" />
                  {formik.errors.username && formik.touched.username && (
                    <span className="error-text" >{formik.errors.username}</span>
                  )}
                </div>
                <div className="relative">
                  <label htmlFor="password" className="input-label">Password</label>
                  <input
                    id="password"
                    name="password"
                    className="input-field"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <button type="button" onClick={togglePassword} className="eye-button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <img src={showPassword ? visible : unVisible} alt="no img" />
                  </button>
                  {formik.errors.password && formik.touched.password && (
                    <span className="error-text">{formik.errors.password} </span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between  ">
                <label htmlFor="keep-signed-in" className="checkbox-label">
                  <input id="keep-signed-in" type="checkbox" className="checkbox" />
                  <span className="ms-2 normal-text"> Keep me signed in</span>
                </label>
                <span className="link-text">Forgot password?</span>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <button type="submit" className="primary-button " disabled={loading}>
                  {loading ? <><LoaderSvg /> Loading...</> : "Sign in"}
                </button>
                <button type="button" className="google-button">
                  <img src={googleIcon} alt="Google logo" className="w-[1.5rem] h-[1.5rem] inline-block" />
                  <span > Sign in with Google  </span>
                </button>
              </div>
              <div className="text-center normal-text">
                Haven&apos;t joined yet?
                <span className="link-text"> Sign up</span>
              </div>
            </div>
          </form >
        </div>
        <div className="right-section">
          <img src={loginScreenImg} alt="Login visual" className="w-full h-full object-cover" />
        </div>
      </section>
    </main>
  )
}

export default Login