const fs = require('node:fs/promises');
const path = require('node:path');
const DATA_FILE = path.join(__dirname, '..', 'data', 'tasks.json');

async function readTasks() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    const tasks = JSON.parse(raw);
    if (!Array.isArray(tasks)) throw new Error('tasks.json bir JSON dizisi olmalıdır.');
    return tasks;
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function writeTasks(tasks) {
  const tempFile = DATA_FILE + '.tmp';
  await fs.writeFile(tempFile, JSON.stringify(tasks, null, 2), 'utf8');
  await fs.rename(tempFile, DATA_FILE);
}
module.exports = { readTasks, writeTasks };
