"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import usuarios from "@/datos/usuarios.json";

export default function PanelUsuario() {
	const params = useParams();
	const router = useRouter();
	const numdoc = params?.numdoc
		? Array.isArray(params.numdoc)
			? params.numdoc[0]
			: params.numdoc
		: "";

	// Buscar usuario por numdoc
	const usuario = Array.isArray(usuarios)
		? usuarios.find((u) => String((u as { numdoc: string }).numdoc) === String(numdoc))
		: undefined;

	// Verificar sesión al cargar
	useEffect(() => {
		const sesionAbierta = typeof window !== "undefined" && localStorage.getItem("sesion_numdoc");
		if (!sesionAbierta || sesionAbierta !== numdoc) {
			router.replace("/ingresar");
		}
	}, [numdoc, router]);

	function cerrarSesion() {
		if (typeof window !== "undefined") {
			localStorage.removeItem("sesion_numdoc");
		}
		router.replace("/ingresar");
	}

	const [sidebarAbierto, setSidebarAbierto] = useState(false);

	function toggleSidebar() {
		setSidebarAbierto((prev) => !prev);
	}

	return (
		<div className="bg-[#141a2e] text-white min-h-screen flex flex-col transition-colors duration-500">
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
						${sidebarAbierto ? "translate-x-0" : "-translate-x-full"}
						w-72 flex flex-col`}
				>
					<div className="sidebar-header flex items-center justify-between px-6 py-4 border-b border-[#232a47]">
						<h2 className="text-xl font-bold text-yellow-400 tracking-wide">Admin Panel</h2>
						<button
							onClick={toggleSidebar}
							className="text-yellow-400 hover:text-yellow-300 text-2xl"
							title="Cerrar menú"
						>
							✕
						</button>
					</div>
					<ul className="sidebar-menu flex-1 flex flex-col gap-1 px-4 py-4 text-base">
						<li><a href="/admin/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d365c] transition">🏠 Dashboard</a></li>
						<li><a href="/admin/usuarios" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d365c] transition">👥 Usuarios</a></li>
						<li><a href="/admin/productores" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d365c] transition">🧑‍🌾 Productores</a></li>
						<li><a href="/admin/compradores" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d365c] transition">🛒 Compradores</a></li>
						<li><a href="/admin/productos" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d365c] transition">🧺 Productos</a></li>
						<li><a href="/admin/categorias" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d365c] transition">📂 Categorías</a></li>
						<li><a href="/admin/pedidos" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d365c] transition">📦 Pedidos</a></li>
						<li><a href="/admin/eventos" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d365c] transition">📅 Eventos</a></li>
						<li><a href="/admin/noticias" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d365c] transition">📰 Noticias</a></li>
						<li><a href="/admin/galeria" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d365c] transition">🖼️ Galería</a></li>
						<li><a href="/admin/reportes" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d365c] transition">📊 Reportes</a></li>
						<li><a href="/admin/configuracion" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d365c] transition">⚙️ Configuración del Sitio</a></li>
						<li>
							<a
								href="/logout"
								onClick={(e) => {
									e.preventDefault();
									cerrarSesion();
								}}
								className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-700 hover:text-white transition"
							>
								🚪 Cerrar sesión
							</a>
						</li>
					</ul>
				</aside>
				<main
					className={`flex-1 flex flex-col items-center justify-center p-8 bg-[#232a47] transition-all duration-300 min-h-0 w-full ${
						sidebarAbierto ? "blur-sm pointer-events-none select-none" : ""
					}`}
				>
					<h1 className="text-3xl font-bold mb-4">
						Bienvenido{usuario && usuario.nombres ? `, ${usuario.nombres}` : ""}
					</h1>
					{usuario ? (
						<div className="flex flex-col items-center gap-4">
							{/* El botón de cerrar sesión está en el sidebar */}
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
