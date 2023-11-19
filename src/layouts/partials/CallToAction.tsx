import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { Call_to_action } from "@/types";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: Call_to_action;
}

const CallToAction = ({ data }: { data: PageData }) => {
  return (
    <>
      {data.frontmatter.enable && (
        <section className="section">
          <div className="container">
            <div className="rounded-xl bg-theme-light px-6 py-8 md:py-16 dark:bg-darkmode-theme-light">
              <div className="row items-center">
                <div className="mb-10 md:mb-0 col-10 lg:col-6 xl:col-5 mx-auto text-center order-2 lg:order-0">
                  <h2
                    dangerouslySetInnerHTML={markdownify(
                      data.frontmatter.title,
                    )}
                    className="mb-2 h1"
                  />
                  <p
                    dangerouslySetInnerHTML={markdownify(
                      data.frontmatter.description,
                    )}
                    className="mb-6"
                  />
                  {data.frontmatter.button.enable && (
                    <form className="flex justify-center">
                      <input
                        placeholder="Email Here"
                        type="email"
                        className="form-input bg-white rounded-r-none py-2"
                      />
                      <input
                        className="btn btn-sm md:btn-md btn-primary rounded-tl-none rounded-bl-none cursor-pointer border-none"
                        type="submit"
                        value="Subscribe"
                      />
                    </form>
                  )}
                </div>

                <div className="mx-auto col-6 mb-6 lg:mb-0">
                  <ImageFallback
                    src={data.frontmatter.image}
                    width={543}
                    height={390}
                    alt="cta-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CallToAction;
