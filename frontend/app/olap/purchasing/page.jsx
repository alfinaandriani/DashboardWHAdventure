"use client";

export default function PurchasingCube() {
  return (
    <div className="p-6">
      <iframe
        id="mondrianFrame"
        src="http://localhost:8081/mondrian/testpage.jsp?query=purchasing"
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
