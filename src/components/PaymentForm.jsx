import { useState } from "react";

export default function PaymentForm({ onSubmit, onCancel }) {
  const today = new Date().toISOString().split("T")[0];
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState(today);
  const [period, setPeriod] = useState("");
  

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({          
      amount: Number(amount),
      paymentDate: paymentDate,
      period
    });
  }

  return (
    <form className="m-5" onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Monto"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
        className="w-full p-3 mb-4 rounded-lg border-none bg-[#1f1f2e] text-white text-base placeholder-[#aaa]"
      />

      <input
        type="text"
        placeholder="Periodo (ej: Diciembre 2025)"
        value={period}
        onChange={e => setPeriod(e.target.value)}
        required
        className="w-full p-3 mb-4 rounded-lg border-none bg-[#1f1f2e] text-white text-base placeholder-[#aaa]"
      />

      <input
        type="date"
        placeholder="Fecha de pago"
        value={paymentDate}
        onChange={e => setPaymentDate(e.target.value)}
        required
        className="w-full p-3 mb-4 rounded-lg border-none bg-[#1f1f2e] text-white text-base placeholder-[#aaa]"
      />

      <div className="flex justify-between mt-4">
        <button 
            className="bg-[#00913F] text-white border-none py-2.5 rounded-lg w-[45%] cursor-pointer hover:bg-[#007a33]" 
            type="submit"
        >
            Guardar
        </button>
        <button 
            className="bg-[#2c2c3a] text-white border-none py-2.5 rounded-lg w-[45%] cursor-pointer hover:bg-[#444454]" 
            type="button" 
            onClick={onCancel}
        >
            Cancelar
        </button>
      </div>
    </form>
  );
}
