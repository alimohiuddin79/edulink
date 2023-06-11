"use client";
import { CldUploadButton } from "next-cloudinary";
import Button from "../components/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import PageWrapper from "../components/PageWrapper";
import DashboardAccordian from "../components/Accordians/DashboardAccordion";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router.push("/login");
  }

  if (session.status === "authenticated") {
    return (
      <>
        <PageWrapper pageName="Dashboard">
          <DashboardAccordian />
        </PageWrapper>
      </>
    );
  }

};

export default Dashboard;
