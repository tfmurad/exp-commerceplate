"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { FormData } from "../sign-up/page";
import { CustomerError } from "@/lib/shopify/types";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessages, seterrorMessages] = useState([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("/api/customer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const customerLoginErrors: any = Cookies.get("customerLoginErrors");
      const errorParsed = JSON.parse(customerLoginErrors);

      if (response.ok) {
        seterrorMessages([]);
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));

        if (errorParsed.length > 0) {
          seterrorMessages(errorParsed);
        } else {
          router.push("/");
        }
      } else {
        const errorData = await response.json();
        // console.log(errorData);
      }
    } catch (error) {
      // console.error("Error during registration:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-11 sm:col-9 md:col-7 mx-auto">
              <div className="mb-14 text-center">
                <h2 className="max-md:h1 md:mb-2">Login</h2>
                <p className="md:text-lg">
                  Please fill your email and password to login
                </p>
              </div>

              <form onSubmit={handleLogin}>
                <div>
                  <label className="form-label">Email Address</label>
                  <input
                    className="form-input"
                    placeholder="Type your email"
                    type="email"
                    onChange={handleChange}
                    name="email"
                  />
                </div>

                <div>
                  <label className="form-label mt-8">Password</label>
                  <input
                    className="form-input"
                    placeholder="********"
                    type="password"
                    onChange={handleChange}
                    name="password"
                  />
                </div>

                <div className="mt-8">
                  {errorMessages.map((error: CustomerError) => (
                    <p
                      key={error.code}
                      className="text-sm text-light dark:text-darkmode-light truncate"
                    >
                      *
                      {error.code === "UNIDENTIFIED_CUSTOMER"
                        ? "Wrong Password!"
                        : "Something Went Wrong!"}
                    </p>
                  ))}

                  <button
                    type="submit"
                    className="btn btn-primary md:text-lg md:font-medium w-full mt-2"
                  >
                    {loading ? (
                      <BiLoaderAlt
                        className={`animate-spin mx-auto`}
                        size={26}
                      />
                    ) : (
                      "Log In"
                    )}
                  </button>
                </div>
              </form>

              <div className="flex gap-x-2 text-sm md:text-base mt-4">
                <p className="text-light dark:text-darkmode-light">
                  Don&apos;t have an account?
                </p>
                <Link
                  className="underline font-medium text-dark dark:text-darkmode-dark"
                  href={"/sign-up"}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
