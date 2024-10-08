export const Message = ({ label, placeholder, register, bg }) => {
  return (
    <div className="text-sm w-full">
      <label className="text-border font-semibold">{label}</label>
      <textarea
        className={`w-full h-40 mt-2 p-6 border border-border rounded ${
          bg ? "bg-main" : "bg-dry"
        }`}
        placeholder={placeholder}
        {...register}
      ></textarea>
    </div>
  );
};

export const Select = ({ label, options, register }) => {
  return (
    <div>
      <label className="text-border font-semibold">{label}</label>
      <select
        className="w-full mt-2 px-6 py-4 h-32 text-text bg-main border border-border rounded"
        // onChange={onChange}
        {...register}
        multiple
      >
        {options?.map((o, i) => (
          <option key={i} value={o.id}>
            <div>{o.name}</div>
          </option>
        ))}
      </select>
    </div>
  );
};

export const Input = ({
  label,
  placeholder,
  type,
  bg,
  register,
  // name,
  value,
  disabled,
  // onChange,
}) => {
  return (
    <div>
      <label className="text-sm text-border font-semibold">{label}</label>
      <input
        // required
        type={type}
        // name={name}
        value={value}
        disabled={disabled ? true : false}
        // onChange={onChange}
        {...register}
        placeholder={placeholder}
        className={`w-full text-sm mt-2 p-5 border border-border rounded text-white ${
          bg ? "bg-main" : "bg-dry"
        }`}
      />
    </div>
  );
};
