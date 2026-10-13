function notFound(req, res) {
  res.status(404).json({ success: false, error: 'Endpoint bulunamadı.' });
}
function errorMiddleware(err, req, res, next) {
  if (err instanceof SyntaxError && 'body' in err) return res.status(400).json({ success: false, error: 'Geçersiz JSON.' });
  console.error(err);
  return res.status(500).json({ success: false, error: 'Sunucu hatası.' });
}
module.exports = { notFound, errorMiddleware };
