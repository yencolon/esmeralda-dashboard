import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Landing() {
  return (
    <div>
      {/* LANDING PAGE */}
      <div className="flex flex-col md:flex-row items-center justify-between min-h-screen">
        {/* Left Section */}
        <div className="flex flex-col items-center justify-center md:items-start md:justify-center md:w-3/5 p-6 md:p-16 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-600 mb-4">
            Esmeralda en Línea
          </h1>
          <p className="text-base sm:text-lg mb-6 md:mb-8">
            Descubre un mundo de posibilidades. Explora nuestros servicios y
            encuentra lo que necesitas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="flex items-center justify-center w-full sm:w-auto px-6 py-3">
              <Image
                src="/play-store.png"
                alt="Esmeralda en Línea"
                width={24}
                height={24}
                className="mr-2"
              />
              <Link href="https://play.google.com/store/apps/details?id=com.esmeralda.app">
                <p className="text-sm sm:text-base">Descargar Ahora</p>
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center md:w-2/5 p-6">
          <Image
            src="/mock.png"
            alt="Esmeralda en Línea"
            width={400}
            height={400}
            className="max-w-full max-h-96 object-contain"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-center md:justify-between items-center">
          <p className="text-sm text-center md:text-left mb-2 md:mb-0">
            Esmeralda en Línea &copy; {new Date().getFullYear()}
          </p>
          <div className="flex flex-col md:flex-row items-center mt-2 md:mt-0">
            <a href="#" className="hover:text-emerald-500 mx-2 text-sm">
              Contacto
            </a>
            <a
              href="/terms-and-conditions"
              className="hover:text-emerald-500 mx-2 text-sm"
            >
              Términos y Condiciones
            </a>
            <a href="/privacy" className="hover:text-emerald-500 mx-2 text-sm">
              Privacidad
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}