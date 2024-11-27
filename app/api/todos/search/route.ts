// app/api/todos/search/route.ts
import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { validateTasksResponse, formatZodError } from '../../../lib/validation';
import { z } from 'zod';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('q');

    if (!searchTerm) {
      return NextResponse.json({ error: 'Search term is required' }, { status: 400 });
    }

    const result = await query(
      `SELECT 
        id,
        title,
        description,
        status,
        created_at
      FROM todo 
      WHERE title ILIKE $1 
      OR description ILIKE $1 
      ORDER BY created_at DESC`,
      [`%${searchTerm}%`]
    );

    if (!result.rows?.length) {
      return NextResponse.json([]);
    }

    try {
      const validatedData = validateTasksResponse(result.rows);
      return NextResponse.json(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Validation error details:', {
          error: formatZodError(error),
          receivedData: result.rows
        });
        return NextResponse.json(
          { error: 'Data validation error', details: formatZodError(error) },
          { status: 400 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json(
      { error: 'Error searching todos' },
      { status: 500 }
    );
  }
}