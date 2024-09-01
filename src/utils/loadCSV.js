// server/utils/loadCSV.js
import fs from 'fs/promises';
import { parse } from 'csv-parse/sync';

// Enhanced JSON parsing with error handling
export default async function loadCSV(filename, options = {}) {
  try {
    const csvContent = await fs.readFile(`./src/public/${filename}`, 'utf8');
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      ...options
    });

    // Parse JSON fields, handling the special double-quote format
    return records.map(record => {
      Object.keys(record).forEach(key => {
        if (typeof record[key] === 'string' && record[key].trim().startsWith('{')) {
          try {
            // Clean the string and attempt JSON parse
            const cleanedJson = record[key].replace(/\\u[\dA-F]{4}/gi, '').replace(/\\n/g, '').replace(/\\'/g, "'");
            record[key] = JSON.parse(cleanedJson);
          } catch (e) {
            console.warn(`Failed to parse JSON for key ${key}: ${e.message}`);
          }
        }
      });
      return record;
    });
  } catch (error) {
    console.error('Error loading CSV:', error);
    throw error;
  }
}
