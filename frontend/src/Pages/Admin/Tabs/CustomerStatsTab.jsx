import React from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const customerServiceData = [
  { name: "Greater than 15", value: 3, color: "#4CAF50" },
  { name: "Greater than 8", value: 6, color: "#F44336" },
  { name: "Less than 8", value: 1, color: "#FFC107" },
];

const CustomerStatsTab = ({ calendarDate, setCalendarDate }) => (
  <motion.div className="bg-white p-8 rounded-2xl shadow-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-2xl font-semibold text-indigo-900 mb-6">Customers Served</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie 
              data={customerServiceData} 
              dataKey="value" 
              outerRadius={100}
            >
              {customerServiceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#E0E7FF", 
                border: "none", 
                color: "#4F46E5" 
              }} 
            />
          </PieChart>
        </ResponsiveContainer>
        <ul className="mt-4 space-y-2">
          {customerServiceData.map((item, index) => (
            <li key={index} className="flex items-center gap-3 text-indigo-800">
              <span 
                className="w-4 h-4 inline-block rounded-full" 
                style={{ backgroundColor: item.color }}
              ></span>
              {item.name}: {item.value}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-indigo-900 mb-6 text-center">Order Calendar</h3>
        <Calendar
          onChange={setCalendarDate}
          value={calendarDate}
          className="mx-auto border-none rounded-lg shadow-md bg-white text-indigo-900"
          tileClassName={({ date }) => {
            const day = date.getDate();
            return day % 2 === 0 ? "bg-indigo-100" : "bg-purple-100";
          }}
        />
      </div>
    </div>
  </motion.div>
);

export default CustomerStatsTab;