
import React, { useState } from "react";
import { jsPDF } from "jspdf";

function App() {
  const items = [
    { id: 1, name: "Stikkledning", price: 96540 },
    { id: 2, name: "Stakeluke", price: 18244 },
    { id: 3, name: "Sluk i støpejern (-24cm)", price: 18244 },
    { id: 4, name: "WC-ledning", price: 18244 },
    { id: 5, name: "Vask/servant", price: 18244 },
    { id: 6, name: "Spylebil", price: 4900 }
  ];

  const [selected, setSelected] = useState([]);

  const toggleItem = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const total = selected
    .map((id) => items.find((i) => i.id === id)?.price || 0)
    .reduce((a, b) => a + b, 0);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Tilbud på rørfornying", 20, 20);
    doc.setFontSize(12);
    let y = 40;
    selected.forEach((id) => {
      const item = items.find((i) => i.id === id);
      doc.text(`${item.name}: ${item.price.toLocaleString()} NOK`, 20, y);
      y += 10;
    });
    doc.text(`Totalpris eks. mva: ${total.toLocaleString()} NOK`, 20, y + 10);
    doc.save("tilbud.pdf");
  };

  return (
    <div style={{ fontFamily: "Arial", padding: 20 }}>
      <h2>Rørinspeksjon - Tilbudsberegning</h2>
      <p>Velg hvilke deler av rørsystemet som skal være med i tilbudet:</p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={selected.includes(item.id)}
                onChange={() => toggleItem(item.id)}
              />
              {item.name} ({item.price.toLocaleString()} NOK)
            </label>
          </li>
        ))}
      </ul>
      <h3>Totalpris eks. mva: {total.toLocaleString()} NOK</h3>
      <button onClick={generatePDF} style={{ padding: "10px", marginTop: "20px" }}>
        Generer PDF-tilbud
      </button>
    </div>
  );
}

export default App;
