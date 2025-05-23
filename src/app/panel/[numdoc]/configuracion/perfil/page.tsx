"use client";
import { useParams } from "next/navigation";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import usuarios from "@/datos/usuarios.json";
import { useState } from "react";
import Link from "next/link";

export default function PerfilUsuario() {
	const params = useParams();
	const numdoc = params?.numdoc
		? Array.isArray(params.numdoc)
			? params.numdoc[0]
			: params.numdoc
		: "";

	const usuario = Array.isArray(usuarios)
		? usuarios.find((u) => String((u as { numdoc: string }).numdoc) === String(numdoc))
		: undefined;

	const [sidebarAbierto, setSidebarAbierto] = useState(false);
	const [submenu, setSubmenu] = useState<string | null>(null);

	function toggleSidebar() {
		setSidebarAbierto((prev) => !prev);
	}

	function handleSubmenu(item: string) {
		setSubmenu((prev) => (prev === item ? null : item));
	}

	return (
		<div className="bg-[#141a2e] text-white min-h-screen flex flex-col">
			<Header dark={true} />
			<div className="flex flex-1 min-h-0 relative w-full">
				{/* Botón flotante para abrir el sidebar */}
				{!sidebarAbierto && (
					<button
						onClick={toggleSidebar}
						className="fixed top-24 left-4 z-40 bg-[#232a47] text-yellow-400 p-2 rounded-full shadow-lg hover:bg-[#1a2140] transition"
						title="Abrir menú"
					>
						<svg width="28" height="28" fill="none" viewBox="0 0 24 24">
							<rect x="4" y="6" width="16" height="2" rx="1" fill="currentColor"/>
							<rect x="4" y="11" width="16" height="2" rx="1" fill="currentColor"/>
							<rect x="4" y="16" width="16" height="2" rx="1" fill="currentColor"/>
						</svg>
					</button>
				)}
				{/* Sidebar moderno */}
				<aside
					className={`fixed top-0 left-0 h-full z-50 bg-gradient-to-b from-[#1a2140] to-[#232a47] shadow-2xl transition-transform duration-300
						w-72 flex flex-col ${
							sidebarAbierto ? "translate-x-0" : "-translate-x-full"
						}`}
				>
					<div className="sidebar-header flex items-center justify-between px-6 py-4 border-b border-[#232a47]">
						<h2 className="text-xl font-bold text-yellow-400 tracking-wide">Panel</h2>
						<button
							onClick={toggleSidebar}
							className="text-yellow-400 hover:text-yellow-300 text-2xl"
							title="Cerrar menú"
						>
							✕
						</button>
					</div>
					<ul className="sidebar-menu flex-1 flex flex-col gap-1 px-4 py-4 text-base">
						<li>
							<Link
								href={`/panel/${numdoc}/dashboard`}
								className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d365c] transition"
							>
								🏠 Panel de control
							</Link>
						</li>
						<li>
							<button
								type="button"
								onClick={() => handleSubmenu("usuarios")}
								className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d365c] transition w-full text-left"
							>
								👥 Usuarios
								<span className="ml-auto">{submenu === "usuarios" ? "▲" : "▼"}</span>
							</button>
							{submenu === "usuarios" && (
								<ul className="ml-7 mt-1 flex flex-col gap-1">
									<li>
										<Link href={`/panel/${numdoc}/usuarios/lista`} className="block px-2 py-1 rounded hover:bg-[#232a47]">Lista de usuarios</Link>
									</li>
									<li>
										<Link href={`/panel/${numdoc}/usuarios/nuevo`} className="block px-2 py-1 rounded hover:bg-[#232a47]">Agregar usuario</Link>
									</li>
								</ul>
							)}
						</li>
						<li>
							<button
								type="button"
								onClick={() => handleSubmenu("productos")}
								className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d365c] transition w-full text-left"
							>
								🧺 Productos
								<span className="ml-auto">{submenu === "productos" ? "▲" : "▼"}</span>
							</button>
							{submenu === "productos" && (
								<ul className="ml-7 mt-1 flex flex-col gap-1">
									<li>
										<Link href={`/panel/${numdoc}/productos/lista`} className="block px-2 py-1 rounded hover:bg-[#232a47]">Lista de productos</Link>
									</li>
									<li>
										<Link href={`/panel/${numdoc}/productos/nuevo`} className="block px-2 py-1 rounded hover:bg-[#232a47]">Agregar producto</Link>
									</li>
								</ul>
							)}
						</li>
						<li>
							<button
								type="button"
								onClick={() => handleSubmenu("noticias")}
								className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d365c] transition w-full text-left"
							>
								📰 Noticias
								<span className="ml-auto">{submenu === "noticias" ? "▲" : "▼"}</span>
							</button>
							{submenu === "noticias" && (
								<ul className="ml-7 mt-1 flex flex-col gap-1">
									<li>
										<Link href={`/panel/${numdoc}/noticias/lista`} className="block px-2 py-1 rounded hover:bg-[#232a47]">Lista de noticias</Link>
									</li>
									<li>
										<Link href={`/panel/${numdoc}/noticias/nueva`} className="block px-2 py-1 rounded hover:bg-[#232a47]">Agregar noticia</Link>
									</li>
								</ul>
							)}
						</li>
						<li>
							<button
								type="button"
								onClick={() => handleSubmenu("reportes")}
								className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d365c] transition w-full text-left"
							>
								📊 Reportes
								<span className="ml-auto">{submenu === "reportes" ? "▲" : "▼"}</span>
							</button>
							{submenu === "reportes" && (
								<ul className="ml-7 mt-1 flex flex-col gap-1">
									<li>
										<Link href={`/panel/${numdoc}/reportes/ventas`} className="block px-2 py-1 rounded hover:bg-[#232a47]">Reporte de ventas</Link>
									</li>
									<li>
										<Link href={`/panel/${numdoc}/reportes/usuarios`} className="block px-2 py-1 rounded hover:bg-[#232a47]">Reporte de usuarios</Link>
									</li>
								</ul>
							)}
						</li>
						<li>
							<button
								type="button"
								onClick={() => handleSubmenu("configuracion")}
								className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d365c] transition w-full text-left"
							>
								⚙️ Configuración
								<span className="ml-auto">{submenu === "configuracion" ? "▲" : "▼"}</span>
							</button>
							{submenu === "configuracion" && (
								<ul className="ml-7 mt-1 flex flex-col gap-1">
									<li>
										<Link href={`/panel/${numdoc}/configuracion/perfil`} className="block px-2 py-1 rounded hover:bg-[#232a47]">Perfil</Link>
									</li>
									<li>
										<Link href={`/panel/${numdoc}/configuracion/sitio`} className="block px-2 py-1 rounded hover:bg-[#232a47]">Sitio</Link>
									</li>
								</ul>
							)}
						</li>
						<li>
							<a
								href="#"
								onClick={(e) => {
									e.preventDefault();
									// Puedes agregar aquí la función de cerrar sesión si lo deseas
								}}
								className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-700 hover:text-white transition"
							>
								🚪 Cerrar sesión
							</a>
						</li>
					</ul>
				</aside>
				<main className="flex-1 flex flex-col items-center justify-center p-8 bg-[#232a47]">
					<h1 className="text-3xl font-bold mb-6">Perfil de usuario</h1>
					{usuario ? (
						<div className="bg-[#1a2140] rounded-lg p-6 shadow-lg w-full max-w-md flex flex-col gap-4">
							<p>
								<span className="font-semibold">Nombre completo:</span>{" "}
								{usuario.nombres}
							</p>
							<p>
								<span className="font-semibold">Tipo de documento:</span>{" "}
								{usuario.tipodoc || "No especificado"}
							</p>
							<p>
								<span className="font-semibold">Número de documento:</span>{" "}
								{usuario.numdoc}
							</p>
							<p>
								<span className="font-semibold">Dirección:</span>{" "}
								{usuario.direccion || "No especificada"}
							</p>
							<p>
								<span className="font-semibold">Contacto:</span>{" "}
								{usuario.contacto || "No especificado"}
							</p>
						</div>
					) : (
						<p className="text-red-600 text-lg">Usuario no encontrado.</p>
					)}
				</main>
			</div>
			<Footer />
		</div>
	);
}
