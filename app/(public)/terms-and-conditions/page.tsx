export default function TermsAndConditions() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center p-6">
        <div className="max-w-4xl w-full  shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
            TÉRMINOS Y CONDICIONES
          </h1>
          <section className="space-y-6">
            <article>
              <h2 className="text-xl font-semibold ">
                1. Introducción
              </h2>
              <p >
                Bienvenido/a a <strong>Esmeralda en Línea</strong> (en adelante,
                "la Aplicación"), propiedad de{" "}
                <strong>Inv Abrahamtuy CA</strong>, ubicada en Urb Lomas de
                Guadalupe. Al acceder y utilizar nuestra Aplicación, aceptas
                cumplir con estos Términos y Condiciones. Si no estás de acuerdo
                con alguna parte de estos términos, te recomendamos que no
                utilices la Aplicación.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold ">
                2. Registro de Usuario
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Para utilizar algunas funcionalidades de la Aplicación, es
                  necesario crear una cuenta proporcionando un correo
                  electrónico, nombre y número de teléfono.
                </li>
                <li>
                  Eres responsable de la veracidad y actualización de la
                  información proporcionada.
                </li>
                <li>
                  Es tu responsabilidad mantener la confidencialidad de tu
                  cuenta y contraseña.
                </li>
              </ul>
            </article>

            <article>
              <h2 className="text-xl font-semibold ">
                3. Uso de la Aplicación
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  No puedes utilizar la Aplicación para actividades ilegales o
                  no autorizadas.
                </li>
                <li>
                  No está permitido el uso de la Aplicación para enviar spam,
                  contenido ofensivo o cualquier actividad que infrinja derechos
                  de terceros.
                </li>
                <li>
                  Nos reservamos el derecho de suspender o cancelar cuentas que
                  violen estos términos.
                </li>
              </ul>
            </article>

            <article>
              <h2 className="text-xl font-semibold ">
                4. Publicidad
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>La Aplicación podrá mostrar publicidad de terceros.</li>
                <li>
                  No somos responsables por el contenido de los anuncios ni por
                  los productos o servicios promovidos a través de ellos.
                </li>
              </ul>
            </article>

            <article>
              <h2 className="text-xl font-semibold ">
                5. Privacidad y Protección de Datos
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  La información proporcionada por los usuarios será tratada
                  conforme a nuestra Política de Privacidad.
                </li>
                <li>
                  Nos comprometemos a proteger tus datos personales y no
                  venderlos a terceros sin tu consentimiento.
                </li>
              </ul>
            </article>

            <article>
              <h2 className="text-xl font-semibold ">
                6. Modificaciones a los Términos
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Nos reservamos el derecho de modificar estos Términos y
                  Condiciones en cualquier momento.
                </li>
                <li>
                  Cualquier cambio será notificado a los usuarios y su uso
                  continuo de la Aplicación implicará su aceptación.
                </li>
              </ul>
            </article>

            <article>
              <h2 className="text-xl font-semibold ">
                7. Responsabilidad y Garantías
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  La Aplicación se proporciona "tal cual" y no garantizamos su
                  disponibilidad o funcionamiento sin interrupciones.
                </li>
                <li>
                  No nos hacemos responsables por daños o pérdidas derivadas del
                  uso de la Aplicación.
                </li>
              </ul>
            </article>

            <article>
              <h2 className="text-xl font-semibold ">
                8. Contacto
              </h2>
              <p >
                Para cualquier duda o consulta sobre estos Términos y
                Condiciones, puedes contactarnos a través de nuestra página web:{" "}
                <a
                  href="https://esmeraldaenlinea.com"
                  className="text-green-600 hover:underline"
                >
                  esmeraldaenlinea.com
                </a>
                .
              </p>
            </article>

            <p >
              <strong>Fecha de entrada en vigor:</strong> 01/04/2025
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
