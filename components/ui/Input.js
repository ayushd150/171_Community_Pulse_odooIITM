export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  label,
  required = false,
  className = "",
}) {
  return (
    <div className="mb-4">
      {label && <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500 ${className}`}
      />
    </div>
  );
}
