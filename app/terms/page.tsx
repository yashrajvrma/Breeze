import Footer from "@/components/home/footer";
import Navbar from "@/components/home/navbar";
import { MailIcon } from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function Terms() {
  return (
    <div className="flex flex-col min-h-screen border-x md:mt-16 mt-12">
      <Navbar />
      <div className="flex justify-center w-full px-6">
        <div className="w-full max-w-4xl md:max-w-[700px] flex flex-col md:gap-12 gap-8 py-12 font-sans">
          <div className="flex flex-col justify-center items-center font-semibold md:text-4xl text-3xl">
            Terms of Service
            <p className="text-sm text-muted-foreground mt-1 font-medium">
              Last updated: June 16, 2025
            </p>
          </div>

          <section>
            <h2 className="text-lg font-semibold mb-2">Overview </h2>
            <p className="text-base text-muted-foreground">
              Breeze is an AI-powered document editor that helps users write,
              edit, and manage documents more efficiently. By using Breeze, you
              agree to these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Service Description</h2>
            AI Powered Editing
            <ul className="list-disc pl-5 text-base text-muted-foreground">
              <li>
                Breeze provides AI tools for summarization, rewriting, and
                content generation. All documents and chats are processed
                securely and are not shared with any third parties.
              </li>
            </ul>
            {/* </p> */}
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">
              User Responsibilities
            </h2>
            By using Breeze, you agree to:
            <ul className="list-disc pl-5 text-base text-muted-foreground">
              <li>Comply with all applicable laws and regulations</li>
              <li>Use Breeze only for lawful, non-malicious purposes</li>
              <li>Not share offensive, illegal, or harmful content</li>
              <li>Keep your account credentials secure</li>
              <li>Report any security vulnerabilities responsibly</li>
            </ul>
            {/* </p> */}
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Data and Privacy</h2>
            {/* <p className=""> */}
            <ul className="list-disc pl-5 text-base text-muted-foreground">
              <li>Breeze uses Google OAuth 2.0 for authentication</li>
              <li>
                We collect your name, email, and profile picture for
                personalization
              </li>
              <li>All documents and AI interactions are kept private</li>
              <li>We do not share or sell user data to third parties</li>
              <li>
                You can revoke access at any time through your Google Account
                settings
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
              <li>Right to contact us with privacy related queries</li>
            </ul>
            {/* </p> */}
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Contacts</h2>
            For questions about these terms:
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
