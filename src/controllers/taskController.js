const service = require('../services/taskService');
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const positiveInteger = (value, fallback) => value === undefined ? fallback : (/^[1-9]\d*$/.test(String(value)) ? Number(value) : null);
const list = asyncHandler(async (req, res) => {
  const { status, priority, sort } = req.query;
  if (status && !['pending','in_progress','completed'].includes(status)) return res.status(400).json({ success:false, error:'Geçersiz status.' });
  if (priority && !['low','medium','high'].includes(priority)) return res.status(400).json({ success:false, error:'Geçersiz priority.' });
  if (sort && !['createdAt','-createdAt','title','-title'].includes(sort)) return res.status(400).json({success:false,error:'Geçersiz sort.'});
  const page = positiveInteger(req.query.page, 1);
  const limit = positiveInteger(req.query.limit, 10);
  if (!page || !limit || limit > 100) return res.status(400).json({success:false,error:'page pozitif, limit 1–100 arasında olmalıdır.'});
  let tasks = await service.getAll();
  if (status) tasks = tasks.filter(t => t.status === status);
  if (priority) tasks = tasks.filter(t => t.priority === priority);
  const key = (sort || '-createdAt').replace(/^-/, '');
  const direction = (sort || '-createdAt').startsWith('-') ? -1 : 1;
  tasks.sort((a,b) => String(a[key]).localeCompare(String(b[key])) * direction);
  const total = tasks.length;
  res.json({ success:true, data:tasks.slice((page-1)*limit,page*limit), pagination:{page,limit,total,totalPages:Math.ceil(total/limit)} });
});
const search = asyncHandler(async (req,res) => {
  const keyword = String(req.query.keyword || '').trim().toLocaleLowerCase('tr');
  if (!keyword) return res.status(400).json({success:false,error:'keyword zorunludur.'});
  const data = (await service.getAll()).filter(t => [t.title,t.description].some(v => v.toLocaleLowerCase('tr').includes(keyword)));
  res.json({ success:true, count:data.length, data });
});
const assignee = asyncHandler(async (req,res) => {
  const name = req.params.name.toLocaleLowerCase('tr');
  const data = (await service.getAll()).filter(t => t.assignee.toLocaleLowerCase('tr') === name);
  res.json({success:true,count:data.length,data});
});
const detail = asyncHandler(async (req,res) => {
  const task = await service.getById(req.params.id);
  if (!task) return res.status(404).json({success:false,error:'Görev bulunamadı.'});
  res.json({success:true,data:task});
});
const create = asyncHandler(async (req,res) => {
  const task = await service.create(req.body);
  res.status(201).location(`/tasks/${task.id}`).json({success:true,data:task});
});
const update = asyncHandler(async (req,res) => {
  const task = await service.update(req.params.id,req.body);
  if (!task) return res.status(404).json({success:false,error:'Görev bulunamadı.'});
  res.json({success:true,data:task});
});
const remove = asyncHandler(async (req,res) => {
  const deleted = await service.remove(req.params.id);
  if (!deleted) return res.status(404).json({success:false,error:'Görev bulunamadı.'});
  res.status(204).end();
});
module.exports = { list,search,assignee,detail,create,update,remove };
