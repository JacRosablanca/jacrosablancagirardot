"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/Header";
import NavBar from "@/components/nav/NavBar";
import Footer from "@/components/footer/Footer";
import usuariosData from "@/datos/usuarios.json";

export default function IngresarPage() {
	const [numDoc, setNumDoc] = useState("");
	const [password, setPassword] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	async function handleLoginUsuario(e: React.FormEvent) {
		e.preventDefault();
		setErrorMsg("");
		try {
			const usuarios = Array.isArray(usuariosData) ? usuariosData : [];
			const usuario = usuarios.find(
				u =>
					String(u.numdoc) === String(numDoc) &&
					u.contrasena === password
			);
			if (usuario) {
				localStorage.setItem("sesion_numdoc", usuario.numdoc);
				router.push(`/panel/${usuario.numdoc}`);
			} else {
				setErrorMsg("Usuario o contraseña incorrectos. ¿No tienes usuario? ");
			}
		} catch {
			setErrorMsg("Error al validar usuario.");
		}
	}

	function irARegistro() {
		router.push("/ingresar?tab=registrar");
	}

	return (
		<div className="bg-[#141a2e] text-white min-h-screen flex flex-col transition-colors duration-500">
			<Header dark={true} />
			<NavBar dark={true} setDark={() => {}} />
			<main className="flex flex-col items-center justify-center flex-1 min-h-[60vh]">
				<h1 className="text-3xl font-bold mb-6">Ingresar</h1>
				<div className="bg-[#232a47] rounded-xl shadow-lg p-8 flex flex-col items-center gap-6 w-full max-w-md">
					<form
						className="w-full flex flex-col gap-4 text-white"
						onSubmit={handleLoginUsuario}
					>
						<label className="font-semibold" htmlFor="numDocLogin">
							Número de documento
						</label>
						<input
							id="numDocLogin"
							name="numDocLogin"
							type="text"
							className="border border-[#394060] bg-[#181f36] text-white rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:border-blue-400"
							value={numDoc}
							onChange={e => setNumDoc(e.target.value)}
							required
						/>
						<label className="font-semibold" htmlFor="password">
							Contraseña
						</label>
						<div className="relative">
							<input
								id="password"
								name="password"
								type={showPassword ? "text" : "password"}
								className="border border-[#394060] bg-[#181f36] text-white rounded px-3 py-2 w-full pr-10 placeholder-gray-400 focus:outline-none focus:border-blue-400"
								value={password}
								onChange={e => setPassword(e.target.value)}
								required
							/>
							<button
								type="button"
								className="absolute right-2 top-1/2 -translate-y-1/2 text-white focus:outline-none"
								onClick={() => setShowPassword(v => !v)}
								tabIndex={-1}
								aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
							>
								{showPassword ? (
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.062-4.675A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.675-.938M3 3l18 18" />
									</svg>
								) : (
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7-2s-4-7-10-7S2 10 2 10s4 7 10 7 10-7 10-7z" />
									</svg>
								)}
							</button>
						</div>
						<button
							type="submit"
							className="mt-4 bg-[#1B2A5B] text-white font-bold py-2 rounded hover:bg-blue-900 transition-colors"
						>
							Ingresar
						</button>
						{errorMsg && (
							<span className="text-red-400 text-sm mt-2">{errorMsg}</span>
						)}
						<div className="flex justify-center mt-2">
							<button
								type="button"
								className="underline text-blue-400"
								onClick={irARegistro}
							>
								¿No estás registrado? Regístrate aquí
							</button>
						</div>
					</form>
				</div>
			</main>
			<Footer />
		</div>
	);
}
