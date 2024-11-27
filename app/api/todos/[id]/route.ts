import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, description, status } = await request.json();
    const result = await query(
      'UPDATE todo SET title = $1, description = $2, status = $3 WHERE id = $4 RETURNING *',
      [title, description, status, parseInt(params.id)]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating todo' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await query('DELETE FROM todo WHERE id = $1', [parseInt(params.id)]);
    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting todo' }, { status: 500 });
  }
}