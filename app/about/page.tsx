import Footer from "@/components/home/footer";
import Navbar from "@/components/home/navbar";
import { MailIcon } from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
};

export default function About() {
  return (
    <div className="flex flex-col min-h-screen md:mt-16 mt-12">
      <Navbar />
      <div className="flex justify-center w-full px-6">
        <div className="w-full md:max-w-[700px] max-w-4xl flex flex-col md:gap-12 gap-8 py-12 font-sans">
          <div className="flex flex-col justify-center items-center font-semibold md:text-4xl text-3xl">
            About Us
          </div>
          <section>
            <h2 className="text-lg font-semibold mb-2">About</h2>
            <p className="text-base text-muted-foreground">
              Breeze is an AI-powered document editor built to help you write
              smarter, faster, and with less friction. From drafting long-form
              content to refining quick notes, Breeze combines powerful AI tools
              with a seamless editing experience — so you can stay in flow and
              get your ideas across with clarity and confidence.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Our Mission</h2>
            <p className="text-base text-muted-foreground">
              Our mission is to redefine the way people interact with documents.
              Writing shouldn't feel like a chore or a barrier to productivity.
              With Breeze, we're building an editor that acts like a true
              collaborator — one that understands context, enhances your ideas,
              and helps you go from rough thoughts to polished content in record
              time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Why We Started</h2>
            <p className="text-base text-muted-foreground">
              We started Breeze because modern writing tools haven't evolved
              fast enough to meet the needs of today's knowledge workers,
              creators, and teams. Despite the rise of AI, most editors still
              rely heavily on manual input, fragmented tools, and rigid
              workflows. We believe writing should feel like a conversation —
              not a struggle. Breeze is designed to streamline the entire
              writing process: summarizing complex ideas, expanding bullet
              points, rephrasing content, and even generating first drafts. The
              result? Less time spent formatting and editing, and more time
              spent thinking, creating, and doing meaningful work.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Get in Touch</h2>
            <p className="text-base text-muted-foreground">
              Have questions or feedback? We'd love to hear from you: 📩{" "}
              yashrajv.work@gmail.com
            </p>
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
