// app/api/todos/route.ts
import { NextResponse } from 'next/server';
import { query } from '../../lib/db';
import { validateTask, validateTasksResponse, formatZodError } from '../../lib/validation';
import { z } from 'zod';

export async function GET() {
  try {
    const result = await query('SELECT * FROM todo ORDER BY created_at DESC');
    const validatedData = validateTasksResponse(result.rows);
    return NextResponse.json(validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Data validation error', details: formatZodError(error) },
        { status: 400 }
      );
    }
    console.error('Error in GET /api/todos:', error);
    return NextResponse.json(
      { error: 'Error fetching todos' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = validateTask(body);
    
    const result = await query(
      'INSERT INTO todo(title, description, status) VALUES($1, $2, $3) RETURNING *',
      [validatedData.title, validatedData.description, validatedData.status]
    );
    
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Data validation error', details: formatZodError(error) },
        { status: 400 }
      );
    }
    console.error("Error in POST /api/todos:", error);
    return NextResponse.json(
      { error: 'Error creating todo' },
      { status: 500 }
    );
  }
}

