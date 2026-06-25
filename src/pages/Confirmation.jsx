import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useFetchBookingByIdQuery,
  useCancelBookingMutation,
  useUpdateBookingStatusMutation,
  useResendBookingEmailMutation,
  useDeleteBookingMutation,
} from "../redux/features/booking/bookingApi";

import SubmitButton from "../pages/adminPage/components/SubmitButton";

const Confirmation = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const { data: booking, isLoading, isError } = useFetchBookingByIdQuery(code);

  const [cancelBooking, { isLoading: cancelling }] = useCancelBookingMutation();

  const [updateBookingStatus, { isLoading: updating }] =
    useUpdateBookingStatusMutation();

  const [resendBookingEmail, { isLoading: resending }] =
    useResendBookingEmailMutation();

  const [deleteBooking, { iseLoading: deleting }] = useDeleteBookingMutation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-primary">
        Loading booking...
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-primary">
        Booking not found
      </div>
    );
  }

  const checkInDate = new Date(booking.stay.checkIn);
  const today = new Date();
  const diffTime = checkInDate - today;
  const daysBeforeCheckIn = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const canCancel =
    booking.bookingStatus !== "cancelled" && daysBeforeCheckIn >= 7;

  // REJECT BOOKING (ADMIN ACTION STYLE)
  const handleReject = async () => {
    const result = await Swal.fire({
      title: "Reject Booking?",
      text: "This booking will be cancelled.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Reject",
    });

    if (!result.isConfirmed) return;

    try {
      await updateBookingStatus({
        id: booking._id,
        bookingStatus: "cancelled",
      }).unwrap();

      Swal.fire({
        title: "Rejected!",
        text: "Booking rejected successfully",
        icon: "success",
        confirmButtonColor: "#10b981",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to reject booking",
        icon: "error",
      });
    }
  };

  // RESTORE BOOKING
  const handleRestore = async () => {
    const result = await Swal.fire({
      title: "Restore Booking?",
      text: "This booking will be restored to confirmed status.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Restore",
    });

    if (!result.isConfirmed) return;

    try {
      await updateBookingStatus({
        id: booking._id,
        bookingStatus: "confirmed",
      }).unwrap();

      Swal.fire({
        title: "Restored!",
        text: "Booking restored successfully",
        icon: "success",
        confirmButtonColor: "#10b981",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error?.data?.message || "Failed to restore booking",
        icon: "error",
      });
    }
  };

  // RESEND EMAIL
  const handleResendEmail = async () => {
    try {
      await resendBookingEmail(booking._id).unwrap();

      Swal.fire({
        title: "Success",
        text: "Email resent successfully",
        icon: "success",
        confirmButtonColor: "#10b981",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to resend email",
        icon: "error",
      });
    }
  };

  // PERMANENT DELETE
  const handlePermanentDelete = async () => {
    const result = await Swal.fire({
      title: "Delete Permanently?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteBooking(booking._id).unwrap();

      await Swal.fire({
        title: "Deleted!",
        text: "Booking deleted permanently",
        icon: "success",
        confirmButtonColor: "#10b981",
      });

      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error?.data?.message || "Delete failed",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-primary text-white px-4 py-10">
      <div className="max-w-3xl mx-auto">
        {/* STATUS */}
        <div
          className={`rounded-2xl mt-20 p-8 text-center border ${
            booking.bookingStatus === "cancelled"
              ? "bg-red-500/10 border-red-500/30"
              : "bg-green-500/10 border-green-500/30"
          }`}
        >
          <div className="text-6xl mb-4">
            {booking.bookingStatus === "cancelled" ? "❌" : "✅"}
          </div>

          <h1 className="text-4xl font-bold">
            {booking.bookingStatus === "cancelled"
              ? "Booking Cancelled"
              : "Booking Confirmed"}
          </h1>

          <p className="text-gray-400 mt-3">
            Booking Code: {booking.bookingCode}
          </p>
        </div>

        {/* DETAILS */}
        <div className="mt-8 bg-white/5 rounded-2xl border border-white/10 p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Booking Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400">Guest</p>
              <p>
                {booking.guest.firstName} {booking.guest.lastName}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Email</p>
              <p>{booking.guest.email}</p>
            </div>

            <div>
              <p className="text-gray-400">Check In</p>
              <p>{new Date(booking.stay.checkIn).toLocaleDateString()}</p>
            </div>

            <div>
              <p className="text-gray-400">Check Out</p>
              <p>{new Date(booking.stay.checkOut).toLocaleDateString()}</p>
            </div>

            <div
              className={`inline-flex w-fit px-2 py-2 rounded-xl items-center text-sm font-medium ${
                booking.bookingStatus === "cancelled"
                  ? "bg-red-500/20 text-red-400"
                  : booking.bookingStatus === "confirmed"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {booking.bookingStatus}
            </div>

            <div>
              <p className="text-gray-400">Payment</p>
              <p>{booking.payment.method}</p>
            </div>
          </div>

          <hr className="border-white/10" />

          <div className="flex justify-between text-2xl font-bold">
            <span>Total</span>
            <span>
              {booking.pricing.totalPrice} {booking.pricing.currency}
            </span>
          </div>
        </div>

        {/* POLICY */}
        <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-lg font-semibold mb-3">Cancellation Policy</h3>

          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Free cancellation up to 7 days before check-in</li>
            <li>• Cancellation is unavailable within 7 days</li>
            <li>• Date modifications are allowed before check-in</li>
          </ul>
        </div>

        {/* ACTIONS */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <SubmitButton onClick={() => navigate("/dashboard")}>
            Back To Home
          </SubmitButton>
          {/* REJECT (ADMIN STYLE) */}
          {booking.bookingStatus === "pending" && (
            <SubmitButton
              loading={updating}
              loadingText="Rejecting..."
              className="bg-red-700 hover:bg-red-800"
              onClick={handleReject}
            >
              Reject Booking
            </SubmitButton>
          )}
          {booking.bookingStatus === "cancelled" && (
            <>
              <SubmitButton
                loading={updating}
                loadingText="Restoring..."
                className="bg-green-600 hover:bg-green-700"
                onClick={handleRestore}
              >
                Restore Booking
              </SubmitButton>

              <SubmitButton
                loading={deleting}
                loadingText="Deleting..."
                className="bg-red-700 hover:bg-red-800"
                onClick={handlePermanentDelete}
              >
                Delete Permanently
              </SubmitButton>
            </>
          )}

          {/* RESEND EMAIL */}
          {booking.bookingStatus === "confirmed" && (
            <SubmitButton
              loading={resending}
              loadingText="Sending..."
              className="bg-blue-500 hover:bg-blue-600"
              onClick={handleResendEmail}
            >
              Resend Email
            </SubmitButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
