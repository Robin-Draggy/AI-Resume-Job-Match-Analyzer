// pdfParser.js - Debug version
const { ApiError } = require("../utils/ApiError");

// Try different ways to load pdf-parse
let pdfParse;

try {
  // Method 1: Direct require
  const loadedModule = require("pdf-parse");
  console.log("Type of loaded module:", typeof loadedModule);
  console.log("Is function?", typeof loadedModule === 'function');
  console.log("Keys:", Object.keys(loadedModule));
  
  // Handle different export styles
  if (typeof loadedModule === 'function') {
    pdfParse = loadedModule;
  } else if (loadedModule.default && typeof loadedModule.default === 'function') {
    pdfParse = loadedModule.default;
  } else {
    pdfParse = loadedModule;
  }
  
  console.log("Final pdfParse type:", typeof pdfParse);
} catch (error) {
  console.error("Failed to load pdf-parse:", error.message);
}

const parsePDF = async (buffer) => {
  if (!buffer || buffer.length === 0) {
    throw new ApiError(400, "No PDF buffer provided");
  }
  
  console.log(`📄 Starting PDF parsing (${buffer.length} bytes)...`);
  
  if (!pdfParse || typeof pdfParse !== 'function') {
    console.error("pdfParse is not a function. Type:", typeof pdfParse);
    throw new ApiError(500, "PDF parser not properly loaded. Please check installation.");
  }
  
  try {
    const data = await pdfParse(buffer);
    
    console.log(`✅ PDF parsed successfully:`);
    console.log(`   - Pages: ${data.numpages}`);
    console.log(`   - Text length: ${data.text?.length || 0} chars`);
    
    if (!data.text || data.text.trim().length === 0) {
      throw new Error("No text content found in PDF");
    }
    
    return data.text;
  } catch (error) {
    console.error("❌ PDF parsing error:", error.message);
    throw new ApiError(400, `Failed to parse PDF: ${error.message}`);
  }
};

module.exports = { parsePDF };