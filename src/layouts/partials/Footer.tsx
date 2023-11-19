"use client";

import Logo from "@/components/Logo";
import Social from "@/components/Social";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import social from "@/config/social.json";
import { markdownify } from "@/lib/utils/textConverter";
import Link from "next/link";

const Footer = () => {
  const { copyright } = config.params;

  return (
    <footer className="bg-theme-light dark:bg-darkmode-theme-light">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center py-10 md:pt-20 md:pb-14">
          <Logo />

          <ul className="flex gap-x-4 lg:gap-x-10 my-3">
            {menu.footer.map((menu) => (
              <li className="footer-link" key={menu.name}>
                <Link href={menu.url}>{menu.name}</Link>
              </li>
            ))}
          </ul>

          <Social source={social.main} className="social-icons" />
        </div>

        <div className="border-t border-border py-5 dark:border-darkmode-border">
          <div className="flex flex-col md:flex-row gap-y-2 justify-between items-center text-light dark:text-darkmode-light">
            <ul className="flex gap-x-4">
              {menu.footerCopyright.map((menu) => (
                <li className="footer-link" key={menu.name}>
                  <Link href={menu.url}>{menu.name}</Link>
                </li>
              ))}
            </ul>

            <p className="text-sm font-light" dangerouslySetInnerHTML={markdownify(copyright)} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
