import React from "react";

export default function FooterMinimal() {
  return (
    <footer className="w-full bg-black/95 py-6 text-center">
      <p className="text-xs text-gray-500 tracking-wide">
        © {new Date().getFullYear()} D2K Studios — Todos os direitos reservados.
      </p>
    </footer>
  );
}
