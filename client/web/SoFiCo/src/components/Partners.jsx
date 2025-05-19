import react from 'react'

// src/components/Partners.jsx
const partners = [
    { name: "Spherule", icon: "/spherule.svg" },
    { name: "Samsung Pay", icon: "/samsungpay.svg" },
    { name: "Visa", icon: "/visa.svg" },
    { name: "Amazon Pay", icon: "/amazonpay.svg" },
    { name: "PayPal", icon: "/paypal.svg" },
    { name: "Alipay", icon: "/alipay.svg" },
  ];
  
  export default function Partners() {
    return (
      <div className="flex justify-center items-center gap-8 bg-[#0e2d3c] py-6">
        {partners.map((p) => (
          <img key={p.name} src={p.icon} alt={p.name} className="h-8 opacity-80" />
        ))}
      </div>
    );
  }
  