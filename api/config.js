const fs = require('fs');
const path = require('path');

// Para Vercel, usamos /tmp para archivos temporales
const getFilePath = (filename) => {
  if (process.env.VERCEL) {
    return path.join('/tmp', filename);
  }
  return path.join(__dirname, filename);
};

const defaultConfig = {
  appearance: {
    primaryColor: '#E30613',
    secondaryColor: '#f8fafc',
    textColor: '#0f172a',
    logoPath: "/assets/logos/Sos Tecno Pc Logo.png",
    logoSize: 200,
    globalFont: 'font-sans',
    nav: {
      font: 'font-sans',
      size: 'text-[10px]',
      linkColor: '#0f172a',
      activeColor: '#E30613',
      btnBg: '#E30613',
      btnText: '#ffffff'
    }
  },
  hero: {
    tag: "Servicios Informáticos Profesionales",
    title1: { text: "SOLUCIONES", font: "font-sans", size: "text-6xl md:text-9xl", align: "text-left" },
    title2: { text: "PARA TU PC.", font: "font-sans", size: "text-6xl md:text-9xl", align: "text-left" },
    description: { text: "Asistencia técnica especializada a domicilio o en empresa. Expertos en reparación, mantenimiento y repotenciación.", font: "font-sans", size: "text-lg md:text-xl", align: "text-left" },
    button: { text: "Ver Tarifas", font: "font-sans", size: "text-[10px]", align: "justify-start", bgColor: "#0f172a", textColor: "#ffffff" }
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
  ]
};

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const filePath = getFilePath('config.json');

  if (req.method === 'GET') {
    try {
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        return res.status(200).json(JSON.parse(data));
      }
      return res.status(200).json(defaultConfig);
    } catch (e) {
      return res.status(200).json(defaultConfig);
    }
  }

  if (req.method === 'POST') {
    try {
      fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));
      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
