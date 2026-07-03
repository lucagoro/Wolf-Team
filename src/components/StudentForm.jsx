import { useState, useEffect } from "react";

export default function StudentForm({initialData, onSubmit, onCancel}) {
    const [form, setForm] = useState({
        name: "",
        surname: "",
        phone: ""
    }); 

    useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        surname: initialData.surname,
        phone: initialData.phone
      });
    }
  }, [initialData]);

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value });
   }

   async function handleSubmit(e) {
        e.preventDefault();
        onSubmit(form);
   }

    return (
        <form className="m-5" onSubmit={handleSubmit}>
      <input
        name="surname"
        placeholder="Apellido"
        value={form.surname}
        onChange={handleChange}
        required
        className="w-full p-3 mb-4 rounded-lg border-none bg-[#1f1f2e] text-white text-base placeholder-[#aaa]"
      />

      <input
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full p-3 mb-4 rounded-lg border-none bg-[#1f1f2e] text-white text-base placeholder-[#aaa]"
      />

      <input
        name="phone"
        placeholder="Teléfono"
        value={form.phone}
        onChange={handleChange}
        required
        className="w-full p-3 mb-4 rounded-lg border-none bg-[#1f1f2e] text-white text-base placeholder-[#aaa]"
      />

      <div className="flex justify-between mt-4">
        <button 
            type="submit" 
            className="bg-[#0462c6] text-white border-none py-2.5 rounded-lg w-[45%] cursor-pointer hover:bg-[#0351a3]"
        >
            Guardar
        </button>
        <button 
            type="button" 
            className="bg-[#2c2c3a] text-white border-none py-2.5 rounded-lg w-[45%] cursor-pointer hover:bg-[#444454]"
            onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
    );
}