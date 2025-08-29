import express from "express";
import serverless from "serverless-http";

const app = express();
app.use(express.json());

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    data.forEach(item => {
      if (!isNaN(item) && item.trim() !== "") {
        let num = parseInt(item, 10);
        if (num % 2 === 0) even_numbers.push(item); 
        else odd_numbers.push(item);
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    });

    // Build concat string (reverse order, alternating caps)
    let concat_string = alphabets
      .slice() // copy
      .reverse()
      .map((ch, i) => (i % 2 === 0 ? ch[0].toUpperCase() + ch.slice(1).toLowerCase() : ch.toLowerCase()))
      .join("");

    res.status(200).json({
      is_success: true,
      user_id: "john_doe_17091999", 
      email: "john@xyz.com",
      roll_number: "ABCD123",
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: error.message,
    });
  }
});

export default serverless(app);
