import React, { useState } from "react";
import { Mail, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AboutWremotely: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  // Handler to close modal when clicking outside the content
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShow(false);
      setTimeout(() => setOpen(false), 200); // match animation duration
    }
  };

  // Animation: open modal with fade-in/scale-in, close with fade-out/scale-out
  React.useEffect(() => {
    if (open) {
      setTimeout(() => setShow(true), 10); // allow DOM to mount before animating in
    } else {
      setShow(false);
    }
  }, [open]);

  // Disable body scroll when modal is open (like PostDetailModal)
  React.useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflowY = "scroll";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflowY = "";
        window.scrollTo(0, scrollY);
      };
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflowY = "";
    };
  }, [open]);

  return (
    <>
      <div className="my-20 flex flex-col items-center text-center px-4">
        <h1 className="text-3xl font-extrabold mb-2 flex items-center gap-2">
          <span className="text-3xl font-extrabold text-foreground">
            wremotely
          </span>
          <span className="h-8 w-8 inline-block">
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-foreground"
              stroke="currentColor"
              aria-label="coffee"
            >
              <path
                d="M17 11.6V15C17 18.3137 14.3137 21 11 21H9C5.68629 21 3 18.3137 3 15V11.6C3 11.2686 3.26863 11 3.6 11H16.4C16.7314 11 17 11.2686 17 11.6Z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 9C12 8 12.7143 7 14.1429 7V7C15.7208 7 17 5.72081 17 4.14286V3.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 9V8.5C8 6.84315 9.34315 5.5 11 5.5V5.5C12.1046 5.5 13 4.60457 13 3.5V3"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 11H18.5C19.8807 11 21 12.1193 21 13.5C21 14.8807 19.8807 16 18.5 16H17"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </h1>
        <div className="text-lg text-muted-foreground mb-4">
          browse remote jobs from multiple sources all in one place
        </div>
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="
    cursor-pointer
    border border-[var(--accent-foreground)]
    bg-[var(--accent-foreground)]
    text-[var(--accent)]
    font-semibold
    shadow
    transition-colors
    hover:bg-[var(--accent)]
    hover:text-[var(--accent-foreground)]
    hover:border-[var(--accent)]
  "
          aria-haspopup="dialog"
          aria-controls="about-modal"
          aria-expanded={open}
        >
          Learn More
        </Button>
      </div>
      {open && (
        <div
          id="about-modal"
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-opacity duration-200`}
          onClick={handleBackdropClick}
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
        >
          <div
            className={`
              bg-[var(--card)]
              rounded-2xl
              shadow-lg
              max-w-md
              w-full
              relative
              flex
              flex-col
              max-h-[90vh]
              min-h-[200px]
              mt-8
              sm:mt-16
              transition-all duration-200
              ${show ? "opacity-100 scale-100" : "opacity-0 scale-95"}
            `}
            style={{ willChange: "opacity, transform" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fixed header */}
            <div className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--border)] px-6 pt-6 pb-3 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">About wremotely</h2>
                <button
                  className="text-xl text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                  onClick={() => {
                    setShow(false);
                    setTimeout(() => setOpen(false), 200);
                  }}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </div>
            {/* Scrollable FAQ content */}
            <div
              className="overflow-y-auto px-6 pb-6 pt-2"
              style={{ maxHeight: "calc(90vh - 60px)" }}
            >
              <div className="space-y-3 text-left text-base">
                <div>
                  wremotely is a remote job aggregator, collecting posts from
                  many free sources. We respect the permissions and privacy
                  policies of every site we index.
                </div>
                <div>
                  <strong>How often are job posts updated?</strong>
                  <div>
                    Update frequency varies by source, depending on their stated
                    limits. We’re always adding new sources!
                  </div>
                </div>
                <div>
                  <strong>Is there AI involved?</strong>
                  <div>
                    No AI were harmed in the creation of wremotely{" "}
                    <span role="img" aria-label="smile">
                      😄
                    </span>
                  </div>
                </div>
                <div>
                  <strong>Where can I send feedback?</strong>
                  <div className="flex gap-3 mt-1">
                    Feel free to reach out via email or connect on social media:
                  </div>
                  <div className="flex gap-3 mt-1">
                    <a
                      href="mailto:kevinlloydesguerra@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Gmail"
                      className="hover:text-red-600 transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                    <a
                      href="https://linkedin.com/in/kevinesg"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="hover:text-blue-700 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="https://github.com/kevinesg/wremotely-frontend"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </div>
                </div>
                <div>
                  <strong>Who are we?</strong>
                  <div>
                    wremotely is a solo project by{" "}
                    <a
                      href="https://kevinesg.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      kevinesg
                    </a>
                    , originally created for personal use. If you’d like to
                    connect, contribute, or just say hi, feel free to reach out!
                  </div>
                </div>
                <div>
                  <strong>Support</strong>
                  <div>
                    If you find wremotely useful, consider supporting the
                    project via{" "}
                    <a
                      href="https://ko-fi.com/kevinesg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      Ko-fi
                    </a>{" "}
                    or{" "}
                    <a
                      href="https://www.paypal.com/paypalme/kevinesg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      PayPal
                    </a>
                    . Your support helps keep the project running and improving!{" "}
                    <span role="img" aria-label="heart">
                      ❤️
                    </span>
                    <br />
                    Thank you for your support!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
