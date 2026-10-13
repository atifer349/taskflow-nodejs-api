const { randomUUID } = require('node:crypto');
const { readTasks, writeTasks } = require('../utils/fileHandler');
// Dosya yazma çakışmalarını önlemek için bu süreç içindeki mutasyonları sıraya koyar.
let writeQueue = Promise.resolve();
function mutate(operation) {
  const next = writeQueue.then(async () => {
    const tasks = await readTasks();
    const result = await operation(tasks);
    if (result.changed) await writeTasks(tasks);
    return result;
  });
  writeQueue = next.catch(() => {});
  return next;
}
async function getAll() { return readTasks(); }
async function getById(id) { return (await readTasks()).find(t => t.id === id) || null; }
async function create(payload) {
  return mutate(async tasks => {
    const now = new Date().toISOString();
    const task = { id: randomUUID(), title: payload.title, description: payload.description ?? '',
      status: payload.status ?? 'pending', priority: payload.priority ?? 'medium',
      assignee: payload.assignee, createdAt: now, updatedAt: now };
    tasks.push(task);
    return { changed: true, value: task };
  }).then(r => r.value);
}
async function update(id, payload) {
  return mutate(async tasks => {
    const task = tasks.find(t => t.id === id);
    if (!task) return { changed: false, value: null };
    Object.assign(task, payload, { updatedAt: new Date().toISOString() });
    return { changed: true, value: task };
  }).then(r => r.value);
}
async function remove(id) {
  return mutate(async tasks => {
    const index = tasks.findIndex(t => t.id === id);
    if (index < 0) return { changed: false, value: false };
    tasks.splice(index, 1);
    return { changed: true, value: true };
  }).then(r => r.value);
}
module.exports = { getAll, getById, create, update, remove };
