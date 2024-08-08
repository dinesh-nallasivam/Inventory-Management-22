function TextForm({name,text,setText}) {
    return (
        <div className="my-3">
            <label htmlFor={name} className="block text-xs font-medium mb-2">
                {name}
            </label>
            <div className="w-full border flex rounded overflow-hidden p-1 pl-2">
                <input
                    type="text"
                    id={name}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full text-ssm font-normal focus:outline-none"
                />     
            </div>
        </div>
    );
}

export default TextForm;