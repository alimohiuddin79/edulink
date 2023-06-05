import React from "react";
import QuestionnaireImage from "public/assets/images/Images group (2).png";
import Image from "next/image";
import LightHeading from "../LightHeading";
import Heading from "../Heading";
import Button from "../Button";

const QuestionnaireSection = () => {
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
          <LightHeading>TEST YOUR SKILLS AND IMPROVE</LightHeading>
          <Heading>
            Our Questionnaire Test Your Knowledge and Guide You According Your
            Skills
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
            <Button type="button">Test Yourself</Button>
          </div>
        </div>
        <div
          className="
                    flex-1
                "
        >
          <Image
            src={QuestionnaireImage}
            alt="questionnaire-image"
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

export default QuestionnaireSection;
