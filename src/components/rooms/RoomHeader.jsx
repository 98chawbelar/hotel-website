const RoomHeader = ({ room }) => {
  return (
    <div className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden">
      <img
        src={room?.image?.[0]}
        alt={room?.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="text-center px-4 py-6 md:px-8 md:py-12">
          <h1 className="text-white text-4xl md:text-6xl font-serif font-bold">
            {room?.title}
          </h1>
          <p className="text-gray-200 mt-10 text-lg text-center md:text-xl max-w-2xl mx-auto">
            {room?.description}
          </p>
        </div>
      </div>
    </div>
  );
};
export default RoomHeader;
