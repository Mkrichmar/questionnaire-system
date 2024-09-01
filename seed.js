import loadCSV from './src/utils/loadCSV.js';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    // Load CSV data
    const questionnaires = await loadCSV('BIOVERSE Coding Exercise cvs - questionnaire_questionnaires.csv');
    console.log('Questionnaires loaded:', questionnaires.length);
    console.log('First questionnaire:', questionnaires[0]);

    const questions = await loadCSV('BIOVERSE Coding Exercise cvs - questionnaire_questions.csv');
    console.log('Questions loaded:', questions.length);
    console.log('First question:', questions[0]);

    const junction = await loadCSV('BIOVERSE Coding Exercise cvs - questionnaire_junction.csv');
    console.log('Junction loaded:', junction.length);
    console.log('First junction item:', junction[0]);

    // Seed database
    await seedDatabase(pool, questionnaires, questions, junction);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Ensure the pool is closed after all operations
    await pool.end();
  }
}

async function seedDatabase(pool, questionnaires, questions, junction) {
  try {
    await createTables(pool);
    await insertQuestionnaires(pool, questionnaires);
    await insertQuestions(pool, questions);
    await insertJunction(pool, junction);
    await verifyData(pool);
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

async function createTables(pool) {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS questionnaires (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS questions (
        id SERIAL PRIMARY KEY,
        question JSONB NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS junction (
        id SERIAL PRIMARY KEY,
        question_id INTEGER NOT NULL,
        questionnaire_id INTEGER NOT NULL,
        priority INTEGER NOT NULL,
        UNIQUE (question_id, questionnaire_id),
        FOREIGN KEY (question_id) REFERENCES questions(id),
        FOREIGN KEY (questionnaire_id) REFERENCES questionnaires(id)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL
      );
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS answers (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id),
      question_id INT REFERENCES questions(id),
      answer TEXT NOT NULL,
      questionnaire_id INT REFERENCES questionnaires(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

async function insertQuestionnaires(pool, questionnaires) {
  for (const questionnaire of questionnaires) {
    try {
      await pool.query(
        'INSERT INTO questionnaires (id, name) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name',
        [questionnaire.id, questionnaire.name]
      );
    } catch (error) {
      console.error(`Error inserting questionnaire with id ${questionnaire.id}:`, error);
    }
  }
}

async function insertQuestions(pool, questions) {
  for (const question of questions) {
    try {
      await pool.query(
        'INSERT INTO questions (id, question) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question',
        [question.id, question.question]
      );
    } catch (error) {
      console.error(`Error inserting question with id ${question.id}:`, error);
    }
  }
}

async function insertJunction(pool, junction) {
  for (const junctionItem of junction) {
    try {
      await pool.query(
        'INSERT INTO junction (id, question_id, questionnaire_id, priority) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO UPDATE SET question_id = EXCLUDED.question_id, questionnaire_id = EXCLUDED.questionnaire_id, priority = EXCLUDED.priority',
        [junctionItem.id, junctionItem.question_id, junctionItem.questionnaire_id, junctionItem.priority]
      );
    } catch (error) {
      console.error(`Error inserting junction item with id ${junctionItem.id}:`, error);
    }
  }
}

async function verifyData(pool) {
  try {
    const questionnaireResult = await pool.query('SELECT * FROM questionnaires');
    console.log('Questionnaires:', questionnaireResult.rows);

    const questionResult = await pool.query('SELECT * FROM questions');
    console.log('Questions:', questionResult.rows);

    const junctionResult = await pool.query('SELECT * FROM junction');
    console.log('Junction:', junctionResult.rows);
  } catch (error) {
    console.error('Error verifying data:', error);
  }
}

main();
