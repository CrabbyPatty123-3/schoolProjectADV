import pool from './db';

// This function creates all the database tables we need
export async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    
    // Create users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create id_cards table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS id_cards (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        card_title VARCHAR(255) NOT NULL,
        header_color VARCHAR(50) NOT NULL,
        student_name VARCHAR(255) NOT NULL,
        student_id VARCHAR(100),
        course VARCHAR(255),
        year_level VARCHAR(50),
        birthdate DATE,
        photo_url TEXT,
        additional_info TEXT,
        include_qr_code BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    connection.release();
    console.log('✅ Database tables created successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error creating database tables:', error);
    return false;
  }
}

