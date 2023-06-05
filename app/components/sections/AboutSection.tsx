import React from "react";
import AboutImage from "public/assets/images/About us image.png";
import Image from "next/image";
import LightHeading from "../LightHeading";
import Heading from "../Heading";
import Button from "../Button";

const AboutSection = () => {
  return (
    <section className="py-32">
      <div
        className="
                flex
                items-center
            "
      >
        <div
          className="
                    flex-1
                "
        >
          <Image
            src={AboutImage}
            alt="about-image"
            className="
                w-[90%]
                h-auto
                object-contain
            "
          />
        </div>
        <div
          className="
                flex-1
                flex
                flex-col
                justify-between
                gap-y-4
            "
        >
          <LightHeading>about us</LightHeading>
          <Heading>
            Talented and Highly Qualified Counselors to Serve You
          </Heading>
          <p
            className="
                text-xl
                font-normal
                text-[#459ED0]
            "
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <div
                className="
                    flex
                    gap-x-4
                "
            >
                <Button
                    type="button"
                >
                    Learn More
                </Button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
