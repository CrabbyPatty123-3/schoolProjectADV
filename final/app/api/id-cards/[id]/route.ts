import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/lib/db';

// PUT - Update an ID card
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: cardId } = await params;
    const {
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

    if (!card_title || !student_name) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    await connection.query(
      `UPDATE id_cards SET
        card_title = ?,
        header_color = ?,
        student_name = ?,
        student_id = ?,
        course = ?,
        year_level = ?,
        birthdate = ?,
        photo_url = ?,
        additional_info = ?,
        include_qr_code = ?
      WHERE id = ?`,
      [
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
        cardId,
      ]
    );

    connection.release();

    return NextResponse.json({
      success: true,
      message: 'ID card updated successfully',
    });
  } catch (error) {
    console.error('Error updating ID card:', error);
    return NextResponse.json(
      { error: 'Failed to update ID card' },
      { status: 500 }
    );
  }
}

// DELETE - Delete an ID card
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: cardId } = await params;

    const connection = await pool.getConnection();
    await connection.query('DELETE FROM id_cards WHERE id = ?', [cardId]);

    connection.release();

    return NextResponse.json({
      success: true,
      message: 'ID card deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting ID card:', error);
    return NextResponse.json(
      { error: 'Failed to delete ID card' },
      { status: 500 }
    );
  }
}

