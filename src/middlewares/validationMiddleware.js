const STATUSES = ['pending', 'in_progress', 'completed'];
const PRIORITIES = ['low', 'medium', 'high'];
const FIELDS = ['title', 'description', 'status', 'priority', 'assignee'];
function validateTask(req, res, next) {
  const data = req.body;
  const errors = [];
  const creating = req.method === 'POST';
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return res.status(400).json({ success: false, error: 'JSON nesnesi gönderilmelidir.' });
  }
  const invalid = Object.keys(data).filter(k => !FIELDS.includes(k));
  if (invalid.length) errors.push(`Bilinmeyen alanlar: ${invalid.join(', ')}`);
  if (creating && !('title' in data)) errors.push('title zorunludur.');
  if (creating && !('assignee' in data)) errors.push('assignee zorunludur.');
  if (!creating && Object.keys(data).length === 0) errors.push('En az bir alan gönderilmelidir.');
  if ('title' in data && (typeof data.title !== 'string' || !data.title.trim())) errors.push('title boş olmayan metin olmalıdır.');
  if ('assignee' in data && (typeof data.assignee !== 'string' || !data.assignee.trim())) errors.push('assignee boş olmayan metin olmalıdır.');
  if ('description' in data && typeof data.description !== 'string') errors.push('description metin olmalıdır.');
  if ('priority' in data && !PRIORITIES.includes(data.priority)) errors.push('priority: low, medium veya high olmalıdır.');
  if ('status' in data && !STATUSES.includes(data.status)) errors.push('status: pending, in_progress veya completed olmalıdır.');
  if (errors.length) return res.status(400).json({ success: false, errors });
  for (const k of ['title', 'assignee']) if (typeof data[k] === 'string') data[k] = data[k].trim();
  next();
}
module.exports = validateTask;
