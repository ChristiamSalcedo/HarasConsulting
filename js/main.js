document.addEventListener("DOMContentLoaded", () => {

  /* ===================================================
     1. Animaciones de Secciones al hacer Scroll
  =================================================== */
  const sectionObserverOptions = { threshold: 0.1 };
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacity-100", "translate-y-0");
        entry.target.classList.remove("opacity-0", "translate-y-10");
      }
    });
  }, sectionObserverOptions);

  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("transition-all", "duration-700", "opacity-0", "translate-y-10");
    sectionObserver.observe(section);
  });

  // Hero visible inmediatamente
  const hero = document.querySelector("#home");
  if (hero) {
    hero.classList.remove("opacity-0", "translate-y-10");
    hero.classList.add("opacity-100", "translate-y-0");
  }


  /* ===================================================
     2. ScrollSpy & Enlaces Activos del Header
  =================================================== */
  const navLinks = document.querySelectorAll(".header-nav .nav-link, .mobile-nav-link");
  const sections = document.querySelectorAll("section[id]");

  // Cambiar clase 'active' al hacer clic
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Resaltar enlace según la sección visible en pantalla
  const navObserverOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0,
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach((section) => navObserver.observe(section));


  /* ===================================================
     3. Menú Hamburguesa Móvil
  =================================================== */
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuIcon = document.getElementById("menuIcon");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      const isHidden = mobileMenu.classList.contains("hidden");
      if (menuIcon) {
        menuIcon.textContent = isHidden ? "menu" : "close";
      }
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        if (menuIcon) {
          menuIcon.textContent = "menu";
        }
      });
    });
  }


  /* ===================================================
     4. Envío de Formulario vía AJAX (FormSubmit)
  =================================================== */
  const contactForm = document.getElementById("contactForm");
  const successBanner = document.getElementById("formSuccess");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);

      fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      })
        .then((response) => {
          if (response.ok) {
            contactForm.reset();

            // Si existe el banner personalizado en el HTML, lo muestra
            if (successBanner) {
              successBanner.classList.remove("opacity-0", "pointer-events-none", "translate-y-10");
              successBanner.classList.add("opacity-100", "translate-y-0");

              setTimeout(() => {
                successBanner.classList.remove("opacity-100", "translate-y-0");
                successBanner.classList.add("opacity-0", "pointer-events-none", "translate-y-10");
              }, 4000);
            } else {
              // Fallback por si no existe el banner flotante
              alert("¡Gracias! Tu mensaje ha sido enviado.");
            }
          } else {
            alert("Hubo un error al enviar el formulario. Por favor intenta nuevamente.");
          }
        })
        .catch((error) => {
          console.error("Error enviando el formulario:", error);
          alert("Error de red al intentar enviar el formulario.");
        });
    });
  }

});