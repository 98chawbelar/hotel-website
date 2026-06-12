import { useAuth } from "./context/AuthContext";
import { useGetOrderByEmailQuery } from "./redux/features/booking/bookingApi";

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const {
    data: bookings = [],
    isLoading,
    isError,
  } = useGetOrderByEmailQuery(currentUser?.email);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error getting bookings data</div>;

  return (
    <div className=" bg-gray-100 py-16">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
        <p className="text-gray-700 mb-6">
          Welcome, {currentUser?.name || "User"}! Here are your recent bookings:
        </p>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>
          {bookings.length > 0 ? (
            <ul className="space-y-4">
              {bookings.map((booking) => (
                <li
                  key={booking._id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-1"
                >
                  <p className="font-medium">Booking ID: {booking._id}</p>
                  <p>
                    Date: {new Date(booking?.createdAt).toLocaleDateString()}
                  </p>
                  <p>Total: ${booking.totalPrice}</p>
                  {booking.productIds.map((productId) => (
                    <p key={productId} className="ml-1">
                      {productId}
                    </p>
                  ))}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">You have no recent bookings.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
