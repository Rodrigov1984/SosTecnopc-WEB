const fs = require('fs');
const path = require('path');

const getFilePath = (filename) => {
  if (process.env.VERCEL) {
    return path.join('/tmp', filename);
  }
  return path.join(__dirname, filename);
};

const defaultUsers = [
  { id: 1, username: 'admin', password: 'admin', role: 'admin' }
];

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const filePath = getFilePath('users.json');

  if (req.method === 'GET') {
    try {
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        return res.status(200).json(JSON.parse(data));
      }
      return res.status(200).json(defaultUsers);
    } catch (e) {
      return res.status(200).json(defaultUsers);
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
