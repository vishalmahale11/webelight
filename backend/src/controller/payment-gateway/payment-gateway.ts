import { Request, Response } from "express";

export const paymentMethod = async (req: Request, res: Response) => {
  try {
    const paymentStatus = "Paid Successfully";
    res.json({ success: true, paymentStatus });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
