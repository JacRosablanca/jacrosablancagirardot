"use client";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import usuarios from "@/datos/usuarios.json";
import { useState, useEffect } from "react";
import Link from "next/link";

interface UsuarioData {
	nombres: string;
	direccion: string;
	contacto: string;
	numdoc: string;
	tipodoc: string;
	contrasena: string;
	whatsapp: string;
	facebook: string;
	instagram: string;
	twitter: string;
	tiktok: string;
	threads: string;
}

export default function PerfilUsuario() {
	const router = useRouter();
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
	const [isEditing, setIsEditing] = useState(false);
	const [isChangingPassword, setIsChangingPassword] = useState(false);
	const [editedData, setEditedData] = useState<UsuarioData>({
		nombres: usuario?.nombres || '',
		direccion: usuario?.direccion || '',
		contacto: usuario?.contacto || '',
		numdoc: usuario?.numdoc || '',
		tipodoc: usuario?.tipodoc || '',
		contrasena: usuario?.contrasena || '',
		whatsapp: usuario?.whatsapp || '',
		facebook: usuario?.facebook || '',
		instagram: usuario?.instagram || '',
		twitter: usuario?.twitter || '',
		tiktok: usuario?.tiktok || '',
		threads: usuario?.threads || ''
	});
	const [passwordData, setPasswordData] = useState({
		currentPassword: '',
		newPassword: '',
		confirmPassword: ''
	});

	useEffect(() => {
		const storedUserName = localStorage.getItem("userName");
		if (!storedUserName) {
			router.push('/');
			return;
		}
		// Verificar que el usuario logueado coincida con el perfil que intenta ver
		if (storedUserName !== numdoc) {
			router.push('/');
			return;
		}
	}, [numdoc, router]);

	// Si no hay usuario autenticado, mostrar pantalla de carga mientras redirecciona
	if (!localStorage.getItem("userName")) {
		return null;
	}

	function toggleSidebar() {
		setSidebarAbierto((prev) => !prev);
	}

	function handleSubmenu(item: string) {
		setSubmenu((prev) => (prev === item ? null : item));
	}

	const handleEditSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
		const updatedUsers = usuarios.map(u => 
			u.numdoc === numdoc ? { ...u, ...editedData } : u
		);

		try {
			const response = await fetch('/api/usuarios', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedUsers),
			});

			if (!response.ok) throw new Error('Error al guardar los cambios');
			
			setIsEditing(false);
			// Recargar la página para ver los cambios
			window.location.reload();
		} catch (error) {
			console.error('Error al guardar:', error);
			alert('Error al guardar los cambios');
		}
	};

	const handlePasswordChange = async (e: React.FormEvent) => {
		e.preventDefault();
		
		if (passwordData.newPassword !== passwordData.confirmPassword) {
			alert('Las contraseñas no coinciden');
			return;
		}

		const updatedUsers = usuarios.map(u => 
			u.numdoc === numdoc && u.contrasena === passwordData.currentPassword
				? { ...u, contrasena: passwordData.newPassword }
				: u
		);

		try {
			const response = await fetch('/api/usuarios', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedUsers),
			});

			if (!response.ok) throw new Error('Error al cambiar la contraseña');

			setIsChangingPassword(false);
			alert('Contraseña actualizada correctamente');
		} catch (error) {
			console.error('Error al cambiar la contraseña:', error);
			alert('Error al cambiar la contraseña');
		}
	};

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
							{!isEditing ? (
								<>
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
									<div className="mt-4 pt-4 border-t border-gray-600">
										<h3 className="text-lg font-semibold mb-3">Redes Sociales</h3>
										<div className="space-y-2">
											{usuario.whatsapp && (
												<p>
													<span className="font-semibold">WhatsApp:</span>{" "}
													<a href={`https://wa.me/${usuario.whatsapp}`} target="_blank" rel="noopener noreferrer" 
													   className="text-blue-400 hover:text-blue-300">
														{usuario.whatsapp}
													</a>
												</p>
											)}
											{usuario.facebook && (
												<p>
													<span className="font-semibold">Facebook:</span>{" "}
													<a href={usuario.facebook} target="_blank" rel="noopener noreferrer" 
													   className="text-blue-400 hover:text-blue-300">
														{usuario.facebook}
													</a>
												</p>
											)}
											{usuario.instagram && (
												<p>
													<span className="font-semibold">Instagram:</span>{" "}
													<a href={usuario.instagram} target="_blank" rel="noopener noreferrer" 
													   className="text-blue-400 hover:text-blue-300">
														{usuario.instagram}
													</a>
												</p>
											)}
											{usuario.twitter && (
												<p>
													<span className="font-semibold">Twitter:</span>{" "}
													<a href={usuario.twitter} target="_blank" rel="noopener noreferrer" 
													   className="text-blue-400 hover:text-blue-300">
														{usuario.twitter}
													</a>
												</p>
											)}
											{usuario.tiktok && (
												<p>
													<span className="font-semibold">TikTok:</span>{" "}
													<a href={usuario.tiktok} target="_blank" rel="noopener noreferrer" 
													   className="text-blue-400 hover:text-blue-300">
														{usuario.tiktok}
													</a>
												</p>
											)}
											{usuario.threads && (
												<p>
													<span className="font-semibold">Threads:</span>{" "}
													<a href={usuario.threads} target="_blank" rel="noopener noreferrer" 
													   className="text-blue-400 hover:text-blue-300">
														{usuario.threads}
													</a>
												</p>
											)}
										</div>
									</div>
									<div className="flex gap-4 mt-4">
										<button
											onClick={() => setIsEditing(true)}
											className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
										>
											Editar Perfil
										</button>
										<button
											onClick={() => setIsChangingPassword(true)}
											className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
										>
											Cambiar Contraseña
										</button>
									</div>
								</>
							) : (
								<form onSubmit={handleEditSubmit} className="space-y-4">
									<div>
										<label className="block text-sm font-medium mb-1">Nombres</label>
										<input
											type="text"
											value={editedData.nombres}
											onChange={(e) => setEditedData({...editedData, nombres: e.target.value})}
											className="w-full p-2 rounded bg-[#232b45] border border-gray-600"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium mb-1">Dirección</label>
										<input
											type="text"
											value={editedData.direccion}
											onChange={(e) => setEditedData({...editedData, direccion: e.target.value})}
											className="w-full p-2 rounded bg-[#232b45] border border-gray-600"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium mb-1">Contacto</label>
										<input
											type="text"
											value={editedData.contacto}
											onChange={(e) => setEditedData({...editedData, contacto: e.target.value})}
											className="w-full p-2 rounded bg-[#232b45] border border-gray-600"
										/>
									</div>
									<div className="mt-6 pt-4 border-t border-gray-600">
										<h3 className="text-lg font-semibold mb-3">Redes Sociales</h3>
										<div className="space-y-4">
											<div>
												<label className="block text-sm font-medium mb-1">WhatsApp</label>
												<input
													type="text"
													value={editedData.whatsapp}
													onChange={(e) => setEditedData({...editedData, whatsapp: e.target.value})}
													className="w-full p-2 rounded bg-[#232b45] border border-gray-600"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium mb-1">Facebook</label>
												<input
													type="text"
													value={editedData.facebook}
													onChange={(e) => setEditedData({...editedData, facebook: e.target.value})}
													className="w-full p-2 rounded bg-[#232b45] border border-gray-600"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium mb-1">Instagram</label>
												<input
													type="text"
													value={editedData.instagram}
													onChange={(e) => setEditedData({...editedData, instagram: e.target.value})}
													className="w-full p-2 rounded bg-[#232b45] border border-gray-600"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium mb-1">Twitter</label>
												<input
													type="text"
													value={editedData.twitter}
													onChange={(e) => setEditedData({...editedData, twitter: e.target.value})}
													className="w-full p-2 rounded bg-[#232b45] border border-gray-600"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium mb-1">TikTok URL</label>
												<input
													type="text"
													value={editedData.tiktok}
													onChange={(e) => setEditedData({...editedData, tiktok: e.target.value})}
													className="w-full p-2 rounded bg-[#232b45] border border-gray-600"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium mb-1">Threads URL</label>
												<input
													type="text"
													value={editedData.threads}
													onChange={(e) => setEditedData({...editedData, threads: e.target.value})}
													className="w-full p-2 rounded bg-[#232b45] border border-gray-600"
												/>
											</div>
										</div>
									</div>
									<div className="flex gap-4">
										<button
											type="submit"
											className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
										>
											Guardar
										</button>
										<button
											type="button"
											onClick={() => setIsEditing(false)}
											className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
										>
											Cancelar
										</button>
									</div>
								</form>
							)}
						</div>
					) : (
						<p className="text-red-600 text-lg">Usuario no encontrado.</p>
					)}

					{/* Modal para cambiar contraseña */}
					{isChangingPassword && (
						<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
							<div className="bg-[#1a2140] p-6 rounded-lg w-96">
								<h3 className="text-xl font-bold mb-4">Cambiar Contraseña</h3>
								<form onSubmit={handlePasswordChange} className="space-y-4">
									<div>
										<label className="block text-sm font-medium mb-1">Contraseña Actual</label>
										<input
											type="password"
											value={passwordData.currentPassword}
											onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
											className="w-full p-2 rounded bg-[#232b45] border border-gray-600"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium mb-1">Nueva Contraseña</label>
										<input
											type="password"
											value={passwordData.newPassword}
											onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
											className="w-full p-2 rounded bg-[#232b45] border border-gray-600"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium mb-1">Confirmar Nueva Contraseña</label>
										<input
											type="password"
											value={passwordData.confirmPassword}
											onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
											className="w-full p-2 rounded bg-[#232b45] border border-gray-600"
										/>
									</div>
									<div className="flex gap-4">
										<button
											type="submit"
											className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
										>
											Cambiar
										</button>
										<button
											type="button"
											onClick={() => setIsChangingPassword(false)}
											className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
										>
											Cancelar
										</button>
									</div>
								</form>
							</div>
						</div>
					)}
				</main>
			</div>
			<Footer />
		</div>
	);
}
