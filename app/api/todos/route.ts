import { NextResponse } from 'next/server';
import { query } from '../../lib/db';  // Update this path

export async function GET() {
  try {
    const result = await query('SELECT * FROM todo ORDER BY created_at DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error in GET /api/todos:', error);
    return NextResponse.json({ error: 'Error fetching todos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, status } = await request.json();
    const result = await query(
      'INSERT INTO todo(title, description, status) VALUES($1, $2, $3) RETURNING *',
      [title, description, status]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error in POST /api/todos:", error);
    return NextResponse.json({ error: 'Error creating todo' }, { status: 500 });
  }
}