"use client";

import React, { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SIDENAV_ITEMS } from "@/components/constants";
import { SideNavItem } from "@/components/types";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Logo from "@/public/Jesr-whitelogo.png";

const Sidebar = () => {
  return (
    <div className="md:w-60 h-screen flex-1 fixed hidden md:flex">
      <div className="flex flex-col space-y-6 border-y-2 border-gray-400 w-full">
        <Link
          href="/"
          className="flex flex-row space-x-3 items-center justify-center  md:px-6  h-12 w-full"
        >
          <Image
            width={75}
            height={70}
            src={Logo}
            alt="Jesr-Logo"
            className="pt-3"
          />
        </Link>

        <div className="flex flex-col space-y-2  md:px-6 text-white">
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg  w-full justify-between hover:bg-[#F2981B] ${
              pathname.includes(item.path) ? "bg-[#F2981B]" : ""
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-xl text-white flex">
                {item.title}
              </span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname ? "font-bold" : ""
                    }`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-[#F2981B] ${
            item.path === pathname ? "bg-[#F2981B]" : ""
          }`}
        >
          {item.icon}
          <span className="font-semibold text-xl flex text-white">
            {item.title}
          </span>
        </Link>
      )}
    </div>
  );
};
