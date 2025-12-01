import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/lib/db';

// GET - Fetch all ID cards for a user
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('user_id');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    const [cards] = await connection.query(
      'SELECT * FROM id_cards WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );

    connection.release();

    return NextResponse.json({
      success: true,
      cards: cards,
    });
  } catch (error) {
    console.error('Error fetching ID cards:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ID cards' },
      { status: 500 }
    );
  }
}

// POST - Save a new ID card
export async function POST(request: NextRequest) {
  try {
    const {
      user_id,
      card_title,
      header_color,
      student_name,
      student_id,
      course,
      year_level,
      birthdate,
      photo_url,
      additional_info,
      include_qr_code,
    } = await request.json();

    if (!user_id || !card_title || !student_name) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      `INSERT INTO id_cards (
        user_id, card_title, header_color, student_name, student_id,
        course, year_level, birthdate, photo_url, additional_info, include_qr_code
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        card_title,
        header_color,
        student_name,
        student_id || null,
        course || null,
        year_level || null,
        birthdate || null,
        photo_url || null,
        additional_info || null,
        include_qr_code !== undefined ? include_qr_code : true,
      ]
    );

    connection.release();

    const insertResult = result as any;
    return NextResponse.json({
      success: true,
      card_id: insertResult.insertId,
      message: 'ID card saved successfully',
    });
  } catch (error: any) {
    console.error('Error saving ID card:', error);
    return NextResponse.json(
      { 
        error: 'Failed to save ID card',
        details: error.message || 'Unknown error',
        code: error.code
      },
      { status: 500 }
    );
  }
}

