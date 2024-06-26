"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GLogo from "@/public/logo/main-logo.svg";
import Link from "next/link";
import { LinkButton } from "../utilities/Button";
import XIcon from "../utilities/XIcon";
import logoa from "@/public/logo/logo1.png";
import logob from "@/public/logo/B.svg";

interface NavbarProps {
  title: string;
  href: string;
  slug: string;
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [sideActive, setSideActive] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled100, setIsScrolled100] = useState(false);
  const [isScrolled200, setIsScrolled200] = useState(false);

  const links: NavbarProps[] = [
    {
      title: "Home",
      href: "/#home",
      slug: "home",
    },
    {
      title: "About",
      href: "/#about",
      slug: "about",
    },
    {
      title: "Services",
      href: "/#services",
      slug: "services",
    },
    {
      title: "Projects",
      href: "/#projects",
      slug: "projects",
    },
    {
      title: "Investor Relations",
      href: "/#investor-relations",
      slug: "investor-relations",
    },
    {
      title: "Partner",
      href: "/#partner",
      slug: "partner",
    },
    {
      title: "Join Team",
      href: "#join-team",
      slug: "join-team",
    },
  ];

  const handleScroll = () => {
    const sections: NodeListOf<HTMLElement> = document.querySelectorAll("section[id]");

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 50;

      if (window.scrollY > sectionTop && window.scrollY <= sectionTop + sectionHeight) {
        setActiveSection(section.getAttribute("id")!);
      }
    });

    if (window.scrollY > 200) {
      setIsScrolled200(true);
    } else {
      setIsScrolled200(false);
    }

    if (window.scrollY > 100) {
      setIsScrolled100(true);
    } else {
      setIsScrolled100(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setIsMounted(true);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <nav
        data-aos="fade-down"
        data-aos-delay="500"
        data-aos-duration="500"
        className={`bg-[#1C1C1C] shadow-[0px_5px_8px_-8px_#FFFFFF] fixed w-full mx-auto z-20 left-0 right-0 transition-all duration-300 ${
          isScrolled200
            ? "top-8 w-[90%] xl:max-w-[1300px] lg:max-w-[1000px] md:max-w-[720px] sm:max-w-[620px] rounded-[16px]"
            : isScrolled100
            ? "top-0 w-[90%] xl:max-w-[1300px] lg:max-w-[1000px] md:max-w-[720px] sm:max-w-[620px] rounded-[16px]"
            : "top-0 max-w-full"
        }`}
        style={{ transition: "all 0.8s ease-in-out" }}
      >
        <div className="max-w-full flex flex-wrap items-center justify-between p-2 mx-4">
          <button onClick={() => window.location.reload()} className="flex items-center space-x-3 rtl:space-x-reverse relative">
            <div className="flex justify-center items-center gap-x-2">
              <Image style={{ transition: "all 0.8s ease-in-out" }} src={logoa} className={`w-8 h-8  ${isScrolled200 ? "opacity-100" : "opacity-100"}`} alt="Alternate Logo" />
              <div className="w-auto  overflow-hidden">
                <Image style={{ transition: "all 0.8s ease-in-out" }} src={logob} className={`  ${isScrolled200 ? "-translate-x-60 opacity-0" : "opacity-100"}`} alt="Alternate Logo" />
              </div>
            </div>
            {/* <Image style={{ transition: "all 0.8s ease-in-out" }} src={GLogo} className={`h-8 transition-all duration-500 ${isScrolled200 ? "opacity-0 absolute" : "opacity-100"}`} alt="Grounded Logo" /> */}
          </button>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <LinkButton href="/contact" variant="primary" className="hidden xl:block">
              Contact Us
            </LinkButton>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg xl:hidden hover:bg-warning-400 focus:outline-none focus:ring-2 focus:ring-dark-400"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setSideActive(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full xl:flex xl:w-auto xl:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 text-warning-200 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 ">
              {links.map((link, i) => (
                <li key={i} style={{ transition: "all 0.8s ease-in-out" }}>
                  <Link
                    href={link.href}
                    className={`inline-block py-2 px-3 hover:text-surface-50 relative text-transition duration-300 after:absolute after:bottom-1 after:left-1/2 after:h-[2px] after:origin-center after:-translate-x-1/2 after:bg-surface-50 after:transition-all after:duration-300 hover:after:w-4/5 active:text-surface-50 ${
                      activeSection === link.slug ? "after:w-4/5 text-surface-50 font-medium" : "after:w-0"
                    }`}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      {/* mobile sidebar */}
      <aside className="fixed left-0 top-0 z-[1000] h-screen w-[264px] bg-black transition-all duration-300 xl:hidden" style={{ left: sideActive ? 0 : "-100%" }}>
        <div className="flex h-full flex-col justify-between px-5 py-[42px]">
          <div className="block">
            <div className="flex-col">
              <button className="block h-6 w-6" onClick={() => setSideActive(false)}>
                <XIcon />
              </button>
              <Image src={GLogo} className="h-6 -ml-2 mt-10 mb-[40px] " alt="Grounded Logo" />
            </div>
            <ul className="flex flex-col gap-7">
              {links.map((link, i) => (
                <li key={i} className="ml-3">
                  <Link
                    href={link.href}
                    className={`relative text-white transition duration-300 before:absolute before:-left-3 before:w-[2px] before:bg-white before:transition-all before:duration-300 hover:before:h-full ${
                      activeSection === link.slug ? "before:h-full" : "before:h-0"
                    }`}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
            <LinkButton href="/contact/#contact" variant="primary" className="w-fit absolute bottom-10">
              Contact Us
            </LinkButton>
          </div>
        </div>
      </aside>
    </div>
  );
}
