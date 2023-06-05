import React from "react";
import Counters from "../Counters";
import LightHeading from "../LightHeading";
import Heading from "../Heading";
import Image from "next/image";

const ServicesSection = () => {
  return (
    <>
      <section className="py-32">
        <div
          className="
                    flex
                    flex-col
                    items-center
                    gap-y-12
                    text-center
                "
        >
          <Counters />
          <LightHeading>
            why choose us
          </LightHeading>
          <Heading>
            Benefits Of Consultation
            <br/> Services at Eduling
          </Heading>
          <div
            className="
                flex
                justify-between
                items-center
                gap-x-6
                mt-12
            "
          >
            <div
                className="
                    flex
                    flex-col
                    gap-y-3
                    text-start
                "
            >
                <Image src={'/assets/icons/One on one icon.png'} alt="one-on-one-icon" width={46} height={46}/>
                <h3
                    className="
                        text-xl
                        font-semibold
                    "
                >
                    One-On-One Consultation
                </h3>
                <p
                    className="
                        text-lg
                        font-light
                    "
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>
            <div
                className="
                    flex
                    flex-col
                    gap-y-3
                    text-start
                "
            >
                <Image src={'/assets/icons/time icon.png'} alt="availability-icon" width={46} height={46}/>
                <h3
                    className="
                        text-xl
                        font-semibold
                    "
                >
                    24/7 Availability
                </h3>
                <p
                    className="
                        text-lg
                        font-light
                    "
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>
            <div
                className="
                    flex
                    flex-col
                    gap-y-3
                    text-start
                "
            >
                <Image src={'/assets/icons/resume icon.png'} alt="resume-icon" width={46} height={46}/>
                <h3
                    className="
                        text-xl
                        font-semibold
                    "
                >
                    Interactive Resume Builder
                </h3>
                <p
                    className="
                        text-lg
                        font-light
                    "
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>
            <div
                className="
                    flex
                    flex-col
                    gap-y-3
                    text-start
                "
            >
                <Image src={'/assets/icons/price icon.png'} alt="price-icon" width={46} height={46}/>
                <h3
                    className="
                        text-xl
                        font-semibold
                    "
                >
                    Affordable Prices
                </h3>
                <p
                    className="
                        text-lg
                        font-light
                    "
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;
