import { Response } from "express";
import { Expense } from "../models/model";
import multer from "multer";
import Tesseract from "tesseract.js";
import fs from "fs";

export async function getExpense(req: any, res: Response) {
  const userId = req.user.id;

  try {
    const expenses = await Expense.find({ userId });

    if (!expenses) {
      res.status(404).json({ message: "No expenses found for this user" });
      return;
    }

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses", error });
  }
}

const upload = multer({ dest: "uploads/" });

export async function addExpense(req: any, res: Response) {
  const userId = req.user.id;

  try {
    // Check if it's a file upload (receipt) or manual entry
    if (req.file) {
      // OCR processing for receipt
      const {
        data: { text },
      } = await Tesseract.recognize(req.file.path, "eng");

      // Extract amount from OCR text (you need to write this function)
      const amount = extractAmountFromText(text);
      const description = extractMerchantFromText(text) || "Receipt upload";

      // Create expense from OCR data
      const expense = new Expense({
        userId,
        amount,
        description,
        category: req.body.category || "other",
        source: "receipt",
        extractionData: {
          rawOcrText: text,
          confidence: 0.8, // You can calculate this based on OCR quality
        },
      });

      // Clean up uploaded file
      fs.unlinkSync(req.file.path);

      await expense.save();
      res.json(expense);
    } else {
      // Manual entry (no file upload)
      const { amount, description, category } = req.body;

      const expense = new Expense({
        userId,
        amount,
        description,
        category: category || "other",
        source: "manual",
      });

      await expense.save();
      res.json(expense);
    }
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Error adding expense", error });
  }
}

// Helper function to extract amount from OCR text
function extractAmountFromText(text: string): number {
  // Simple regex to find currency amounts
  const amountMatch = text.match(/\$?(\d+\.?\d*)/);
  return amountMatch ? parseFloat(amountMatch[1]) : 0;
}

function extractMerchantFromText(text: string): string {
  // Extract first line as merchant name (basic approach)
  const lines = text.split("\n").filter((line) => line.trim());
  return lines[0] || "Unknown merchant";
}
