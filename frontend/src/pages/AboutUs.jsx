import React from "react";
import Layout from "./../layout/Layout";
import Head from "../components/Head";
const AboutUs = () => {
  return (
    <Layout>
      <div className="min-h-screen container mx-auto my-6 px-2">
        <Head title={"About Us"} />
        <div className="py-10 xl:py-20 px-4">
          <div className="grid xl:grid-cols-2 gap-4 xl:gap-16 items-center">
            <div>
              <h3 className="text-xl lg:text-3xl mb-4 font-semibold">
                Welcome to our Movie Website
              </h3>
              <div className="mt-3 text-sm leading-8 text-text">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum. Lorem
                  Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy
                  text ever since the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make a type specimen book.
                  It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="px-8 py-8 bg-dry rounded-lg">
                  <span className="text-3xl block font-extrabold">10K</span>
                  <h4 className="text-lg font-bold my-1">Listed Movies</h4>
                  <p className="text-sm text-text mb-0 leading-7">
                    Lorem Ipsum is simply dummy text of the printing and...
                  </p>
                </div>
                <div className="px-8 py-8 bg-dry rounded-lg">
                  <span className="text-3xl block font-extrabold">8K</span>
                  <h4 className="text-lg font-bold my-1">Lovely Users</h4>
                  <p className="text-sm text-text mb-0 leading-7">
                    Completely free, without registration! Lorem Ipsum is simply
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden xl:block">
              <img
                src="/images/aboutus.jpg"
                alt="about-us"
                className="w-full h-header rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
