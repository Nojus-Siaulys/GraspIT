export type Testimonial = { quote: string; name: string; role: string; placeholder?: boolean }

// Replace the placeholders with real, approved client quotes and delete `placeholder: true`.
// Placeholder records are never shown to visitors, including in the regular local preview.
export const testimonials: Testimonial[] = [
  { quote: "Čia bus tikras kliento atsiliepimas apie bendradarbiavimą ir rezultatą.", name: "Kliento vardas", role: "Įmonė, projektas", placeholder: true },
  { quote: "Čia bus antras atsiliepimas: trumpai, kas buvo sprendžiama ir kas pasikeitė.", name: "Kliento vardas", role: "Įmonė, projektas", placeholder: true },
  { quote: "Čia bus trečias atsiliepimas apie darbo eigą ir bendravimą.", name: "Kliento vardas", role: "Įmonė, projektas", placeholder: true },
]
