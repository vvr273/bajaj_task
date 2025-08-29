export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ is_success: false, message: "Method Not Allowed" });
  }

  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    const user_id = "john_doe_17091999";
    const email = "john@xyz.com";
    const roll_number = "ABCD123";

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    let concatString = "";

    data.forEach(item => {
      if (!isNaN(item)) {
        const num = parseInt(item);
        sum += num;
        if (num % 2 === 0) even_numbers.push(item.toString());
        else odd_numbers.push(item.toString());
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        concatString += item;
      } else {
        special_characters.push(item);
      }
    });

    concatString = concatString
      .split("")
      .reverse()
      .map((c, i) => (i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()))
      .join("");

    res.status(200).json({
      is_success: true,
      user_id,
      email,
      roll_number,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string: concatString
    });
  } catch (err) {
    res.status(500).json({ is_success: false, message: "Server Error" });
  }
}
