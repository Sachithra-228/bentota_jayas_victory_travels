"use client";

import { buildWhatsAppLink } from "@/lib/site";

export default function WhatsAppFloatingButton() {
  return (
    <a
      href={buildWhatsAppLink(
        "Hello, I would like to plan a trip in Sri Lanka."
      )}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal text-white shadow-soft hover:bg-brand-lightTeal"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-6 w-6 fill-current"
      >
        <path d="M12 2.2a9.8 9.8 0 0 0-8.45 14.77L2 22l5.2-1.37A9.8 9.8 0 1 0 12 2.2Zm0 17.76a7.9 7.9 0 0 1-4.02-1.1l-.29-.17-3.09.81.83-3.01-.19-.31A7.9 7.9 0 1 1 12 19.96Z" />
        <path d="M9.16 7.82c-.2-.45-.42-.46-.62-.47h-.53c-.18 0-.47.07-.71.34-.24.26-.92.9-.92 2.18 0 1.28.94 2.52 1.07 2.69.13.18 1.83 2.93 4.52 3.99 2.23.88 2.69.71 3.17.66.48-.04 1.55-.64 1.76-1.25.22-.62.22-1.14.15-1.25-.07-.11-.26-.18-.55-.33-.29-.15-1.7-.85-1.96-.95-.26-.09-.46-.14-.66.15-.2.29-.75.95-.92 1.15-.17.2-.35.22-.64.07-.29-.15-1.24-.47-2.36-1.5-.88-.78-1.48-1.75-1.65-2.04-.17-.29-.02-.44.13-.59.13-.13.29-.33.44-.49.15-.17.2-.29.31-.48.11-.2.05-.37-.02-.52-.07-.15-.64-1.67-.89-2.21Z" />
      </svg>
    </a>
  );
}
