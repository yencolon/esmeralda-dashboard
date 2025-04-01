import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function Inicio() {
  // LANDING PAGE
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between min-h-screen">
        <div className="flex flex-col items-center justify-center md:items-start md:justify-center md:w-3/5 p-8 md:p-16">
          <h1 className="text-4xl md:text-6xl font-bold text-emerald-600 mb-4">
            Esmeralda en Línea
          </h1>
          <p className="text-lg mb-8 md:mb-12">
            Descubre un mundo de posibilidades. Explora nuestros servicios y
            encuentra lo que necesitas.
          </p>
          <div className="flex flex-row items-center justify-center">
            <Button>
              <Image
                src="/play-store.png"
                alt="Esmeralda en Línea"
                className="w-full h-full"
              />
              <Link href="https://play.google.com/store/apps/details?id=com.esmeralda.app">
                <p>Descargar Ahora</p>
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center md:w-2/5 p-8">
          <Image
            src="/mock.png"
            alt="Esmeralda en Línea"
            className="max-w-full max-h-96 object-contain"
          />
        </div>
      </div>
      <footer className="py-4 px-6">
        <div className="container mx-auto flex justify-center md:justify-between items-center">
          <p>
            Esmeralda en Línea &copy; {new Date().getFullYear()}
          </p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="hover:text-emerald-500 mx-2">
              Contacto
            </a>
            <a href="/terms-and-conditions" className="hover:text-emerald-500 mx-2">
              Términos
            </a>
            <a href="/privacy" className="hover:text-emerald-500 mx-2">
              Privacidad
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
