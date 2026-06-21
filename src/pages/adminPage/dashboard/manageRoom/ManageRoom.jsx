import ActiveRooms from "./ActiveRooms";
import ArchivedRooms from "./ArchivedRooms";

const ManageRooms = () => {
  return (
    <section className="relative min-h-screen overflow-hidden rounded-4xl bg-gray-600 px-4 sm:px-6 lg:px-8 py-8">
      {/* BACKGROUND BLUR */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 size-175 bg-primary/20 blur-[180px] rounded-full" />

      <div className="relative z-10 max-w-400 mx-auto space-y-20">
        {/* ACTIVE ROOMS */}
        <ActiveRooms />

        {/* ARCHIVED ROOMS */}
        <ArchivedRooms />
      </div>
    </section>
  );
};

export default ManageRooms;
