import { testConnection } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const isConnected = await testConnection();
  
  if (isConnected) {
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful!' 
    });
  } else {
    return NextResponse.json({ 
      success: false, 
      message: 'Database connection failed. Check your credentials in .env.local' 
    }, { status: 500 });
  }
}

