"use client";
import React from 'react';

import {
    Avatar,
    Dropdown, DropdownItem, DropdownMenu,
    DropdownTrigger, Navbar,
    NavbarBrand,
    NavbarContent,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
const NavbarAdmin = () => {
    return (
        <nav className="flex flex-col fixed z-40 w-full">
            <section className="w-full bg-primary-color shadow-sm  lg:px-[50px] md:px-[10px] px-[10px]">
                <Navbar className="w-auto bg-primary-color">
                    <NavbarBrand className={"justify-items-start"}>
                        <Link
                            href="/"
                            className="flex gap-5 justify-center items-center rounded-full overflow-hidden"
                        >
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform py-[0.3rem] object-cover bg-background-color w-11 h-11"
                                size="sm"
                                src="/assets/logos/logo.png"
                            />
                            <span className="text-primary-color font-semibold text-lg">
                                <Image
                                    src="/assets/logos/name.png"
                                    alt="K-QuickSight"
                                    height={100}
                                    width={200}
                                    className={'w-[200px] h-[72px] object-cover'}
                                />
                            </span>
                        </Link>
                    </NavbarBrand>
                    <NavbarContent className={"flex justify-items-center"}>
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform py-[0.3rem] object-cover bg-background-color w-11 h-11"
                                    color="secondary"
                                    name=""
                                    size="sm"
                                    src="/assets/teams/jessica.png"
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">zoey@example.com</p>
                                </DropdownItem>
                                <DropdownItem key="settings">My Settings</DropdownItem>
                                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                                <DropdownItem key="analytics">Analytics</DropdownItem>
                                <DropdownItem key="system">System</DropdownItem>
                                <DropdownItem key="configurations">Configurations</DropdownItem>
                                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                                <DropdownItem key="logout" color="danger">
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarContent>
                </Navbar>

            </section>
        </nav>
    );
};

export default NavbarAdmin;