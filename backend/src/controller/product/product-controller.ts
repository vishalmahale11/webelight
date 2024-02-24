import { Request, Response } from "express";
import ProductDatabase, { products } from "../../model/product/product-schema";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allData: (typeof ProductDatabase)[] = await ProductDatabase.find({});
    res.json(allData);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCategoryData = async (req: Request, res: Response) => {
  try {
    const category = req.params.category;
    let query = {};
    if (category) {
      query = { category: { $eq: category } };
    }
    const allData: (typeof ProductDatabase)[] = await ProductDatabase.find(
      query
    );
    res.json(allData);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPriceRange = async (req: Request, res: Response) => {
  try {
    const allData: products[] = await ProductDatabase.find();
    const sortOrder: string = req.params.pricerange;

    let sortedData: products[];

    if (sortOrder === "hightolow") {
      sortedData = allData.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "lowtohigh") {
      sortedData = allData.sort((a, b) => a.price - b.price);
    } else {
      sortedData = allData;
    }

    res.json(sortedData);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
