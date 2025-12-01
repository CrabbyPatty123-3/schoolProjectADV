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
        photo_url LONGTEXT,
        additional_info TEXT,
        include_qr_code BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Update existing tables if they have the wrong column type
    try {
      // Check if photo_url column exists and update it if needed
      const [columns] = await connection.query(`
        SELECT COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'id_cards' 
        AND COLUMN_NAME = 'photo_url'
      `);
      
      if (Array.isArray(columns) && columns.length > 0) {
        const columnType = (columns[0] as any).COLUMN_TYPE;
        if (columnType && !columnType.includes('longtext')) {
          await connection.query(`
            ALTER TABLE id_cards 
            MODIFY COLUMN photo_url LONGTEXT
          `);
          console.log('✅ Updated photo_url column to LONGTEXT');
        }
      }
    } catch (alterError) {
      // Table might not exist yet, which is fine
      console.log('Note: Could not update column (table may not exist yet)');
    }

    connection.release();
    console.log('✅ Database tables created/updated successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error creating database tables:', error);
    return false;
  }
}

