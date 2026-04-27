import { ApiError } from "../utils/ApiError.js";
import PDFParser from "pdf2json";

export const parsePDF = async (buffer) => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();
    
    pdfParser.on("pdfParser_dataError", (err) => reject(err));
    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      const text = pdfParser.getRawTextContent();
      resolve(text);
    });
    
    pdfParser.parseBuffer(buffer);
  });
};