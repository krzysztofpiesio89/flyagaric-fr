import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React from "react";
import { PaymentBadge, SocialNetworks } from "./footer.types";
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import LayoutSpacing from "./LayoutSpacing";

const socialsData: SocialNetworks[] = [
  {
    id: 1,
    icon: <FaTwitter />,
    url: "https://twitter.com",
  },
  {
    id: 2,
    icon: <FaFacebookF />,
    url: "https://facebook.com",
  },
  {
    id: 3,
    icon: <FaInstagram />,
    url: "https://instagram.com",
  },
  {
    id: 4,
    icon: <FaGithub />,
    url: "https://github.com/mohammadoftadeh",
  },
];

const paymentBadgesData: PaymentBadge[] = [
  {
    id: 1,
    srcUrl: "/icons/Visa.svg",
  },
  {
    id: 2,
    srcUrl: "/icons/mastercard.svg",
  },
  {
    id: 3,
    srcUrl: "/icons/paypal.svg",
  },
  {
    id: 4,
    srcUrl: "/icons/applePay.svg",
  },
  {
    id: 5,
    srcUrl: "/icons/googlePay.svg",
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#F0F0F0] px-4 py-8 mt-10">
      <div className="max-w-frame mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <h1 className={cn(integralCF.className, "text-3xl mb-4 sm:mb-0")}>
            flyagaric.fr
          </h1>
          <div className="flex items-center">
            {socialsData.map((social) => (
              <Link
                href={social.url}
                key={social.id}
                className="bg-white hover:bg-black hover:text-white transition-all mr-3 w-7 h-7 rounded-full border border-black/20 flex items-center justify-center p-1.5"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        <hr className="h-[1px] border-t-black/10 my-6" />

        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center">
          <p className="text-sm text-black/60 mb-4 sm:mb-0">
            FlyAgaric.fr powered by{" "}
            <Link
              href="https://amanitasale.com"
              className="font-medium text-black hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              amanitasale.com
            </Link>
          </p>
          <div className="flex items-center">
            {paymentBadgesData.map((badge, _, arr) => (
              <span
                key={badge.id}
                className={cn([
                  arr.length !== badge.id && "mr-3",
                  "w-[46px] h-[30px] rounded-[5px] border-[#D6DCE5] bg-white flex items-center justify-center",
                ])}
              >
                <Image
                  priority
                  src={badge.srcUrl}
                  width={33}
                  height={100}
                  alt="Payment method icon"
                  className="max-h-[15px]"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
      <LayoutSpacing />
    </footer>
  );
};

export default Footer;
