import express from "express";

const app = express();
app.use(express.json());

app.post("/bfhl", (req, res) => {
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

  // alphabets remain in original data order
  // concatenated string in reverse with alternating caps
  let concat_string = [...alphabets]
    .map(ch => ch.toLowerCase())
    .reverse()
    .map((ch, i) => i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase())
    .join("");

  res.json({
    is_success: true,
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123",
    odd_numbers,
    even_numbers,
    alphabets,
    special_characters,
    sum: sum.toString(),
    concat_string
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
