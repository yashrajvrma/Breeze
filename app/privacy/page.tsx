import Footer from "@/components/home/footer";
import Navbar from "@/components/home/navbar";
import { MailIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function Privacy() {
  return (
    <div className="flex flex-col min-h-screen md:mt-16 mt-12">
      <Navbar />
      <div className="flex justify-center w-full px-6">
        <div className="w-full max-w-4xl md:max-w-[700px] flex flex-col md:gap-12 gap-8 py-12 font-sans">
          <div className="flex flex-col justify-center items-center font-semibold md:text-4xl text-3xl">
            Privacy Policy
            <p className="text-sm text-muted-foreground mt-1 font-medium">
              Last updated: June 16, 2025
            </p>
          </div>

          <section>
            <h2 className="text-lg font-semibold mb-2">
              Our Commitment to Privacy
            </h2>
            <p className="text-base text-muted-foreground">
              At Breeze, we believe privacy is a fundamental right. Our
              AI-powered document editor is built with user privacy at its core,
              and we're committed to being transparent about how we handle your
              data. We do not share your personal information or content with
              any external company or third party.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">
              Google Account Integration
            </h2>
            {/* <p className=""> */}
            When you use Zero with your Google Account:
            <ul className="list-disc pl-5 text-base text-muted-foreground">
              <li>
                We request access only to your name, email address, and profile
                picture
              </li>
              <li>
                Your Google account credentials are never stored on our servers
              </li>
              <li>We use secure OAuth 2.0 authentication provided by Google</li>
              <li>
                You can revoke access at any time through your Google Account
                settings
              </li>
            </ul>
            {/* </p> */}
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">
              Document and Chat Privacy
            </h2>
            {/* <p className=""> */}
            <ul className="list-disc pl-5 text-base text-muted-foreground">
              <li>
                All documents and chat interactions you create with Breeze AI
                are private and secure
              </li>
              <li>
                Your content is never shared, sold, or used for any external
                purpose
              </li>
              <li>
                We collect basic usage analytics (page views, feature usage) to
                improve the service, but this data is anonymized
              </li>
            </ul>
            {/* </p> */}
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">
              Data Protection and Security
            </h2>
            {/* <p className=""> */}
            <ul className="list-disc pl-5 text-base text-muted-foreground">
              <li>
                User content is securely stored and never accessed without your
                permission
              </li>
              <li>
                We do not retain or cache chat/document data longer than
                necessary for functionality
              </li>
            </ul>
            {/* </p> */}
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">
              Your Rights and Controls
            </h2>
            {/* <p className="text-base text-muted-foreground"> */}
            <ul className="list-disc pl-5 text-base text-muted-foreground">
              <li>Right to revoke Google access at any time</li>
              <li>
                Right to request deletion of your account and all associated
                content
              </li>
              <li>
                Right to contact us with questions at privacy@breezeeditor.ai
              </li>
            </ul>
            {/* </p> */}
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Contacts</h2>
            For privacy-related questions or concerns:
            <p>
              <a
                className="flex items-center align-middle gap-x-1.5 text-blue-500 hover:text-blue-400"
                href="mailto:yashrajv.work@gmail.com"
              >
                <MailIcon size={16} />
                yashrajv.work@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
