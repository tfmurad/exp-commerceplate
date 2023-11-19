import PageHeader from "@/partials/PageHeader";
import Link from "next/link";
import React from "react";

const SignUp = () => {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-11 sm:col-9 md:col-7 mx-auto">
              <div className="mb-14 text-center">
                <h2 className="max-md:h1 md:mb-2">Create an account</h2>
                <p className="md:text-lg">Create an account and start using...</p>
              </div>

              <form method="post">
                <div>
                  <label className="form-label">Name</label>
                  <input
                    className="form-input"
                    placeholder="Enter your name"
                    type="text"
                  />
                </div>

                <div>
                  <label className="form-label mt-8">Email Address</label>
                  <input
                    className="form-input"
                    placeholder="Type your email"
                    type="email"
                  />
                </div>

                <div>
                  <label className="form-label mt-8">Password</label>
                  <input
                    className="form-input"
                    placeholder="********"
                    type="password"
                  />
                </div>

                <button type="submit" className="btn btn-primary md:text-lg md:font-medium w-full mt-10">
                  Sign Up
                </button>
              </form>

              <div className="flex gap-x-2 text-sm md:text-base mt-6">
                <p className="text-light dark:text-darkmode-light">
                 I have read and agree to the
                </p>
                <Link
                  className="underline font-medium text-dark dark:text-darkmode-dark"
                  href={"/terms-services"}
                >
                  Terms & Conditions
                </Link>
              </div>

              <div className="flex gap-x-2 text-sm md:text-base mt-2">
                <p className="text-light dark:text-darkmode-light">
                  Have an account?
                </p>
                <Link
                  className="underline font-medium text-dark dark:text-darkmode-dark"
                  href={"/login"}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
