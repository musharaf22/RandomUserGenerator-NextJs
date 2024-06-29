const Navbar = () => {
  return (
    <div className="p-2 border-b border-gray-400 flex items-center justify-between bg-white">
      <div className="flex items-center justify-between w-[95%] m-auto">
        <img
          src="https://www.anciledigital.com/assets/images/logo.svg"
          alt=""
          className="w-[100px] h-[100px] rounded-full"
        />
        <div className="flex items-center">
          <img
            src="https://scontent.fpat2-1.fna.fbcdn.net/v/t39.30808-1/407975937_2433326553505622_3671635203250849648_n.jpg?stp=dst-jpg_p480x480&_nc_cat=103&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=DiankN8Kmu8Q7kNvgGqfk67&_nc_ht=scontent.fpat2-1.fna&oh=00_AYAANy1qb7Tj0WoBcIuE1F20BnBSO26mjpAq9LNWeaDu9A&oe=6684DCF9"
            alt=""
            className="w-[50px] h-[50px] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
