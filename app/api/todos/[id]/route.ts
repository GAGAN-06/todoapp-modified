import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { validateTask, formatZodError } from '../../../lib/validation';
import { z } from 'zod';

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    // Await the params
    const { id } = await context.params;

    // Convert the ID to a number
    const taskId = Number(id);
    if (isNaN(taskId)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    // Validate the request body
    const body = await request.json();
    const validatedData = validateTask(body);

    const result = await query(
      'UPDATE todo SET title = $1, description = $2, status = $3 WHERE id = $4 RETURNING *',
      [validatedData.title, validatedData.description, validatedData.status, taskId]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: formatZodError(error),
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Error updating todo' }, { status: 500 });
  }
}


export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    // Await the params
    const { id } = await context.params;

    // Convert the ID to a number
    const taskId = Number(id);
    if (isNaN(taskId)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    const result = await query('DELETE FROM todo WHERE id = $1', [taskId]);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting todo' }, { status: 500 });
  }
}
