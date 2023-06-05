import React from "react";
import CounselorImage from "public/assets/images/Images group.png";
import Image from "next/image";
import LightHeading from "../LightHeading";
import Heading from "../Heading";
import Button from "../Button";

const CounselorSection = () => {
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
                flex
                flex-col
                justify-between
                gap-y-4
            "
        >
          <LightHeading>FLEXIBLE TIMINGS WITH YOUR SCHEDULE</LightHeading>
          <Heading>
            Set Meetings with Our Professional Counselors on Your Schedule
          </Heading>
          <p
            className="
                text-xl
                font-normal
                text-[#459ED0]
            "
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div
            className="
                    flex
                    gap-x-4
                "
          >
            <Button type="button">Hire a Counselor</Button>
          </div>
        </div>
        <div
          className="
                    flex-1
                "
        >
          <Image
            src={CounselorImage}
            alt="counselor-image"
            className="
                w-[90%]
                h-auto
                object-contain
            "
          />
        </div>
      </div>
    </section>
  );
};

export default CounselorSection;
