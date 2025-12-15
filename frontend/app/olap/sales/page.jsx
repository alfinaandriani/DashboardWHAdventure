"use client";

export default function SalesCube() {
  return (
    <div className="p-6">
      <iframe
        src="http://localhost:8080/mondrian/testpage.jsp?query=sales"
        style={{
          width: "100%",
          height: "85vh",
          border: "1px solid #ccc",
          background: "white"
        }}
      />
    </div>
  );
}