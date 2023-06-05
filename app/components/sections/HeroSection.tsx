import Image from "next/image";
import React from "react";
import HeroImage from "public/assets/images/Hero Image.png"
import Heading from "../Heading";
import Button from "../Button";

const HeroSection = () => {
  return (
    <>
      <section className="py-32">
        <div 
            className="
                flex
            "
            >
          <div
            className="
                        flex-1
                        flex
                        flex-col
                        justify-between
                    "
          >
            <Heading>Get Quality Consultation Through Eduling</Heading>
            <h2
                className="
                    text-[48px]
                    font-bold
                "
            >
                Build Your Successful Career Now
            </h2>
            <p
                className="
                    text-lg
                    font-normal
                "
            >
                Eduling create your career path and lead you towards your successful career
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
                    Sign Up
                </Button>
            </div>
          </div>
          <div
            className="
                        flex-1
                        flex
                        justify-end
                    "
          >
            <Image
              src={HeroImage}
              alt="hero-image"
              className="
                w-[90%]
                h-auto
                object-contain
              "
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
