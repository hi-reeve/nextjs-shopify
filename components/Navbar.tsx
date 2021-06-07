import Link from "next/link";
import React from "react";
import style from "@/components/Navbar.module.scss";
import { useRouter } from "next/dist/client/router";

const Navbar = () => {
    const router = useRouter();
    const menus = [
        {
            label: "Home",
            path: "/",
        },
        {
            label: "Products",
            path: "/products",
        },
    ];
    return (
        <nav className={style.nav}>
            <div>Nav Logo</div>
            <div className={style.nav__menu}>
                {menus.map(menu => {
                    return (
                        <Link href={menu.path} key={menu.path}>
                            <a
                                className={`${style.nav__link} ${
                                    router.asPath === menu.path
                                        ? style["nav__link--active"]
                                        : ""
                                }`}
                            >
                                {menu.label}
                            </a>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default Navbar;
