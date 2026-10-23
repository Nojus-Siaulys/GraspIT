export const prices = { website: "€350", shop: "€700", email: "€950", workflow: "€1 500" } as const

export const pricingPackages = [
          {
            t: "Pradinė svetainė",
            p: prices.website,
            d: "Aiškus jūsų verslo pristatymas.",
            features: [
              "Iki 4 puslapių",
              "Pritaikymas telefonams ir planšetėms",
              "Orientacinis terminas – 7 dienos",
              "Kodo ir turinio perdavimas",
              "30 dienų pagalbos po paleidimo",
            ],
          },
          {
            t: "Verslo svetainė / el. parduotuvė",
            p: prices.shop,
            d: "Kai reikia daugiau turinio ar pardavimo internetu.",
            features: [
              "Puslapių skaičius pagal sutartą struktūrą",
              "Turinio valdymas",
              "El. parduotuvė pagal sutartą apimtį",
              "Orientacinis terminas – 14 dienų",
              "Kodo perdavimas ir 30 dienų pagalbos",
            ],
          },
        ]
