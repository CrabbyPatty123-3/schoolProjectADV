import { initializeDatabase } from '@/app/lib/init-db';
import { NextResponse } from 'next/server';

// This endpoint creates the database tables
// Call it once: http://localhost:3000/api/init-db
export async function GET() {
  const success = await initializeDatabase();
  
  if (success) {
    return NextResponse.json({ 
      success: true, 
      message: 'Database tables created successfully!' 
    });
  } else {
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to create database tables' 
    }, { status: 500 });
  }
}

