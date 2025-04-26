export default function Filter({
  zipcodeInput,
  setZipcodeInput,
  handleSearch,
}) {
  return (
    <div className="shadow-sm ml-[1px] translate-y-2 shadow-gray-400 w-[531px] h-[52px] flex items-center justify-between rounded-[8px] px-4">
      <div className="flex gap-2 text-[16px]">
        <span className="pl-[10px]">Zip code:</span>
        <input
          type="text"
          value={zipcodeInput}
          onChange={(e) => setZipcodeInput(e.target.value)}
          placeholder="Enter Zipcode"
          className="bg-transparent outline-none text-Primary w-[150px]"
        />
      </div>
      <div
        onClick={handleSearch}
        className="bg-Primary flex items-center text-[16px] select-none cursor-pointer shadow-md hover:shadow-gray-400 duration-300 transition-all font-medium text-white justify-center mr-[10px] w-[108px] h-[31px] rounded-[7px]"
      >
        Search
      </div>
    </div>
  );
}
