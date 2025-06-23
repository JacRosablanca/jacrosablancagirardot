"use client";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Presidente", href: "/presidente" },
    { label: "Vicepresidente", href: "/vicepresidente" },
    { label: "Tesorera", href: "/tesorera" },
    { label: "Secretaria", href: "/secretaria" },
    { label: "Fiscal", href: "/fiscal" },
    { label: "Delegados", href: "/delegados" },
    { label: "Comisión de Convivencia y Conciliación", href: "/comision-convivencia" },
    { label: "Comisiones de Trabajo", href: "/comisiones-trabajo" },
    { label: "Sobre la Junta de Acción Comunal", href: "/sobre-junta" },
];

export default function Nav() {
    const [navOpen, setNavOpen] = useState(false);
    const pathname = usePathname();

    // Encuentra el label de la página actual
    const current = navItems.find(item =>
        item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
    );

    return (
        <nav className="w-full mt-2 bg-white dark:bg-[#23232a] border-t border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-2">
                {/* Hamburguesa SIEMPRE visible */}
                <button
                    className="text-2xl text-gray-700 dark:text-gray-200"
                    onClick={() => setNavOpen(!navOpen)}
                    aria-label="Abrir menú"
                >
                    {navOpen ? <FaTimes /> : <FaBars />}
                </button>
                {/* Nombre de la página en el centro */}
                <span className="flex-1 text-center font-semibold text-gray-700 dark:text-gray-200 text-base pointer-events-none select-none">
                    {current ? current.label : ""}
                </span>
                {/* Espacio para alinear el título al centro */}
                <span className="w-8 md:w-0" />
            </div>
            {/* Menú desplegable para web y móvil */}
            <div
                className={`bg-white dark:bg-[#23232a] border-t border-gray-200 dark:border-gray-700 transition-all duration-200 overflow-hidden ${navOpen ? "max-h-96 py-4" : "max-h-0 py-0"
                    }`}
            >
                <ul className="flex flex-col items-center gap-4 text-gray-700 dark:text-gray-200 font-medium">
                    {navItems.map(item => (
                        <li key={item.href}>
                            <Link href={item.href} onClick={() => setNavOpen(false)}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
