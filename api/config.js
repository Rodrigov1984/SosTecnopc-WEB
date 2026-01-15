const { put, list } = require('@vercel/blob');

const CONFIG_BLOB_NAME = 'sostecnopc-config.json';

const defaultConfig = {
  appearance: {
    primaryColor: '#E30613',
    secondaryColor: '#f8fafc',
    textColor: '#0f172a',
    logoPath: "/assets/logos/logo5.png",
    logoSize: 200,
    globalFont: 'font-sans',
    nav: {
      font: 'font-sans',
      size: 'text-[200x]',
      linkColor: '#0f172a',
      activeColor: '#E30613',
      btnBg: '#E30613',
      btnText: '#ffffff'
    }
  },
  hero: {
    tag: "Servicios Informáticos Profesionales",
    title1: { text: "SOLUCIONES", font: "font-sans", size: "text-10xl md:text-9xl", align: "text-left" },
    title2: { text: "PARA TU PC.", font: "font-sans", size: "text-6xl md:text-9xl", align: "text-left" },
    description: { text: "Asistencia técnica especializada a domicilio o en empresa. Expertos en reparación, mantenimiento y repotenciación.", font: "font-sans", size: "text-lg md:text-xl", align: "text-left" },
    button: { text: "Ver Tarifas", font: "font-sans", size: "text-[150]", align: "justify-start", bgColor: "#0f172a", textColor: "#ffffff" },
    specialties: {
      title: "Nuestras Especialidades",
      showIds: [1, 2, 3, 7],
      descriptions: {
        1: "Diagnóstico completo y solución de problemas de software y hardware",
        2: "Limpieza profunda, cambio de pasta térmica y optimización",
        3: "Mejoras de RAM, SSD y componentes para máximo rendimiento",
        7: "Recuperación segura de archivos y datos importantes"
      }
    }
  },
  services: [
    { id: 1, title: "Revisión", price: "$25.000", desc: "(1 visita) Resolución de fallas menores base local.", icon: "Search", features: ["Computadores y redes", "Reporte técnico", "Recargo Santiago: +$15.000"] },
    { id: 2, title: "Formateo", price: "$35.000", desc: "Formato completo base local.", icon: "RefreshCw", features: ["Programas básicos", "Antivirus", "Recargo Santiago: +$15.000"] },
    { id: 3, title: "Mantenimiento", price: "$25.000", desc: "Limpieza física profunda.", icon: "Wrench", features: ["Pasta térmica", "Diagnóstico mejoras", "Recargo Santiago: +$15.000"] },
    { id: 4, title: "Repotenciación 1", price: "$69.990", desc: "SSD 240GB + Instalación SO.", icon: "Zap", features: ["10x más rápido", "Respaldo 30GB", "Recargo Santiago: +$15.000"] },
    { id: 5, title: "Repotenciación 2", price: "$79.000", desc: "SSD 480GB + Instalación SO.", icon: "Gauge", features: ["Almacenamiento y rapidez", "Respaldo hasta 30GB", "Recargo Santiago: +$15.000"] },
    { id: 6, title: "Repotenciación 3", price: "$120.000", desc: "SSD 1TB + Instalación SO.", icon: "Cpu", features: ["Máximo rendimiento", "Garantía extendida", "Recargo Santiago: +$15.000"] },
    { id: 7, title: "Páginas Web", price: "Cotizar", desc: "Diseño profesional personalizado.", icon: "Globe", features: ["SEO Incluido", "Responsive Design", "Precio según proyecto"] },
    { id: 8, title: "Aplicaciones Web", price: "Cotizar", desc: "Plataformas a medida.", icon: "Code2", features: ["Bases de datos", "Autogestionable", "Precio según proyecto"] }
  ],
  contact: {
    bgColor: "#0f172a",
    textColor: "#ffffff",
    footerText: "Sos.Tecnopc © 2026",
    title: { text: "Contáctanos", show: true, align: "center" },
    subtitle: { text: "Estamos aquí para ayudarte", show: true, align: "center" },
    email: { value: "info@sostecnopc.com", show: true, align: "center" },
    phone: { value: "+56 9 1234 5678", show: true, align: "center" },
    whatsapp: { value: "+56912345678", label: "WhatsApp", show: true, align: "center" },
    address: { value: "Santiago, Chile", show: true, align: "center" }
  }
};

// Obtener la URL del blob de configuración
async function getConfigBlobUrl() {
  try {
    const { blobs } = await list({ prefix: CONFIG_BLOB_NAME });
    if (blobs && blobs.length > 0) {
      return blobs[0].url;
    }
    return null;
  } catch (e) {
    console.error('Error listing blobs:', e);
    return null;
  }
}

// Leer configuración desde Vercel Blob
async function readConfig() {
  try {
    const blobUrl = await getConfigBlobUrl();
    if (blobUrl) {
      const response = await fetch(blobUrl);
      if (response.ok) {
        return await response.json();
      }
    }
    return defaultConfig;
  } catch (e) {
    console.error('Error reading config:', e);
    return defaultConfig;
  }
}

// Guardar configuración en Vercel Blob
async function saveConfig(config) {
  try {
    const blob = await put(CONFIG_BLOB_NAME, JSON.stringify(config, null, 2), {
      access: 'public',
      addRandomSuffix: false,
    });
    return { success: true, url: blob.url };
  } catch (e) {
    console.error('Error saving config:', e);
    throw e;
  }
}

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Pin');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET - Obtener configuración
  if (req.method === 'GET') {
    try {
      const config = await readConfig();
      return res.status(200).json(config);
    } catch (e) {
      console.error('GET error:', e);
      return res.status(200).json(defaultConfig);
    }
  }

  // POST - Guardar configuración (requiere PIN)
  if (req.method === 'POST') {
    try {
      // Verificar PIN de autenticación
      const authPin = req.headers['x-admin-pin'];
      if (authPin !== '1234') {
        return res.status(401).json({ error: 'PIN incorrecto' });
      }

      const result = await saveConfig(req.body);
      return res.status(200).json(result);
    } catch (e) {
      console.error('POST error:', e);
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
