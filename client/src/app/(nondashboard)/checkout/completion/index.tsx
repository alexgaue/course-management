"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import React from "react";

const CompletionPage = () => {
  return (
    <div className="completion" style={{ backgroundColor: "#1B1C22" }}>
      <div className="completion__content">
        <div className="completion__icon">
          <Check className="w-16 h-16" />
        </div>
        <h1 className="completion__title" style={{ color: "white" }}>
          COMPLETED
        </h1>
        <p className="completion__message" style={{ color: "white" }}>
          🎉 You have made a course purchase successfully! 🎉
        </p>
      </div>
      <div className="completion__support" style={{ color: "white" }}>
        <p>
          Need help? Contact our{" "}
          <Button variant="link" asChild className="p-0 m-0 text-primary-700">
            <a href="mailto:support@example.com">customer support</a>
          </Button>
          .
        </p>
      </div>
      <div className="completion__action" style={{ color: "white" }}>
        <Link href="user/courses" scroll={false}>
          Go to Courses
        </Link>
      </div>
    </div>
  );
};

export default CompletionPage;
