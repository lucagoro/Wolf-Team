export default function SearchBar({ value, onChange }) {
    return (
        <div className="m-4">
            <input 
                type="text" 
                value={value} 
                onChange={(e) => onChange(e.target.value)} 
                placeholder="Buscar por apellido"
                className="w-full p-3 mb-4 rounded-lg border-none bg-[#1f1f2e] text-white text-base placeholder-[#aaa]"
            ></input>
        </div>
    )
}