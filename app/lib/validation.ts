import { z } from 'zod';

// Task validation schema
export const TaskSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  description: z.string()
    .min(1, 'Description is required')
    .max(500, 'Description must be less than 500 characters'),
  status: z.boolean(),
});

// Response validation schemas
export const TaskResponseSchema = TaskSchema.extend({
  id: z.string(),
  created_at: z.string().datetime().optional(),
});

export const TasksResponseSchema = z.array(TaskResponseSchema);

// Type inference
export type TaskInput = z.infer<typeof TaskSchema>;
export type TaskResponse = z.infer<typeof TaskResponseSchema>;

// Validation functions
export const validateTask = (data: unknown): TaskInput => {
  return TaskSchema.parse(data);
};

export const validateTaskResponse = (data: unknown): TaskResponse => {
  return TaskResponseSchema.parse(data);
};

export const validateTasksResponse = (data: unknown): TaskResponse[] => {
  return TasksResponseSchema.parse(data);
};

// Custom error formatter
export const formatZodError = (error: z.ZodError) => {
  return error.errors.map(err => ({
    field: err.path.join('.'),
    message: err.message
  }));
};