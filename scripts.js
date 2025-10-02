document.addEventListener("DOMContentLoaded", () => {
  /********** referencias DOM **********/
  const languageIcon = document.getElementById("languageIcon");
  const scrollBtn = document.getElementById("scrollUpBtn");
  const form = document.querySelector("form");
  const popup = document.getElementById("formSuccess");

  /********** arrays de palabras **********/
  const palabrasES = [
    "Marketing digital.",
    "Publicidad y posicionamiento.",
    "Gestión comercial.",
    "Community Manager.",
    "Diseño web.",
  ];

  const palabrasEN = [
    "Digital Marketing.",
    "Advertising and positioning.",
    "Business Management.",
    "Community Manager.",
    "Web Design.",
  ];

  /********** estado **********/
  let currentLang = "en"; // idioma actual
  let palabraIndex = 0;
  let palabraInterval = null;
  let spanEl = null; // referencia al span dinámico

  /********** utilidades seguras **********/
  function safeText(selector, text) {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
  }
  function safeHTML(selector, html) {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = html;
  }
  function safePlaceholder(selector, text) {
    const el = document.querySelector(selector);
    if (el) el.placeholder = text;
  }

  /********** Hero: no reemplazar el <span> — sólo cambia el texto fijo antes del span **********/
  function setHeroPrefix(prefix) {
    const h3 = document.querySelector(".hero-text h3");
    if (!h3) return;
    const firstNode = h3.childNodes[0];
    if (firstNode && firstNode.nodeType === Node.TEXT_NODE) {
      firstNode.nodeValue = prefix;
    } else {
      // si no hay nodo de texto, lo insertamos al inicio
      h3.insertBefore(document.createTextNode(prefix), h3.firstChild);
    }
  }

  // Asegura que exista el span #palabra-dinamica y devuelve la referencia
  function ensureHeroSpan() {
    const h3 = document.querySelector(".hero-text h3");
    if (!h3) return null;
    let span = h3.querySelector("#palabra-dinamica");
    if (!span) {
      span = document.createElement("span");
      span.id = "palabra-dinamica";
      h3.appendChild(span);
    }
    return span;
  }

  function refreshSpanRef() {
    spanEl = document.getElementById("palabra-dinamica") || ensureHeroSpan();
    return spanEl;
  }

  /********** rotador (fade simple) **********/
  function iniciarRotador(words, delay = 2000) {
    refreshSpanRef();
    if (!spanEl) return;
    clearInterval(palabraInterval);
    palabraIndex = 0;
    spanEl.style.transition = "opacity 0.35s";
    spanEl.style.opacity = "1";
    spanEl.textContent = words[palabraIndex];

    palabraInterval = setInterval(() => {
      spanEl.style.opacity = "0";
      setTimeout(() => {
        palabraIndex = (palabraIndex + 1) % words.length;
        spanEl.textContent = words[palabraIndex];
        spanEl.style.opacity = "1";
      }, 350);
    }, delay);
  }

  /********** traducciones — NUNCA reescriben innerHTML del <h3> completo **********/
  function translateToEnglish() {
    currentLang = "en";
    if (languageIcon) languageIcon.src = "img/españa.png";

    // menú
    safeText('a[href="#inicio"]', "HOME");
    safeText('a[href="#nosotros"]', "ABOUT US");
    safeText('a[href="#servicios"]', "SERVICES");
    safeText('a[href="#contacto"]', "CONTACT");

    // Hero: cambiar solo el prefijo, no el span
    setHeroPrefix("We work on ");

    // otros textos
    safeText(".hero-text h1", "Consulting for businesses");
    safeText(".hero-text h2", "and small companies.");
    safeText("#nosotros h2", "We help your business, company or organization succeed.");
    safeText("#nosotros .destacado", "We are a digital marketing consultancy committed to helping brands grow, consolidate and stand out in the market.");
    safeText("#nosotros p:nth-of-type(2)", "We combine creativity, analysis and technology to design personalized digital strategies that deliver real results. Our team includes specialists in online advertising, social media, search engine positioning and digital experience design, allowing us to approach each project with a comprehensive and success-driven vision.");
    safeText("#servicios h2", "What do we do to help your business grow?");

    // Beneficios (iconos)
    const beneficios = document.querySelectorAll('.benefits .benefit h3');
    const textosBeneficiosEN = [
      "We create a unique strategy tailored 100% to your needs.",
      "We offer innovative solutions adapted to today's world, no matter the industry.",
      "We have trained professionals for each area, ready to tackle any project."
    ];
    beneficios.forEach((el, i) => { if (textosBeneficiosEN[i]) el.textContent = textosBeneficiosEN[i]; });

    // servicios (si existen)
    const servs = document.querySelectorAll(".service p");
    const textosEN = [
      "Consulting and management.",
      "Web positioning.",
      "Web design.",
      "Digital marketing.",
      "Press and communication.",
      "Community manager.",
      "Commercial management.",
      "Graphic design."
    ];
    servs.forEach((el, i) => { if (textosEN[i]) el.textContent = textosEN[i]; });

    // contacto
    safeText("#contacto p", "You're one click away from boosting your business.");
    safeText("#contacto h2", "Want to chat with us?");
    safePlaceholder('input[name="nombre"]', "Name");
    safePlaceholder('input[name="empresa"]', "Company");
    safePlaceholder('input[name="email"]', "Email");
    safePlaceholder('input[name="telefono"]', "Phone");
    safePlaceholder('input[name="pais"]', "Country");
    safePlaceholder('input[name="rubro"]', "Industry");
    safePlaceholder('textarea[name="mensaje"]', "Message");
    const btn = document.querySelector('button[type="submit"]'); if (btn) btn.textContent = "Send";

    // footer labels (si existen)
    const footerAnchors = document.querySelectorAll(".footer-nav a");
    if (footerAnchors[0]) footerAnchors[0].textContent = "About Us";
    if (footerAnchors[1]) footerAnchors[1].textContent = "Services";
    if (footerAnchors[2]) footerAnchors[2].textContent = "Contact";
    const footerBottom = document.querySelector(".footer-bottom p");
    if (footerBottom) footerBottom.innerHTML = "© 2025 Consulting Services | <a href='#privacidad'>Privacy Policy</a>";

    // reiniciar rotador con palabras EN
    iniciarRotador(palabrasEN);
  }

  function translateToSpanish() {
    currentLang = "es";
    if (languageIcon) languageIcon.src = "img/estados-unidos.png";

    // menú
    safeText('a[href="#inicio"]', "INICIO");
    safeText('a[href="#nosotros"]', "SOBRE NOSOTROS");
    safeText('a[href="#servicios"]', "SERVICIOS");
    safeText('a[href="#contacto"]', "CONTACTO");

    // Hero
    setHeroPrefix("Trabajamos en ");

    // otros textos
    safeText(".hero-text h1", "Consultora para empresas");
    safeText(".hero-text h2", "y pequeños negocios.");
    safeText("#nosotros h2", "Queremos asegurar el éxito de tu empresa, negocio u organización.");
    safeText("#nosotros .destacado", "Somos una consultora de marketing digital comprometida con ayudar a las marcas a crecer, consolidarse y diferenciarse en el mercado.");
    safeText("#nosotros p:nth-of-type(2)", "Combinamos creatividad, análisis y tecnología para diseñar estrategias digitales personalizadas que generan resultados reales. Nuestro equipo está conformado por especialistas en publicidad online, redes sociales, posicionamiento en buscadores y diseño de experiencias digitales, lo que nos permite abordar cada proyecto con una visión integral y orientada al éxito.");
    safeText("#servicios h2", "¿Qué hacemos para que tu negocio crezca?");

    // Beneficios (iconos)
    const beneficios = document.querySelectorAll('.benefits .benefit h3');
    const textosBeneficiosES = [
      "Creamos una estrategia única y diseñada 100% para ti según tus necesidades.",
      "Ofrecemos soluciones innovadoras adaptadas al mundo actual, no importa cuál sea el rubro.",
      "Contamos con personal capacitado especialmente para cada área y listo para abordar cualquier proyecto."
    ];
    beneficios.forEach((el, i) => { if (textosBeneficiosES[i]) el.textContent = textosBeneficiosES[i]; });


    const textosES = [
      "Consultoría y gestión.",
      "Posicionamiento web.",
      "Diseño web.",
      "Marketing digital.",
      "Prensa y comunicación.",
      "Community manager.",
      "Gestión comercial.",
      "Diseño gráfico."
    ];
    const servs = document.querySelectorAll(".service p");
    servs.forEach((el, i) => { if (textosES[i]) el.textContent = textosES[i]; });

    // contacto
    safeText("#contacto p", "Estás a un clic de impulsar tu negocio.");
    safeText("#contacto h2", "¿Quieres charlar con nosotros?");
    safePlaceholder('input[name="nombre"]', "Nombre");
    safePlaceholder('input[name="empresa"]', "Empresa");
    safePlaceholder('input[name="email"]', "Email");
    safePlaceholder('input[name="telefono"]', "Teléfono");
    safePlaceholder('input[name="pais"]', "País");
    safePlaceholder('input[name="rubro"]', "Rubro");
    safePlaceholder('textarea[name="mensaje"]', "Mensaje");
    const btn = document.querySelector('button[type="submit"]'); if (btn) btn.textContent = "Enviar";

    const footerAnchors = document.querySelectorAll(".footer-nav a");
    if (footerAnchors[0]) footerAnchors[0].textContent = "Sobre Nosotros";
    if (footerAnchors[1]) footerAnchors[1].textContent = "Servicios";
    if (footerAnchors[2]) footerAnchors[2].textContent = "Contacto";
    const footerBottom = document.querySelector(".footer-bottom p");
    if (footerBottom) footerBottom.innerHTML = "© 2025 Consulting Services | <a href='#privacidad'>Política de Privacidad</a>";

    // reiniciar rotador con palabras ES
    iniciarRotador(palabrasES);
  }

  /********** inicializar idioma y rotador **********/
  // Aseguramos que exista el span en el DOM antes de arrancar
  ensureHeroSpan();
  // arrancar en inglés (si prefieres español, cambia a translateToSpanish())
  translateToEnglish();

  /********** toggle idioma por click **********/
  if (languageIcon) {
    languageIcon.addEventListener("click", () => {
      // alterna y reinicia rotador
      if (currentLang === "en") translateToSpanish();
      else translateToEnglish();
    });
  }

  /********** scroll to top button **********/
  if (scrollBtn) {
    scrollBtn.style.opacity = 0;
    window.addEventListener("scroll", () => {
      scrollBtn.style.opacity = (window.scrollY > 300) ? 1 : 0;
    });
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /********** manejo de envío de formulario (fetch) **********/
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      })
        .then(response => {
          if (response.ok || response.status === 0 || response.status === 302) {
            // mostrar popup
            if (popup) popup.style.display = "flex";
            form.reset();
            setTimeout(() => { closePopup(); }, 5000);
          } else {
            alert("Hubo un error al enviar el formulario.");
          }
        })
        .catch(() => {
          alert("Error de red al enviar el formulario.");
        });
    });
  }

  // la función closePopup() se usa desde el HTML inline onclick, así que la exponemos globalmente
  window.closePopup = function () {
    if (popup) popup.style.display = "none";
  };
});
