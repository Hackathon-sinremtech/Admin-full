import { demoData } from '../../data/demoData';

const AdminAppointments = () => {
  // Get doctor names for display
  const getDoctorName = (doctorId) => {
    return demoData.doctors.find(d => d.id === doctorId)?.name || 'Unknown Doctor';
  };

  // Status styling
  const statusStyles = {
    confirmed: 'bg-green-100 text-green-600',
    pending: 'bg-yellow-100 text-yellow-600',
    cancelled: 'bg-red-100 text-red-600',
    completed: 'bg-blue-100 text-blue-600'
  };

  // Payment status styling
  const paymentStyles = {
    paid: 'text-green-600',
    unpaid: 'text-red-600',
    partial: 'text-yellow-600'
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Appointments</h2>
      
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date/Time</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Doctor</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Patient</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Details</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Payment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {demoData.appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4">
                  <div className="text-gray-900">{appointment.date}</div>
                  <div className="text-sm text-gray-500">{appointment.time}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium">{getDoctorName(appointment.doctorId)}</div>
                  <div className="text-sm text-gray-500">{appointment.location}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium">{appointment.patient.name}</div>
                  <div className="text-sm text-gray-500">{appointment.patient.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-900">{appointment.reason}</div>
                  <div className="text-sm text-gray-500">{appointment.duration} mins</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${statusStyles[appointment.status]}`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`font-medium ${paymentStyles[appointment.paymentStatus]}`}>
                    {appointment.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAppointments;