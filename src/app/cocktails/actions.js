const cocktails = [
  {
    name: "jack o' spice",
    ingredients: ["vodka", "pumpkin spice creamer", "kahlúa", "graham cracker"],
    color: "#eaac5b",
  },
  {
    name: "blood shot",
    ingredients: ["whisky", "sour apple schnapps", "cranberry juice"],
    color: "#98292e",
  },
  {
    name: "witches brew",
    ingredients: [
      "vodka",
      "limes",
      "seltzer water",
      "midori melon liqueur",
      "coconut water",
    ],
    color: "#8ace00",
  },
  {
    name: "black widow",
    ingredients: [
      "blackberries",
      "rosemary",
      "lemon",
      "honey",
      "tequila",
      "orange",
      "sparkling water",
    ],
    color: "#2a1115",
    textColor: "white",
  },
];

export async function fetchCocktails() {
  return cocktails;
}
