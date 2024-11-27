import { z } from 'zod';

// Task validation schema
export const TaskSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(val => String(val)), // Accept both string and number, convert to string
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  description: z.string()
    .min(1, 'Description is required')
    .max(500, 'Description must be less than 500 characters'),
  status: z.boolean(),
  created_at: z.union([z.string(), z.date()]).optional() // Accept both string and date
});

// Response validation schemas
export const TaskResponseSchema = TaskSchema;
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

// Validation functions
export const validateTasksResponse = (data: unknown): TaskResponse[] => {
  try {
    return TasksResponseSchema.parse(data);
  } catch (error) {
    console.error('Validation Error:', error);
    throw error;
  }
};

// Custom error formatter
export const formatZodError = (error: z.ZodError) => {
  return error.errors.map(err => ({
    field: err.path.join('.'),
    message: err.message
  }));
};