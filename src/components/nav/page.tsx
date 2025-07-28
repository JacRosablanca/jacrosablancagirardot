import Link from "next/link";

export default function Nav() {
  return (
    <nav className="w-full flex justify-center items-center bg-white dark:bg-[#23232a] shadow-none m-0 p-0 border-none text-sm h-10">
      <div className="flex gap-x-8">
        <Link href="/" className="font-semibold hover:text-blue-700 dark:hover:text-blue-300 m-0 p-0">
          Inicio
        </Link>
        <Link href="/proyectos" className="font-semibold hover:text-blue-700 dark:hover:text-blue-300 m-0 p-0">
          Proyectos
        </Link>
      </div>
    </nav>
  );
}
