import request from 'supertest';
import app from '../index';
import { User } from '../models/User';
import { Task } from '../models/Task';
import jwt from 'jsonwebtoken';

describe('Tasks endpoints', () => {
  let token: string;
  let userId: string;

  beforeAll(async () => {
    const user = await User.create({
      email: 'test@example.com',
      password: 'password123'
    });
    userId = user.id;
    token = jwt.sign({ id: userId }, process.env.JWT_SECRET!);
  });

  beforeEach(async () => {
    await Task.deleteMany({});
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Test Task',
          description: 'Test Description'
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('title', 'Test Task');
    });

    it('should not create task without authentication', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({
          title: 'Test Task',
          description: 'Test Description'
        });

      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/tasks', () => {
    beforeEach(async () => {
      await Task.create([
        { title: 'Task 1', completed: false },
        { title: 'Task 2', completed: true }
      ]);
    });

    it('should get all tasks', async () => {
      const res = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
    });

    it('should filter tasks by status', async () => {
      const res = await request(app)
        .get('/api/tasks?status=completed')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].completed).toBe(true);
    });
  });
});