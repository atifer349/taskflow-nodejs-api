const service = require('../services/taskService');
const wrap = fn => (req,res,next) => Promise.resolve(fn(req,res)).catch(next);
const countStatus = status => wrap(async (req,res) => {
  const tasks = await service.getAll();
  res.json({success:true,status,count:tasks.filter(t=>t.status===status).length});
});
const summary = wrap(async (req,res) => {
  const tasks = await service.getAll();
  res.json({success:true,data:{total:tasks.length,pending:tasks.filter(t=>t.status==='pending').length,
    in_progress:tasks.filter(t=>t.status==='in_progress').length,completed:tasks.filter(t=>t.status==='completed').length,
    highPriority:tasks.filter(t=>t.priority==='high').length}});
});
module.exports = {completed:countStatus('completed'),pending:countStatus('pending'),summary};
