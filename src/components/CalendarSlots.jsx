import React, { useMemo, useState } from "react";

/**
 * Props:
 *  - availability: { "YYYY-MM-DD": ["09:00","09:30", ...], ... } (optional)
 *  - selectedDate, setSelectedDate
 *  - selectedTime, setSelectedTime
 */
const formatDate = (d) => d.toISOString().slice(0, 10);

const CalendarSlots = ({ availability = {}, selectedDate, setSelectedDate, selectedTime, setSelectedTime }) => {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const [monthOffset, setMonthOffset] = useState(0);

  const firstOfMonth = useMemo(() => {
    const d = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    return d;
  }, [monthOffset, today]);

  const days = useMemo(() => {
    const year = firstOfMonth.getFullYear();
    const month = firstOfMonth.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const arr = [];
    for (let i = 1; i <= last.getDate(); i++) {
      arr.push(new Date(year, month, i));
    }
    return arr;
  }, [firstOfMonth]);

  const onSelectDate = (d) => {
    setSelectedDate(formatDate(d));
    setSelectedTime(""); // clear time
  };

  const getSlotsFor = (isoDate) => {
    if (availability && availability[isoDate]) return availability[isoDate];
    // default demo slots every 30min from 09:00 to 16:00
    const slots = [];
    for (let h = 9; h <= 16; h++) {
      slots.push(`${String(h).padStart(2, "0")}:00`);
      slots.push(`${String(h).padStart(2, "0")}:30`);
    }
    return slots;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 justify-between">
        <div className="flex gap-2 items-center">
          <button onClick={() => setMonthOffset((m) => m - 1)} className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700">Prev</button>
          <button onClick={() => setMonthOffset((m) => m + 1)} className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700">Next</button>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
          {firstOfMonth.toLocaleString(undefined, { month: "long", year: "numeric" })}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-sm">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center text-xs text-gray-500 dark:text-gray-400">{d}</div>
        ))}

        {/* pad blanks for first weekday */}
        {Array.from({ length: firstOfMonth.getDay() }).map((_, i) => <div key={"pad"+i} />)}

        {days.map((day) => {
          const iso = formatDate(day);
          const disabled = day < today;
          const selected = selectedDate === iso;
          const availabilityFor = getSlotsFor(iso);
          const hasSlots = availabilityFor && availabilityFor.length > 0;
          return (
            <button
              key={iso}
              onClick={() => !disabled && hasSlots && onSelectDate(day)}
              className={`p-2 rounded text-center border ${disabled ? "opacity-40 cursor-not-allowed" : "hover:shadow-md"} ${selected ? "bg-indigo-600 text-white" : "bg-white dark:bg-gray-800"} `}
            >
              <div className="text-sm font-medium">{day.getDate()}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{hasSlots ? `${availabilityFor.length} slots` : "—"}</div>
            </button>
          );
        })}
      </div>

      {/* Slots */}
      {selectedDate ? (
        <div>
          <div className="text-sm font-semibold mb-2">Available slots on {selectedDate}</div>
          <div className="flex flex-wrap gap-2">
            {getSlotsFor(selectedDate).map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedTime(slot)}
                className={`px-3 py-1 rounded border ${selectedTime === slot ? "bg-green-600 text-white" : "bg-white dark:bg-gray-800"}`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-500">Select a date to see available times.</div>
      )}
    </div>
  );
};

export default CalendarSlots;
