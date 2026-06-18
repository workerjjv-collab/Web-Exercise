// ============================================
// CONTROL DE INSCRIPCIONES RETO APEX
// Cambia a true cuando estén abiertas las inscripciones
// Cambia a false cuando NO sea temporada de inscripción
// ============================================
const RETO_APEX_ABIERTO = false ;

// Esto oculta/muestra automáticamente la sección al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const seccionReto = document.getElementById("reto");
  const linkNavReto = document.querySelector('a[href="#reto"]');

  if (!RETO_APEX_ABIERTO) {
    if (seccionReto) seccionReto.style.display = "none";
    if (linkNavReto) linkNavReto.style.display = "none";
  }
});

document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("open");
});
document.querySelectorAll(".nav-links a").forEach(a => {
  a.addEventListener("click", () =>
    document.getElementById("navLinks").classList.remove("open")
  );
});
const navSections = ["ocr","clases","mensualidades","reto","zumba","espacios","tienda","contacto"];
window.addEventListener("scroll", () => {
  let current = "";
  navSections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 90) current = id;
  });
  document.querySelectorAll(".nav-links a").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
});



/* ---- OCR preview ---- */
function ocrPreview(input) {
  const preview = document.getElementById("ocr-preview");
  preview.innerHTML = "";
  Array.from(input.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.onclick = () => openLightbox(e.target.result);
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
}

/* ---- Lightbox global ---- */
function openLightbox(src) {
  document.getElementById("lightbox-img").src = src;
  document.getElementById("lightbox").classList.add("open");
}



/* Scroll a contacto al hacer clic en un plan */
function irAContacto(plan) {
  const sec = document.getElementById("contacto");
  if (sec) {
    sec.scrollIntoView({ behavior: "smooth" });
  }
}



function enviarReto() {
  const nombre   = document.getElementById("r-nombre").value.trim();
  const apellido = document.getElementById("r-apellido").value.trim();
  const email    = document.getElementById("r-email").value.trim();
  const tel      = document.getElementById("r-tel").value.trim();
  const cat      = document.getElementById("r-cat").value;
  const miembro  = document.getElementById("r-miembro").value;

  if (!nombre || !email || !cat) {
    alert("Por favor completa nombre, correo y categoría.");
    return;
  }

  const numeroGym = "573145599314";

  let texto = `🏁 *Inscripción Reto Apex*\n\n`;
  texto += `Nombre: ${nombre} ${apellido}\n`;
  texto += `📧 Correo: ${email}\n`;
  if (tel) texto += `📱 Teléfono: ${tel}\n`;
  texto += `🎯 Categoría: ${cat}\n`;
  texto += `👤 ${miembro}`;

  const url = `https://wa.me/${numeroGym}?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank");

  const ok = document.getElementById("reto-ok");
  ok.textContent = "✅ ¡Listo! Te llevamos a WhatsApp para confirmar tu inscripción.";
  ok.style.display = "block";

  ["r-nombre","r-apellido","r-email","r-tel"].forEach(id => {
    document.getElementById(id).value = "";
  });

  setTimeout(() => { ok.style.display = "none"; }, 6000);
}



/* ---- Galería Zumba (masonry via columns CSS) ---- */
function zumbaGallery(input) {
  const gallery = document.getElementById("zumba-gallery");

  Array.from(input.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.alt  = "Zumba Exercise";
      img.onclick = () => openLightbox(e.target.result);
      gallery.appendChild(img);
    };
    reader.readAsDataURL(file);
  });

  /* Ocultar zona de upload una vez que hay fotos */
  document.querySelector(".zumba-upload-zone").style.marginBottom = "1rem";
}



/* ---- Switch tabs ---- */
function switchTab(panelId, btn) {
  /* Ocultar todos los panels */
  document.querySelectorAll("#espacios .tab-panel").forEach(p =>
    p.classList.remove("active")
  );
  /* Desactivar todos los botones */
  document.querySelectorAll(".espacios-tabs .tab-btn").forEach(b =>
    b.classList.remove("active")
  );
  /* Activar el seleccionado */
  document.getElementById(panelId).classList.add("active");
  btn.classList.add("active");
}

/* ---- Agregar fotos al grid ---- */
function addFotos(input) {
  const grid = document.getElementById("fotos-grid");
  Array.from(input.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement("img");
      img.src   = e.target.result;
      img.alt   = "Gym Exercise";
      img.onclick = () => openLightbox(e.target.result);
      grid.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
  /* Ocultar upload box si ya hay fotos */
  input.closest(".media-upload-box").style.display = "none";
}

/* ---- Agregar videos ---- */
function addVideos(input) {
  const grid = document.getElementById("videos-grid");
  Array.from(input.files).forEach((file, i) => {
    const url     = URL.createObjectURL(file);
    const wrapper = document.createElement("div");
    wrapper.className = "video-wrapper";

    const vid = document.createElement("video");
    vid.src      = url;
    vid.controls = true;
    vid.preload  = "metadata";

    const label = document.createElement("p");
    label.textContent = file.name || "Video " + (i + 1);

    wrapper.appendChild(vid);
    wrapper.appendChild(label);
    grid.appendChild(wrapper);
  });
  input.closest(".media-upload-box").style.display = "none";
}



function loadCartel(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    const zone    = document.getElementById("cartel-zone");
    const preview = document.getElementById("cartel-preview");
    const changeBtn = document.getElementById("cartel-change-btn");

    /* Mostrar imagen y ocultar textos del upload */
    preview.src = e.target.result;
    preview.style.display = "block";
    preview.onclick = () => openLightbox(e.target.result);

    /* Ocultar textos internos excepto la imagen */
    zone.querySelectorAll(".up-icon, h4, p, label").forEach(el => {
      el.style.display = "none";
    });

    /* Mostrar botón cambiar */
    changeBtn.style.display = "block";

    /* Ajustar zona */
    zone.style.padding = "0.5rem";
    zone.style.minHeight = "auto";
  };
  reader.readAsDataURL(file);
}



/* ---- Filtro de categorías ---- */
function filterTienda(cat, btn) {
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  document.querySelectorAll(".product-card").forEach(card => {
    if (cat === "all" || card.dataset.cat === cat) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

/* ---- Subir foto a producto ---- */
function setProductImg(input, pid) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const photo = document.getElementById("photo-" + pid);
    photo.src = e.target.result;
    photo.classList.add("loaded");
    /* Ocultar emoji */
    const box = document.getElementById("img-" + pid);
    const emoji = box.childNodes[0];
    if (emoji && emoji.nodeType === 3) {
      box.dataset.emoji = emoji.textContent;
      emoji.textContent = "";
    }
  };
  reader.readAsDataURL(file);
}

/* ---- Fotos extra tienda ---- */
function addTiendaFotos(input) {
  const grid = document.getElementById("tienda-fotos-extra");
  Array.from(input.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.onclick = () => openLightbox(e.target.result);
      grid.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
  document.querySelector(".tienda-upload-extra").style.display = "none";
}

/* ---- Toast "pedido" ---- */
function addToCart(name) {
  const toast = document.getElementById("cart-toast");
  toast.textContent = "✅ " + name + " añadido al pedido";
  toast.style.display = "block";
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.style.display = "none"; }, 3000);
}



function enviarContacto() {
  const nombre  = document.getElementById("c-nombre").value.trim();
  const tel     = document.getElementById("c-tel").value.trim();
  const email   = document.getElementById("c-email").value.trim();
  const asunto  = document.getElementById("c-asunto").value;
  const mensaje = document.getElementById("c-mensaje").value.trim();

  if (!nombre || !email || !asunto) {
    alert("Por favor completa nombre, correo y asunto.");
    return;
  }

  // Número de WhatsApp del gym (formato: código país + número, sin + ni espacios)
  const numeroGym = "573145599314";

  // Armar el mensaje
  let texto = `Hola, soy *${nombre}*.\n`;
  texto += `📧 Correo: ${email}\n`;
  if (tel) texto += `📱 Teléfono: ${tel}\n`;
  texto += `📌 Asunto: ${asunto}\n`;
  if (mensaje) texto += `\nMensaje:\n${mensaje}`;

  const url = `https://wa.me/${numeroGym}?text=${encodeURIComponent(texto)}`;

  // Abrir WhatsApp en una nueva pestaña
  window.open(url, "_blank");

  // Mostrar confirmación visual
  const ok = document.getElementById("contacto-ok");
  ok.textContent = "✅ ¡Listo! Te llevamos a WhatsApp para enviar tu mensaje.";
  ok.style.display = "block";

  setTimeout(() => { ok.style.display = "none"; }, 6000);
}



/* ---- Botón volver arriba ---- */
window.addEventListener("scroll", () => {
  const btn = document.getElementById("backToTop");
  if (window.scrollY > 500) {
    btn.classList.add("visible");
  } else {
    btn.classList.remove("visible");
  }
});

// Lightbox OCR
function abrirLightbox(src) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  img.src = src;
  lb.classList.add('open');
}

// Control botones Hero
const APEX_ACTIVO = false;   // ← true para mostrar "Inscríbete al Reto Apex"
const PLANES_ACTIVO = true;  // ← true para mostrar "Ver Planes →"

if (APEX_ACTIVO)  document.getElementById('btn-apex').style.display  = '';
if (PLANES_ACTIVO) document.getElementById('btn-planes').style.display = '';