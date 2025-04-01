export default function Privacy() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center  p-6">
        <div className="max-w-4xl w-full  shadow-lg rounded-lg p-8 space-y-8">
          <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
            Política de Privacidad
          </h1>

          <section className="space-y-6">
            <article>
              <h2 className="text-xl font-semibold">
                Última actualización
              </h2>
              <p >1 de abril de 2025</p>
            </article>

            <article>
              <h2 className="text-xl font-semibold">
                Interpretación y Definiciones
              </h2>
              <p >
                Las palabras cuya letra inicial está en mayúscula tienen
                significados definidos bajo las siguientes condiciones. Las
                siguientes definiciones tendrán el mismo significado
                independientemente de si aparecen en singular o plural.
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4 ">
                <li>
                  <strong>Cuenta:</strong> Una cuenta única creada para ti para
                  acceder a nuestro Servicio.
                </li>
                <li>
                  <strong>Afiliado:</strong> Una entidad que controla, es
                  controlada por, o está bajo control común con una parte.
                </li>
                <li>
                  <strong>Aplicación:</strong> Se refiere a Esmeralda en Línea,
                  el programa de software proporcionado por la Compañía.
                </li>
                <li>
                  <strong>Compañía:</strong> Inv Abrahamtuy CA, Urb Lomas de
                  Guadalupe.
                </li>
                <li>
                  <strong>Datos Personales:</strong> Cualquier información que
                  se relacione con un individuo identificado o identificable.
                </li>
              </ul>
            </article>

            <article>
              <h2 className="text-xl font-semibold">
                Recopilación y Uso de Datos Personales
              </h2>
              <p >
                Mientras usas nuestro Servicio, podemos pedirte que nos
                proporciones cierta información personal identificable que puede
                ser usada para contactarte o identificarte.
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4 ">
                <li>Dirección de correo electrónico.</li>
                <li>Nombre y apellido.</li>
                <li>Número de teléfono.</li>
                <li>Datos de uso.</li>
              </ul>
            </article>

            <article>
              <h2 className="text-xl font-semibold">
                Uso de tus Datos Personales
              </h2>
              <p >
                La Compañía puede usar tus Datos Personales para los siguientes
                propósitos:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4 ">
                <li>Proporcionar y mantener nuestro Servicio.</li>
                <li>
                  Gestionar tu cuenta y darte acceso a diferentes
                  funcionalidades del Servicio.
                </li>
                <li>
                  Contactarte por correo electrónico, llamadas telefónicas, SMS
                  u otras formas equivalentes.
                </li>
                <li>
                  Proporcionarte noticias, ofertas especiales e información
                  sobre otros productos o servicios.
                </li>
              </ul>
            </article>

            <article>
              <h2 className="text-xl font-semibold">
                Seguridad de tus Datos Personales
              </h2>
              <p >
                La seguridad de tus Datos Personales es importante para
                nosotros, pero recuerda que ningún método de transmisión por
                Internet o almacenamiento electrónico es 100% seguro.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold">
                Privacidad Infantil
              </h2>
              <p >
                Nuestro Servicio no está dirigido a menores de 13 años. No
                recopilamos intencionalmente información personal identificable
                de menores de 13 años.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold">
                Cambios a esta Política de Privacidad
              </h2>
              <p >
                Podemos actualizar nuestra Política de Privacidad
                ocasionalmente. Te notificaremos cualquier cambio publicando la
                nueva Política de Privacidad en esta página.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold">
                Contáctenos
              </h2>
              <p >
                Si tienes alguna pregunta sobre esta Política de Privacidad,
                puedes contactarnos visitando esta página en nuestro sitio web:
                <a
                  href="https://esmeraldaenlinea.com"
                  className="text-green-600 hover:underline"
                >
                  esmeraldaenlinea.com
                </a>
                .
              </p>
            </article>
          </section>
        </div>
      </div>
    </div>
  );
}
