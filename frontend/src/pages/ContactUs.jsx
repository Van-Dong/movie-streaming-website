import React from "react";
import Layout from "../layout/Layout";
import Head from "../components/Head";
import { FiMail, FiMapPin, FiPhoneCall } from "react-icons/fi";

const ContactUs = () => {
  const ContactData = [
    {
      id: 1,
      title: "Email Us",
      info: "Interactively grow backend ideas for cross-platform models.",
      icon: FiMail,
      contact: "info@zpunet.com",
    },
    {
      id: 2,
      title: "Call Us",
      info: "Distinctively exploit optimal alignments for intuitive bandwidth.",
      icon: FiPhoneCall,
      contact: "+255 789 456 123",
    },
    {
      id: 3,
      title: "Location",
      info: "Dar es salaam, Tanzania. 345 Kigamboni, Street No. 12,",
      icon: FiMapPin,
      contact: "",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen container mx-auto my-6 px-2">
        <Head title={"Contact Us"} />
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mt-10 lg:my-20 ">
          {ContactData.map((item, index) => (
            <div
              key={index}
              className="border border-border flex-colo p-10 bg-dry rounded-lg"
            >
              <span className="flex-colo w-20 h-20 mb-4 rounded-full bg-main text-subMain text-2xl">
                <item.icon />
              </span>
              <h4 className="font-medium text-xl mb-2">{item.title}</h4>
              <p className="text-text text-sm">
                <a href={`mailto:${item.contact}`} className="text-blue-600">
                  {item.contact}
                </a>
                {item.info}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
