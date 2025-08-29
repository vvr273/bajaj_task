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
      const trimmed = item.toString().trim();
      if (trimmed === "") return; // skip empty or whitespace strings

      if (!isNaN(trimmed)) {
        const num = parseInt(trimmed, 10);
        sum += num;
        if (num % 2 === 0) even_numbers.push(trimmed);
        else odd_numbers.push(trimmed);
      } else if (/^[a-zA-Z]+$/.test(trimmed)) {
        alphabets.push(trimmed.toUpperCase());
        concatString += trimmed;
      } else {
        special_characters.push(trimmed);
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
