"use client";
/* eslint-disable react/no-unescaped-entities */
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";

import React from "react";

const ResumeAccordian = () => {
  return (
    <>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: "primary-1", color: "white" }}>
              <Box as="span" flex="1" textAlign="left" fontWeight={'semibold'}>
                ⭐⭐⭐ Click here to show tips ⭐⭐⭐
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <OrderedList
                paddingY={'4'}
                display={'flex'}
                flexDirection={'column'}
                rowGap={'16px'}
            >
              <ListItem>One-Page Resume: In most cases, a one-page resume is considered ideal, especially for entry-level or mid-level positions. Aim to keep the content within 500-700 words.</ListItem>
              <ListItem>Two-Page Resume: For more experienced professionals or those with extensive qualifications, a two-page resume may be appropriate. In such cases, try to limit the content to around 800-1000 words.</ListItem>
              <ListItem>Tailored Content: Focus on including key information relevant to the job you're applying for. Avoid unnecessary details or lengthy descriptions that may distract from the most important points.</ListItem>
              <ListItem>Use Bullet Points and Concise Language: Use bullet points, concise sentences, and clear headings to present information efficiently. This helps to convey your qualifications and achievements succinctly.</ListItem>
              <ListItem>Quality over Quantity: Instead of focusing on reaching a specific word count, prioritize the quality of your content. Emphasize impactful achievements, relevant skills, and experiences that demonstrate your suitability for the role.</ListItem>
            </OrderedList>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default ResumeAccordian;
