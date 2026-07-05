import React from 'react';

export default function PageLoader({ message = "กำลังโหลดข้อมูล..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <img src="/loading.gif" alt="Loading..." className="w-24 h-24 mb-4 object-contain" />
      <h2 className="text-xl font-medium text-text-secondary animate-pulse">{message}</h2>
    </div>
  );
}
