const { test } = require('node:test');
const assert = require('node:assert/strict');
const app = require('../src/app');
let server;
async function request(method, path, body) {
  const response = await fetch(`http://127.0.0.1:${server.address().port}${path}`, {
    method, headers: {'Content-Type':'application/json'},
    ...(body ? {body:JSON.stringify(body)} : {})
  });
  const text = await response.text();
  return {status:response.status, data:text ? JSON.parse(text) : null};
}
test('TaskFlow uçtan uca CRUD, doğrulama, filtreleme ve raporlama', async () => {
  server = app.listen(0);
  try {
    let response = await request('POST','/tasks',{title:'API test task',assignee:'TestUser',priority:'high'});
    assert.equal(response.status,201);
    const id=response.data.data.id;
    response=await request('GET',`/tasks/${id}`);
    assert.equal(response.status,200);
    assert.equal(response.data.data.title,'API test task');
    response=await request('GET','/tasks?priority=high');
    assert.equal(response.status,200);
    assert.ok(response.data.data.some(t=>t.id===id));
    response=await request('GET','/tasks/search?keyword=API');
    assert.equal(response.status,200);
    response=await request('GET','/tasks/assignee/TestUser');
    assert.equal(response.status,200);
    response=await request('PUT',`/tasks/${id}`,{status:'completed'});
    assert.equal(response.status,200);
    response=await request('GET','/reports/completed');
    assert.equal(response.status,200);
    response=await request('GET','/reports/summary');
    assert.equal(response.status,200);
    response=await request('POST','/tasks',{title:'',assignee:'TestUser'});
    assert.equal(response.status,400);
    response=await request('GET','/tasks/invalid-id');
    assert.equal(response.status,404);
    response=await request('DELETE',`/tasks/${id}`);
    assert.equal(response.status,204);
    response=await request('GET',`/tasks/${id}`);
    assert.equal(response.status,404);
  } finally {
    server.close();
  }
});
